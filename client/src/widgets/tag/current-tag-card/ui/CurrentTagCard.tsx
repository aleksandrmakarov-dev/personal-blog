import { TagCard, useTagBySlug } from "@/entities/tag";

interface CurrentTagCardProps extends React.HTMLAttributes<HTMLDivElement> {
  slug: string;
}

export function CurrentTagCard(props: CurrentTagCardProps) {
  const { slug, ...other } = props;

  const { data, isLoading, isError } = useTagBySlug(slug);

  console.log(data);

  if (isLoading) return <div>Loading...</div>;

  if (isError || !data) return <div>Error</div>;

  return <TagCard {...other} title={data.name} slug={data.slug} />;
}
``;
