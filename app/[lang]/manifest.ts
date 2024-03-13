import { LocaleType } from "@/src/types/general/type";
import { MetadataRoute } from "next";

export default function manifest({ params: { lang } }: { params: { lang: LocaleType } }): MetadataRoute.Manifest{
    return{
        name: "Geo Energy Pro",
        short_name: "GEP",
        description: "Geo Energy Pro",
        lang: lang,
        background_color: '#fff',
        theme_color: "#013298",
        display: "standalone",
        start_url: `/${lang}`,
        icons: [
            {
                src: '/logo/favicon.png'
            }
        ],
    }
}