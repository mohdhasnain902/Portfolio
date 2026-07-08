import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border/30">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-muted-foreground text-sm text-center md:text-left"
          >
            © {new Date().getFullYear()} Muhammad Ul Hasnain. All rights reserved.
          </motion.p>

          <nav className="flex items-center gap-6 text-sm">
            <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
              Terms
            </Link>
            <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
              Blog
            </Link>
          </nav>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-muted-foreground text-sm flex items-center gap-1"
          >
            Crafted with{" "}
            <Heart size={14} className="text-primary fill-primary animate-pulse" />{" "}
            in Islamabad, Pakistan
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
