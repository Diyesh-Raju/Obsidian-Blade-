"use client";

import React, { use } from "react";
import { PropertyDetails } from "@/components/ui/property-details";

export default function CommercialPropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);

  return (
    <main className="min-h-screen">
      <PropertyDetails slug={resolvedParams.slug} />

      <section className="py-20 text-center border-t border-zinc-100">
        <a href="/commercial#current-developments" className="text-zinc-400 hover:text-[#b76e79] transition-colors text-sm tracking-widest uppercase">
          ← Back to Developments
        </a>
      </section>
    </main>
  );
}
