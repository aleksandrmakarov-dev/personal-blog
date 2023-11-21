import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { postKeys, usePosts } from "../..";
import { useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

interface PostParentSelectProps {
  onSelectParent: (value: PostSelectOption | null) => void;
  value: PostSelectOption | null;
  onBlur: (e: any) => void;
  disabled?: boolean;
  name: string;
}

interface PostSelectOption {
  id: string;
  title: string;
}

export function PostParentSelect(props: PostParentSelectProps) {
  const { onSelectParent, onBlur, value, name, disabled } = props;

  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [queryValue] = useDebounce(query, 1000);

  const { data, refetch, isLoading } = usePosts<PostSelectOption[]>(
    {
      query: query,
    },
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (!queryValue || queryValue.length < 3) {
      clearOptions();
    } else {
      refetch();
    }
  }, [queryValue]);

  useEffect(() => {
    if (!open) {
      clearOptions();
    }
  }, [open]);

  const clearOptions = () => {
    queryClient.setQueryData<PostSelectOption[]>(
      postKeys.posts.query({ query: query }),
      []
    );
  };

  return (
    <Autocomplete
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      onChange={(_, v) => {
        onSelectParent(v);
      }}
      onBlur={onBlur}
      value={value}
      disabled={disabled}
      loading={isLoading}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.title}
      inputValue={query}
      onInputChange={(_e, newValue) => setQuery(newValue)}
      renderInput={(params) => (
        <TextField {...params} name={name} size="small" />
      )}
      options={data || []}
    />
  );
}
