import { AuthModal } from './components/AuthModal';
import { useAuthSession } from './hooks/useAuthSession';
import { usePortfolio } from './hooks/usePortfolio';
import { useTheme } from './hooks/useTheme';
import { MainLayout } from './layouts/MainLayout';
import type { Theme } from './types/portfolio';

function App(): JSX.Element {
  const { theme, toggleTheme } = useTheme();
  const auth = useAuthSession();

  if (auth.initializing) {
    return <LoadingScreen message="접근 권한 확인 중..." />;
  }

  if (!auth.session) {
    return (
      <AuthModal
        loading={auth.signingIn}
        error={auth.error}
        onSubmit={auth.signIn}
        onClearError={auth.clearError}
      />
    );
  }

  return <PortfolioApp theme={theme} onToggleTheme={toggleTheme} />;
}

interface PortfolioAppProps {
  theme: Theme;
  onToggleTheme: () => void;
}

function PortfolioApp({ theme, onToggleTheme }: PortfolioAppProps): JSX.Element {
  const { data, loading, error } = usePortfolio('default');

  if (loading) {
    return <LoadingScreen message="포트폴리오를 불러오는 중..." />;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg px-4 text-text">
        <div className="glass-card max-w-lg text-center" role="alert">
          <p className="font-semibold text-red-500">데이터를 불러오는 중 오류가 발생했습니다.</p>
          <p className="mt-2 break-words text-sm text-muted">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg px-4 text-text">
        <p className="text-muted">데이터가 없습니다.</p>
      </div>
    );
  }

  return <MainLayout theme={theme} onToggleTheme={onToggleTheme} data={data} />;
}

interface LoadingScreenProps {
  message: string;
}

function LoadingScreen({ message }: LoadingScreenProps): JSX.Element {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-bg text-text"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="text-center" role="status">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
        <p className="mt-4 text-muted">{message}</p>
      </div>
    </div>
  );
}

export default App;
