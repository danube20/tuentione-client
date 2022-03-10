import { Container } from "react-bootstrap"
import RegisterForm from "../../components/RegisterForm/RegisterForm"

const RegisterPage = () => {
    return (
        <>
            <Container>
                <h1>Registro</h1>
                <hr />

                <RegisterForm />
            </Container>
        </>
    )
}

export default RegisterPage