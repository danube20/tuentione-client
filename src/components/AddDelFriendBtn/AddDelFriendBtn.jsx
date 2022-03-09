import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import userService from "../../services/user.service"

const AddDelFriendBtn = () => {

    const [checkFriend, setCheckFriend] = useState()
    const { user } = useContext(AuthContext)
    const { username } = useParams()
    const [isFriend, setIsFriend] = useState(false)

    const loadUsers = () => {
        userService
            .getOneUser(username)
            .then(({ data }) => setCheckFriend(data))
            .catch(err => console.log(err))
    }
    useEffect(() => loadUsers(), [])
    let response

    const checkAllFriends = () => {
        const recognizeFriend = checkFriend.friends.filter(eachFriend => eachFriend._id === user?._id)

        if (recognizeFriend.length === 0) { response = false } else { response = true }

        return response
    }

    if (checkFriend) {
        checkAllFriends()
    }

    const addFriend = () => {
        setIsFriend(true)
        response = true
        userService
            .addFriend(checkFriend?._id)
            .then(() => loadUsers())
            .catch(err => console.log(err))
    }

    const delFriend = () => {
        setIsFriend(false)
        response = false
        userService
            .delFriend(checkFriend?._id)
            .then(() => loadUsers())
            .catch(err => console.log(err))
    }

    return (
        !response
            ?
            <button className='discoverAddBtn' onClick={() => addFriend()}>Añadir</button>
            :
            <button className='discoverDelBtn' onClick={() => delFriend()}><i className="fa-solid fa-user-xmark"></i></button>
    )
}

export default AddDelFriendBtn