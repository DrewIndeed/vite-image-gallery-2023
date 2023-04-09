import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

// https://github.com/FatehAK/vite-plugin-image-optimizer
const DEFAULT_IMG_OPTIONS = {
  test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
  exclude: undefined,
  include: undefined,
  includePublic: true,
  logStats: true,
  svg: {
    multipass: true,
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            cleanupNumericValues: false,
            removeViewBox: false, // https://github.com/svg/svgo/issues/1128
          },
          cleanupIDs: {
            minify: false,
            remove: false,
          },
          convertPathData: false,
        },
      },
      "sortAttrs",
      {
        name: "addAttributesToSVGElement",
        params: {
          attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
        },
      },
    ],
  },
  png: {
    // https://sharp.pixelplumbing.com/api-output#png
    quality: 50,
  },
  jpeg: {
    // https://sharp.pixelplumbing.com/api-output#jpeg
    quality: 50,
  },
  jpg: {
    // https://sharp.pixelplumbing.com/api-output#jpeg
    quality: 50,
  },
  tiff: {
    // https://sharp.pixelplumbing.com/api-output#tiff
    quality: 50,
  },
  // gif does not support lossless compression
  // https://sharp.pixelplumbing.com/api-output#gif
  gif: {},
  webp: {
    // https://sharp.pixelplumbing.com/api-output#webp
    lossless: true,
  },
  avif: {
    // https://sharp.pixelplumbing.com/api-output#avif
    lossless: true,
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // Notes: have __dirname from @types/node
      "@": path.resolve(__dirname, "./src"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@utils": path.resolve(__dirname, "./src/utils/index.ts"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
  server: {
    port: 1111,
  },
  preview: {
    port: 2222,
  },
  plugins: [
    react(),
    viteCompression({ algorithm: "gzip" }),
    ViteImageOptimizer({
      ...DEFAULT_IMG_OPTIONS,
    }),
  ],
});
