"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Info, 
  MapPin, 
  Layout, 
  Image as ImageIcon, 
  Sparkles,
  Utensils,
  BedDouble,
  Waves,
  HeartPulse,
  Trees,
  Car,
  Home,
  Flame
} from "lucide-react";
import { cn } from "@/lib/utils";

const AMENITIES = [
  { label: "Sous Chef Kitchen", icon: Utensils },
  { label: "4 Bedrooms", icon: BedDouble },
  { label: "Swimming Pool", icon: Waves },
  { label: "Spa Wellness Room", icon: HeartPulse },
  { label: "Private Backyard", icon: Trees },
  { label: "4 Car Garage", icon: Car },
  { label: "Club House", icon: Home },
  { label: "Outside Barbeque", icon: Flame }
];

const TABS = [
  { id: "about", label: "About", icon: Info },
  { id: "plans", label: "Plans", icon: Layout },
  { id: "amenities", label: "Amenities", icon: Sparkles },
  { id: "location", label: "Location", icon: MapPin },
  { id: "gallery", label: "Gallery", icon: ImageIcon },
];

// --- DYNAMIC PROPERTY DATABASE ---
const PROPERTY_DB: Record<string, any> = {
  "the-azure-horizon": {
    title: "The Azure Horizon",
    subtitle: "Ultra-Luxury Apartments",
    heroImage: "/residential-1.jpg",
    location: "Downtown Marina District",
    description: "The Azure Horizon stands as a beacon of modern architectural mastery. Designed to harmonize with the coastal winds and the rhythm of the tides, this residential marvel offers more than just a home—it provides a sanctuary. Every angle is engineered for maximum light penetration, ensuring your living space is a dynamic canvas of shifting sunbeams and shadows."
  },
  "lumina-signature": {
    title: "Lumina Signature",
    subtitle: "Branded Penthouses",
    heroImage: "/residential-2.jpg",
    location: "Heritage Golf Estate",
    description: "Lumina Signature redefines penthouse living. Elevated far above the city pulse, these limited-edition residences offer panoramic skyline views, private elevator access, and bespoke interiors. It is an exclusive enclave designed strictly for those who accept nothing but the absolute pinnacle of luxury."
  },
  "aura-botanica": {
    title: "Aura Botanica",
    subtitle: "Eco-Luxury Condos",
    heroImage: "/residential-3.jpg",
    location: "Central Park Avenue",
    description: "Aura Botanica blends sustainable architecture with uncompromising luxury. Featuring cascading vertical gardens, advanced climate-responsive facades, and locally sourced premium materials, this property allows you to live at the intersection of ecological responsibility and high-end elegance."
  },
  "the-apex-spire": {
    title: "The Apex Spire",
    subtitle: "Grade-A Corporate Tower",
    heroImage: "/commercial-1.png",
    location: "Central Business Quarter",
    description: "The Apex Spire is rising as the new benchmark for high-performance corporate architecture. Engineered around a triple-glazed, daylight-optimized facade, the tower delivers column-free floor plates, sky lobbies, and dedicated executive helipads. Currently under construction, every system — from the regenerative elevators to the rainwater-fed cooling loops — is built for the next decade of work.",
    gallery: ["/commercial-1.png", "/commercial-3.png", "/commercial-2.png", "/commercial-skyline.jpg"]
  },
  "cotier-pavilion": {
    title: "Cotier Pavilion",
    subtitle: "Luxury Retail Concourse",
    heroImage: "/commercial-2.png",
    location: "Marina Boulevard",
    description: "Cotier Pavilion redefines the flagship retail experience. A sweeping, light-ribboned arrival concourse welcomes hand-selected luxury brands into oversized storefronts framed in bookmatched marble and warm rift-cut oak. Designed for couture houses and premier automotive showrooms alike, the pavilion is a stage where the world's most desirable brands meet their most discerning clientele.",
    gallery: ["/commercial-2.png", "/commercial-3.png", "/commercial-1.png", "/commercial-skyline.jpg"]
  },
  "helios-crown": {
    title: "Helios Crown",
    subtitle: "Mixed-Use Skyscraper",
    heroImage: "/commercial-3.png",
    location: "Skyline District",
    description: "Helios Crown is a vertical city — Grade-A offices, signature hospitality, and skyline residences stacked beneath a crowned, illuminated cornice that becomes a fixture of the city's silhouette. The deeply mullioned glass facade and integrated golden lightwork are tuned for evening drama without compromising daytime efficiency, making it equally arresting at noon and midnight.",
    gallery: ["/commercial-3.png", "/commercial-1.png", "/commercial-2.png", "/commercial-skyline.jpg"]
  }
};

// Added `slug` prop to know which property to display
export function PropertyDetails({ slug }: { slug?: string }) {
  const [activeTab, setActiveTab] = useState("about");

  // Fallback to Azure Horizon if the slug isn't found
  const property = PROPERTY_DB[slug || "the-azure-horizon"] || PROPERTY_DB["the-azure-horizon"];

  return (
    <div className="w-full bg-white">
      {/* --- 1. HERO IMAGE GALLERY --- */}
      <section className="relative w-full h-[70vh] bg-zinc-100 overflow-hidden">
        <Image
          src={property.heroImage}
          alt={property.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center text-white w-full px-4">
          <h1 className="text-5xl md:text-7xl font-normal mb-4 drop-shadow-lg" style={{ fontFamily: "'Cinzel Decorative', serif" }}>
            {property.title}
          </h1>
          <p className="tracking-[0.2em] uppercase text-sm font-medium drop-shadow-md text-white/90">
            {property.subtitle}
          </p>
        </div>
      </section>

      {/* --- 2. BUBBLE NAVIGATION --- */}
      <section className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-zinc-100 py-6">
        <div className="max-w-4xl mx-auto px-6 flex flex-wrap justify-center gap-3 md:gap-4">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 text-sm font-medium",
                  isActive 
                    ? "bg-[#b76e79] border-[#b76e79] text-white shadow-lg shadow-[#b76e79]/20" 
                    : "bg-white border-zinc-200 text-zinc-500 hover:border-[#b76e79]/50 hover:text-[#b76e79]"
                )}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* --- 3. DYNAMIC CONTENT AREA --- */}
      <section className="max-w-6xl mx-auto px-6 py-20 min-h-[600px]">
        
        {/* About Section */}
        {activeTab === "about" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-3xl font-light text-zinc-900 mb-8 border-l-4 border-[#b76e79] pl-6">The Concept</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <p className="text-zinc-600 leading-relaxed text-lg font-light">
                {property.description}
              </p>
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                <Image src={property.heroImage} alt="Interior" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </div>
            </div>
          </div>
        )}

        {/* Plans Section */}
        {activeTab === "plans" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 text-center">
            <h2 className="text-3xl font-light text-zinc-900 mb-12">Architectural Layouts</h2>
            <div className="bg-zinc-50 rounded-[3rem] p-12 border border-dashed border-zinc-300">
              <div className="w-full max-w-2xl mx-auto aspect-[4/3] relative opacity-50 grayscale">
                <Layout className="w-full h-full text-zinc-300" />
                <p className="absolute inset-0 flex items-center justify-center text-zinc-400 font-light italic">
                  Floor plans currently being finalized for high-resolution display.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Amenities Section */}
        {activeTab === "amenities" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-3xl font-light text-zinc-900 mb-12 text-center">Unparalleled Comfort</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {AMENITIES.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="group p-8 rounded-3xl border border-zinc-100 bg-white hover:border-[#b76e79] transition-all duration-500 text-center shadow-sm hover:shadow-xl hover:shadow-[#b76e79]/5">
                    <Icon className="w-10 h-10 mx-auto mb-4 text-[#b76e79] transition-transform duration-500 group-hover:scale-110" />
                    <span className="text-sm text-zinc-600 font-light tracking-wide">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Location Section */}
        {activeTab === "location" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-3xl font-light text-zinc-900 mb-8 border-l-4 border-[#b76e79] pl-6">Prime Connectivity</h2>
            <div className="rounded-[3rem] overflow-hidden h-[400px] relative bg-zinc-100 border border-zinc-200">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-400">
                <MapPin className="w-12 h-12 mb-4 opacity-20" />
                <p className="font-light tracking-widest uppercase text-xs">{property.location}</p>
              </div>
            </div>
          </div>
        )}

        {/* Gallery Section */}
        {activeTab === "gallery" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {(property.gallery ?? [1, 2, 3, 4].map((n) => `/residential-${n}.jpg`)).map((src: string, i: number) => (
                <div key={i} className={cn(
                  "relative rounded-2xl overflow-hidden bg-zinc-100 transition-transform duration-500 hover:scale-[1.02]",
                  i === 0 ? "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto" : "aspect-square"
                )}>
                  <Image
                    src={src}
                    alt={`Gallery ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}