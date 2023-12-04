import { cn } from "@/shared/lib";
import { TagDTO } from "@/services/tag/tagService";
import { FollowTag, UnfollowTag } from "@/features/tag";

interface TagCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tag: TagDTO;
}

export function TagCard(props: TagCardProps) {
  const { tag, className, ...other } = props;

  const { id, name, slug, followersCount, postsCount, isFollowing } = tag;

  return (
    <div className={cn("border-b border-gray-200", className)} {...other}>
      <div className="mb-5 text-center">
        <h2 className="text-foreground-primary text-4xl font-semibold mb-3">
          {name}
        </h2>
        <p className="text-foreground-secondary text-lg mb-2">
          Topic • {followersCount} followers • {postsCount} posts
        </p>
        {isFollowing ? (
          <UnfollowTag tagId={id} tagSlug={slug} />
        ) : (
          <FollowTag tagId={id} tagSlug={slug} />
        )}
      </div>
    </div>
  );
}
