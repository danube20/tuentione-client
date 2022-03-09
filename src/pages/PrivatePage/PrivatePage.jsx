import PrivatePostForm from '../../components/PrivatePostForm/PrivatePostForm'
import PrivatePostList from '../../components/PrivatePostList/PrivatePostList'

const PrivatePage = () => {
    return (
        <div className="privateContainer">
            <h1>Fanáticos no more</h1>
            <hr />
            <PrivatePostForm />
            <PrivatePostList />
        </div>
    )
}

export default PrivatePage