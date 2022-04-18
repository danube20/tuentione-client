import { useEffect, useState } from "react"
import userService from "../../services/user.service"
import { Link, useParams } from "react-router-dom"

const FriendsList = () => {

    const [userFriends, setUserFriends] = useState([])
    const { username } = useParams()

    useEffect(() => {
        userService
            .getOneUser(username)
            .then(({ data }) => setUserFriends(data.friends))
            .catch(err => console.log(err))
    }, [username])

    return (
        <div className="friendsListContainer">
            {
                userFriends?.map((eachFriend, idx) => {
                    return <div className="friendsCardContainer friendsCardProfile" key={idx}>
                        <Link className="friendsCardBtn" to={`/perfil/${eachFriend?.username}`}>
                            <img src={eachFriend?.imageURL} alt="user profile" />
                        </Link>
                        <div className="friendsCardUserInfo">
                            <Link className="friendsCardBtn" to={`/perfil/${eachFriend?.username}`}>
                                <p>{eachFriend?.nameUser} {eachFriend?.surnameUser}</p>
                                <p>@{eachFriend.username}</p>
                            </Link>
                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default FriendsList