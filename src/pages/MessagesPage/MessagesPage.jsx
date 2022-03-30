import { useContext, useEffect, useState } from "react"
import FriendsChatWindow from "../../components/FriendsChatWindow/FriendsChatWindow"
import userService from "../../services/user.service"
import { AuthContext } from '../../context/auth.context'
import Chat from "../../components/Chat/Chat"

const MessagesPage = () => {

    const { user } = useContext(AuthContext)
    const [userInfo, setUserInfo] = useState({})
    const [friendSelected, setFriendSelected] = useState([])
    const [friendRaw, setFriendRaw] = useState('')

    useEffect(() => {
        userService
            .getOneUserById(user?._id)
            .then(({ data }) => {
                setUserInfo(data)
                const friendsList = data.friends?.map(eachFriend => userService.getOneUserById(eachFriend).then(({ data }) => data))
                return Promise.all(friendsList)
            })
            .then(friends => setFriendSelected(friends))
            .catch(err => console.log(err))
    }, [user?._id])

    const friend = friendSelected?.find(elm => elm.imageURL === friendRaw)

    return (
        <div className="messagesPage">
            <div className="friendsListChat" onClick={(e) => setFriendRaw(e.target.parentElement.firstChild.getAttribute('src'))}>
                {
                    userInfo.friends?.map((eachFriend, idx) => <FriendsChatWindow key={idx} eachFriend={eachFriend} />)
                }
            </div>
            {
                friend !== undefined &&
                <Chat friend={friend} />
            }
        </div>
    )
}

export default MessagesPage