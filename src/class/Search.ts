import axios, { AxiosRequestConfig } from "axios";
import { MessageDataType } from "../types/data/type";

class Message {
    private baseURL = process.env.BASE_URL;
    private apiKey = 'messages'
    private api = {
        store: `${this.baseURL}/api/site/${this.apiKey}/store`,
    }
    private errors = {
        store: `Message send failed`,
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
    public store = async (data: MessageDataType) => {
        try {
            const response = await axios.post(this.api.store, { data }, this.axiosConfig);
            if (response.status !== 200) {
                throw new Error(this.errors.store);
            }

            return response.data;
        } catch (error: any) {
            return this.handleError(error, this.errors.store);
        }
    }
}

export default Message