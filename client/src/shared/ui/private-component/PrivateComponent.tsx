import { useAuth } from "@/providers/AuthProvider";

export default function PrivateComponent({
  children,
  roles,
}: {
  children: React.ReactNode;
  roles?: string[];
}) {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (currentUser) {
    if (roles) {
      if (roles.includes(currentUser.role)) {
        return <>{children}</>;
      } else {
        return null;
      }
    }
  } else {
    return null;
  }
}
