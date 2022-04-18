import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import userService from "../../services/user.service"
import chatService from "../../services/chat.service"

const AddDelFriendBtn = ({ friendId }) => {

    const [checkFriend, setCheckFriend] = useState()
    const { user } = useContext(AuthContext)
    const { username } = useParams()

    // Get user information through params
    const loadUsers = () => {
        userService
            .getOneUser(username || friendId)
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

    const addFriend = () => { // Push the user to the friend's array and creates new conversation
        response = true
        userService
            .addFriend(checkFriend?._id)
            .then(() => {
                loadUsers()
                return chatService.createConversation(user?._id, checkFriend?._id)
            })
            .catch(err => console.log(err))
    }

    const delFriend = () => { // Pull the user from the friend's array and deletes its conversation
        response = false
        let friendConv
        userService
            .delFriend(checkFriend?._id)
            .then(() => {
                loadUsers()
                return userService.getOneUserById(checkFriend?._id)
            })
            .then(({ data }) => {
                friendConv = data.conversations
                return userService.getOneUserById(user?._id).then(({ data }) => data)
            })
            .then(data => {
                const userConv = data.conversations
                const convId = friendConv.filter(elm => userConv.includes(elm))

                if (convId !== undefined) chatService.deleteConversation(convId)

                return chatService.removeConversation(checkFriend?._id, convId)
            })
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