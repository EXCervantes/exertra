import { FaReact, FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

export const socials = [
  {
    site: "Portfolio",
    url: "https://edwardo-cervantes-portfolio.netlify.app/",
    icon: <FaReact fontSize={50} className="hover:opacity-80" />,
  },
  {
    site: "GitHub",
    url: "https://github.com/EXCervantes",
    icon: <FaGithub fontSize={50} className="hover:opacity-80" />,
  },
  {
    site: "LinkedIn",
    url: "https://www.linkedin.com/in/edwardo-cervantes-245510323/",
    icon: <FaLinkedin fontSize={50} className="hover:opacity-80" />,
  },
  {
    site: "Facebook",
    url: "https://www.facebook.com/profile.php?id=100000132221280",
    icon: <FaFacebook fontSize={50} className="hover:opacity-80" />,
  },
];
