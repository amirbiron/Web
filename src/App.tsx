import { Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/register/RegisterPage';
import VerifyPage from './pages/verify/VerifyPage';
import LanguageSwitcher from './components/LanguageSwitcher';

function App() {
  return (
    <div className="relative">
      <LanguageSwitcher />
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/verify-email" element={<VerifyPage />} />
      </Routes>
    </div>
  );
}

export default App;
