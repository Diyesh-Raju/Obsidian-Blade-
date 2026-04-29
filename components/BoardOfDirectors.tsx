"use client";

import { CircularTestimonials } from "@/components/ui/circular-testimonials";

const directors = [
  {
    name: "Alexander Vance",
    designation: "Chief Executive Officer",
    quote:
      "Our vision is not simply to build estates, but to engineer timeless architectural masterpieces that redefine the boundaries of ultra-luxury living.",
    src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Elena Rostova",
    designation: "Head of Architecture",
    quote:
      "Precision engineering meets aesthetic restraint. Every Obsidian Blade property is a study in proportion, light, and harmony with its natural surroundings.",
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Marcus Thorne",
    designation: "Director of Acquisitions",
    quote:
      "We curate only the most exclusive, uncompromising land parcels globally, ensuring absolute privacy and generational value for our discerning clientele.",
    src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
  },
];

export default function BoardOfDirectors() {
  return (
    <section className="w-full bg-white py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-clash text-center uppercase tracking-widest text-zinc-900 text-3xl md:text-4xl mb-16">
          Board of Directors
        </h2>

        <div className="flex items-center justify-center">
          <CircularTestimonials
            testimonials={directors}
            autoplay={true}
            colors={{
              name: "#18181b",
              designation: "#b76e79",
              testimony: "#52525b",
              arrowBackground: "#f4f4f5",
              arrowForeground: "#18181b",
              arrowHoverBackground: "#b76e79",
            }}
            fontSizes={{
              name: "28px",
              designation: "18px",
              quote: "18px",
            }}
          />
        </div>
      </div>
    </section>
  );
}
