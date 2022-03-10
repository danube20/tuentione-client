import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import EachPrivatePost from '../../components/EachPrivatePost/EachPrivatePost'
import userService from "../../services/user.service"

const PrivatePostList = () => {

    const [privatePosts, setPrivatePosts] = useState([])
    const { username } = useParams()

    useEffect(() => {
        userService
            .getOneUser(username)
            .then(({ data }) => setPrivatePosts(data.privatePosts))
            .catch(error => console.log(error))
    }, [])

    return (
        <div className="privatePostList">
            {
                privatePosts.length > 0
                    ?
                    privatePosts?.reverse().map((eachPrivatePost, idx) => <EachPrivatePost key={idx} eachPrivatePost={eachPrivatePost} />)
                    :
                    <div className="profileNoPost">
                        <p>!<span>{username}</span> aún no ha publicado posts!</p>
                    </div>
            }
        </div>
    )
}

export default PrivatePostList