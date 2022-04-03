import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
import userService from "../../services/user.service"

const DiscoverPage = () => {

    const [discoverPage, setDiscoverPage] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const { user } = useContext(AuthContext)

    const loadUsers = () => {
        userService
            .getAllUsers()
            .then(({ data }) => setDiscoverPage(data))
            .catch(err => console.log(err))
    }

    useEffect(() => loadUsers(), [])

    const addFriend = (eachUser_id) => {
        userService
            .addFriend(eachUser_id)
            .then(() => loadUsers())
            .catch(err => console.log(err))
    }

    const delFriend = (eachUser_id) => {
        userService
            .delFriend(eachUser_id)
            .then(() => loadUsers())
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className='discoverInput'>
                <input
                    type="text"
                    placeholder='Buscar usuari@...'
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>
            <div className='discoverContainer'>
                {
                    discoverPage.filter(elm => {
                        if (searchTerm === '') {
                            return elm
                        }
                        else if (elm.nameUser.toLowerCase().startsWith(searchTerm.toLowerCase()) || elm.surnameUser.toLowerCase().startsWith(searchTerm.toLowerCase())) {
                            return elm
                        }
                    }).map(eachUser => {
                        return (eachUser._id && user._id !== eachUser._id &&
                            <>
                                <div className='discoverElm' key={eachUser._id}>
                                    <img src={eachUser.imageURL} alt="imagen de usuari@" />
                                    <div className='discoverSidetext'>
                                        <Link to={`/perfil/${eachUser.username}`}>
                                            <p>{eachUser.nameUser} {eachUser.surnameUser} </p>
                                        </Link>
                                        {
                                            eachUser._id && user?._id !== eachUser._id &&
                                            <>
                                                {
                                                    !eachUser.friends.some(el => el === user._id)
                                                        ?
                                                        <button className='discoverAddBtn' onClick={() => addFriend(eachUser._id)}>Añadir</button>
                                                        :
                                                        <button className='discoverDelBtn' onClick={() => delFriend(eachUser._id)}><i className="fa-solid fa-user-xmark"></i></button>
                                                }
                                            </>
                                        }
                                    </div>
                                </div>
                            </>)
                    })
                }
            </div>
        </>
    )
}

export default DiscoverPage