import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import LoginForm from "../../components/LoginForm/LoginForm"

const LoginPage = () => {

    return (
        <div className="minHeight">
            <h1>Login</h1>
            <p>¿No tienes cuenta?</p><Link to={`/registro`}>Registrate</Link>
            <Container>
                <LoginForm />
            </Container>
        </div>
    )
}

export default LoginPage