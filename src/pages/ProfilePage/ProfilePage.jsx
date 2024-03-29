import { useContext, useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
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
    const [showFriends, setShowFriends] = useState(false)

    useEffect(() => {
        userService
            .getOneUser(username)
            .then(({ data }) => setUserInfo(data))
            .catch(err => console.log(err))
    }, [username])

    const location = useLocation()
    const isMyProfile = location.pathname.includes(user?.username)
    const newClass = isMyProfile ? 'ownProfilePrivateButton' : 'profilePrivateButton'

    let response
    const checkAllFriends = () => {
        const recognizeFriend = userInfo.friends?.filter(eachFriend => eachFriend._id === user?._id)

        if (recognizeFriend?.length === 0) { response = false } else { response = true }

        return response
    }

    if (userInfo) {
        checkAllFriends()
    }

    // Boolean to manage the state the button to see friend's list
    const showFriendsFunc = () => setShowFriends(true)
    const hideFriendsFunc = () => setShowFriends(false)

    return (
        <>
            <div className="containerEditProfile">
                <img src={userInfo.imageURL} alt="user profile" />
                <div className="profileInfo">
                    <p>{userInfo.nameUser} {userInfo.surnameUser} {response || username === user?.username ? <Link to={`/${userInfo?.username}/privado`}><button className={newClass}><i className="fa-solid fa-fire"></i></button></Link> : ''}</p>
                    <p>@{userInfo?.username}</p>
                    <p className="biography"><span>Biografía</span><br />{userInfo.biography} </p>
                    <p><i className="fa-solid fa-cake-candles"></i> {userInfo.birthday?.slice(0, 10)}</p>
                </div>
                <div className="profileEditBtn">
                    <Link to={`/${userInfo?.username}/editar`}>
                        {
                            username && username && user?.username === username &&
                            <button className="profileButton"><i className="fa-solid fa-pencil"></i></button>
                        }
                    </Link>
                    {
                        username && user?.username !== username &&
                        <>
                            <AddDelFriendBtn />
                        </>
                    }
                </div>
            </div>
            <div className="mobileProfilePage profileBodyContainer">
                <div className="profileFriendsList" id="profileFriendsList">
                    <div className="mobileProfileFriendsList">
                        {
                            !showFriends
                                ?
                                <button onClick={showFriendsFunc}>Ver lista de amigos</button>
                                :
                                <>
                                    <button onClick={hideFriendsFunc}>Ocultar lista de amigos</button>
                                    <p>Lista de amigos</p>
                                    <div>
                                        <FriendsList userFriends={userInfo.friends} />
                                    </div>
                                </>
                        }
                    </div>
                    <div className="profileFriendsListDiv">
                        <FriendsList userFriends={userInfo.friends} />
                    </div>
                </div>
                <div className="mobileProfilePage profilePosts">
                    {
                        username && user?.username === username &&
                        <>
                            <PostForm />
                            <hr />
                        </>
                    }
                    <EachOwnedPost userInfo={userInfo} />
                </div>
            </div>
        </>
    )
}

export default ProfilePage