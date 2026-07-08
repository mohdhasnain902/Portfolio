import SEO from "@/components/SEO";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Terms = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <SEO
      title="Terms of Service | Muhammad Ul Hasnain"
      description="Terms governing use of this portfolio website and any services provided."
      path="/terms"
    />
    <Navigation />
    <main id="main-content" className="pt-32 pb-20">
      <div className="container-custom max-w-3xl prose prose-invert">
        <h1 className="text-4xl font-bold text-gradient mb-6">Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: July 8, 2026</p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-3">Website Use</h2>
        <p className="text-muted-foreground">This website showcases my portfolio and shares educational content. Content is provided as-is without warranty.</p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-3">Intellectual Property</h2>
        <p className="text-muted-foreground">All content, code samples, and articles are © Muhammad Ul Hasnain. You may reference short excerpts with attribution.</p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-3">Client Work</h2>
        <p className="text-muted-foreground">Any paid engagements are governed by a separate signed agreement. The contact form is only an inquiry channel, not a contract.</p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-3">Liability</h2>
        <p className="text-muted-foreground">I'm not liable for any losses resulting from use of information published on this site.</p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-3">Contact</h2>
        <p className="text-muted-foreground">muhammadulhasnain@gmail.com</p>
      </div>
    </main>
    <Footer />
  </div>
);

export default Terms;
