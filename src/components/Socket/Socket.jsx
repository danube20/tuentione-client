import io from 'socket.io-client'

const socket = io.connect('http://localhost:5005')

export default socket