import { useContext, useState } from "react"
import { Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import authService from "../../services/auth.service"
import { AuthContext } from '../../context/auth.context'

const LoginForm = () => {

    const [loginForm, setLoginForm] = useState(
        {
            email: '',
            password: ''
        }
    )

    const navigate = useNavigate()
    const { storeToken, authenticateUser } = useContext(AuthContext)

    const handleInputChange = e => {
        const { name, value } = e.target
        setLoginForm({
            ...loginForm,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        authService
            .login(loginForm)
            .then(({ data }) => {
                storeToken(data.authToken)
                authenticateUser()
                navigate('/home')
            })
            .catch(err => console.log(err))
    }

    return (

        <Form className="login" onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
                <Form.Label><strong>Email:</strong></Form.Label>
                <Form.Control type='email'
                    name='email'
                    value={loginForm.email}
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
                    value={loginForm.password}
                    onChange={handleInputChange}
                    placeholder='Contraseña'
                    required
                />
            </Form.Group>

            <button type='submit' className='loginButton'>Enviar</button>

        </Form>


    )
}

export default LoginForm