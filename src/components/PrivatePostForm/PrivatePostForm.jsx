import { useContext, useState } from "react"
import { Form } from "react-bootstrap"
import uploadService from "../../services/upload.service"
import privateService from "../../services/private.service"
import { PostsContext } from "../../context/posts.context"
import { useLocation } from "react-router-dom"

const PrivatePost = () => {

    const [privatePostStatus, setPrivatePostStatus] = useState({
        status: '',
        imageURL: ''
    })

    const [loadingImage, setLoadingImage] = useState(false)
    const { refreshPrivatePosts } = useContext(PostsContext)

    const handleInputChange = e => {
        const { name, value } = e.target

        setPrivatePostStatus({
            ...privatePostStatus,
            [name]: value
        })
    }

    const uploadPostImage = e => {

        setLoadingImage(true)

        const uploadData = new FormData()
        uploadData.append('imageURL', e.target.files[0])

        uploadService
            .uploadImage(uploadData)
            .then(({ data }) => {
                setLoadingImage(false)
                setPrivatePostStatus({ ...privatePostStatus, imageURL: data.cloudinary_url })
            })
            .catch(err => console.log(err))
    }

    const handleSubmit = e => {
        e.preventDefault()

        privateService
            .createPost(privatePostStatus)
            .then(({ data }) => privateService.pushOneUserPrivatePost(data._id))
            .then(() => refreshPrivatePosts())
            .catch(err => console.log(err))

        setPrivatePostStatus({
            status: '',
            imageURL: ''
        })
    }

    const location = useLocation()
    const isPrivate = location.pathname.includes('privado')
    const newClass = isPrivate ? 'postPrivateForm' : 'postForm'

    return (
        <div className={newClass}>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control
                        className="mb-3"
                        type="text"
                        placeholder="¿En qué estás pensando?"
                        value={privatePostStatus.status}
                        onChange={handleInputChange}
                        name="status"
                        required
                    />
                </Form.Group>

                <div className="postFormBtns">
                    <Form.Group controlId="postImage" className="mb-3 postUploadImage">
                        <label htmlFor="file-upload" className="custom-file-upload"><i className="fa fa-cloud-upload"></i> Subir foto</label>
                        <input id="file-upload" type="file" onChange={uploadPostImage} />
                    </Form.Group>

                    <button className="postFormBtn" type="submit" disabled={loadingImage}>{loadingImage ? 'Espere...' : 'Enviar'}</button>
                </div>
            </Form>
        </div>
    )
}

export default PrivatePost