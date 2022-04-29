import EachOwnedPostList from "../EachOwnedPostList/EachOwnedPostList"

const EachOwnedPost = ({ userInfo }) => {
    return (
        <>
            {
                userInfo.posts?.length > 0
                    ?
                    userInfo?.posts.reverse().map((eachPost, idx) => <EachOwnedPostList key={idx} eachPost={eachPost} />)
                    :
                    <div className="profileNoPost">
                        <p>¡<span>{userInfo?.username}</span> aún no ha publicado posts!</p>
                    </div>
            }
        </>
    )
}

export default EachOwnedPost