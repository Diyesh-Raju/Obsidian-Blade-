"use client";

import { useState, useRef, useEffect } from "react";

const labelClass = "text-[10px] uppercase text-[#b76e79] tracking-widest mb-2";

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface DropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
}

function CustomDropdown({ label, value, options, onChange }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <label className={labelClass}>{label}</label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 px-5 py-3 rounded-full bg-white/40 backdrop-blur-xl border border-white/40 shadow-sm text-sm text-zinc-700 focus:outline-none transition-all duration-300 hover:shadow-md"
      >
        <span>{value}</span>
        <span className={`transition-transform duration-500 ease-in-out ${open ? "rotate-180" : ""}`}>
          <ChevronDown />
        </span>
      </button>
      {open && (
        <div className="absolute z-50 mt-2 w-full bg-white/60 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-xl overflow-hidden py-2">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`w-full text-left px-5 py-2.5 text-sm transition-colors duration-200 hover:bg-[#b76e79]/10 hover:text-[#b76e79] ${value === opt ? "text-[#b76e79] font-medium" : "text-zinc-700"}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PropertySearch() {
  const [status, setStatus] = useState("Any Status");
  const [type, setType] = useState("All Properties");
  const [location, setLocation] = useState("All Locations");

  return (
    <section className="w-full bg-white border-y border-[#b76e79]/15 text-zinc-900 py-16 px-8 md:px-24">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
        <CustomDropdown
          label="Status"
          value={status}
          options={["Any Status", "New Launch", "Under Construction", "Ready to Move"]}
          onChange={setStatus}
        />
        <CustomDropdown
          label="Type"
          value={type}
          options={["All Properties", "Luxury Villas", "Glass Residences", "Commercial Space"]}
          onChange={setType}
        />
        <CustomDropdown
          label="Location"
          value={location}
          options={["All Locations", "Financial District", "Coastal Palisades", "Private Island"]}
          onChange={setLocation}
        />
        <button className="glass-button py-4 w-full text-xs uppercase tracking-[0.2em] font-bold">
          FIND PROPERTY
        </button>
      </div>
    </section>
  );
}
