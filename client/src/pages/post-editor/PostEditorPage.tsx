import { NewPostEditor } from "@/widgets/post";

interface PostEditorPageProps {
  edit?: boolean;
}

export default function PostEditorPage({ edit }: PostEditorPageProps) {
  return edit ? <div>edit</div> : <NewPostEditor />;
}
