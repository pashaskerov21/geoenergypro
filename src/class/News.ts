import axios from "axios";
import { LocaleStateType, LocaleType, PageTitleDataType } from "../types/general/type";
import { MenuDataType, MenuTranslateDataType, NewsCategoryTranslateDataType, NewsDataType, NewsTranslateDataType, NewsTranslateKeyType } from "../types/data/type";
import Menu from "./Menu";
import { i18n } from "@/i18n-config";

type DataType = NewsDataType;
type TranslateDataType = NewsTranslateDataType;
type CategoryTranslateDataType = NewsCategoryTranslateDataType;

type GetTranslateDataType = {
    id: number,
    activeLocale: LocaleType,
    key: NewsTranslateKeyType,
    translateData: TranslateDataType[]
}
type GetCategoryTranslateDataType = {
    id: number,
    activeLocale: LocaleType,
    key: "title" | "slug",
    translateData: CategoryTranslateDataType[],
}

class News {
    private baseURL = process.env.BASE_URL;
    private apiKey = 'news'
    private api = {
        all: `${this.baseURL}/api/site/${this.apiKey}/all`,
        active: `${this.baseURL}/api/site/${this.apiKey}/active`,
        activeSlug: `${this.baseURL}/api/site/${this.apiKey}/active_slug`,
    }
    private errors = {
        all: `${this.apiKey} all data fetch failed`,
        active: `${this.apiKey} active data fetch failed`,
        activeSlug: `${this.apiKey} active slug data fetch failed`,
    }

    public all = async () => {
        try {
            const response = await axios.get(this.api.all, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            if (response.status !== 200) {
                throw new Error(this.errors.all);
            }

            return response.data;
        } catch (error: any) {
            if (error.response) {
                return error.response.data;
            } else {
                throw new Error(this.errors.all);
            }
        }
    }
    public active = async (id: number) => {
        try {
            const response = await axios.post(this.api.active, {
                id: id,
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            if (response.status !== 200) {
                throw new Error(this.errors.active);
            }

            return response.data;
        } catch (error: any) {
            if (error.response) {
                return error.response.data;
            } else {
                throw new Error(this.errors.active);
            }
        }
    }
    public activeSlug = async (data: {
        lang: LocaleType,
        slug: string
    }) => {
        try {
            const response = await axios.post(this.api.activeSlug, {
                data: data,
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            if (response.status !== 200) {
                throw new Error(this.errors.active);
            }

            return response.data;
        } catch (error: any) {
            if (error.response) {
                return error.response.data;
            } else {
                throw new Error(this.errors.active);
            }
        }
    }
    public getTranslate(params: GetTranslateDataType) {
        const activeTranslateData: TranslateDataType | undefined = params.translateData.find((data) => data.news_id === params.id && data.lang === params.activeLocale);
        let translate = "";

        if (activeTranslateData) {
            switch (params.key) {
                case "title":
                    return translate = activeTranslateData.title !== null ? activeTranslateData.title : '';
                case "slug":
                    return translate = activeTranslateData.slug !== null ? activeTranslateData.slug : '';
                case "text":
                    return translate = activeTranslateData.text !== null ? activeTranslateData.text : '';
                case "date":
                    return translate = activeTranslateData.date !== null ? activeTranslateData.date : '';
                case "author":
                    return translate = activeTranslateData.author !== null ? activeTranslateData.author : '';
                default:
                    return translate = "";
            }
        }
        return translate;
    }
    public getCategoryTranslate(params: GetCategoryTranslateDataType) {
        const activeTranslateData: CategoryTranslateDataType | undefined = params.translateData.find((data) => data.cat_id === params.id && data.lang === params.activeLocale);
        let translate = "";

        if (activeTranslateData) {
            switch (params.key) {
                case "title":
                    return translate = activeTranslateData.title !== null ? activeTranslateData.title : '';
                case "slug":
                    return translate = activeTranslateData.slug !== null ? activeTranslateData.slug : '';
                default:
                    return translate = "";
            }
        }
        return translate;
    }
    public getPageTitleData = async (parentSlug: string, slug: string, activeLocale: LocaleType): Promise<PageTitleDataType> => {
        const menu = new Menu();

        let pageData: PageTitleDataType = {
            title: "",
            breadcrumbs: [
                {
                    id: 1,
                    url: `/${activeLocale}/${parentSlug}`,
                    title: '',
                }
            ]
        }
        const responseMenu: {
            main: MenuDataType,
            translate: MenuTranslateDataType[],
        } = await menu.activeSlug(parentSlug);
        const responseService: {
            main: DataType,
            translate: TranslateDataType
        } = await this.activeSlug({
            lang: activeLocale,
            slug: slug
        });
        if (responseMenu.main && responseMenu.translate && responseService.main && responseService.translate) {
            pageData = {
                title: responseService.translate.title ?? '',
                breadcrumbs: [
                    {
                        id: 1,
                        url: `/${activeLocale}/${responseMenu.main.slug}`,
                        title: menu.getTranslate({
                            id: responseMenu.main.id,
                            activeLocale,
                            key: "title",
                            translateData: responseMenu.translate
                        }),
                    },
                    {
                        id: 2,
                        url: `/${activeLocale}/${responseMenu.main.slug}/${responseService.translate.slug}`,
                        title: responseService.translate.title ?? '',
                    },
                ]
            }
        }

        return pageData;
    }
    public getLocaleSlugs = async (parentSlug: string, slug: string, lang: LocaleType): Promise<LocaleStateType[]> => {
        let localeSlugs: LocaleStateType[] = i18n.locales.map((locale) => {
            return {
                locale: locale,
                slug: parentSlug,
            }
        });

        const response: {
            main: DataType,
            translates: TranslateDataType[],
        } = await this.activeSlug({
            lang: lang,
            slug: slug,
        });
        if (response.main && response.translates) {
            localeSlugs = response.translates.map((data) => {
                return {
                    locale: data.lang,
                    slug: `${parentSlug}/${data.slug}`,
                }
            })
        }

        return localeSlugs;
    }
}

export default News;