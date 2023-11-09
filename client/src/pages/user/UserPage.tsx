import { useParams } from "react-router-dom";

export default function UserPage() {
  const { userId } = useParams();

  return (
    <div>
      <h1>UserPage - {userId}</h1>
    </div>
  );
}
