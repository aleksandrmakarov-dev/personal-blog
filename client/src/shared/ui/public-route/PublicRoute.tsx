import { useAuth } from "@/providers/AuthProvider";
import { Routing } from "@/shared/lib";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (currentUser) {
    return <Navigate to={Routing.root} replace />;
  } else {
    return <Outlet />;
  }
}
