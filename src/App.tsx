import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ErrorPage from './utils/ErrorPage';
import LoginPage from './pages/public/login/LoginPage';
import TachePage from './pages/secure/TachePage';
import QueryProvider from './config/QueryClient';
import AuthProvider from './utils/AuthProvider';
import AuthGard from './utils/AuthGard';

function App() {
  

  return (
    <QueryProvider>
    <AuthProvider>
    <BrowserRouter>
      <Routes>
      <Route index element={<LoginPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route element={<AuthGard />} >
        <Route path="task" element={<TachePage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    </QueryProvider>
  );
}

export default App;
