import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import userService from "../../services/user.service"

const AddDelFriendBtn = () => {

    const [checkFriend, setCheckFriend] = useState()
    const { user } = useContext(AuthContext)
    const { username } = useParams()

    // Get user information through params
    const loadUsers = () => {
        userService
            .getOneUser(username)
            .then(({ data }) => setCheckFriend(data))
            .catch(err => console.log(err))
    }
    useEffect(() => loadUsers(), [])

    // Filter to check if the current logged user is in the array of the params user
    let response
    const checkAllFriends = () => {
        const recognizeFriend = checkFriend.friends.filter(eachFriend => eachFriend._id === user?._id)

        if (recognizeFriend.length === 0) { response = false } else { response = true }

        return response
    }

    if (checkFriend) {
        checkAllFriends()
    }

    const addFriend = () => { // Push the user to the friend's array
        response = true
        userService
            .addFriend(checkFriend?._id)
            .then(() => loadUsers())
            .catch(err => console.log(err))
    }

    const delFriend = () => { // Pull the user from the friend's array
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