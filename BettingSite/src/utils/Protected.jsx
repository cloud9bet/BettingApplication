import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
  
return (
    localStorage.getItem("JWT") ? <Outlet/> : <Navigate to='/login'/>
  )
}
export default ProtectedRoutes