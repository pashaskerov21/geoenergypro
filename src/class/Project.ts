import axios from "axios";
import { LocaleType } from "../types/general/type";
import { ProjectCategoryTranslateDataType, ProjectTranslateDataType, ProjectTranslateKeyType } from "../types/data/type";


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
        const activeTranslateData: TranslateDataType | undefined = params.translateData.find((data) => data.project_id === params.id && data.lang === params.activeLocale);
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
    public getCategoryTranslate(params: GetCategoryTranslateDataType) {
        const activeTranslateData: CategoryTranslateDataType | undefined = params.translateData.find((data) => data.cat_id === params.id && data.lang === params.activeLocale);
        let translate = "";

        if (activeTranslateData) {
            switch (params.key) {
                case "title":
                    return translate = activeTranslateData.title !== null ? activeTranslateData.title : '';
                default:
                    return translate = "";
            }
        }
        return translate;
    }

}

export default Project;