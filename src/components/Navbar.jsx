import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { navLinks } from "../data";

const Navbar = ({ hidden = false }) => {
  const [active, setActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 100);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (hidden) return null;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`navbar relative z-50 py-5 flex items-center justify-between px-6 md:px-12 transition-all duration-300 ${
        active ? "backdrop-blur-xl bg-zinc-950/80 shadow-lg shadow-black/20" : ""
      }`}
    >
      {/* Logo */}
      <div className="logo">
        <a href="#home" className="flex items-center gap-2">
          <span className="text-2xl font-bold">
            <span className="text-gold-gradient">R</span>
            <span className="text-white">eyhan</span>
          </span>
        </a>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden lg:flex items-center gap-8">
        {navLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="relative text-sm font-medium text-gray-300 hover:text-amber-400 transition-colors group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 group-hover:w-full transition-all duration-300" />
            </a>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <div className="hidden lg:block">
        <a
          href="#contact"
          className="btn-primary text-sm inline-flex items-center gap-2"
        >
          <i className="ri-chat-3-line"></i>
          Let's Talk
        </a>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden p-2 text-white hover:text-amber-400 transition-colors"
      >
        <i className={`ri-${isMobileMenuOpen ? "close" : "menu"}-line text-2xl`}></i>
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed top-20 left-4 right-4 glass rounded-2xl p-6 z-50"
          >
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-gray-300 hover:text-amber-400 transition-colors py-2"
                  >
                    <i className={`${link.icon} text-xl`}></i>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-primary text-sm w-full mt-6 text-center"
            >
              Let's Talk
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
