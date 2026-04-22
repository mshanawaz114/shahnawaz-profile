import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import resume from "@/content/resume.json";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${resume.name} — ${resume.title}`,
    template: `%s · ${resume.name}`,
  },
  description: resume.tagline,
  keywords: [
    "Shahnawaz Mohammed",
    "Drupal",
    "Technical Architect",
    "Senior Software Engineer",
    "PHP",
    "React",
    "Next.js",
    "Azure",
    "AWS",
    "Portfolio",
  ],
  authors: [{ name: resume.name }],
  creator: resume.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: `${resume.name} · Portfolio`,
    title: `${resume.name} — ${resume.title}`,
    description: resume.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${resume.name} — ${resume.title}`,
    description: resume.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
