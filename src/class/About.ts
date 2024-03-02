import axios from "axios";
import { LocaleType } from "../types/general/type";
import { AboutTranslateDataType, AboutTranslateKeyType } from "../types/data/type";

type GetTranslateDataType = {
    id: 1,
    activeLocale: LocaleType,
    key: AboutTranslateKeyType,
    translateData: AboutTranslateDataType[]
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
        const activeTranslateData: AboutTranslateDataType | undefined = params.translateData.find((data) => data.about_id === params.id && data.lang === params.activeLocale);
        let translate = "";

        if (activeTranslateData) {
            switch (params.key) {
                case "title":
                    return translate = activeTranslateData.title !== null ? activeTranslateData.title : '';
                case "sub_title":
                    return translate = activeTranslateData.sub_title !== null ? activeTranslateData.sub_title : '';
                case "text":
                    return translate = activeTranslateData.text !== null ? activeTranslateData.text : '';
                default:
                    return translate = "";
            }
        }
        return translate;
    }
}

export default About;