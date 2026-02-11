/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       screens: {
        md: { max: "1200px" },
      },
    },
  },
  corePlugins: {
    preflight: false, // Tailwind의 기본 스타일 리셋 비활성화
  },
  plugins: [],
}

