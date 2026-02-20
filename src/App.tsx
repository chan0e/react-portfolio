import { MainLayout } from './layouts/MainLayout';
import { useTheme } from './hooks/useTheme';

function App(): JSX.Element {
  const { theme, toggleTheme } = useTheme();

  return <MainLayout theme={theme} onToggleTheme={toggleTheme} />;
}

export default App;
