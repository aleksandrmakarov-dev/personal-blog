import { Link } from "react-router-dom";
import { Avatar, Chip, IconButton } from "@mui/material";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import PanoramaIcon from "@mui/icons-material/Panorama";
import { PostCardDTO, Routing, formatDate } from "@/shared/lib";
import { stringAvatar, stringToColor } from "@/shared/lib/utils";
import { TagDTO } from "@/services/tag/tagService";

interface PostPreviewCardProps {
  post: PostCardDTO;
}

export function PostPreviewCard({ post }: PostPreviewCardProps) {
  const {
    title,
    image,
    user,
    created,
    description,
    likes,
    updated,
    tags,
    slug,
  } = post;

  return (
    <article className="border-b border-gray-200">
      <div className="py-5 ">
        <div className="flex">
          <div className="w-24 h-24 rounded-md overflow-clip mr-6 shrink-0">
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
            <div className="flex gap-2 items-center">
              {user && (
                <div className="flex items-center">
                  <Avatar
                    className="mr-2"
                    alt={user.name}
                    children={stringAvatar(user.name)}
                    sx={{
                      width: 24,
                      height: 24,
                      fontSize: 10,
                      bgcolor: stringToColor(user.name),
                    }}
                  />
                  <Link
                    className="text-sm font-semibold text-foreground-secondary hover:text-foreground-primary"
                    to={Routing.users.details(user.id)}
                  >
                    {user.name}
                  </Link>
                </div>
              )}
              <span className="text-foreground-secondary">•</span>
              <p className="text-xs uppercase text-foreground-secondary">
                <span>{formatDate(created)}</span>{" "}
                {updated && <span>(Edit {formatDate(updated)})</span>}
              </p>
            </div>
            <h3 className="text-lg font-semibold mb-1">
              <Link
                className="hover:underline text-foreground-primary hover:text-primary-600"
                to={Routing.posts.details(slug)}
              >
                {title}
              </Link>
            </h3>
            <p className="text-sm mb-2 text-foreground-primary">
              {description}
            </p>
            <div className="flex items-center gap-1">
              <div className="flex gap-1 w-full">
                {tags.map((tag: TagDTO) => (
                  <Chip
                    sx={{ fontSize: "0.875rem" }}
                    key={tag.id}
                    label={tag.name}
                    variant="filled"
                    size="small"
                    color="default"
                  />
                ))}
              </div>
              <div className="flex items-center gap-1">
                <IconButton size="small" color="primary">
                  <FavoriteBorderRoundedIcon sx={{ fontSize: 20 }} />
                </IconButton>
                <p className="text-sm font-semibold text-foreground-secondary">
                  {likes}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
