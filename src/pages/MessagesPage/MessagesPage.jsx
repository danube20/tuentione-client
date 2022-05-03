import { useContext, useEffect, useState } from "react"
import FriendsChatWindow from "../../components/FriendsChatWindow/FriendsChatWindow"
import userService from "../../services/user.service"
import { AuthContext } from '../../context/auth.context'
import Chat from "../../components/Chat/Chat"
import chatService from "../../services/chat.service"

const MessagesPage = () => {

    const { user } = useContext(AuthContext)
    const [oneConv, setOneConv] = useState([])
    const [convId, setConvId] = useState('')

    useEffect(() => {
        chatService
            .getConversation(user?._id)
            .then(({ data }) => setOneConv(data))
            .catch(err => console.log(err))
    }, [user?._id])

    console.log('convid', convId);
    return ( // TODO: Crear modal cuando esté en responsive mobile
        <div className="messagesPage">
            <div className="friendsListChat" onClick={(e) => setConvId(e.target.lastChild.textContent)}>
                {
                    oneConv?.map((eachConv, idx) => <FriendsChatWindow eachConv={eachConv} key={idx} />)
                }
            </div>
            {/* <Chat /> */}
            <p style={{ color: 'rgba(0,0,0,0.3' }}>Chat en desarrollo...</p>
        </div>
    )
}

export default MessagesPage