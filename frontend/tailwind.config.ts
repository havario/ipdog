import type { Config } from "tailwindcss";

export default <Config>{
  content: [
    "./src/components/**/*.{js,vue,ts}",
    "./src/layouts/**/*.vue",
    "./src/pages/**/*.vue",
    "./src/plugins/**/*.{js,ts}",
    "./src/app.vue",
  ],
  darkMode: "class", // 手动切换模式
  theme: {
    extend: {},
  },
  plugins: [],
};
