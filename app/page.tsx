import { Navigation }   from "@/components/sections/Navigation";
import { Hero }         from "@/components/sections/Hero";
import { ToolsCloud }    from "@/components/sections/ToolsCloud";
import { PainPoints }    from "@/components/sections/PainPoints";
import { Testimonials }  from "@/components/sections/Testimonials";
import { Process }       from "@/components/sections/Process";
import { Services }      from "@/components/sections/Services";
import { ContactUs }     from "@/components/sections/ContactUs";
import { FaqSection }    from "@/components/sections/FaqSection";
import { FinalCta }      from "@/components/sections/FinalCta";
import { Footer }        from "@/components/sections/Footer";
import { site }          from "@/content/site";
import { faqs }          from "@/content/faqs";

// JSON-LD structured data — generated server-side for SEO
function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.siteUrl,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Johannesburg",
      addressCountry: "ZA",
    },
    sameAs: [
      site.social.instagram ? `https://instagram.com/${site.social.instagram}` : null,
      site.social.linkedin  ? `https://linkedin.com/company/${site.social.linkedin}` : null,
    ].filter(Boolean),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function FaqPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function HomePage() {
  return (
    <>
      {/* Structured data */}
      <OrganizationSchema />
      <FaqPageSchema />

      <Navigation />
      <main>
        {/* Hero */}
        <Hero />

        {/* Tools we build on */}
        <ToolsCloud />

        {/* Pain Points + "We fix that" payoff */}
        <PainPoints />

        {/* Testimonials — animated 3-column scroll */}
        <Testimonials />

        {/* Process */}
        <Process />

        {/* Services grid */}
        <Services />

        {/* Contact — 4 inbox routes by function */}
        <ContactUs />

        {/* FAQ */}
        <FaqSection />

        {/* Final CTA */}
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
