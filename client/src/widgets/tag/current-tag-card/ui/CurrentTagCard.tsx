import { TagCard, useTagBySlug } from "@/entities/tag";

interface CurrentTagCardProps extends React.HTMLAttributes<HTMLDivElement> {
  slug: string;
}

export function CurrentTagCard(props: CurrentTagCardProps) {
  const { slug, ...other } = props;

  const { data, isLoading, isError } = useTagBySlug(slug);

  if (isLoading) return <div>Loading...</div>;

  if (isError || !data) return <div>Error</div>;

  console.log(data);

  return <TagCard {...other} tag={data} />;
}
``;
