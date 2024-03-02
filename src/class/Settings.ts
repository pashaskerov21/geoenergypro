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
                params: {next: {revalidate: 10}}
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
        const activeTranslateData: SiteSettingTranslateDataType | undefined = params.translateData.find((data) => data.setting_id === params.id && data.lang === params.activeLocale);
        let translate = "";

        if (activeTranslateData) {
            switch (params.key) {
                case "title":
                    return translate = activeTranslateData.title !== null ? activeTranslateData.title : '';
                case "description":
                    return translate = activeTranslateData.description !== null ? activeTranslateData.description : '';
                case "author":
                    return translate = activeTranslateData.author !== null ? activeTranslateData.author : '';
                case "keywords":
                    return translate = activeTranslateData.keywords !== null ? activeTranslateData.keywords : '';
                case "copyright":
                    return translate = activeTranslateData.copyright !== null ? activeTranslateData.copyright : '';
                case "address_text":
                    return translate = activeTranslateData.address_text !== null ? activeTranslateData.address_text : '';
                case "mail_text":
                    return translate = activeTranslateData.mail_text !== null ? activeTranslateData.mail_text : '';
                case "phone_text":
                    return translate = activeTranslateData.phone_text !== null ? activeTranslateData.phone_text : '';
                case "footer_text":
                    return translate = activeTranslateData.footer_text !== null ? activeTranslateData.footer_text : '';
                default:
                    return translate = "";
            }
        }
        return translate;
    }
    public getMetaParams = async (activeLocale: LocaleType) => {
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