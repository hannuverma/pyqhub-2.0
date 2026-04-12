import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import HomePage from '../pages/HomePage';
import PapersPage from '../pages/PapersPage';
import UploadSectorPage from '../pages/UploadSectorPage';
import UploadLoginPage from '../pages/UploadLoginPage';
import ProtectedRoute from '../utils/ProtectedRoutes';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="papers" element={<PapersPage />} />
          <Route path="sector/login" element={<UploadLoginPage />} />
          <Route
            path="upload"
            element={
              <ProtectedRoute>
                <UploadSectorPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
