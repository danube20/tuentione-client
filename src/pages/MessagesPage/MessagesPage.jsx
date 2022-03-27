import { useContext, useEffect, useState } from "react"
import FriendsChatWindow from "../../components/FriendsChatWindow/FriendsChatWindow"
import userService from "../../services/user.service"
import { AuthContext } from '../../context/auth.context'

const MessagesPage = () => {

    const { user } = useContext(AuthContext)
    const [userInfo, setUserInfo] = useState({})
    const [friendSelected, setFriendSelected] = useState([])
    const [friendName, setFriendName] = useState('')

    useEffect(() => {
        userService
            .getOneUserById(user?._id)
            .then(({ data }) => {
                setUserInfo(data)
                const friendsList = data.friends?.map(eachFriend => userService.getOneUserById(eachFriend))
                return Promise.all(friendsList)
            })
            .then(friends => console.log(friends)) // Mejorar la obtención de datos
            .catch(err => console.log(err))
    }, [user?._id])

    // const friendRaw = friendSelected?.filter(elm => elm.data.imageURL === friendName)



    return (
        <div className="messagesPage">
            <div className="friendsListChat" onClick={(e) => setFriendName(e.target.parentElement.firstChild.getAttribute('src'))}>
                {
                    userInfo.friends?.map((eachFriend, idx) => <FriendsChatWindow key={idx} eachFriend={eachFriend} />)
                }
            </div>
            <div className="chatWindow">
                {

                }
            </div>
        </div>
    )
}

export default MessagesPage