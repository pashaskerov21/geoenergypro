import axios, { AxiosRequestConfig } from "axios";
import { LocaleStateType, LocaleType, PageTitleDataType } from "../types/general/type";
import { MenuDataType, MenuTranslateDataType, NewsCategoryDataType, NewsCategoryTranslateDataType, NewsDataType } from "../types/data/type";
import Menu from "./Menu";
import { i18n } from "@/i18n-config";

type DataType = NewsCategoryDataType
type TranslateDataType = NewsCategoryTranslateDataType;
type GetTranslateDataType = {
    id: number,
    activeLocale: LocaleType,
    key: "title" | "slug",
    translateData: TranslateDataType[]
}

class NewsCategory {
    private baseURL = process.env.BASE_URL;
    private apiKey = 'news_category'
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
    private axiosConfig: AxiosRequestConfig = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }
    private handleError(error: any, errorMessage: string) {
        if (error.response) {
            return error.response.data;
        } else {
            throw new Error(errorMessage);
        }
    }
    public all = async () => {
        try {
            const response = await axios.get(this.api.all, this.axiosConfig)
            if (response.status !== 200) {
                throw new Error(this.errors.all);
            }

            return response.data;
        } catch (error: any) {
            return this.handleError(error, this.errors.all);
        }
    }
    public active = async (id: number) => {
        try {
            const response = await axios.post(this.api.active, { id }, this.axiosConfig);
            if (response.status !== 200) {
                throw new Error(this.errors.active);
            }

            return response.data;
        } catch (error: any) {
            return this.handleError(error, this.errors.active);
        }
    }
    public activeSlug = async (data: { lang: LocaleType, slug: string }) => {
        try {
            const response = await axios.post(this.api.activeSlug, { data }, this.axiosConfig);
            if (response.status !== 200) {
                throw new Error(this.errors.active);
            }

            return response.data;
        } catch (error: any) {
            return this.handleError(error, this.errors.activeSlug);
        }
    }
    public getTranslate(params: GetTranslateDataType): string {
        const { id, key, activeLocale, translateData } = params;
        const activeTranslateData: TranslateDataType | undefined = translateData.find((data) => data.cat_id === id && data.lang === activeLocale);
        return activeTranslateData ? activeTranslateData[key] ?? '' : '';
    }
    public getPageTitleData = async (parentSlug: string, slug: string, activeLocale: LocaleType): Promise<PageTitleDataType> => {
        const menu = new Menu();
        try {
            const [mainResponse, menuResponse]: [
                {
                    main: DataType,
                    translate: TranslateDataType
                },
                {
                    main: MenuDataType,
                    translate: MenuTranslateDataType[],
                },
            ] = await Promise.all([this.activeSlug({ lang: activeLocale, slug }), menu.activeSlug(parentSlug)]);
            if (menuResponse.main && menuResponse.translate && mainResponse.main && mainResponse.translate) {
                return {
                    title: mainResponse.translate.title ?? '',
                    breadcrumbs: [
                        {
                            id: 1,
                            title: menu.getTranslate({
                                id: menuResponse.main.id,
                                activeLocale,
                                key: "title",
                                translateData: menuResponse.translate
                            }),
                            url: `/${activeLocale}/${menuResponse.main.slug}`,
                        },
                        {
                            id: 2,
                            title: mainResponse.translate.title ?? '',
                            url: `/${activeLocale}/${menuResponse.main.slug}/category/${mainResponse.translate.slug}`,
                        }
                    ]
                }
            }
        } catch (error) {
            console.log(error);
        }
        return { title: "", breadcrumbs: [{ id: 1, title: "", url: `/${activeLocale}/${parentSlug}` }] }
    }
    public getLocaleSlugs = async (parentSlug: string, slug: string, lang: LocaleType): Promise<LocaleStateType[]> => {
        try {
            const response: { main: DataType, translates: TranslateDataType[] } = await this.activeSlug({ lang, slug });
            const { main, translates } = response;
            if (main && translates) {
                return response.translates.map((data) => ({
                    locale: data.lang,
                    slug: `${parentSlug}/category/${data.slug}`,
                }))
            }
        } catch (error) {
            console.log(error);
        }
        return i18n.locales.map((locale) => ({
            locale: locale,
            slug: parentSlug,
        }));
    }
    public getNewsCount = (id: number, newsData: NewsDataType[]) => {
        return newsData.filter((data) => data.cat_id === id).length;
    }
}

export default NewsCategory;