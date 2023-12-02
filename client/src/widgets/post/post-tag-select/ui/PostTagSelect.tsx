import { TagSelect, TagSelectOption, useTags } from "@/entities/tag";

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
      limit={3}
      {...props}
    />
  );
}
