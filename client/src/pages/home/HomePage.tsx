import { useAuth } from "../../providers/AuthProvider";

export default function HomePage() {
  const {currentUser} = useAuth();
  return (
    <div>
      <h1>Current user:</h1>
      <pre>
        <code>
          {JSON.stringify(currentUser)}
        </code>
      </pre>
    </div>
  );
}
