import WestRoundedIcon from "@mui/icons-material/WestRounded";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { Routing, cn } from "@/shared/lib";
import { PostPreviewDTO } from "@/services/post/postService";
import { Link } from "react-router-dom";

interface PostLinkProps extends React.HTMLAttributes<HTMLDivElement> {
  post?: PostPreviewDTO;
  next?: boolean;
}

export function PostLink(props: PostLinkProps) {
  const { post, next, className, ...other } = props;

  if (!post) return <div />;

  return (
    <Link to={Routing.posts.slug(post.slug)}>
      <div
        className={cn(
          "p-5 rounded-sm flex items-center gap-5 text-foreground-secondary hover:cursor-pointer hover:underline",
          { "flex-row-reverse": next },
          className
        )}
        {...other}
      >
        {next ? <EastRoundedIcon /> : <WestRoundedIcon />} <p>{post.title}</p>
      </div>
    </Link>
  );
}
