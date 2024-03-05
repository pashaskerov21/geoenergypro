import axios, { AxiosRequestConfig } from "axios";
import { LocaleStateType, LocaleType, PageTitleDataType } from "../types/general/type";
import { MenuDataType, MenuTranslateDataType, ProjectCategoryTranslateDataType, ProjectDataType, ProjectTranslateDataType, ProjectTranslateKeyType } from "../types/data/type";
import { i18n } from "@/i18n-config";
import Menu from "./Menu";

type DataType = ProjectDataType;
type TranslateDataType = ProjectTranslateDataType;
type CategoryTranslateDataType = ProjectCategoryTranslateDataType;

type GetTranslateDataType = {
    id: number,
    activeLocale: LocaleType,
    key: ProjectTranslateKeyType,
    translateData: TranslateDataType[]
}
type GetCategoryTranslateDataType = {
    id: number,
    activeLocale: LocaleType,
    key: "title",
    translateData: CategoryTranslateDataType[],
}

class Project {
    private baseURL = process.env.BASE_URL;
    private apiKey = 'projects'
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
            if (error.response) {
                return error.response.data;
            } else {
                throw new Error(this.errors.active);
            }
        }
    }
    public getTranslate(params: GetTranslateDataType): string {
        const { id, key, activeLocale, translateData } = params;
        const activeTranslateData: TranslateDataType | undefined = translateData.find((data) => data.project_id === id && data.lang === activeLocale);
        return activeTranslateData ? activeTranslateData[key] ?? '' : '';
    }
    public getCategoryTranslate(params: GetCategoryTranslateDataType): string {
        const { id, key, activeLocale, translateData } = params;
        const activeTranslateData: CategoryTranslateDataType | undefined = translateData.find((data) => data.cat_id === id && data.lang === activeLocale);
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
                            url: `/${activeLocale}/${menuResponse.main.slug}/${mainResponse.translate.slug}`,
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
                    slug: `${parentSlug}/${data.slug}`,
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
}

export default Project;