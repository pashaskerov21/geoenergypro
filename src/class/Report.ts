import axios from "axios";
import { LocaleType } from "../types/general/type";
import { ReportTranslateDataType } from "../types/data/type";


type TranslateDataType = ReportTranslateDataType;
type GetTranslateDataType = {
    id: number,
    activeLocale: LocaleType,
    key: "title",
    translateData: TranslateDataType[]
}

class Report {
    private baseURL = process.env.BASE_URL;
    private apiKey = 'report'
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
    public getTranslate(params: GetTranslateDataType): string {
        const { id, key, activeLocale, translateData } = params;
        const activeTranslateData: TranslateDataType | undefined = translateData.find((data) => data.report_id === id && data.lang === activeLocale);
        return activeTranslateData ? activeTranslateData[key] ?? '' : '';
    }
}

export default Report;