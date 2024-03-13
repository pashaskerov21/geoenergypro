import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots{
    return{
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: `/${process.env.SITE_URL}/en/sitemap.xml`,
    }
}