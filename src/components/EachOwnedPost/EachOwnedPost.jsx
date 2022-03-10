import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import userService from "../../services/user.service"
import EachOwnedPostList from "../EachOwnedPostList/EachOwnedPostList"

const EachOwnedPost = () => {

    const [ownedPosts, setOwnedPosts] = useState([])
    const { username } = useParams()

    useEffect(() => { // Get posts id from users data
        userService
            .getOneUser(username)
            .then(({ data }) => {
                setOwnedPosts(data.posts)
            })
            .catch(err => console.log(err))
    }, [username])

    return (
        <>
            {
                ownedPosts.length > 0
                    ?
                    ownedPosts.reverse().map((eachPost, idx) => <EachOwnedPostList key={idx} eachPost={eachPost} />)
                    :
                    <div className="profileNoPost">
                        <p>¡<span>{username}</span> aún no ha publicado posts!</p>
                    </div>
            }
        </>
    )
}

export default EachOwnedPost