import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://bousai-blog-astro-cx.vercel.app",
  output: "server",
  adapter: vercel(),
  integrations: [
    sitemap({
      customPages: [
        "https://bousai-blog-astro-cx.vercel.app/blog/y429pbq05",
        "https://bousai-blog-astro-cx.vercel.app/blog/uwxgyv-xcw",
        "https://bousai-blog-astro-cx.vercel.app/blog/e343r18b65",
        "https://bousai-blog-astro-cx.vercel.app/blog/76u6_pug_9s",
        "https://bousai-blog-astro-cx.vercel.app/blog/smhkp8gpyf",
        "https://bousai-blog-astro-cx.vercel.app/blog/vrppyctaf-f",
        "https://bousai-blog-astro-cx.vercel.app/blog/ev7rmp4o2",
        "https://bousai-blog-astro-cx.vercel.app/blog/az_ansaix",
        "https://bousai-blog-astro-cx.vercel.app/blog/d-qnm0fqfx",
        "https://bousai-blog-astro-cx.vercel.app/blog/ymwactf07pr",
        "https://bousai-blog-astro-cx.vercel.app/blog/jr_920u8mfmq",
        "https://bousai-blog-astro-cx.vercel.app/blog/eq8qkjmd0x",
        "https://bousai-blog-astro-cx.vercel.app/blog/7lga2-g1ng",
        "https://bousai-blog-astro-cx.vercel.app/blog/v0ffmtxc-j",
      ],
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
