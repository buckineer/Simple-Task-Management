/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        dark: "#090E34",
        "dark-700": "#090e34b3",
        primary: "#3056D3",
        secondary: "#13C296",
        "body-color": "#637381",
        warning: "#F9C107",
        danger: "#DC3545",
        success: "#3CA745",
        info: "#3BA2B8",
        light: "#efefef",
        "form-stroke": "#E0E0E0",
        "tg-bg": "#f7f8fa",
        black: "#212B36",
        stroke: "#E7E7E7",
        gray: "#F4F7FF",
        "gray-1": "#F4F7FF",
        "gray-2": "#F8FAFC",
        orange: "#F2994A",
        purple: "#9B51E0",
      },
      boxShadow: {
        two: "0px 1px 4px rgba(0, 0, 0, 0.12)",
        three: "0px 1px 5px rgba(0, 0, 0, 0.14)",
        four: "0px 4px 10px rgba(0, 0, 0, 0.12)",
        "chat-box": "0px 1px 8px rgba(0, 0, 0, 0.1)",
        "profile-5": "0px 1px 3px rgba(0, 0, 0, 0.08)",
        input: "0px 7px 20px rgba(0, 0, 0, 0.03)",
        pricing: "0px 39px 23px -27px rgba(0, 0, 0, 0.04)",
        "switch-1": "0px 0px 5px rgba(0, 0, 0, 0.15)",
        "testimonial-4": "0px 60px 120px -20px #EBEFFD",
        "testimonial-5": "0px 10px 39px rgba(92, 115, 160, 0.08)",
        "contact-3": "0px 4px 28px rgba(0, 0, 0, 0.08)",
        "contact-6": "0px 2px 4px rgba(0, 0, 0, 0.05)",
        card: "0px 1px 3px rgba(0, 0, 0, 0.12)",
        "card-2": "0px 1px 10px -2px rgba(0, 0, 0, 0.15)",
      },
      dropShadow: {
        tooltip: "0px 0px 2px rgba(0, 0, 0, 0.14)",
        three: "0px 1px 5px rgba(0, 0, 0, 0.14)",
        four: "0px 4px 10px rgba(0, 0, 0, 0.12)",
        "avatar-5": "0px 1px 2px rgba(0, 0, 0, 0.08)",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

