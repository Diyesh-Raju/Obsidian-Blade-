"use client";

import React, { use } from "react";
import { PropertyDetails } from "@/components/ui/property-details";

// 1. We update the type to say params is a Promise
export default function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  
  // 2. We unwrap the params using React.use()
  const resolvedParams = use(params);

  return (
    <main className="min-h-screen">
      {/* 3. Now we can safely pass the slug to the template! */}
      <PropertyDetails slug={resolvedParams.slug} />
      
      <section className="py-20 text-center border-t border-zinc-100">
        <a href="/residential" className="text-zinc-400 hover:text-[#b76e79] transition-colors text-sm tracking-widest uppercase">
          ← Back to Collections
        </a>
      </section>
    </main>
  );
}