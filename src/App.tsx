import RegisterPage from './pages/register/RegisterPage';
import LanguageSwitcher from './components/LanguageSwitcher';

function App() {
  return (
    <div className="relative">
      <LanguageSwitcher />
      <RegisterPage />
    </div>
  );
}

export default App;
