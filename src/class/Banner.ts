import axios, { AxiosRequestConfig } from "axios";
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
            const response = await axios.post(this.api.active, {id}, this.axiosConfig);
            if (response.status !== 200) {
                throw new Error(this.errors.active);
            }

            return response.data;
        } catch (error: any) {
            return this.handleError(error, this.errors.active);
        }
    }
    public getTranslate(params: GetTranslateDataType): string {
        const { id, key, activeLocale, translateData } = params;
        const activeTranslateData: TranslateDataType | undefined = translateData.find((data) => data.banner_id === id && data.lang === activeLocale);
        return activeTranslateData ? activeTranslateData[key] ?? '' : '';
    }
}

export default Banner;