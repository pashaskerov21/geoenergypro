import axios, { AxiosRequestConfig } from "axios";
import { LocaleType } from "../types/general/type";

class Page {
    private baseURL = process.env.BASE_URL;
    private api = {
        root: `${this.baseURL}/api/site/pages/root`,
        home: `${this.baseURL}/api/site/pages/home`,
        about: `${this.baseURL}/api/site/pages/about`,
        services: `${this.baseURL}/api/site/pages/services`,
        service_inner: `${this.baseURL}/api/site/pages/service_inner`,
        projects: `${this.baseURL}/api/site/pages/projects`,
        project_inner: `${this.baseURL}/api/site/pages/project_inner`,
        project_category_inner: `${this.baseURL}/api/site/pages/project_category_inner`,
        news: `${this.baseURL}/api/site/pages/news`,
        news_inner: `${this.baseURL}/api/site/pages/news_inner`,
        news_category_inner: `${this.baseURL}/api/site/pages/news_category_inner`,
        gallery: `${this.baseURL}/api/site/pages/gallery`,
        contact: `${this.baseURL}/api/site/pages/contact`,
    }
    private errors = {
        root: `root data fetch failed`,
        home: `home data fetch failed`,
        about: `about data fetch failed`,
        services: `services data fetch failed`,
        service_inner: `service_inner data fetch failed`,
        projects: `projects data fetch failed`,
        project_inner: `project_inner data fetch failed`,
        project_category_inner: `project_category_inner data fetch failed`,
        news: `news data fetch failed`,
        news_inner: `news_inner data fetch failed`,
        news_category_inner: `news_category_inner data fetch failed`,
        gallery: `gallery data fetch failed`,
        contact: `contact data fetch failed`,
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

    public root = async () => {
        try {
            const response = await axios.get(this.api.root, this.axiosConfig)
            if (response.status !== 200) {
                throw new Error(this.errors.root);
            }

            return response.data;
        } catch (error: any) {
            return this.handleError(error, this.errors.root);
        }
    }
    public home = async () => {
        try {
            const response = await axios.get(this.api.home, this.axiosConfig)
            if (response.status !== 200) {
                throw new Error(this.errors.home);
            }

            return response.data;
        } catch (error: any) {
            return this.handleError(error, this.errors.home);
        }
    }
    public about = async () => {
        try {
            const response = await axios.get(this.api.about, this.axiosConfig)
            if (response.status !== 200) {
                throw new Error(this.errors.about);
            }

            return response.data;
        } catch (error: any) {
            return this.handleError(error, this.errors.about);
        }
    }
    public services = async () => {
        try {
            const response = await axios.get(this.api.services, this.axiosConfig)
            if (response.status !== 200) {
                throw new Error(this.errors.services);
            }

            return response.data;
        } catch (error: any) {
            return this.handleError(error, this.errors.services);
        }
    }
    public service_inner = async (data: { lang: LocaleType, slug: string }) => {
        try {
            const response = await axios.post(this.api.service_inner, { data }, this.axiosConfig)
            if (response.status !== 200) {
                throw new Error(this.errors.service_inner);
            }

            return response.data;
        } catch (error: any) {
            return this.handleError(error, this.errors.service_inner);
        }
    }
    public projects = async () => {
        try {
            const response = await axios.get(this.api.projects, this.axiosConfig)
            if (response.status !== 200) {
                throw new Error(this.errors.projects);
            }

            return response.data;
        } catch (error: any) {
            return this.handleError(error, this.errors.projects);
        }
    }
    public project_inner = async (data: { lang: LocaleType, slug: string }) => {
        try {
            const response = await axios.post(this.api.project_inner, { data }, this.axiosConfig)
            if (response.status !== 200) {
                throw new Error(this.errors.project_inner);
            }

            return response.data;
        } catch (error: any) {
            return this.handleError(error, this.errors.project_inner);
        }
    }
    public project_category_inner = async (data: { lang: LocaleType, slug: string }) => {
        try {
            const response = await axios.post(this.api.project_category_inner, { data }, this.axiosConfig)
            if (response.status !== 200) {
                throw new Error(this.errors.project_category_inner);
            }

            return response.data;
        } catch (error: any) {
            return this.handleError(error, this.errors.project_category_inner);
        }
    }
    public news = async () => {
        try {
            const response = await axios.get(this.api.news, this.axiosConfig)
            if (response.status !== 200) {
                throw new Error(this.errors.news);
            }

            return response.data;
        } catch (error: any) {
            return this.handleError(error, this.errors.news);
        }
    }
    public news_inner = async (data: { lang: LocaleType, slug: string }) => {
        try {
            const response = await axios.post(this.api.news_inner, { data }, this.axiosConfig)
            if (response.status !== 200) {
                throw new Error(this.errors.news_inner);
            }

            return response.data;
        } catch (error: any) {
            return this.handleError(error, this.errors.news_inner);
        }
    }
    public news_category_inner = async (data: { lang: LocaleType, slug: string }) => {
        try {
            const response = await axios.post(this.api.news_category_inner, { data }, this.axiosConfig)
            if (response.status !== 200) {
                throw new Error(this.errors.news_category_inner);
            }

            return response.data;
        } catch (error: any) {
            return this.handleError(error, this.errors.news_category_inner);
        }
    }
    public gallery = async () => {
        try {
            const response = await axios.get(this.api.gallery, this.axiosConfig)
            if (response.status !== 200) {
                throw new Error(this.errors.gallery);
            }

            return response.data;
        } catch (error: any) {
            return this.handleError(error, this.errors.gallery);
        }
    }
    public contact = async () => {
        try {
            const response = await axios.get(this.api.contact, this.axiosConfig)
            if (response.status !== 200) {
                throw new Error(this.errors.contact);
            }

            return response.data;
        } catch (error: any) {
            return this.handleError(error, this.errors.contact);
        }
    }
}

export default Page;