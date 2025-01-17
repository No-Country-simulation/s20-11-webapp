import { Facebook, Github, Instagram, Twitter } from "lucide-react";
const socials = [
  {
    name: "Facebook",
    url: "#",
    icon: <Facebook />,
  },
  {
    name: "Instagram",
    url: "#",
    icon: <Instagram />,
  },
  {
    name: "X",
    url: "#",
    icon: <Twitter />,
  },
  {
    name: "GitHub",
    url: "#",
    icon: <Github />,
  },
];

const Footer = () => {
  return (
    <footer className="bg-background text-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 Edu Planner. Todos los derechos reservados.</p>
          <div className="flex gap-5 mt-4 md:mt-0">
            {socials.map((social) => (
              <a
                className="text-muted-foreground hover:text-foreground transition-colors"
                key={social.name}
                href={social.url}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
