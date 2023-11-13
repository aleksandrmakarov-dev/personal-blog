import { useTags } from "../../../entities/tag/api/tagApi";
import TagSelect, {
  TagSelectOption,
} from "../../../entities/tag/ui/tag-select/TagSelect";

interface PostTagSelectProps {
  onSelectTag: (tags: TagSelectOption[]) => void;
  value?: TagSelectOption[];
  onBlur: (e: any) => void;
  disabled?: boolean;
  name: string;
}

export function PostTagSelect(props: PostTagSelectProps) {
  const { data, isLoading, isError } = useTags();

  return (
    <TagSelect
      options={data || []}
      isLoading={isLoading}
      isError={isError}
      {...props}
    />
  );
}
