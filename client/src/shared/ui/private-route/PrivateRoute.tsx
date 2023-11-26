import { useAuth } from "@/providers/AuthProvider";
import { Routing } from "@/shared/lib";
import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
  roles?: string[];
}

export default function PrivateRoute(props: PrivateRouteProps) {
  const { roles } = props;

  const { isLoading, currentUser } = useAuth();

  if (isLoading) {
    return null;
  }

  if (currentUser) {
    if (roles) {
      if (roles.includes(currentUser.role)) {
        return <Outlet />;
      } else {
        return <Navigate to={Routing.errors.unauthorized} replace />;
      }
    } else {
      return <Outlet />;
    }
  } else {
    return <Navigate to={Routing.auth.signIn} replace />;
  }
}
