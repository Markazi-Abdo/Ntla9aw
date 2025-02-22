import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Map from './pages/Map'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import UserDashboard from './pages/UserDashboard'
import CreateCar from './pages/CreateCar'
import { useSelector } from 'react-redux'
import AdminAuth from './pages/AdminAuth'
import AdminDashboard from './pages/AdminDashboard'
import Home from './pages/Home'
import PageNotFound from './pages/PageNotFound'
import { AdminPage } from './pages/AdminPage'
import AppData from './pages/AppData'

function App() {
  const location = useLocation();
  const auth = useSelector(state => state.auth.isAuth);
  const adminAuth = useSelector(state => state.admin.isAdminAuth);
  console.log(auth);
  return (
    <>
      <Routes location={location} key={location.pathname}>
          <Route path='/' element={<Home />}></Route>
          <Route path='/map' element={auth ? <Map /> : <Navigate to={"/signup"}/>}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/login' element={<LogIn />}></Route>
          <Route path='/user' element={auth ? <UserDashboard /> : <Navigate to={"/signup"}/>}></Route>
          <Route path='/createcar' element={auth ? <CreateCar /> : <Navigate to={"/signup"}/>}></Route>
          <Route path='/admin' element={adminAuth ? <AdminDashboard /> : <Navigate to={"/signup"}/>}></Route>
          <Route path='/adminmap' element={adminAuth ? < AdminPage /> : <Navigate to={"/signup"}/>}></Route>
          <Route path='/data' element={adminAuth ? <AppData /> : <Navigate to={"/signup"}/>}></Route>
          <Route path='/adminauth' element={<AdminAuth />}></Route>
          <Route path='*' element={<PageNotFound />}></Route>
      </Routes>
    </>
  )
}

export default App
