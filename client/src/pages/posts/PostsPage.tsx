import { Divider, Tab, Tabs } from "@mui/material";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { PostsFilter, GlobalPostFeed, UserPostFeed } from "@/widgets/post";
import { CurrentTagCard, PopularTags } from "@/widgets/tag";
import { useParams } from "react-router-dom";
import { Routing } from "@/shared/lib";

interface PostsPageProps {
  userFeed?: boolean;
}

export default function PostsPage(props: PostsPageProps) {
  const { userFeed } = props;

  const { tagSlug } = useParams();

  return (
    <div className="grid grid-cols-[7fr_3fr] gap-x-14 items-start">
      {tagSlug && (
        <CurrentTagCard className="col-span-2 mb-10" slug={tagSlug} />
      )}
      <div className="flex flex-col">
        <Tabs value={userFeed ? 1 : 0}>
          <Tab
            sx={{ minHeight: 48 }}
            icon={<PublicRoundedIcon fontSize="small" />}
            iconPosition="start"
            label="Global"
            href={Routing.posts.index}
          />
          <Tab
            sx={{ minHeight: 48 }}
            icon={<PersonRoundedIcon fontSize="small" />}
            iconPosition="start"
            label="Personal"
            href={Routing.posts.personal}
          />
        </Tabs>
        <Divider />
        <PostsFilter />
        {userFeed ? <UserPostFeed /> : <GlobalPostFeed />}
      </div>
      <div className="border-l border-gray-200 px-5 flex flex-col gap-y-5 sticky top-3 left-0 h-screen">
        <PopularTags />
        <Divider />
      </div>
    </div>
  );
}
