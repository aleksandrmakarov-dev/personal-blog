import { Link } from "react-router-dom";
import { Avatar, Chip } from "@mui/material";
import PanoramaIcon from "@mui/icons-material/Panorama";
import { Routing, formatDate } from "@/shared/lib";
import { stringAvatar, stringToColor } from "@/shared/lib/utils";
import { TagDTO } from "@/services/tag/tagService";
import { PostCardDTO } from "@/services/post/postService";
import { FavoritePost, UnfavoritePost } from "@/features/post";

interface PostPreviewCardProps {
  post: PostCardDTO;
}

export function PostCard({ post }: PostPreviewCardProps) {
  const {
    title,
    image,
    author,
    created,
    description,
    updated,
    tags,
    slug,
    isFavorite,
  } = post;

  return (
    <article className="border-b border-gray-200">
      <div className="py-5 ">
        <div className="flex">
          <div className="w-36 h-36 rounded-md overflow-clip mr-6 shrink-0">
            {image ? (
              <img
                className="object-cover object-center w-full h-full"
                src={image}
              />
            ) : (
              <div className="w-full h-full bg-primary-100 flex items-center justify-center">
                <PanoramaIcon
                  className="text-primary-400"
                  sx={{ fontSize: 40 }}
                />
              </div>
            )}
          </div>
          <div className="w-full">
            <div className="flex gap-2 items-center mb-1">
              {author && (
                <>
                  <div className="flex items-center">
                    <Avatar
                      className="mr-2"
                      alt={author.name}
                      children={stringAvatar(author.name)}
                      sx={{
                        width: 24,
                        height: 24,
                        fontSize: 10,
                        bgcolor: stringToColor(author.name),
                      }}
                    />
                    <Link
                      className="text-sm font-semibold text-foreground-secondary hover:text-foreground-primary"
                      to={Routing.users.profile(author.slug)}
                    >
                      {author.name}
                    </Link>
                  </div>
                  <span className="text-foreground-secondary">•</span>
                </>
              )}
              <p className="text-sm uppercase text-foreground-secondary">
                <span>{formatDate(created)}</span>{" "}
                {updated && <span>(Updated {formatDate(updated)})</span>}
              </p>
            </div>
            <h2 className="text-xl font-semibold mb-1">
              <Link
                className="hover:underline text-foreground-primary hover:text-primary-600"
                to={Routing.posts.slug(slug)}
              >
                {title}
              </Link>
            </h2>
            <p className="mb-2 text-foreground-primary">{description}</p>
            <div className="flex items-center gap-1">
              <div className="flex gap-1 w-full">
                {tags.map((tag: TagDTO) => (
                  <Chip
                    sx={{ fontSize: "0.875rem" }}
                    key={tag.id}
                    component="a"
                    label={tag.name}
                    variant="filled"
                    size="small"
                    color="default"
                    href={Routing.tags.slug(tag.slug)}
                    clickable
                  />
                ))}
              </div>
              {isFavorite ? (
                <UnfavoritePost postId={post.id} postSlug={post.slug} />
              ) : (
                <FavoritePost postId={post.id} postSlug={post.slug} />
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
