import vidstack from "@vidstack/react/tailwind.cjs";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      //   fontSize: {
      //     medium: "var(--text-medium)",
      //   },
      colors: {
        thaibg: "red",
      },
      fontFamily: {
        twitter: ["var(--font-TwitterChirpExtendedHeavy)", "sans-serif"],
      },
    },
  },
  plugins: [
    vidstack({
      selector: ".media-player",
      prefix: "media",
    }),
  ],
};
