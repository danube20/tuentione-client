import EachPost from "../EachPost/EachPost"
import { useContext } from "react"
import { PostsContext } from '../../context/posts.context'

const PostList = () => {

    const { posts } = useContext(PostsContext)

    return (
        <>
            {
                posts.map((eachPost, idx) => <EachPost key={idx} eachPost={eachPost} />)
            }
        </>
    )
}

export default PostList