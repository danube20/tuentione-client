import { useContext } from "react"
import { Container, Nav, Navbar } from "react-bootstrap"
import { NavLink, Link } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"

const NavBar = () => {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext)

    return (
        <Navbar className="navBg" expand="lg">
            <Container>
                <Link to='/home'>
                    <img src="https://res.cloudinary.com/andresgarcia/image/upload/v1646860182/logo_blanco_andres_me6ild.png" alt="tuentione logo" />
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {
                            isLoggedIn &&
                            <>
                                <NavLink className={({ isActive }) => isActive ? "selected" : ""} to='/home'>Home</NavLink>
                                <NavLink className={({ isActive }) => isActive ? "selected" : ""} to='/descubrir'>Descubrir</NavLink>
                                <NavLink className={({ isActive }) => isActive ? "selected" : ""} to={`/perfil/${user?.username}`}>Perfil</NavLink>
                            </>
                        }
                    </Nav>
                    <div className="loginRegister">
                        {
                            isLoggedIn ?
                                <>
                                    <Nav.Link as='span' onClick={logOutUser}>Cerrar sesión</Nav.Link>
                                    <Nav.Link as='span'>Bienvenid@ {user?.username}</Nav.Link>
                                </>
                                :
                                <>
                                    <NavLink to='/'>Iniciar sesión</NavLink>
                                    <NavLink to='/registro'>Registro</NavLink>
                                </>
                        }
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar