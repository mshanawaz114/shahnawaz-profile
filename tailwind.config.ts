import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{json,md}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // brand = violet (primary)
        brand: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
        // accent = fuchsia (secondary)
        accent: {
          50: "#fdf4ff",
          100: "#fae8ff",
          200: "#f5d0fe",
          300: "#f0abfc",
          400: "#e879f9",
          500: "#d946ef",
          600: "#c026d3",
          700: "#a21caf",
          800: "#86198f",
          900: "#701a75",
        },
        // ink = neutral, slightly cool
        ink: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "grad-brand":
          "linear-gradient(135deg, #6366f1 0%, #8b5cf6 35%, #d946ef 70%, #ec4899 100%)",
        "grad-brand-soft":
          "linear-gradient(135deg, rgba(99,102,241,.15) 0%, rgba(139,92,246,.15) 35%, rgba(217,70,239,.15) 70%, rgba(236,72,153,.15) 100%)",
        "grad-radial":
          "radial-gradient(ellipse at center, var(--tw-gradient-stops))",
        "grid-light":
          "linear-gradient(rgba(15,23,42,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,.06) 1px, transparent 1px)",
        "grid-dark":
          "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
        "noise":
          "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(139,92,246,.25), 0 8px 32px -8px rgba(139,92,246,.4)",
        "glow-lg":
          "0 0 0 1px rgba(139,92,246,.25), 0 20px 60px -15px rgba(139,92,246,.55), 0 8px 24px -10px rgba(217,70,239,.35)",
        "glow-pink":
          "0 0 0 1px rgba(236,72,153,.25), 0 8px 32px -8px rgba(236,72,153,.4)",
        "inset-ring":
          "inset 0 1px 0 0 rgba(255,255,255,.08), 0 1px 0 0 rgba(0,0,0,.04)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out both",
        "slide-up": "slideUp 0.6s cubic-bezier(0.22,1,0.36,1) both",
        "pulse-ring":
          "pulseRing 2.4s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite",
        gradient: "gradientShift 12s ease infinite",
        float: "float 8s ease-in-out infinite",
        "float-slow": "float 14s ease-in-out infinite",
        "spin-slow": "spin 18s linear infinite",
        marquee: "marquee 40s linear infinite",
        shimmer: "shimmer 2.4s linear infinite",
        "blob-1": "blob 22s ease-in-out infinite",
        "blob-2": "blob 26s ease-in-out infinite reverse",
        "blob-3": "blob 30s ease-in-out infinite",
        "border-glow": "borderGlow 6s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseRing: {
          "0%": { transform: "scale(1)", opacity: "0.55" },
          "100%": { transform: "scale(2)", opacity: "0" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "33%": { transform: "translateY(-18px) translateX(10px)" },
          "66%": { transform: "translateY(10px) translateX(-12px)" },
        },
        blob: {
          "0%, 100%": {
            transform: "translate(0,0) scale(1)",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          },
          "33%": {
            transform: "translate(30px,-20px) scale(1.05)",
            borderRadius: "30% 70% 70% 30% / 50% 60% 30% 60%",
          },
          "66%": {
            transform: "translate(-20px,30px) scale(0.95)",
            borderRadius: "50% 50% 40% 60% / 40% 50% 60% 50%",
          },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        borderGlow: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
