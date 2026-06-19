import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "./store";
import { checkAuthAsync, logout } from "./Domain/Slice/Auth";

import ProtectedRoute from "./Model/HOC/ProtectedRoute";

import LoginPage from "./Presentation/Pages/Login";
import PersonalPage from "./Presentation/Pages/Personal";

import CircularLoading from "./Presentation/Components/Indicators/CircularLoading";

import "@/Presentation/Styles/headers.scss";
import "@/Presentation/Styles/buttons.scss";
import "@/Presentation/Styles/inputs.scss";
import "@/Presentation/Styles/modal.scss";
import "@/Presentation/Styles/page.scss";

import CurrentGroupPage from "./Presentation/Pages/CurrentGroup";
import CurrentGroupCoursePage from "./Presentation/Pages/CurrentGroupCourse";
import ConfirmExitPage from "./Presentation/Pages/ConfirmExit";
import BasicToast from "./Presentation/Components/Toasts/Basic";
import Footer from "./Presentation/Components/Footer";
import NavigationBar from "./Presentation/Components/Header";
import CalendarPage from "./Presentation/Pages/Calendar";
import RecoveryPasswordPage from "./Presentation/Pages/RecoveryPassword";
import NotificationsPage from "./Presentation/Pages/Notifications";
import WalletsPage from "./Presentation/Pages/PointWallets";
import PointWalletTransactionsPage from "./Presentation/Pages/PointWalletTransactions";
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
