import { useContext, useEffect, useState } from "react"
import { AuthContext } from '../../context/auth.context'
import userService from '../../services/user.service'

const ChatWindow = () => {

    const { user } = useContext(AuthContext)
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        userService
            .getOneUserById(user?._id)
            .then(({ data }) => setUserInfo(data))
            .catch(err => console.log(err))
    }, [])

    const toggleChat = (e) => {
        const parent = e.target.parentElement.parentElement
        const element = e.target
        parent.classList.toggle('openedWindow')
        element.classList.remove('fa-solid fa-chevron-down')
    }

    return (
        <div className="chatWindow">
            <div className="chatUserInfo">
                <div style={{ display: 'flex' }}>
                    <img src={userInfo?.imageURL} alt={userInfo?.nameUser} />
                    <p>Mensajes</p>
                </div>
                <i className="fa-solid fa-chevron-up" onClick={(e) => toggleChat(e)}></i>
            </div>
        </div>
    )
}

export default ChatWindow