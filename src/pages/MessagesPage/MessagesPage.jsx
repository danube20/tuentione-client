import { useContext, useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import FriendsChatWindow from "../../components/FriendsChatWindow/FriendsChatWindow"
import userService from "../../services/user.service"
import { AuthContext } from '../../context/auth.context'

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
                <div className="chatWindow">
                    <div className="friendInfoPage">
                        <div>
                            <img src={friend?.imageURL} alt={friend?.username} />
                            <p>{friend?.nameUser} {friend?.surnameUser}</p>
                        </div>
                        <Link to={`/perfil/${friend?.username}`}>Ir al perfil</Link>
                    </div>
                    <div className="chatWindowMessages"></div>
                    <div className="chatWindowInput">
                        <input type="text" name="chat" placeholder="Envía un mensaje..." />
                    </div>
                </div>
            }
        </div>
    )
}

export default MessagesPage