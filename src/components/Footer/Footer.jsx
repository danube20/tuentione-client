import { useLocation } from "react-router-dom"

const Footer = () => {

    const location = useLocation()
    const isPrivate = location.pathname.includes('privado')
    const newClass = !isPrivate ? 'footer' : 'footerPrivate'

    return (
        <footer className={newClass}>
            <p>Tuentione&copy;. De Ironhackers para Ironhackers :)</p>
        </footer>
    )
}
export default Footer