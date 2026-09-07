import { defineConfig } from "@vite-pwa/assets-generator/config";

export default defineConfig({
  preset: {
    transparent: {
      sizes: [],
      favicons: [],
    },
    maskable: {
      sizes: [512],
      padding: 0,
    },
    apple: {
      sizes: [],
    },
  },
  images: ["public/app-icon-maskable.svg"],
});
