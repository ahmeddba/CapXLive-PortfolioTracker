import './App.css'
import Header from './Components/UI/Header';
import { Navigate, Route, Routes } from 'react-router-dom'
import SeeStocks from './Components/Pages/SeeStocks'
import FormStock from './Components/Pages/FormStock'
import Dashboard from './Components/Pages/Dashboard'
import Register from './Components/Pages/Auth/Register'
import Login from './Components/Pages/Auth/Login'
import HomePage from './Components/Pages/HomePage';
import NotFound from './Components/UI/NotFound';
import EditStock from './Components/Pages/EditStock';


function App() {


  return (
    <>
    <Header />
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="/see-stocks" element={<SeeStocks />} />
        <Route path="/manage-stocks" element={<FormStock />} />
        <Route path="/see-dashboard" element={<Dashboard />} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </>
  )
}

export default App
