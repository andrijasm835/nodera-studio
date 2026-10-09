import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nodera Studio",
    short_name: "Nodera",
    description: "Nezavisni web development studio za custom sajtove, e-commerce i frontend sisteme.",
    start_url: "/",
    display: "standalone",
    background_color: "#090907",
    theme_color: "#090907",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
