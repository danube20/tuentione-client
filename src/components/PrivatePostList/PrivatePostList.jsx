import { useContext } from "react"
import { PostsContext } from "../../context/posts.context"
import EachPrivatePost from '../../components/EachPrivatePost/EachPrivatePost'

const PrivatePostList = () => {

    const { privatePosts } = useContext(PostsContext)

    return (
        <div className="privatePostList">
            {privatePosts?.map((eachPrivatePost, idx) => <EachPrivatePost key={idx} eachPrivatePost={eachPrivatePost} />)}
        </div>
    )
}

export default PrivatePostList