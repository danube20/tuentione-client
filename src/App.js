import AppRoutes from './routes/AppRoutes'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import ChatWindow from './components/ChatWindow/ChatWindow'

function App() {
  return (
    <>
      <NavBar />
      <AppRoutes />
      <ChatWindow />
      <Footer />
    </>
  )
}

export default App
