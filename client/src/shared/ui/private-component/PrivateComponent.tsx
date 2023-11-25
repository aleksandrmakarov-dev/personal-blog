import { useAuth } from "@/providers/AuthProvider";

export default function PrivateComponent({
  children,
  role,
}: {
  children: React.ReactNode;
  role?: string;
}) {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (currentUser) {
    if (role) {
      if (currentUser.role === role) {
        return <>{children}</>;
      } else {
        return null;
      }
    }
  } else {
    return null;
  }
}
