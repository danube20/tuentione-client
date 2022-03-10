import { Container } from "react-bootstrap"
import RegisterForm from "../../components/RegisterForm/RegisterForm"

const RegisterPage = () => {
    return (
        <>
            <h1>Registro</h1>
            <hr />
            <Container>
                <RegisterForm />
            </Container>
        </>
    )
}

export default RegisterPage