import { useAuth } from "@/providers/AuthProvider";

export default function HomePage() {
  const { currentUser } = useAuth();
  return (
    <div>
      <h1>Current user:</h1>
      <pre className="w-96 overflow-auto break-words whitespace-pre-wrap">
        <code>{JSON.stringify(currentUser)}</code>
      </pre>
    </div>
  );
}
