import PrivatePostForm from '../../components/PrivatePostForm/PrivatePostForm'
import PrivatePostList from '../../components/PrivatePostList/PrivatePostList'

const PrivatePage = () => {
    return (
        <div className="privateContainer">
            <PrivatePostForm />
            <hr />
            <PrivatePostList />
        </div>
    )
}

export default PrivatePage