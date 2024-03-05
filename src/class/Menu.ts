import axios, { AxiosRequestConfig } from "axios";
import { LocaleType, PageTitleDataType } from "@/src/types/general/type";
import { MenuDataType, MenuTranslateDataType } from "@/src/types/data/type";

type DataType = MenuDataType
type TranslateDataType = MenuTranslateDataType;
type GetTranslateDataType = {
    id: number,
    activeLocale: LocaleType,
    key: "title" | "meta_title" | "meta_description" | "meta_keywords",
    translateData: TranslateDataType[],
}

class Menu {
    private baseURL = process.env.BASE_URL;
    private apiKey = 'menu'
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
    public activeSlug = async (slug: string) => {
        try {
            const response = await axios.post(this.api.activeSlug, { slug }, this.axiosConfig);
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
        const activeTranslateData: TranslateDataType | undefined = translateData.find((data) => data.menu_id === id && data.lang === activeLocale);
        return activeTranslateData ? activeTranslateData[key] ?? '' : '';
    }
    public async getMetaParams(activeLocale: LocaleType, slug: string): Promise<{ title: string; description: string; keywords: string } | undefined> {
        try {
            const response = await this.activeSlug(slug);
            const { main, translate } = response;
            if (main && translate) {
                return {
                    title: this.getTranslate({ id: main.id, activeLocale, key: "meta_title", translateData: translate }),
                    description: this.getTranslate({ id: main.id, activeLocale, key: "meta_description", translateData: translate }),
                    keywords: this.getTranslate({ id: main.id, activeLocale, key: "meta_keywords", translateData: translate })
                };
            }
        } catch (error) {
            console.log(error)
        }

        return undefined
    }
    public async getPageTitleData(slug: string, activeLocale: LocaleType): Promise<PageTitleDataType> {
        try {
            const response = await this.activeSlug(slug);
            const { main, translate } = response;
            if (main && translate) {
                return {
                    title: this.getTranslate({ id: main.id, activeLocale, key: "title", translateData: translate }),
                    breadcrumbs: [
                        { id: 2, url: `/${activeLocale}/${main.slug}`, title: this.getTranslate({ id: main.id, activeLocale, key: "title", translateData: translate }) }
                    ]
                };
            }
        } catch (error) {
            console.log(error)
        }

        return { title: "", breadcrumbs: [{ id: 1, url: `/${activeLocale}`, title: '' }] };
    }
}

export default Menu