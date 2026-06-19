import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../store";
import { hasRole, UserRole } from "@/Common/Entity/Base/User";
import { REDIRECT_URL } from "@/Transport";
import { addSubDomainToUrl } from "@/Common/utils";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const user = useSelector((state: RootState) => state.auth.user);

  if (user && !hasRole([UserRole.CLIENT], user?.roles)) {
    window.location.replace(addSubDomainToUrl(REDIRECT_URL));
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
