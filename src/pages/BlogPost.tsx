import { useEffect, useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Tag, 
  Share2, 
  Linkedin, 
  Twitter, 
  Facebook,
  ChevronUp,
  BookOpen
} from "lucide-react";
import ParticlesBackground from "@/components/ParticlesBackground";
import InteractiveNodes from "@/components/InteractiveNodes";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useIsMobile } from "@/hooks/use-mobile";
import { blogPosts } from "@/data/blogPosts";

const BlogPost = () => {
  const isMobile = useIsMobile();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [readingProgress, setReadingProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const post = useMemo(() => {
    return blogPosts.find((p) => p.slug === slug);
  }, [slug]);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return blogPosts
      .filter((p) => p.id !== post.id && p.category === post.category)
      .slice(0, 3);
  }, [post]);

  const tableOfContents = useMemo(() => {
    if (!post) return [];
    const headingRegex = /^#{1,3}\s+(.+)$/gm;
    const matches = [...post.content.matchAll(headingRegex)];
    return matches.map((match, index) => ({
      id: `heading-${index}`,
      text: match[1],
      level: match[0].split(" ")[0].length,
    }));
  }, [post]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / scrollHeight) * 100;
      setReadingProgress(progress);
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Article not found</h1>
          <Link to="/blog" className="text-primary hover:underline">
            Return to blog
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-AU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = encodeURIComponent(post.title);

  const renderContent = (content: string) => {
    const lines = content.trim().split("\n");
    let inCodeBlock = false;
    let codeContent = "";
    let codeLanguage = "";
    const elements: JSX.Element[] = [];
    let headingIndex = 0;

    lines.forEach((line, index) => {
      if (line.startsWith("```")) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeLanguage = line.slice(3);
          codeContent = "";
        } else {
          inCodeBlock = false;
          elements.push(
            <pre key={`code-${index}`} className="glass-card rounded-xl p-4 overflow-x-auto my-4">
              <code className="text-sm text-foreground/90 code-font">{codeContent}</code>
            </pre>
          );
        }
        return;
      }

      if (inCodeBlock) {
        codeContent += (codeContent ? "\n" : "") + line;
        return;
      }

      // Headings
      if (line.startsWith("# ")) {
        elements.push(
          <h1 key={index} id={`heading-${headingIndex++}`} className="text-3xl md:text-4xl font-bold text-foreground mt-8 mb-4">
            {line.slice(2)}
          </h1>
        );
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2 key={index} id={`heading-${headingIndex++}`} className="text-2xl md:text-3xl font-bold text-foreground mt-8 mb-4">
            {line.slice(3)}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3 key={index} id={`heading-${headingIndex++}`} className="text-xl md:text-2xl font-semibold text-foreground mt-6 mb-3">
            {line.slice(4)}
          </h3>
        );
      } else if (line.startsWith("**") && line.endsWith("**")) {
        elements.push(
          <p key={index} className="font-semibold text-foreground my-2">
            {line.slice(2, -2)}
          </p>
        );
      } else if (line.startsWith("- ") || line.startsWith("* ")) {
        elements.push(
          <li key={index} className="text-muted-foreground ml-6 my-1 list-disc">
            {line.slice(2)}
          </li>
        );
      } else if (line.match(/^\d+\.\s/)) {
        elements.push(
          <li key={index} className="text-muted-foreground ml-6 my-1 list-decimal">
            {line.replace(/^\d+\.\s/, "")}
          </li>
        );
      } else if (line.startsWith("|")) {
        // Simple table handling
        elements.push(
          <div key={index} className="overflow-x-auto my-2">
            <code className="text-sm text-muted-foreground">{line}</code>
          </div>
        );
      } else if (line.startsWith("---")) {
        elements.push(<hr key={index} className="border-border my-8" />);
      } else if (line.trim() === "") {
        elements.push(<br key={index} />);
      } else {
        // Regular paragraph - handle inline formatting
        const formattedLine = line
          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 glass-card rounded text-primary text-sm">$1</code>');
        
        elements.push(
          <p 
            key={index} 
            className="text-muted-foreground leading-relaxed my-3"
            dangerouslySetInnerHTML={{ __html: formattedLine }}
          />
        );
      }
    });

    return elements;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEO
        title={`${post.title} | Muhammad Ul Hasnain`}
        description={post.metaDescription || post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.featuredImage}
        type="article"
        publishedTime={post.publishedAt}
        tags={post.tags}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.metaDescription || post.excerpt,
            image: post.featuredImage,
            datePublished: post.publishedAt,
            author: { "@type": "Person", name: "Muhammad Ul Hasnain" },
            keywords: post.tags.join(", "),
            articleSection: post.category,
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "/blog" },
              { "@type": "ListItem", position: 3, name: post.title, item: `/blog/${post.slug}` },
            ],
          },
        ]}
      />
      <ParticlesBackground />
      {!isMobile && <InteractiveNodes />}
      <Navigation />

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-border">
        <motion.div
          className="h-full bg-primary"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <main className="pt-32 pb-20">
        <div className="container-custom">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft size={20} />
              Back to Blog
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Table of Contents (Desktop Sidebar) */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="sticky top-32 glass-card rounded-xl p-5">
                <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <BookOpen size={18} className="text-primary" />
                  Table of Contents
                </h4>
                <nav className="space-y-2">
                  {tableOfContents.slice(0, 10).map((item, index) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block text-sm text-muted-foreground hover:text-primary transition-colors ${
                        item.level === 2 ? "ml-0" : item.level === 3 ? "ml-4" : ""
                      }`}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            </motion.aside>

            {/* Main Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              {/* Featured Image */}
              <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              </div>

              {/* Category & Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="px-4 py-1.5 text-sm font-medium bg-primary/90 text-primary-foreground rounded-full">
                  {post.category}
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground text-sm">
                  <Calendar size={16} />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground text-sm">
                  <Clock size={16} />
                  {post.readingTime} min read
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1.5 px-3 py-1 text-sm glass-card rounded-full text-muted-foreground"
                  >
                    <Tag size={14} />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Social Share */}
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
                <span className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Share2 size={16} />
                  Share
                </span>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 glass-card rounded-lg text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 glass-card rounded-lg text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 glass-card rounded-lg text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                >
                  <Facebook size={18} />
                </a>
              </div>

              {/* Article Content */}
              <div className="prose prose-invert prose-lg max-w-none">
                {renderContent(post.content)}
              </div>

              {/* Author Section */}
              <div className="mt-12 p-6 glass-card rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">MUH</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Muhammad Usman</h4>
                    <p className="text-muted-foreground text-sm">
                      Full-stack developer specializing in trading automation, AI integration, and modern web development.
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-foreground mb-6">Related Articles</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}`}>
                        <div className="glass-card rounded-xl p-4 hover:border-primary/50 transition-all h-full">
                          <h4 className="font-semibold text-foreground text-sm mb-2 line-clamp-2 hover:text-primary transition-colors">
                            {relatedPost.title}
                          </h4>
                          <span className="text-xs text-muted-foreground">
                            {relatedPost.readingTime} min read
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </motion.article>
          </div>
        </div>
      </main>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-transform z-40"
        >
          <ChevronUp size={24} />
        </motion.button>
      )}

      <Footer />
    </div>
  );
};

export default BlogPost;
