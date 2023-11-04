import { useParams } from "react-router-dom";

export default function PostPage() {
  const { slug } = useParams();
  return (
    <div>
      <h1>Post Page {slug}</h1>
    </div>
  );
}
