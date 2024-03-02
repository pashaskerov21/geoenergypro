import axios from "axios";

class Gallery {
    private baseURL = process.env.BASE_URL;
    private apiKey = 'gallery'
    private api = {
        all: `${this.baseURL}/api/site/${this.apiKey}/all`,
    }
    private errors = {
        all: `${this.apiKey} all data fetch failed`,
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
}

export default Gallery;