import axios from "axios";
import { LocaleStateType, LocaleType, PageTitleDataType } from "../types/general/type";
import { MenuDataType, MenuTranslateDataType, ProjectCategoryDataType, ProjectCategoryTranslateDataType } from "../types/data/type";
import { i18n } from "@/i18n-config";
import Menu from "./Menu";

type DataType = ProjectCategoryDataType;
type TranslateDataType = ProjectCategoryTranslateDataType;
type GetTranslateDataType = {
    id: number,
    activeLocale: LocaleType,
    key: "title" | "slug",
    translateData: TranslateDataType[]
}

class ProjectCategory {
    private baseURL = process.env.BASE_URL;
    private apiKey = 'project_category'
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
        const activeTranslateData: TranslateDataType | undefined = params.translateData.find((data) => data.cat_id === params.id && data.lang === params.activeLocale);
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
                        url: `/${activeLocale}/${responseMenu.main.slug}/category/${responseService.translate.slug}`,
                        title: responseService.translate.title ?? '',
                    },
                ]
            }
        }
        console.log(pageData)
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
                    slug: `${parentSlug}/category/${data.slug}`,
                }
            })
        }
        console.log(localeSlugs)
        return localeSlugs;
    }
}

export default ProjectCategory;