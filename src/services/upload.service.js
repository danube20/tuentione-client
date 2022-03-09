import axios from 'axios'

class UploadService {

    constructor() {

        this.axios = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/upload` })

        this.axios.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken")

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    uploadImage(imageForm) {
        return this.axios.post('/image', imageForm)
    }
}

const uploadService = new UploadService()

export default uploadService