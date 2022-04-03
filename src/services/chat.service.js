import axios from 'axios'

class ChatService {
    constructor() {
        this.axios = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}` })

        this.axios.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken")

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    // Conversation

    createConversation(senderId, receiverId) {
        return this.axios.post('/conversation', { senderId, receiverId })
    }

    getConversation(userId) {
        return this.axios.get(`/conversation/${userId}`)
    }

    // Messages

    createMessage(info) {
        return this.axios.post('/messages', info)
    }

    getMessage(messageId) {
        return this.axios.get(`/messages/${messageId}`)
    }
}

const chatService = new ChatService()
export default chatService