import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "./store";
import { checkAuthAsync, logout } from "@/entities/Auth";

import { ProtectedRoute } from "@/entities/Auth";

import LoginPage from "@/pages/Login";
import PersonalPage from "@/pages/Personal";

import CircularLoading from "@/shared/ui/Indicators/CircularLoading";

import "@/app/styles/headers.css";
import "@/app/styles/buttons.css";
import "@/app/styles/inputs.css";
import "@/app/styles/modal.css";
import "@/app/styles/page.css";

import CurrentGroupPage from "@/pages/CurrentGroup";
import CurrentGroupCoursePage from "@/pages/CurrentGroupCourse";
import ConfirmExitPage from "@/pages/ConfirmExit";
import BasicToast from "@/shared/ui/Toasts/Basic";
import Footer from "@/widgets/Footer";
import NavigationBar from "@/widgets/Header";
import CalendarPage from "@/pages/Calendar";
import RecoveryPasswordPage from "@/pages/RecoveryPassword";
import NotificationsPage from "@/pages/Notifications";
import WalletsPage from "@/pages/PointWallets";
import PointWalletTransactionsPage from "@/pages/PointWalletTransactions";
import { useTranslation } from "react-i18next";
import "./i18n";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { i18n } = useTranslation();

  const error = useSelector((state: RootState) => state.auth.authError);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const currentPageId = useSelector(
    (state: RootState) => state.app.currentPageId
  );

  const [isAppLoading, setisAppLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await dispatch(checkAuthAsync());
      if (checkAuthAsync.fulfilled.match(response)) {
        if (
          response.payload.isAuthenticated &&
          i18n.language !== response.payload.user?.language
        ) {
          i18n.changeLanguage(response.payload.user?.language);
        }
      }

      setisAppLoading(false);
    };
    checkAuth();
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      logout();
      setisAppLoading(false);
    }
  }, [error]);

  if (isAppLoading) {
    return <CircularLoading />;
  }

  return (
    <>
      {isAuthenticated && <NavigationBar selectedItemId={currentPageId} />}
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/recovery-password" element={<RecoveryPasswordPage />} />

        <Route
          path="/me"
          element={
            <ProtectedRoute>
              <PersonalPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/groups/:id"
          element={
            <ProtectedRoute>
              <CurrentGroupPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/group-courses/:id"
          element={
            <ProtectedRoute>
              <CurrentGroupCoursePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/confirm-exit"
          element={
            <ProtectedRoute>
              <ConfirmExitPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <CalendarPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wallets"
          element={
            <ProtectedRoute>
              <WalletsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wallets/:id"
          element={
            <ProtectedRoute>
              <PointWalletTransactionsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Navigate to="/me" replace />
            </ProtectedRoute>
          }
        />
      </Routes>
      <BasicToast />
      {isAuthenticated && (
        <>
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
