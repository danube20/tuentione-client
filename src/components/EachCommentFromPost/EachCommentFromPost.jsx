import { useContext, useState, useEffect } from "react"
import { Modal } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import { PostsContext } from "../../context/posts.context"
import commentServices from "../../services/comment.service"
import posteosService from "../../services/posteos.service"
import userService from "../../services/user.service"
import EditCommentForm from "../EdtCommentForm/EditCommentForm"

function EachCommentFromPost({ eachComment, postId }) {

    const [oneUser, setOneUser] = useState()
    const { user } = useContext(AuthContext)
    const { refreshPosts } = useContext(PostsContext)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        userService
            .getOneUserById(eachComment.user)
            .then(({ data }) => setOneUser(data))
            .catch(err => console.log(err))
    }, [])

    const delComment = () => { // Pull comment id from the current post and then deletes it
        posteosService
            .pullOneComment(postId, eachComment._id)
            .then(() => commentServices.removeOneComment(eachComment._id))
            .then(() => refreshPosts())
            .catch(err => console.log(err))
    }

    const handleModalClose = () => setShowModal(false)
    const handleModalOpen = () => setShowModal(true)

    return <div className="eachComment">
        <div className="commentUserInfo">
            <img src={oneUser?.imageURL} alt="profile user" />
            <div className="commentUserSidetext">
                <Link to={`/perfil/${oneUser?.username}`}>
                    <p className="knfe1">{oneUser?.nameUser} {oneUser?.surnameUser}</p>
                </Link>
                <p className="knfe2">{eachComment?.createdAt?.slice(0, 10)}</p>
                <div>
                    <p>{eachComment.text}</p>
                </div>
            </div>
        </div>
        {eachComment.user && eachComment.user && user?._id === eachComment.user && <button className='btnDelEdit' onClick={delComment}>Eliminar</button>}
        {eachComment.user && eachComment.user && user?._id === eachComment.user && <button className='btnDelEdit' onClick={handleModalOpen}>Editar</button>}
        <Modal show={showModal} onHide={handleModalClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Editar comentario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EditCommentForm closeModal={handleModalClose} refreshPosts={refreshPosts} commentId={eachComment._id} />
            </Modal.Body>
        </Modal>
    </div>
}

export default EachCommentFromPost