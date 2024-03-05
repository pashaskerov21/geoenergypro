import axios, { AxiosRequestConfig } from "axios";
import { LocaleType } from "../types/general/type";
import { AboutTranslateDataType, AboutTranslateKeyType } from "../types/data/type";

type TranslateDataType = AboutTranslateDataType
type GetTranslateDataType = {
    id: 1,
    activeLocale: LocaleType,
    key: AboutTranslateKeyType,
    translateData: TranslateDataType[]
}

class About {
    private baseURL = process.env.BASE_URL;
    private apiKey = 'about'
    private api = {
        active: `${this.baseURL}/api/site/${this.apiKey}/active`,
    }
    private errors = {
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
    public getTranslate(params: GetTranslateDataType): string {
        const { id, key, activeLocale, translateData } = params;
        const activeTranslateData: TranslateDataType | undefined = translateData.find((data) => data.about_id === id && data.lang === activeLocale);
        return activeTranslateData ? activeTranslateData[key] ?? '' : '';
    }
}

export default About;