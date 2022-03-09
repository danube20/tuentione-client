import axios from 'axios'

class UserService {
    constructor() {
        this.axios = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/user` })

        this.axios.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken")

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getOneUserById(id) {
        return this.axios.get(`/getUserById/${id}`)
    }

    getOneUser(username) {
        return this.axios.get(`/getUser/${username}`)
    }

    editProfileUser(id, info) {
        return this.axios.put(`/${id}/edit-profile`, info)
    }

    getAllUsers() {
        return this.axios.get('/')
    }

    addFriend(eachUser_id) {
        return this.axios.put(`/${eachUser_id}/addFriend`)
    }

    delFriend(eachUser_id) {
        return this.axios.put(`/${eachUser_id}/delFriend`)
    }

}

const userService = new UserService()

export default userService