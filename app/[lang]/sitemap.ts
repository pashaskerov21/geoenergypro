import { i18n } from "@/i18n-config";
import { Page } from "@/src/class";
import { NewsCategoryTranslateDataType, NewsTranslateDataType, ProjectCategoryDataType, ProjectCategoryTranslateDataType, ProjectTranslateDataType, ServiceDataType, ServiceTranslateDataType } from "@/src/types/data/type";
import { MetadataRoute } from "next";

const page = new Page();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const response: {
        serviceTranslate: ServiceTranslateDataType[],
        projectCategoryTranslate: ProjectCategoryTranslateDataType[],
        projectTranslate: ProjectTranslateDataType[],
        newsCategoryTranslate: NewsCategoryTranslateDataType[],
        newsTranslate: NewsTranslateDataType[],
    } = await page.sitemap();

    const serviceSiteMap: MetadataRoute.Sitemap = response.serviceTranslate.map((data) => ({
        url: `${process.env.SITE_URL}/${data.lang}/services/${data.slug}`,
        lastModified: new Date(),
    }));
    const projectCategorySiteMap: MetadataRoute.Sitemap = response.projectCategoryTranslate.map((data) => ({
        url: `${process.env.SITE_URL}/${data.lang}/projects/category/${data.slug}`,
        lastModified: new Date(),
    }));
    const projectSiteMap: MetadataRoute.Sitemap = response.projectTranslate.map((data) => ({
        url: `${process.env.SITE_URL}/${data.lang}/projects/${data.slug}`,
        lastModified: new Date(),
    }));
    const newsCategorySiteMap: MetadataRoute.Sitemap = response.newsCategoryTranslate.map((data) => ({
        url: `${process.env.SITE_URL}/${data.lang}/news/category/${data.slug}`,
        lastModified: new Date(),
    }));
    const newsSiteMap: MetadataRoute.Sitemap = response.newsTranslate.map((data) => ({
        url: `${process.env.SITE_URL}/${data.lang}/news/${data.slug}`,
        lastModified: new Date(),
    }));
    return [
        ...i18n.locales.map(locale => ({
            url: `${process.env.SITE_URL}/${locale}`,
            lastModified: new Date(),
        })),
        ...i18n.locales.map(locale => ({
            url: `${process.env.SITE_URL}/${locale}/about`,
            lastModified: new Date(),
        })),
        ...i18n.locales.map(locale => ({
            url: `${process.env.SITE_URL}/${locale}/services`,
            lastModified: new Date(),
        })),
        ...serviceSiteMap,
        ...i18n.locales.map(locale => ({
            url: `${process.env.SITE_URL}/${locale}/projects`,
            lastModified: new Date(),
        })),
        ...projectCategorySiteMap,
        ...projectSiteMap,
        ...i18n.locales.map(locale => ({
            url: `${process.env.SITE_URL}/${locale}/news`,
            lastModified: new Date(),
        })),
        ...newsCategorySiteMap,
        ...newsSiteMap,
        ...i18n.locales.map(locale => ({
            url: `${process.env.SITE_URL}/${locale}/gallery`,
            lastModified: new Date(),
        })),
        ...i18n.locales.map(locale => ({
            url: `${process.env.SITE_URL}/${locale}/contact`,
            lastModified: new Date(),
        })),
    ]
}