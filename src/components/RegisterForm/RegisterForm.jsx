import { useState } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import authService from '../../services/auth.service'
import uploadService from '../../services/upload.service'

const RegisterForm = () => {

    const [registerForm, setRegisterForm] = useState(
        {
            username: '',
            nameUser: '',
            surnameUser: '',
            email: '',
            password: '',
            biography: '',
            birthday: '',
            imageURL: ''
        }
    )

    const { username, nameUser, surnameUser, email, password, birthday } = registerForm

    const [loadingImage, setLoadingImage] = useState(false)

    const navigate = useNavigate()

    const handleInputChange = e => {
        const { name, value } = e.target

        setRegisterForm({
            ...registerForm,
            [name]: value
        })
    }

    const uploadProfileImage = e => {
        setLoadingImage(true)

        const uploadData = new FormData()
        uploadData.append('imageURL', e.target.files[0])

        uploadService
            .uploadImage(uploadData)
            .then(({ data }) => {
                setLoadingImage(false)
                setRegisterForm({ ...registerForm, imageURL: data.cloudinary_url })
            })
            .catch(err => console.log(err))
    }

    const handleSubmit = e => {
        e.preventDefault()

        authService
            .register(registerForm)
            .then(() => {
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    return (

        <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                <Form.Control
                    type='text'
                    required
                    placeholder="Username"
                    name='username'
                    value={username}
                    onChange={handleInputChange}
                    maxLength='10'
                />
            </InputGroup>

            <Form.Group className='mb-3'>
                <Form.Label><strong>Nombre:</strong></Form.Label>
                <Form.Control
                    type='text'
                    name='nameUser'
                    value={nameUser}
                    onChange={handleInputChange}
                    placeholder='Introduce tu nombre'
                    maxLength='40'
                />
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label><strong>Apellido:</strong></Form.Label>
                <Form.Control
                    type='text'
                    name='surnameUser'
                    value={surnameUser}
                    onChange={handleInputChange}
                    placeholder='Introduce tu apellido'
                    maxLength='40'
                />
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label><strong>Email:</strong></Form.Label>
                <Form.Control type='email'
                    name='email'
                    value={email}
                    onChange={handleInputChange}
                    placeholder='Correo electronico'
                    required
                />
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label><strong>Contraseña:</strong></Form.Label>
                <Form.Control
                    type='password'
                    name='password'
                    value={password}
                    onChange={handleInputChange}
                    placeholder='Contraseña'
                    required
                />
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label><strong>Fecha de nacimiento:</strong></Form.Label>
                <Form.Control
                    type='date'
                    name='birthday'
                    value={birthday}
                    onChange={handleInputChange}
                />
            </Form.Group>

            <Form.Group controlId="coasterImage" className="mb-3">
                <Form.Control type="file" onChange={uploadProfileImage} />
            </Form.Group>

            <button className="loginButton" type="submit" disabled={loadingImage}>{loadingImage ? 'Espere...' : 'Enviar'}</button>
            <hr />
        </Form>

    )
}

export default RegisterForm