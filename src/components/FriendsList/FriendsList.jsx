import { Link } from "react-router-dom"

const FriendsList = ({ userFriends }) => {

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