import { LocaleType } from "@/src/types/general/type";
import { MetadataRoute } from "next";

export default async function sitemap({ params: { lang } }: { params: { lang: LocaleType } }): Promise<MetadataRoute.Sitemap>{
    return[
        {
            url: `${process.env.SITE_URL}/${lang}`,
            lastModified: new Date(),
        },
        {
            url: `${process.env.SITE_URL}/${lang}/about`,
            lastModified: new Date(),
        },
        {
            url: `${process.env.SITE_URL}/${lang}/services`,
            lastModified: new Date(),
        },
        {
            url: `${process.env.SITE_URL}/${lang}/projects`,
            lastModified: new Date(),
        },
        {
            url: `${process.env.SITE_URL}/${lang}/news`,
            lastModified: new Date(),
        },
        {
            url: `${process.env.SITE_URL}/${lang}/gallery`,
            lastModified: new Date(),
        },
        {
            url: `${process.env.SITE_URL}/${lang}/contact`,
            lastModified: new Date(),
        },
    ]
}