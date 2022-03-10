import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import PrivatePostForm from '../../components/PrivatePostForm/PrivatePostForm'
import PrivatePostList from '../../components/PrivatePostList/PrivatePostList'
import { AuthContext } from '../../context/auth.context'

const PrivatePage = () => {

    const { username } = useParams()
    const { user } = useContext(AuthContext)
    return (
        <div className="privateContainer">
            {
                username && user?.username === username &&
                <>
                    <PrivatePostForm />
                    <hr />
                </>
            }
            <PrivatePostList />
        </div>
    )
}

export default PrivatePage