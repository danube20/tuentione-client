import { useEffect, useState } from "react"
import userService from "../../services/user.service"
import { Link } from "react-router-dom"

const FriendsCard = ({ eachFriend }) => {

    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        userService
            .getOneUserById(eachFriend)
            .then(({ data }) => {
                setUserInfo(data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="friendsCardContainer">
            <Link className="friendsCardBtn" to={`/perfil/${userInfo?.username}`}>
                <img src={userInfo?.imageURL} alt="imagen de usuari@" />
            </Link>
            <div className="friendsCardUserInfo">
                <Link className="friendsCardBtn" to={`/perfil/${userInfo?.username}`}>
                    <p>{userInfo?.nameUser} {userInfo?.surnameUser}</p>
                    <p>@{userInfo.username}</p>
                </Link>
            </div>
        </div>
    )
}

export default FriendsCard