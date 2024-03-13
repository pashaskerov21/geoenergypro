import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Geo Energy Pro",
        short_name: "GEP",
        description: "Geo Energy Pro",
        background_color: '#fff',
        theme_color: "#013298",
        display: "standalone",
        icons: [
            {
                src: '/logo/favicon.png'
            }
        ],
    }
}