import SEO from "@/components/SEO";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Privacy = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <SEO
      title="Privacy Policy | Muhammad Ul Hasnain"
      description="Privacy policy describing how personal data submitted through this portfolio is collected, used, and protected."
      path="/privacy"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "PrivacyPolicy",
        name: "Privacy Policy",
        url: "/privacy",
        inLanguage: "en",
        publisher: { "@type": "Person", name: "Muhammad Ul Hasnain" },
      }}
    />
    <Navigation />
    <main id="main-content" className="pt-32 pb-20">
      <div className="container-custom max-w-3xl prose prose-invert">
        <h1 className="text-4xl font-bold text-gradient mb-6">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: July 8, 2026</p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-3">Information I Collect</h2>
        <p className="text-muted-foreground">When you submit the contact form I collect your name, email address, and message content. No cookies, analytics, or trackers are placed on your device by this site itself.</p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-3">How I Use It</h2>
        <p className="text-muted-foreground">Solely to reply to your inquiry. I never sell, share, or use your data for marketing.</p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-3">Storage</h2>
        <p className="text-muted-foreground">Messages are stored in a secured database (Supabase). Access is restricted to me as the site administrator.</p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-3">Your Rights</h2>
        <p className="text-muted-foreground">Email muhammadulhasnain@gmail.com to request access, correction, or deletion of your data.</p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-3">Contact</h2>
        <p className="text-muted-foreground">Muhammad Ul Hasnain — muhammadulhasnain@gmail.com</p>
      </div>
    </main>
    <Footer />
  </div>
);

export default Privacy;
