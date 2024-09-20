import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loading from './components/Loading';

// Lazy loading untuk halaman tertentu
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const PrivateRoute = lazy(() => import('./components/PrivateRoute'));

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route 
            path="/dashboard/*" 
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
