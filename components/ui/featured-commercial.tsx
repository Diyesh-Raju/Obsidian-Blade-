"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Building2, Layers, Scaling, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";

type Status = "Under Construction" | "New Launch";

const properties: {
  id: number;
  title: string;
  location: string;
  image: string;
  status: Status;
  details: { type: string; floors: string; size: string; units: string };
}[] = [
  {
    id: 1,
    title: "The Apex Spire",
    location: "Central Business Quarter",
    image: "/commercial-1.png",
    status: "Under Construction",
    details: {
      type: "Grade-A Corporate Tower",
      floors: "48 Floors",
      size: "3.2 Acres",
      units: "180 Office Suites",
    },
  },
  {
    id: 2,
    title: "Cotier Pavilion",
    location: "Marina Boulevard",
    image: "/commercial-2.png",
    status: "New Launch",
    details: {
      type: "Luxury Retail Concourse",
      floors: "6 Floors",
      size: "1.8 Acres",
      units: "42 Flagship Spaces",
    },
  },
  {
    id: 3,
    title: "Helios Crown",
    location: "Skyline District",
    image: "/commercial-3.png",
    status: "New Launch",
    details: {
      type: "Mixed-Use Skyscraper",
      floors: "62 Floors",
      size: "4.5 Acres",
      units: "240 Premium Units",
    },
  },
];

const statusStyles: Record<Status, string> = {
  "Under Construction": "bg-zinc-900/85 text-white",
  "New Launch": "bg-[#b76e79]/95 text-white",
};

export function FeaturedCommercial() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <div
            key={property.id}
            className="group relative bg-white rounded-[1.5rem] overflow-hidden border border-zinc-200 hover:border-[#b76e79]/50 transition-all duration-500 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(183,110,121,0.15)] flex flex-col"
          >
            {/* --- IMAGE SECTION WITH STATUS BADGE & HOVER OVERLAY --- */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-50">
              <Image
                src={property.image}
                alt={property.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              />

              {/* Status badge — top-right ribbon */}
              <span
                className={`absolute top-3 right-3 z-20 px-3 py-1 text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase rounded-sm shadow-md backdrop-blur-sm ${statusStyles[property.status]}`}
              >
                {property.status}
              </span>

              {/* Dark frosted overlay — always visible on touch devices, hover-revealed on desktop */}
              <div className="absolute inset-0 bg-black/55 md:bg-black/60 md:backdrop-blur-[2px] md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-3 sm:gap-4 z-10">
                <Link href={`/commercial/${property.title.toLowerCase().replace(/\s+/g, "-")}`}>
                  <Button className="heartbeateffect bg-[#b76e79] hover:bg-[#a05d68] text-white w-36 sm:w-40 rounded-full shadow-lg md:transform md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 delay-75">
                    View Details
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button className="heartbeateffect bg-[#b76e79] hover:bg-[#a05d68] text-white w-36 sm:w-40 rounded-full shadow-lg md:transform md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 delay-100">
                    Enquire Now
                  </Button>
                </Link>
              </div>

              <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300" />

              <div className="hidden md:flex absolute bottom-4 left-5 right-5 items-center text-white z-0 group-hover:opacity-0 transition-opacity duration-300">
                <MapPin className="w-4 h-4 mr-1 text-[#b76e79]" />
                <span className="text-sm font-medium tracking-wide drop-shadow-md">{property.location}</span>
              </div>
            </div>

            {/* --- CONTENT SECTION --- */}
            <div className="p-6 flex-1 flex flex-col bg-white relative z-20">
              <h3 className="text-2xl font-normal text-zinc-900 mb-6 group-hover:text-[#b76e79] transition-colors duration-300">
                {property.title}
              </h3>

              <div className="grid grid-cols-2 gap-y-5 gap-x-4 mt-auto">
                <div className="flex flex-col">
                  <div className="flex items-center text-zinc-400 mb-1">
                    <Building2 className="w-3.5 h-3.5 mr-1.5 text-[#b76e79]" />
                    <span className="text-[10px] uppercase tracking-wider font-semibold">Project Type</span>
                  </div>
                  <span className="text-sm text-zinc-700 font-medium">{property.details.type}</span>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center text-zinc-400 mb-1">
                    <Layers className="w-3.5 h-3.5 mr-1.5 text-[#b76e79]" />
                    <span className="text-[10px] uppercase tracking-wider font-semibold">Floors</span>
                  </div>
                  <span className="text-sm text-zinc-700 font-medium">{property.details.floors}</span>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center text-zinc-400 mb-1">
                    <Scaling className="w-3.5 h-3.5 mr-1.5 text-[#b76e79]" />
                    <span className="text-[10px] uppercase tracking-wider font-semibold">Dev. Size</span>
                  </div>
                  <span className="text-sm text-zinc-700 font-medium">{property.details.size}</span>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center text-zinc-400 mb-1">
                    <LayoutGrid className="w-3.5 h-3.5 mr-1.5 text-[#b76e79]" />
                    <span className="text-[10px] uppercase tracking-wider font-semibold">Total Units</span>
                  </div>
                  <span className="text-sm text-zinc-700 font-medium">{property.details.units}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
