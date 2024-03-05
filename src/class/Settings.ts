import axios from "axios";
import { SiteSettingTranslateDataType, SettingTranslateDataKeyType, SiteSettingDataType } from "../types/data/type";
import { LocaleType } from "../types/general/type";


type DataType = SiteSettingDataType;
type TranslateDataType = SiteSettingTranslateDataType;
type GetTranslateDataType = {
    id: 1,
    activeLocale: LocaleType,
    key: SettingTranslateDataKeyType,
    translateData: TranslateDataType[]
}

class Settings {
    private baseURL = process.env.BASE_URL;
    private apiKey = 'settings'
    private api = {
        active: `${this.baseURL}/api/site/${this.apiKey}/active`,
    }
    private errors = {
        active: `${this.apiKey} active data fetch failed`,
    }

    public active = async (id: number) => {
        try {
            const response = await axios.post(this.api.active, {
                id: id,
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
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
    public getTranslate(params: GetTranslateDataType): string {
        const { id, key, activeLocale, translateData } = params;
        const activeTranslateData: TranslateDataType | undefined = translateData.find((data) => data.setting_id === id && data.lang === activeLocale);
        return activeTranslateData ? activeTranslateData[key] ?? '' : '';
    }
    public getMetaParams = async (activeLocale: LocaleType): Promise<{
        title: string,
        description: string,
        keywords: string,
        author_name: string,
        author_url: string,
        favicon: string | null,
        logo: string | null,
    } | undefined> => {
        const response: {
            main: DataType,
            translate: TranslateDataType[]
        } = await this.active(1);
        let metaParams: {
            title: string,
            description: string,
            keywords: string,
            author_name: string,
            author_url: string,
            favicon: string | null,
            logo: string | null,
        } | undefined = undefined;


        if (response.main && response.translate) {
            metaParams = {
                title: this.getTranslate({
                    id: 1,
                    activeLocale,
                    key: "title",
                    translateData: response.translate,
                }),
                description: this.getTranslate({
                    id: 1,
                    activeLocale,
                    key: "description",
                    translateData: response.translate,
                }),
                keywords: this.getTranslate({
                    id: 1,
                    activeLocale,
                    key: "keywords",
                    translateData: response.translate,
                }),
                author_name: this.getTranslate({
                    id: 1,
                    activeLocale,
                    key: "author",
                    translateData: response.translate,
                }),
                author_url: response.main.author_url ?? '',
                favicon: response.main.favicon !== null ? this.baseURL + response.main.favicon : null,
                logo: response.main.logo !== null ? this.baseURL + response.main.logo : null,
            }
        }

        return metaParams;
    }
}

export default Settings;