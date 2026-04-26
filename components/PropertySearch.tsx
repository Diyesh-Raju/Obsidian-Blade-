"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const labelClass = "text-[10px] uppercase text-[#b76e79] tracking-widest mb-2 block";

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ─── Tabs ─── */

const TABS = ["BUY", "RENT", "COMMERCIAL"] as const;
type Tab = (typeof TABS)[number];

/* ─── Tab‑specific filter configs ─── */

interface FilterConfig {
  dropdowns: { label: string; key: string; options: string[]; defaultValue: string }[];
  sliders: { label: string; key: string; min: number; max: number; step: number; format: (v: number) => string }[];
}

const fmt = {
  sqft: (v: number) => v >= 10000 ? `${(v / 1000).toFixed(1)}K` : v.toLocaleString(),
  inr: (v: number) => {
    if (v >= 10000000) return `₹${(v / 10000000).toFixed(1)} Cr`;
    if (v >= 100000) return `₹${(v / 100000).toFixed(1)} L`;
    return `₹${v.toLocaleString()}`;
  },
  monthly: (v: number) => {
    if (v >= 100000) return `₹${(v / 100000).toFixed(1)} L/mo`;
    if (v >= 1000) return `₹${(v / 1000).toFixed(0)}K/mo`;
    return `₹${v.toLocaleString()}/mo`;
  },
};

const FILTERS: Record<Tab, FilterConfig> = {
  BUY: {
    dropdowns: [
      { label: "Project Type", key: "projectType", options: ["Residential", "Villa", "Plot"], defaultValue: "Residential" },
      { label: "Status", key: "status", options: ["New Launch", "Under Construction", "Ready to Move"], defaultValue: "New Launch" },
      { label: "Location", key: "location", options: ["Financial District", "Coastal Palisades", "Private Island"], defaultValue: "Financial District" },
    ],
    sliders: [
      { label: "Area (Sq.Ft)", key: "area", min: 500, max: 10000, step: 100, format: fmt.sqft },
      { label: "Budget", key: "budget", min: 2500000, max: 500000000, step: 500000, format: fmt.inr },
    ],
  },
  RENT: {
    dropdowns: [
      { label: "Project Type", key: "projectType", options: ["Residential", "Villa", "Plot"], defaultValue: "Residential" },
      { label: "Location", key: "location", options: ["Financial District", "Coastal Palisades", "Private Island"], defaultValue: "Financial District" },
      { label: "Bedrooms", key: "bedrooms", options: ["1 BHK", "2 BHK", "3 BHK", "4+ BHK"], defaultValue: "2 BHK" },
    ],
    sliders: [
      { label: "Area (Sq.Ft)", key: "area", min: 500, max: 10000, step: 100, format: fmt.sqft },
      { label: "Budget (Monthly)", key: "budget", min: 10000, max: 500000, step: 5000, format: fmt.monthly },
    ],
  },
  COMMERCIAL: {
    dropdowns: [
      { label: "Project Type", key: "projectType", options: ["Office", "Retail", "Warehouse"], defaultValue: "Office" },
      { label: "Location", key: "location", options: ["Financial District", "Coastal Palisades", "Private Island"], defaultValue: "Financial District" },
      { label: "Category", key: "category", options: ["Office", "Retail", "Warehouse"], defaultValue: "Office" },
    ],
    sliders: [
      { label: "Unit Size (Sq.Ft)", key: "area", min: 200, max: 50000, step: 200, format: fmt.sqft },
      { label: "Budget", key: "budget", min: 2500000, max: 500000000, step: 500000, format: fmt.inr },
    ],
  },
};

/* ─── Custom Dropdown ─── */

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
        className="w-full flex items-center justify-between gap-2 px-5 py-3 rounded-full bg-white/60 backdrop-blur-md border border-zinc-200 shadow-sm text-sm text-zinc-800 focus:outline-none transition-all duration-300 hover:shadow-md"
      >
        <span className="truncate">{value}</span>
        <span className={`transition-transform duration-500 ease-in-out flex-shrink-0 ${open ? "rotate-180" : "rotate-0"}`}>
          <ChevronDown />
        </span>
      </button>
      {open && (
        <div className="absolute z-50 mt-2 w-full bg-white/60 backdrop-blur-2xl border border-zinc-200 rounded-3xl shadow-xl overflow-hidden py-2">
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

/* ─── Custom Range Slider ─── */

interface SliderProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onChange: (val: [number, number]) => void;
  format: (v: number) => string;
}

function CustomSlider({ label, min, max, step, value, onChange, format }: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const pct = useCallback(
    (v: number) => ((v - min) / (max - min)) * 100,
    [min, max]
  );

  const clamp = useCallback(
    (v: number) => Math.round(Math.min(max, Math.max(min, v)) / step) * step,
    [min, max, step]
  );

  const handlePointer = useCallback(
    (thumb: 0 | 1) => (e: React.PointerEvent) => {
      e.preventDefault();
      const track = trackRef.current;
      if (!track) return;

      const move = (ev: PointerEvent) => {
        const rect = track.getBoundingClientRect();
        const ratio = Math.min(1, Math.max(0, (ev.clientX - rect.left) / rect.width));
        const raw = min + ratio * (max - min);
        const snapped = clamp(raw);
        const next: [number, number] = [...value];
        next[thumb] = snapped;
        if (next[0] > next[1]) {
          if (thumb === 0) next[0] = next[1];
          else next[1] = next[0];
        }
        onChange(next);
      };

      const up = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
      };

      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    },
    [min, max, clamp, value, onChange]
  );

  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="px-5 py-3 rounded-full bg-white/60 backdrop-blur-md border border-zinc-200 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-zinc-800 font-medium">{format(value[0])}</span>
          <span className="text-[10px] text-zinc-400">—</span>
          <span className="text-xs text-zinc-800 font-medium">{format(value[1])}</span>
        </div>
        <div ref={trackRef} className="relative h-1.5 rounded-full bg-zinc-200 cursor-pointer select-none touch-none">
          <div
            className="absolute h-full rounded-full bg-[#b76e79]/60"
            style={{ left: `${pct(value[0])}%`, width: `${pct(value[1]) - pct(value[0])}%` }}
          />
          {([0, 1] as const).map((i) => (
            <div
              key={i}
              onPointerDown={handlePointer(i)}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#b76e79] border-2 border-white shadow-md cursor-grab active:cursor-grabbing transition-shadow hover:shadow-lg"
              style={{ left: `${pct(value[i])}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */

export default function PropertySearch() {
  const [activeTab, setActiveTab] = useState<Tab>("BUY");

  const [dropdownValues, setDropdownValues] = useState<Record<Tab, Record<string, string>>>(() => {
    const init = {} as Record<Tab, Record<string, string>>;
    for (const tab of TABS) {
      init[tab] = {};
      for (const d of FILTERS[tab].dropdowns) {
        init[tab][d.key] = d.defaultValue;
      }
    }
    return init;
  });

  const [sliderValues, setSliderValues] = useState<Record<Tab, Record<string, [number, number]>>>(() => {
    const init = {} as Record<Tab, Record<string, [number, number]>>;
    for (const tab of TABS) {
      init[tab] = {};
      for (const s of FILTERS[tab].sliders) {
        init[tab][s.key] = [s.min, s.max];
      }
    }
    return init;
  });

  const setDropdown = (key: string, val: string) =>
    setDropdownValues((prev) => ({ ...prev, [activeTab]: { ...prev[activeTab], [key]: val } }));

  const setSlider = (key: string, val: [number, number]) =>
    setSliderValues((prev) => ({ ...prev, [activeTab]: { ...prev[activeTab], [key]: val } }));

  const config = FILTERS[activeTab];

  const allItems = [
    ...config.dropdowns.map((d) => ({ kind: "dropdown" as const, data: d })),
    ...config.sliders.map((s) => ({ kind: "slider" as const, data: s })),
  ];
  const pairedItems = allItems.slice(0, allItems.length - (allItems.length % 2 === 1 ? 1 : 0));
  const lastItem = allItems.length % 2 === 1 ? allItems[allItems.length - 1] : null;

  return (
    <section className="w-full bg-white text-zinc-900 py-20 sm:py-28 px-4 sm:px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 sm:gap-14 lg:gap-24 items-start">

        {/* ── Left Column: Typography ── */}
        <div className="w-full lg:w-[40%] flex items-center lg:sticky lg:top-32">
          <h2 className="font-clash text-2xl sm:text-3xl lg:text-[2.5rem] font-semibold uppercase tracking-widest leading-[1.3] text-zinc-900">
            Discover{" "}
            <span className="liquid-glass-text">Properties</span>{" "}
            That Define Luxury And{" "}
            <span className="liquid-glass-text">Purpose.</span>
          </h2>
        </div>

        {/* ── Right Column: Tabs & Filters ── */}
        <div className="w-full lg:w-[60%]">

          {/* Tabs */}
          <div className="flex items-center gap-5 sm:gap-8 mb-8 sm:mb-12 border-b border-zinc-200 pb-4 overflow-x-auto hide-scrollbar">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative text-xs font-semibold uppercase tracking-[0.2em] pb-1 whitespace-nowrap flex-shrink-0 transition-colors duration-300 ${
                  activeTab === tab
                    ? "text-[#b76e79]"
                    : "text-zinc-400 hover:text-zinc-600"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute -bottom-[17px] left-0 w-full h-[2px] bg-[#b76e79] rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Filters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
            {pairedItems.map((item) =>
              item.kind === "dropdown" ? (
                <CustomDropdown
                  key={`${activeTab}-${item.data.key}`}
                  label={item.data.label}
                  value={dropdownValues[activeTab][item.data.key]}
                  options={item.data.options}
                  onChange={(val) => setDropdown(item.data.key, val)}
                />
              ) : (
                <CustomSlider
                  key={`${activeTab}-${item.data.key}`}
                  label={item.data.label}
                  min={item.data.min}
                  max={item.data.max}
                  step={item.data.step}
                  value={sliderValues[activeTab][item.data.key]}
                  onChange={(val) => setSlider(item.data.key, val)}
                  format={item.data.format}
                />
              )
            )}

            {lastItem && (
              <div className="sm:col-span-2 flex justify-center">
                <div className="w-full sm:w-[calc(50%-0.875rem)]">
                  {lastItem.kind === "dropdown" ? (
                    <CustomDropdown
                      key={`${activeTab}-${lastItem.data.key}`}
                      label={lastItem.data.label}
                      value={dropdownValues[activeTab][lastItem.data.key]}
                      options={lastItem.data.options}
                      onChange={(val) => setDropdown(lastItem.data.key, val)}
                    />
                  ) : (
                    <CustomSlider
                      key={`${activeTab}-${lastItem.data.key}`}
                      label={lastItem.data.label}
                      min={lastItem.data.min}
                      max={lastItem.data.max}
                      step={lastItem.data.step}
                      value={sliderValues[activeTab][lastItem.data.key]}
                      onChange={(val) => setSlider(lastItem.data.key, val)}
                      format={lastItem.data.format}
                    />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Search Button */}
          <button
            type="button"
            className="glass-button mt-10 py-4 w-full text-xs uppercase tracking-[0.2em] font-bold"
          >
            Find Property
          </button>
        </div>
      </div>
    </section>
  );
}
