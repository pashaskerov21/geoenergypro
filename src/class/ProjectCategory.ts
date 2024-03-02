import axios from "axios";
import { LocaleType } from "../types/general/type";
import { ProjectCategoryDataType, ProjectCategoryTranslateDataType } from "../types/data/type";

type DataType = ProjectCategoryDataType;
type TranslateDataType = ProjectCategoryTranslateDataType;
type UpdateDataType = {
    main: {
        id: number,
    }
    translate: {
        lang: LocaleType[],
        title: string[],
    }
};
type StoreDataType = {
    translate: {
        lang: LocaleType[],
        title: string[],
    }
};
type GetTranslateDataType = {
    id: number,
    activeLocale: LocaleType,
    key: "title",
    translateData: TranslateDataType[]
}

class ProjectCategory {
    private baseURL = process.env.BASE_URL;
    private apiKey = 'project_category'
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
        const activeTranslateData: TranslateDataType | undefined = params.translateData.find((data) => data.cat_id === params.id && data.lang === params.activeLocale);
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

export default ProjectCategory;