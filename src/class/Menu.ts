import axios from "axios";
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
    public activeSlug = async (slug: string) => {
        try {
            const response = await axios.post(this.api.activeSlug, {
                slug: slug,
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
        const activeTranslateData: TranslateDataType | undefined = params.translateData.find((data) => data.menu_id === params.id && data.lang === params.activeLocale);
        let translate = "";
        if (activeTranslateData) {
            switch (params.key) {
                case "title":
                    return translate = activeTranslateData.title ?? '';
                case "meta_title":
                    return translate = activeTranslateData.meta_title ?? '';
                case "meta_description":
                    return translate = activeTranslateData.meta_description ?? '';
                case "meta_keywords":
                    return translate = activeTranslateData.meta_keywords ?? '';
                default:
                    return translate = activeTranslateData.title;
            }
        }
        return translate;
    }
    public getMetaParams = async (activeLocale: LocaleType, slug: string,) => {
        const response: {
            main: DataType,
            translate: TranslateDataType[]
        } = await this.activeSlug(slug);
        let metaParams: {
            title: string,
            description: string,
            keywords: string,
        } | undefined = undefined;
        if (response.main && response.translate) {
            metaParams = {
                title: this.getTranslate({
                    id: response.main.id,
                    activeLocale,
                    key: "meta_title",
                    translateData: response.translate
                }),
                description: this.getTranslate({
                    id: response.main.id,
                    activeLocale,
                    key: "meta_description",
                    translateData: response.translate
                }),
                keywords: this.getTranslate({
                    id: response.main.id,
                    activeLocale,
                    key: "meta_keywords",
                    translateData: response.translate
                }),
            }
        }
        return metaParams;
    }
    public getPageTitleData = async (slug: string, activeLocale: LocaleType): Promise<PageTitleDataType> => {
        let pageData: PageTitleDataType = {
            title: "",
            breadcrumbs: [
                {
                    id: 1,
                    url: `/${activeLocale}`,
                    title: '',
                }
            ]
        }
        const response: {
            main: DataType,
            translate: TranslateDataType[]
        } = await this.activeSlug(slug);
        if (response.main && response.translate) {
            pageData = {
                title: this.getTranslate({
                    id: response.main.id,
                    activeLocale,
                    key: "title",
                    translateData: response.translate,
                }),
                breadcrumbs: [
                    {
                        id: 1,
                        url: `/${activeLocale}/${response.main.slug}`,
                        title: this.getTranslate({
                            id: response.main.id,
                            activeLocale,
                            key: "title",
                            translateData: response.translate,
                        }),
                    }
                ]
            }
        }

        return pageData;
    }
}

export default Menu