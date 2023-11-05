import { PostEditor } from "../../../entities/post";
import { mockPost } from "../../../shared/lib/constants";

export function NewPostEditor() {
  return (
    <PostEditor
      post={{ ...mockPost }}
      onSubmit={(values) => console.log(values)}
      isLoading={false}
      isError={false}
    />
  );
}
