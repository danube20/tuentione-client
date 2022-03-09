import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import EachOwnedPost from "../../components/EachOwnedPost/EachOwnedPost"
import PostForm from "../../components/PostForm/PostForm"
import { AuthContext } from "../../context/auth.context"
import userService from "../../services/user.service"
import FriendsList from '../../components/FriendsList/FriendsList'
import AddDelFriendBtn from "../../components/AddDelFriendBtn/AddDelFriendBtn"

const ProfilePage = () => {

    const { username } = useParams()

    const [userInfo, setUserInfo] = useState({})
    const { user } = useContext(AuthContext)

    useEffect(() => {
        userService
            .getOneUser(username)
            .then(({ data }) => setUserInfo(data))
            .catch(err => console.log(err))
    }, [username])

    return (
        <>
            <div className="containerEditProfile">
                <img src={userInfo.imageURL} alt="imagen de usuari@" />
                <div className="profileInfo">
                    <p>{userInfo.nameUser} {userInfo.surnameUser}</p>
                    <p>@{userInfo?.username}</p>
                    <p className="biography"><span>Biografía</span><br />{userInfo.biography} </p>
                    <p><i class="fa-solid fa-cake-candles"></i> {userInfo.birthday?.slice(0, 10)}</p>
                </div>
                <div className="profileEditBtn">
                    <Link to={`/${userInfo?.username}/editar`}>
                        {username && username && user?.username === username && <button className="profileButton"><i class="fa-solid fa-pencil"></i></button>}
                    </Link>
                    {
                        username && user?.username !== username &&
                        <Link to={`/${userInfo?.username}/privado`}>
                            <button className="profilePrivateButton">Fanáticos no more</button>
                        </Link>
                    }
                    {username && user?.username !== username && <AddDelFriendBtn />}
                </div>
            </div>
            <div className="mobileProfilePage profileBodyContainer">
                <div className="">
                    <FriendsList />
                </div>
                <div className="mobileProfilePage">
                    <PostForm />
                    <hr />
                    <EachOwnedPost />
                </div>
            </div>
        </>
    )
}

export default ProfilePage