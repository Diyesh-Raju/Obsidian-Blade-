"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Building2, BedDouble, Scaling, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";

const properties = [
  {
    id: 1,
    title: "The Azure Horizon",
    location: "Downtown Marina District",
    image: "/residential-1.jpg",
    details: {
      type: "Ultra-Luxury Apartments",
      beds: "3, 4 & 5 BHK",
      size: "4.5 Acres",
      units: "120 Residences",
    }
  },
  {
    id: 2,
    title: "Lumina Signature",
    location: "Heritage Golf Estate",
    image: "/residential-2.jpg",
    details: {
      type: "Branded Penthouses",
      beds: "4 & 5 BHK + Study",
      size: "2.1 Acres",
      units: "45 Limited Editions",
    }
  },
  {
    id: 3,
    title: "Aura Botanica",
    location: "Central Park Avenue",
    image: "/residential-3.jpg",
    details: {
      type: "Eco-Luxury Condos",
      beds: "2, 3 & 4 BHK",
      size: "6.8 Acres",
      units: "250 Residences",
    }
  }
];

export function FeaturedProperties() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <div 
            key={property.id} 
            className="group relative bg-white rounded-[1.5rem] overflow-hidden border border-zinc-200 hover:border-[#b76e79]/50 transition-all duration-500 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(183,110,121,0.15)] flex flex-col"
          >
            {/* --- IMAGE SECTION WITH HOVER OVERLAY --- */}
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src={property.image}
                alt={property.title}
                fill
                unoptimized
                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              />
              
              {/* Dark frosted overlay — always visible on touch devices (no hover),
                  revealed on hover for mouse users */}
              <div className="absolute inset-0 bg-black/55 md:bg-black/60 md:backdrop-blur-[2px] md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-3 sm:gap-4 z-10">

                {/* Button 1: View Details */}
                <Link href={`/residential/${property.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <Button className="bg-[#b76e79] hover:bg-[#a05d68] text-white w-36 sm:w-40 rounded-full shadow-lg md:transform md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 delay-75">
                    View Details
                  </Button>
                </Link>

                {/* Button 2: Enquire Now */}
                <Button className="bg-[#b76e79] hover:bg-[#a05d68] text-white w-36 sm:w-40 rounded-full shadow-lg md:transform md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 delay-100">
                  Enquire Now
                </Button>

              </div>

              {/* Gradient — hidden on mobile (overlay already shown), hover-toggled on desktop */}
              <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300" />

              {/* Location Tag — desktop only, hidden on mobile because overlay covers it */}
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

              {/* 2x2 Grid for the 4 specific data points */}
              <div className="grid grid-cols-2 gap-y-5 gap-x-4 mt-auto">
                
                {/* Project Type */}
                <div className="flex flex-col">
                  <div className="flex items-center text-zinc-400 mb-1">
                    <Building2 className="w-3.5 h-3.5 mr-1.5 text-[#b76e79]" />
                    <span className="text-[10px] uppercase tracking-wider font-semibold">Project Type</span>
                  </div>
                  <span className="text-sm text-zinc-700 font-medium">{property.details.type}</span>
                </div>

                {/* Bedrooms */}
                <div className="flex flex-col">
                  <div className="flex items-center text-zinc-400 mb-1">
                    <BedDouble className="w-3.5 h-3.5 mr-1.5 text-[#b76e79]" />
                    <span className="text-[10px] uppercase tracking-wider font-semibold">Bedrooms</span>
                  </div>
                  <span className="text-sm text-zinc-700 font-medium">{property.details.beds}</span>
                </div>

                {/* Development Size */}
                <div className="flex flex-col">
                  <div className="flex items-center text-zinc-400 mb-1">
                    <Scaling className="w-3.5 h-3.5 mr-1.5 text-[#b76e79]" />
                    <span className="text-[10px] uppercase tracking-wider font-semibold">Dev. Size</span>
                  </div>
                  <span className="text-sm text-zinc-700 font-medium">{property.details.size}</span>
                </div>

                {/* Total Units */}
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