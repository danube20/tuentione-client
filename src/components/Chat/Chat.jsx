import { Link } from 'react-router-dom'
import socket from '../Socket/Socket'
import ScrollToBottom from 'react-scroll-to-bottom'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth.context'
import chatService from '../../services/chat.service'

const Chat = ({ friend }) => {

    const [currentMessage, setCurrentMessage] = useState('')
    const [messageList, setMessageList] = useState([])
    const { user } = useContext(AuthContext)

    // const sendMessage = async () => {
    //     if (currentMessage !== '') {
    //         const messageData = {
    //             friend: friend?.username,
    //             author: user?.username,
    //             message: currentMessage,
    //             time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
    //         }
    //         await socket.emit('send_message', messageData)
    //         setMessageList((list) => [...list, messageData])
    //         setCurrentMessage('')
    //     }
    // }

    // useEffect(() => {
    //     socket.on('receive_message', (data) => {
    //         setMessageList((list) => [...list, data])
    //     })
    // }, [socket])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (currentMessage !== '') {
            // TODO: Crear conversacion cada vez que añadimos un amigo
            chatService
                .createConversation(user?._id, friend?._id) // Crea una conversación nueva cada vez que se envia un mensaje *arreglar*
                .then(({ data }) => {
                    const newMessage = {
                        conversationId: data._id,
                        sender: user?._id,
                        text: currentMessage
                    }
                    return chatService.createMessage(newMessage)
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className="chatWindow">
            <div className="friendInfoPage">
                <div>
                    <img src={friend?.imageURL} alt={friend?.username} />
                    <p>{friend?.nameUser} {friend?.surnameUser}</p>
                </div>
                <Link to={`/perfil/${friend?.username}`}>Ir al perfil</Link>
            </div>
            <div className="chatWindowMessages">
                <ScrollToBottom>
                    {
                        messageList.map((elm) => {
                            return <p>{elm.message}</p>
                        })
                    }
                </ScrollToBottom>
            </div>
            <div className="chatWindowInput">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="chat"
                        placeholder="Envía un mensaje..."
                        onChange={e => setCurrentMessage(e.target.value)}
                    />
                    <button type='submit'>Enviar</button>
                </form>
            </div>
        </div>
    )
}

export default Chat