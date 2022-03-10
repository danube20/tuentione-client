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
        </Container>

    )
}

export default LoginPage