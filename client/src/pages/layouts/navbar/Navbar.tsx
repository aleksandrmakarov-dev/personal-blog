import ComputerTwoToneIcon from "@mui/icons-material/ComputerTwoTone";
import { NavLink } from "react-router-dom";
import { Routing, cn } from "../../../shared/lib";

const NavLinks = [
  {
    name: "Home",
    link: Routing.root,
  },
  {
    name: "Posts",
    link: Routing.posts.index,
  },
  {
    name: "About Me",
    link: Routing.aboutMe,
  },
];

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-screen-2xl">
        <div className="py-3 px-10">
          <div className="flex items-center justify-between">
            <div>
              <a href="/" className="flex gap-2 items-center text-primary-600">
                <ComputerTwoToneIcon />
                <h1 className="font-bold">Code Journeys</h1>
              </a>
            </div>
            <div>
              <ul className="flex gap-5">
                {NavLinks.map(({ name, link }) => (
                  <li key={link}>
                    <NavLink
                      className={({ isActive, isPending }) =>
                        cn("text-foreground-primary hover:underline", {
                          "text-primary-600 underline": isActive,
                          "text-foreground-secondary": isPending,
                        })
                      }
                      to={link}
                    >
                      {name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
