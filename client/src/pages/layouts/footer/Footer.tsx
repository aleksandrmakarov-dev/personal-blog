import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { NavLink } from 'react-router-dom';

type SocialMediaLinkType = {
    icon:React.ReactNode;
    route:string;
}

const socialMediaLinks:SocialMediaLinkType[] = [
    {
        icon:<GitHubIcon/>,
        route:"https://github.com/aleksandrmakarov-dev"
    },
    {
        icon:<LinkedInIcon/>,
        route:"https://www.linkedin.com/in/aleksandr-makarov-397547252/"
    }
]

export default function Footer(){
    return(
        <footer className="border-t border-gray-200 py-2.5 px-10 bg-gray-50">
            <div className="flex items-center justify-between mx-auto max-w-screen-2xl">
                <div className="flex items-center gap-3">
                    {socialMediaLinks.map(({icon,route})=>
                        <NavLink key={route} className="text-foreground-secondary hover:text-foreground-primary" to={route}>
                            {icon}
                        </NavLink>
                    )}
                </div>
                <div>
                    <p className="text-foreground-secondary text-sm">Aleksandr Makarov © 2023</p>
                </div>
            </div>
        </footer>
    )
}