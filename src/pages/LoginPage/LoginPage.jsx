import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import LoginForm from "../../components/LoginForm/LoginForm"

const LoginPage = () => {

    return (
        <Container>
            <div className="minHeight loginPage">
                <h1>Login</h1>
                <hr />

                <LoginForm />

                <div className="loginQuestion">
                    <p>¿No tienes cuenta?</p>
                    <hr />
                    <Link to={`/registro`}>Regístrate</Link>
                </div>

            </div>
        </Container>
    )
}

export default LoginPage