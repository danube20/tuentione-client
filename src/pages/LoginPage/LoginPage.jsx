import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import LoginForm from "../../components/LoginForm/LoginForm"

const LoginPage = () => {

    return (
        <div className="minHeight">
            <h1>Login</h1>
            <hr />
            <Container>
                <LoginForm />
            </Container>
            <div className="borderLogin">
                <div className="loginQuestion">
                    <p><strong>¿No tienes cuenta?</strong></p>
                </div>
                <hr />
                <div className="registratePart">
                    <Link to={`/registro`}><strong>Regístrate</strong></Link>
                </div>
            </div>

        </div>

    )
}

export default LoginPage