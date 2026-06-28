import { usePortfolio } from './hooks/usePortfolio';
import { useTheme } from './hooks/useTheme';
import { MainLayout } from './layouts/MainLayout';

function App(): JSX.Element {
  const { theme, toggleTheme } = useTheme();
  const { data, loading, error } = usePortfolio('default');

  if (loading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center bg-bg text-text"
        aria-busy="true"
        aria-live="polite"
      >
        <div className="text-center" role="status">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
          <p className="mt-4 text-muted">로딩 중...</p>
        </div>
      </div>
    );
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

  return <MainLayout theme={theme} onToggleTheme={toggleTheme} data={data} />;
}

export default App;
