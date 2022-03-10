import { useState } from 'react'
import { useEffect } from 'react'
import EachPrivatePostCard from '../../components/EachPrivatePostCard/EachPrivatePostCard.jsx'
import commentServices from '../../services/comment.service.js'
import privateService from '../../services/private.service.js'
import userService from '../../services/user.service.js'

const EachPrivatePost = ({ eachPrivatePost }) => {

    const [privPost, setPrivPost] = useState()
    const [newComments, setNewComments] = useState()
    const [newUser, setNewUser] = useState()

    let info
    useEffect(() => {
        privateService
            .getPostById(eachPrivatePost)
            .then((allpost) => {
                info = allpost.data
                setPrivPost(allpost.data)
                const idsComments = allpost.data.comments
                let allcomments = idsComments.map(eachComment => commentServices.getOneComment(eachComment))
                return Promise.all(allcomments)
            })
            .then((data) => {
                const datos = data.map(elm => elm.data)
                setNewComments(datos)
                const idUser = info.user
                return userService.getOneUserById(idUser)
            })
            .then(({ data }) => {
                setNewUser(data)
            })
            .catch(err => console.log(err))
    }, [])

    const newInfo = { ...privPost, comments: newComments, user: newUser }

    return (
        <>
            <EachPrivatePostCard privatePostInfo={newInfo} />
        </>
    )
}

export default EachPrivatePost