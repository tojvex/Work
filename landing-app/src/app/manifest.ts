import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Agrohub Jobs",
    short_name: "Agrohub Jobs",
    description: "join agrohub family",
    start_url: "/",
    display: "standalone",
    background_color: "#dedddd",
    theme_color: "#1DA94A",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
