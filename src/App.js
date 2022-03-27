import AppRoutes from './routes/AppRoutes'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import MessagesWindow from './components/MessagesWindow/MessagesWindow'

function App() {
  return (
    <>
      <NavBar />
      <AppRoutes />
      <MessagesWindow />
      <Footer />
    </>
  )
}

export default App
