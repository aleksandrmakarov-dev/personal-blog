import { NewPostEditor } from "../../widgets/new-post-editor";

interface PostEditorPageProps {
  edit?: boolean;
}

export default function PostEditorPage({ edit }: PostEditorPageProps) {
  return edit ? <div>edit</div> : <NewPostEditor />;
}
