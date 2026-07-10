import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: route not found:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 overflow-hidden relative">
      <SEO
        title="404 — Page Not Found | Muhammad Ul Hasnain"
        description="The page you were looking for doesn't exist."
        path={location.pathname}
      />

      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float-delayed pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-lg relative z-10"
      >
        <p className="code-font text-primary text-sm tracking-wider mb-4">
          {"// error: route_not_found"}
        </p>

        <h1 className="text-7xl md:text-9xl font-bold text-gradient glow-text mb-4">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
          This page wandered off
        </h2>

        <p className="text-muted-foreground mb-8">
          The URL{" "}
          <code className="px-2 py-0.5 glass-card rounded text-primary text-sm code-font">
            {location.pathname}
          </code>{" "}
          doesn't match any route in this project.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl btn-glow flex items-center gap-2"
          >
            <Home size={18} />
            Back Home
          </Link>
          <Link
            to="/blog"
            className="px-6 py-3 glass-card border border-primary/30 text-foreground font-semibold rounded-xl hover:border-primary/60 transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Read the Blog
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
