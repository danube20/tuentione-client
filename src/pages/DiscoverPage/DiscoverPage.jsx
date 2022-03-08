import { useContext } from 'react'
import { useState, useEffect } from 'react'
import { AuthContext } from '../../context/auth.context'
import userService from "../../services/user.service"

const DiscoverPage = () => {

    const [discoverPage, setDiscoverPage] = useState([])
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
        <div className='discoverContainer'>
            {
                discoverPage.map(eachUser => {

                    return <div className='discoverElm' key={eachUser._id}>
                        <img src={eachUser.imageURL} alt="imagen de usuari@" />
                        <div className='discoverSidetext'>
                            <p>{eachUser.nameUser} {eachUser.surnameUser} </p>
                            {
                                eachUser._id && user?._id !== eachUser._id &&
                                <>
                                    {
                                        !eachUser.friends.some(el => el === user._id)
                                            ?
                                            <button onClick={() => addFriend(eachUser._id)}>Añadir</button>
                                            :
                                            <button onClick={() => delFriend(eachUser._id)}>Eliminar</button>
                                    }
                                </>
                            }
                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default DiscoverPage