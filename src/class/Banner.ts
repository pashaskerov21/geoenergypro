import axios from "axios";
import { LocaleType } from "../types/general/type";
import { BannerTranslateDataType } from "../types/data/type";

type TranslateDataType = BannerTranslateDataType;

type GetTranslateDataType = {
    id: number,
    activeLocale: LocaleType,
    key: "title" | "text",
    translateData: TranslateDataType[]
}

class Banner {
    private baseURL = process.env.BASE_URL;
    private apiKey = 'banner'
    private api = {
        all: `${this.baseURL}/api/site/${this.apiKey}/all`,
        active: `${this.baseURL}/api/site/${this.apiKey}/active`,
    }
    private errors = {
        all: `${this.apiKey} all data fetch failed`,
        active: `${this.apiKey} active data fetch failed`,
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
    public getTranslate(params: GetTranslateDataType) {
        const activeTranslateData: TranslateDataType | undefined = params.translateData.find((data) => data.banner_id === params.id && data.lang === params.activeLocale);
        let translate = "";
        
        if (activeTranslateData) {
            switch (params.key) {
                case "title":
                    return translate = activeTranslateData.title !== null ? activeTranslateData.title : '';
                case "text":
                    return translate = activeTranslateData.text !== null ? activeTranslateData.text : '';
                default:
                    return translate = "";
            }
        }
        return translate;
    }
}

export default Banner;