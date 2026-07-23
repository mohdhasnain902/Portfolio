import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { name: "Home", href: "#home", isHash: true },
  { name: "About", href: "#about", isHash: true },
  { name: "Services", href: "#services", isHash: true },
  { name: "Experience", href: "#experience", isHash: true },
  { name: "Skills", href: "#skills", isHash: true },
  { name: "Education", href: "#education", isHash: true },
  { name: "Certifications", href: "#certifications", isHash: true },
  { name: "Blog", href: "/blog", isHash: false },
  { name: "Contact", href: "#contact", isHash: true },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    setIsOpen(false);
    
    if (!link.isHash) {
      return; // Let the Link component handle navigation
    }
    
    e.preventDefault();
    
    // If not on home page, navigate to home first
    if (location.pathname !== "/") {
      navigate("/" + link.href);
      return;
    }
    
    // Small delay to allow menu to close first
    setTimeout(() => {
      const element = document.querySelector(link.href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-card border-b border-border/30 py-3"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container-custom flex items-center relative">
        <motion.a
          href="#home"
          onClick={(e) => handleNavClick(e, navLinks[0])}
          className="absolute left-0 flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 100 100" 
            className="w-10 h-10"
          >
            <rect width="100" height="100" rx="20" className="fill-background" />
            <path 
              d="M 22 78 L 22 22 L 50 52 L 78 22 L 78 78"
              fill="none"
              className="stroke-primary"
              strokeWidth="8"
              strokeLinejoin="miter"
              strokeLinecap="butt"
            />
            <line 
              x1="22" y1="55" x2="78" y2="55"
              className="stroke-primary"
              strokeWidth="8"
              strokeLinecap="butt"
            />
          </svg>
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 mx-auto">
          {navLinks.map((link, index) => (
            link.isHash ? (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className="nav-link text-sm font-medium"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {link.name}
              </motion.a>
            ) : (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={link.href}
                  className="nav-link text-sm font-medium"
                >
                  {link.name}
                </Link>
              </motion.div>
            )
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden absolute right-0 p-2 text-foreground z-50"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-card mt-2 mx-4 rounded-xl overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-3">
              {navLinks.map((link, index) => (
                link.isHash ? (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className="text-muted-foreground hover:text-primary transition-colors py-2 px-4 rounded-lg hover:bg-secondary/50"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {link.name}
                  </motion.a>
                ) : (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block text-muted-foreground hover:text-primary transition-colors py-2 px-4 rounded-lg hover:bg-secondary/50"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
