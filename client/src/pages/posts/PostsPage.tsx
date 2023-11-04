import { Divider, Tab, Tabs } from "@mui/material";
import { GlobalPostFeed } from "../../widgets/global-post-feed";
import { PopularTopics } from "../../widgets/popular-topics";
import { PostFilter } from "../../widgets/post-filter";
import { useState } from "react";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import RouterPagination from "../../shared/ui/router-pagination/RouterPagination";

export default function PostsPage() {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const onTabIndexChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <div className="grid grid-cols-[7fr_3fr] gap-x-14 items-start">
      <div>
        <Tabs value={tabIndex} onChange={onTabIndexChange}>
          <Tab
            sx={{ minHeight: 48 }}
            icon={<PublicRoundedIcon fontSize="small" />}
            iconPosition="start"
            label="Global"
          />
          <Tab
            sx={{ minHeight: 48 }}
            icon={<PersonRoundedIcon fontSize="small" />}
            iconPosition="start"
            label="Following"
          />
        </Tabs>
        <Divider />
        <div className="mb-5  ">{tabIndex === 0 && <GlobalPostFeed />}</div>
        <RouterPagination />
      </div>
      <div className="border-l border-gray-200 px-5 flex flex-col gap-y-5 sticky top-3 left-0 h-screen">
        <PopularTopics />
        <Divider />
        <PostFilter />
      </div>
    </div>
  );
}
