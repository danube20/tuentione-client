import { useContext, useState } from "react"
import { Link } from 'react-router-dom'
import { Modal } from "react-bootstrap"
import { AuthContext } from "../../context/auth.context"
import posteosService from "../../services/posteos.service"
import DropDownComment from "../DropdownComment/DropDownComment"
import { PostsContext } from '../../context/posts.context'
import EachCommentFromPost from "../EachCommentFromPost/EachCommentFromPost"
import EditPostForm from "../EditPostForm/EditPostForm"
import commentServices from "../../services/comment.service"

const EachPost = ({ eachPost }) => {

    const { user } = useContext(AuthContext)
    const { refreshPosts } = useContext(PostsContext)
    const [showModal, setShowModal] = useState(false)

    const delPost = () => {
        posteosService
            .pullOneUserPost(eachPost._id) // Pull comment id from current post and then remove the comment
            .then(() => {
                return eachPost.comments.map(eachComment => commentServices.removeOneComment(eachComment._id))
            })
            .then(() => {
                posteosService.deleteOnePost(eachPost._id)
                refreshPosts()
            })
            .catch(err => console.log(err))
    }

    const handleModalClose = () => setShowModal(false)
    const handleModalOpen = () => setShowModal(true)

    let response
    const checkAllLikes = () => { // Filter to check if the current user is in the likes array
        const recognizeLike = eachPost.likes.filter(eachLike => eachLike === user?._id)

        if (recognizeLike.length === 0) { response = false } else { response = true }

        return response
    }

    if (eachPost) {
        checkAllLikes()
    }

    const addLike = () => {
        response = true
        posteosService
            .pushOneUserLike(eachPost._id)
            .then(() => refreshPosts())
            .catch(err => console.log(err))
    }

    const delLike = () => {
        response = false
        posteosService
            .pullOneUserLike(eachPost._id)
            .then(() => refreshPosts())
            .catch(err => console.log(err))
    }

    return (
        <div className="postSection" key={eachPost._id}>
            <div className="p-3">
                <div className="postUserContainer">
                    <div className="postUserInfo">
                        <img src={eachPost.user?.imageURL} alt="profile user" />
                        <div className="postUserSidetext">
                            <Link to={`/perfil/${eachPost.user?.username}`}>
                                <p>{eachPost.user?.nameUser} {eachPost.user?.surnameUser}</p>
                            </Link>
                            <p>@{eachPost.user?.username}</p>
                            <p>{eachPost.date?.slice(0, 10)}</p>
                        </div>
                    </div>
                    <div className="postEditDeleteBtn">
                        {
                            eachPost.user && eachPost.user && user?._id === eachPost.user._id &&
                            <>
                                {eachPost.user && eachPost.user && user?._id === eachPost.user._id && <button className='btnDelEdit' onClick={delPost}>Eliminar</button>}
                                {eachPost.user && eachPost.user && user?._id === eachPost.user._id && <button className='btnDelEdit' onClick={handleModalOpen}>Editar</button>}
                            </>
                        }
                    </div>
                </div>
                <div className="postStatus">
                    <p>{eachPost.status}</p>
                </div>
            </div>
            {eachPost.imageURL !== '' ? <img src={eachPost.imageURL} alt='post upload' /> : <p></p>}
            <div className="p-3">
                <div className="likesCounter">
                    {eachPost.likes.length > 0 ? <p><i className="fa-regular fa-thumbs-up"></i> {eachPost.likes.length}</p> : <></>}
                </div>
                <hr />
                <div className="postBtns">
                    {
                        !response
                            ?
                            <button className="postLikeBtn" onClick={() => addLike()}><i className="fa-solid fa-thumbs-up"></i> Me gusta</button>
                            :
                            <button className="postDislikeBtn" onClick={() => delLike()}><i className="fa-solid fa-thumbs-up"></i> Me gusta</button>
                    }
                    {<DropDownComment postId={eachPost?._id} refreshPosts={refreshPosts} />}
                </div>
                <hr />
                <Modal show={showModal} onHide={handleModalClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Editar post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditPostForm closeModal={handleModalClose} refreshPosts={refreshPosts} postId={eachPost._id} />
                    </Modal.Body>
                </Modal>
                <div>
                    {eachPost.comments?.map(eachComment => <EachCommentFromPost postId={eachPost?._id} eachComment={eachComment} key={eachComment?._id} />)}
                </div>
            </div>
        </div >
    )
}

export default EachPost