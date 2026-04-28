import { socialLinks } from "../data";
import Dock from "./Dock/Dock";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const dockItems = [
    {
      icon: <i className="ri-home-4-line text-lg"></i>,
      label: "Home",
      onClick: () => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      icon: <i className="ri-user-line text-lg"></i>,
      label: "About",
      onClick: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      icon: <i className="ri-folder-line text-lg"></i>,
      label: "Projects",
      onClick: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      icon: <i className="ri-message-line text-lg"></i>,
      label: "Contact",
      onClick: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }),
    },
  ];

  return (
    <footer className="relative z-10 mt-32 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-gold-gradient">Reyhan</span>
              <span className="text-white">.dev</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Fullstack Developer passionate about building modern web applications and AI-powered solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                  About Me
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                  Projects
                </a>
              </li>
              <li>
                <a href="#experience" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                  Experience
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Connect</h4>
            <div className="flex gap-4 mb-4">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 flex items-center justify-center text-gray-400 hover:text-amber-400 transition-all"
              >
                <i className="ri-github-fill text-lg"></i>
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 flex items-center justify-center text-gray-400 hover:text-amber-400 transition-all"
              >
                <i className="ri-linkedin-fill text-lg"></i>
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 flex items-center justify-center text-gray-400 hover:text-amber-400 transition-all"
              >
                <i className="ri-instagram-fill text-lg"></i>
              </a>
              <a
                href={socialLinks.email}
                className="w-10 h-10 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 flex items-center justify-center text-gray-400 hover:text-amber-400 transition-all"
              >
                <i className="ri-mail-line text-lg"></i>
              </a>
            </div>
            <p className="text-gray-500 text-sm">
              reyhanresha87@gmail.com
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} Reyhan Resha Sasmita. All rights reserved.
          </p>
          
          {/* Dock */}
          <div className="scale-75">
            <Dock
              items={dockItems}
              panelHeight={30}
              baseItemSize={50}
              magnification={80}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
