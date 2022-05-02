import { useEffect, useState } from "react"
import userService from "../../services/user.service"

const FriendsChatWindow = ({ eachConv }) => {
    const [friendInfo, setFriendInfo] = useState({})
    const friendId = eachConv?.members[1]

    useEffect(() => {
        if (friendId != undefined) {
            userService
                .getOneUserById(friendId)
                .then(({ data }) => setFriendInfo(data))
                .catch(err => {
                    throw new Error(err)
                })
        }
    }, [])

    return (
        <>
            <div className="chatOneFriend">
                <img src={friendInfo?.imageURL} alt="friend photo" />
                <div className="chatOneFriendInfo">
                    <p>{friendInfo?.nameUser} {friendInfo?.surnameUser}</p>
                    <p className="displayNone">{eachConv?._id}</p>
                </div>
            </div>
            <hr />
        </>
    )
}

export default FriendsChatWindow