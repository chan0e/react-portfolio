import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import {
  getCurrentAuthSession,
  signInWithPortfolioPassword,
  subscribeToAuthSession,
} from '../lib/supabase';

interface UseAuthSessionResult {
  session: Session | null;
  initializing: boolean;
  signingIn: boolean;
  error: string | null;
  signIn: (password: string) => Promise<void>;
  clearError: () => void;
}

export function useAuthSession(): UseAuthSessionResult {
  const [session, setSession] = useState<Session | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getCurrentAuthSession()
      .then((currentSession) => {
        if (!cancelled) {
          setSession(currentSession);
        }
      })
      .catch((authError) => {
        if (!cancelled) {
          setError(getAuthErrorMessage(authError));
        }
      })
      .finally(() => {
        if (!cancelled) {
          setInitializing(false);
        }
      });

    let unsubscribe = (): void => undefined;

    try {
      unsubscribe = subscribeToAuthSession((nextSession) => {
        setSession(nextSession);
      });
    } catch (authError) {
      if (!cancelled) {
        setError(getAuthErrorMessage(authError));
        setInitializing(false);
      }
    }

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  const signIn = async (password: string): Promise<void> => {
    if (!password) {
      setError('비밀번호를 입력해주세요.');
      return;
    }

    try {
      setSigningIn(true);
      setError(null);
      await signInWithPortfolioPassword(password);
    } catch (authError) {
      setError(getAuthErrorMessage(authError));
    } finally {
      setSigningIn(false);
    }
  };

  const clearError = (): void => {
    setError(null);
  };

  return {
    session,
    initializing,
    signingIn,
    error,
    signIn,
    clearError,
  };
}

function getAuthErrorMessage(error: unknown): string {
  if (!(error instanceof Error)) {
    return '인증 중 알 수 없는 오류가 발생했습니다.';
  }

  if (error.message.includes('Invalid login credentials')) {
    return '비밀번호가 올바르지 않습니다.';
  }

  if (error.message.includes('Missing portfolio viewer email')) {
    return '포트폴리오 열람 계정 설정이 누락되었습니다.';
  }

  return error.message;
}
