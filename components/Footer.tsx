"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react"; // Removed the broken brand icons

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const node = footerRef.current;
    if (!node) return;

    // Replay-on-rescroll: toggle isRevealed every time the footer enters or
    // leaves the viewport, instead of disconnecting after the first hit.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsRevealed(entry.isIntersecting);
        });
      },
      { rootMargin: "0px 0px -5% 0px", threshold: 0.05 }
    );

    observer.observe(node);

    // iOS Safari sometimes drops the first observation when the node mounts
    // far below the fold. If we haven't been revealed yet but the footer is
    // already on-screen, force the initial reveal — subsequent toggles still
    // come through the live observer above.
    const timeout = window.setTimeout(() => {
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) setIsRevealed(true);
    }, 1500);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, []);

  // Helper: base reveal classes + staggered delay
  const revealClass = (delay: string) =>
    `transition-all duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu will-change-[opacity,transform] ${delay} ${
      isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`;
  // Correctly separated footer links
  const footerLinks = [
    {
      title: "PROPERTIES",
      links: [
        { label: "Residential Estates", href: "#" },
        { label: "Commercial Towers", href: "#" },
        { label: "Private Villas", href: "#" },
        { label: "Featured Listings", href: "#" },
      ],
    },
    {
      title: "OUR STORY",
      links: [
        { label: "Philosophy", href: "#" },
        { label: "Architectural Board", href: "#" },
        { label: "Press & Awards", href: "#" },
        { label: "Careers", href: "#" },
      ],
    },
    {
      title: "CONCIERGE",
      links: [
        { label: "Private Viewings", href: "#" },
        { label: "White-Glove Service", href: "#" },
        { label: "Member Login", href: "#" },
        { label: "Live Concierge", href: "#", pulse: true },
      ],
    },
  ];

  // Horizontal contact info
  const contactInfo = [
    {
      icon: <Mail size={18} className="text-[#b76e79]" />,
      text: "concierge@obsidianblade.com",
      href: "mailto:concierge@obsidianblade.com",
    },
    {
      icon: <Phone size={18} className="text-[#b76e79]" />,
      text: "+1 (800) 555-0199",
      href: "tel:+18005550199",
    },
    {
      icon: <MapPin size={18} className="text-[#b76e79]" />,
      text: "Beverly Hills, CA",
    },
  ];

  // Using native SVGs to bypass the Lucide brand icon error
  const socialLinks = [
    { 
      label: "Instagram", 
      href: "#",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg> 
    },
    { 
      label: "Facebook", 
      href: "#",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> 
    },
    { 
      label: "X (Twitter)", 
      href: "#",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l16 16"/><path d="M4 20L20 4"/></svg> 
    },
    { 
      label: "LinkedIn", 
      href: "#",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg> 
    },
    { 
      label: "YouTube", 
      href: "#",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7.1C2.6 5.9 3.5 5 4.7 4.9 7 4.5 12 4.5 12 4.5s5 0 7.3.4c1.2.1 2.1 1 2.2 2.2.4 2.4.4 4.9.4 4.9s0 2.5-.4 4.9c-.1 1.2-1 2.1-2.2 2.2-2.3.4-7.3.4-7.3.4s-5 0-7.3-.4c-1.2-.1-2.1-1-2.2-2.2C2.1 14.4 2.1 11.9 2.1 11.9s0-2.5.4-4.8z"/><path d="M9.75 15.02l5.75-3.27-5.75-3.27v6.54z"/></svg> 
    },
  ];

  return (
    <footer ref={footerRef} className="bg-zinc-950 relative w-full overflow-hidden border-t border-zinc-900">
      {/* Background Image — unoptimized so the full-fidelity source is served */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <Image
          src="/footer-bg.jpg"
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark tint overlay — adjust opacity to taste (0.45 = image forward, 0.65 = image subtle) */}
        <div className="absolute inset-0 bg-zinc-950/55" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16 relative z-40">

        {/* TOP SECTION: Brand (Left) & Links (Pushed to Right) */}
        <div className="flex flex-col xl:flex-row justify-between gap-10 sm:gap-16 pb-10 sm:pb-16">

          {/* Brand Column */}
          <div className={`w-full xl:w-1/3 flex flex-col space-y-5 sm:space-y-6 ${revealClass("delay-0")}`}>
            <h2 className="text-white text-2xl sm:text-3xl font-bold tracking-[0.2em] uppercase" style={{ fontFamily: "'Clash Display', sans-serif" }}>
              OBSIDIAN <span className="text-[#b76e79] font-light">BLADE</span>
            </h2>
            <p className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase font-bold">
              Ultra-Luxury Developments
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed pr-8 xl:pr-16">
              Architectural masterpieces crafted for a discerning clientele — where precision engineering meets timeless aesthetic restraint.
            </p>
          </div>

          {/* Links Columns */}
          <div className="w-full xl:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 sm:gap-8 xl:pl-12">
            {footerLinks.map((section, colIdx) => (
              <div
                key={section.title}
                className={`flex flex-col ${revealClass(
                  ["delay-100", "delay-200", "delay-300", "delay-500"][colIdx] ?? "delay-500"
                )}`}
              >
                <h4 className="text-white text-[11px] sm:text-xs font-bold tracking-[0.15em] mb-4 sm:mb-6 uppercase leading-snug">
                  {section.title}
                </h4>
                <ul className="space-y-3 sm:space-y-4">
                  {section.links.map((link) => (
                    <li key={link.label} className="relative w-fit">
                      <a
                        href={link.href}
                        className="text-xs sm:text-sm text-zinc-400 hover:text-[#b76e79] transition-colors"
                      >
                        {link.label}
                      </a>
                      {link.pulse && (
                        <span className="absolute top-1 -right-3 w-1.5 h-1.5 rounded-full bg-[#b76e79] animate-pulse"></span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* MIDDLE SECTION: Contact Info */}
        <div className={`border-y border-zinc-900 py-6 sm:py-8 flex flex-col md:flex-row justify-start items-start md:items-center gap-5 sm:gap-8 md:gap-16 ${revealClass("delay-700")}`}>
          {contactInfo.map((item, i) => (
            <div key={i} className="flex items-center space-x-3 text-xs sm:text-sm text-zinc-400 break-all">
              {item.icon}
              {item.href ? (
                <a href={item.href} className="hover:text-[#b76e79] transition-colors">
                  {item.text}
                </a>
              ) : (
                <span>{item.text}</span>
              )}
            </div>
          ))}
        </div>

        {/* BOTTOM SECTION: Socials & Copyright */}
        <div className={`flex flex-col md:flex-row justify-between items-center text-[10px] sm:text-xs tracking-widest uppercase text-zinc-500 py-6 sm:py-8 gap-5 md:gap-0 ${revealClass("delay-1000")}`}>
          <div className="flex gap-8 sm:gap-10">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="p-2 -m-2 hover:text-[#b76e79] transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>
          <p className="text-center">
            &copy; {new Date().getFullYear()} OBSIDIAN BLADE — ALL RIGHTS RESERVED
          </p>
        </div>
      </div>

    </footer>
  );
}