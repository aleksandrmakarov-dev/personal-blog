import ComputerTwoToneIcon from "@mui/icons-material/ComputerTwoTone";
import { NavLink } from "react-router-dom";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Routing, cn } from "@/shared/lib";
import { UserProfileMenu } from "@/widgets/user";
import PrivateComponent from "@/shared/ui/private-component/PrivateComponent";

type NavLinkType = {
  name: string;
  route: string;
  icon?: React.ReactNode;
};

const NavLinks: NavLinkType[] = [
  {
    name: "Home",
    route: Routing.root,
  },
  {
    name: "Posts",
    route: Routing.posts.index,
  },
  {
    name: "About Me",
    route: Routing.aboutMe,
  },
];

export default function Navbar() {
  const navLinkStyling = ({ isActive, isPending }: any) =>
    cn("flex items-center gap-1", {
      "text-primary-600 underline": isActive,
      "text-foreground-secondary": isPending,
      "text-foreground-secondary hover:text-foreground-primary hover:underline":
        !isActive && !isPending,
    });

  return (
    <nav className="border-b border-gray-100 shadow-gray-100 shadow-md bg-white">
      <div className="mx-auto max-w-screen-2xl">
        <div className="py-2.5 px-10">
          <div className="flex items-center justify-between">
            <div>
              <a href="/" className="flex gap-2 items-center text-primary-600">
                <ComputerTwoToneIcon />
                <h1 className="font-bold">Code Journey</h1>
              </a>
            </div>
            <div className="flex items-center gap-x-14">
              <div className="flex gap-x-5">
                {NavLinks.map(({ name, route }) => (
                  <NavLink key={route} className={navLinkStyling} to={route}>
                    {name}
                  </NavLink>
                ))}
              </div>
              <div className="flex gap-x-3">
                <PrivateComponent roles={["admin"]}>
                  <NavLink className={navLinkStyling} to="/posts/new">
                    <EditNoteIcon fontSize="medium" /> <span>Write</span>
                  </NavLink>
                </PrivateComponent>
                <UserProfileMenu />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
