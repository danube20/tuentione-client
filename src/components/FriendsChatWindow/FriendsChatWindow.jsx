import { useEffect, useState } from "react"
import userService from "../../services/user.service"

const FriendsChatWindow = ({ eachFriend }) => {
    const [friendInfo, setFriendInfo] = useState({})

    useEffect(() => {
        userService
            .getOneUserById(eachFriend)
            .then(({ data }) => setFriendInfo(data))
            .catch(err => console.log(err))
    }, [])
    return (
        <>
            <div className="chatOneFriend" onClick={() => console.log(friendInfo.nameUser)}>
                <img src={friendInfo?.imageURL} alt="friend photo" />
                <div className="chatOneFriendInfo">
                    <p>{friendInfo.nameUser} {friendInfo.surnameUser}</p>
                </div>
            </div>
            <hr />
        </>
    )
}

export default FriendsChatWindow