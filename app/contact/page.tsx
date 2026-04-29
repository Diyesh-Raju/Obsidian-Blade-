import { CinematicHero } from "@/components/ui/cinematic-hero";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <main>
      <CinematicHero
        brandName="Obsidian"
        brandSubtext="Constructions"
        tagline1="Connect with"
        tagline2="Absolute Luxury."
        cardHeading="Private Consultations."
        cardDescription={
          <>
            <span className="text-white font-semibold">Obsidian Blade</span>{" "}
            brokers are available worldwide to discuss your next generational
            acquisition in absolute privacy.
          </>
        }
        metricValue={24}
        metricLabel="Hour Concierge"
        ctaHeading="Your Legacy Awaits."
        ctaDescription="Speak privately with our concierge to unveil curated portfolios, off-market estates, and bespoke advisory — reserved for those who acquire on a generational horizon."
        whatsappHref="https://wa.me/911234567890"
        whatsappDisplay="+91 1234567890"
        gmailHref="https://mail.google.com/"
      />
      <Footer />
    </main>
  );
}
