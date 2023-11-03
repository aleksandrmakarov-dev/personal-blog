import { Link } from "react-router-dom";
import { PostCardDTO, formatDate } from "../../../../shared/lib";

interface PostPreviewCardProps {
  post: PostCardDTO;
}

export function PostPreviewCard({ post }: PostPreviewCardProps) {
  const {
    title,
    image,
    user,
    comments,
    created,
    description,
    likes,
    updated,
    tags,
  } = post;
  return (
    <article className="max-w-2xl border-b border-gray-200">
      <div className="py-5">
        <div className="flex">
          <div className="w-24 h-24 rounded-md overflow-clip mr-6">
            {image ? (
              <img
                className="object-cover object-center w-full h-full"
                src={image}
              />
            ) : (
              <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-400 font-semibold">Image</span>
              </div>
            )}
          </div>
          <div>
            <p className="text-xs uppercase text-gray-600 mb-1">
              — <span>{formatDate(created)}</span>{" "}
              {updated && <span>(upd. {formatDate(updated)})</span>}
            </p>
            <h3 className="text-lg font-semibold mb-1">
              <Link className="hover:underline hover:text-blue-600" to="/">
                {title}
              </Link>
            </h3>
            <p className="text-sm">{description}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
