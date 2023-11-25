import { Routing, formatDate } from "@/shared/lib";
import { stringAvatar, stringToColor } from "@/shared/lib/utils";
import { Avatar } from "@mui/material";
import { NavLink } from "react-router-dom";

interface PostAuthorProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  image?: string;
  name: string;
  readingTime: number;
  readingUnits?: "min" | "hrs";
  created: Date;
  updated: Date | null;
}

export function PostAuthor(props: PostAuthorProps) {
  const {
    id,
    image,
    name,
    readingTime,
    readingUnits = "min",
    created,
    updated,
  } = props;

  return (
    <div className="flex items-center">
      <Avatar
        className="mr-3"
        src={image}
        children={stringAvatar(name)}
        sx={{
          width: 42,
          height: 42,
          bgcolor: stringToColor(name),
        }}
      />
      <div>
        <div>
          <NavLink
            className="text-foreground-primary font-semibold hover:underline"
            to={Routing.users.details(id)}
          >
            {name}
          </NavLink>
        </div>
        <div className="text-foreground-secondary">
          <span>
            {readingTime} {readingUnits} read
          </span>
          {" • "}
          <span>
            {" "}
            <span>{formatDate(created)}</span>{" "}
            {updated && <span>(Updated {formatDate(updated)})</span>}
          </span>
        </div>
      </div>
    </div>
  );
}
