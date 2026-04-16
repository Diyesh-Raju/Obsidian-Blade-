import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commercial Spaces",
  description:
    "Explore Obsidian Blade\u2019s master portfolio of corporate estates and architectural masterpieces designed for the world\u2019s most visionary enterprises.",
  openGraph: {
    title: "Commercial Spaces | Obsidian Blade",
    description:
      "Premium corporate estates and commercial developments by Obsidian Blade.",
    images: [
      {
        url: "/residential-1.jpg",
        width: 1200,
        height: 630,
        alt: "Obsidian Blade commercial skyline development at golden hour",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial Spaces | Obsidian Blade",
    description:
      "Premium corporate estates and commercial developments by Obsidian Blade.",
    images: ["/residential-1.jpg"],
  },
};

export default function CommercialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
