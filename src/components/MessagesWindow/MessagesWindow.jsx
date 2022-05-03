import { useContext, useEffect, useState } from "react"
import { AuthContext } from '../../context/auth.context'
import chatService from "../../services/chat.service"
import userService from '../../services/user.service'
import FriendsChatWindow from "../FriendsChatWindow/FriendsChatWindow"

const MessagesWindow = () => {

    const { user } = useContext(AuthContext)
    const [oneConv, setOneConv] = useState([])
    const [userInfo, setUserInfo] = useState({})
    const chat = user?._id === undefined ? 'displayNone' : 'MessagesWindow'
    let icon = false

    useEffect(() => {
        userService
            .getOneUserById(user?._id)
            .then(({ data }) => {
                setUserInfo(data)
                return chatService.getConversation(user?._id)
            })
            .then(({ data }) => setOneConv(data))
            .catch(err => console.log(err))
    }, [user?._id])

    const toggleChat = (e) => {
        const parent = e.target.parentElement.parentElement
        parent.classList.toggle('openedWindow')
        parent.lastChild.classList.toggle('chatFriends')
        if (parent.classList === 'chatFriendsNone') { // TODO: perfilar mejor el overflow
            parent.style.overflow = 'hidden'
        } else {
            parent.style.overflow = 'auto'
        }
    }

    const arwup = () => icon = false
    const arwdwn = () => icon = true

    return (
        <div className={chat}>
            <div className="chatUserInfo">
                <div style={{ display: 'flex' }}>
                    <img src={userInfo?.imageURL} alt={userInfo?.nameUser} />
                    <p>Mensajes</p>
                </div>
                {
                    !icon // TODO: Arreglar el bool para cambiar de icono
                        ?
                        <i className="fa-solid fa-chevron-up" onClick={(e) => {
                            arwup()
                            toggleChat(e)
                        }}></i>
                        :
                        <i className='fa-solid fa-chevron-down' onClick={(e) => {
                            arwdwn()
                            toggleChat(e)
                        }}></i>
                }
            </div>
            <div className="chatFriendsNone">
                {oneConv?.map((eachConv, idx) => <FriendsChatWindow key={idx} eachConv={eachConv} />)}
            </div>
        </div>
    )
}

export default MessagesWindow