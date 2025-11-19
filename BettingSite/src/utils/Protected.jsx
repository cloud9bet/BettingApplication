import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
  
return (
    sessionStorage.getItem("JWT") ? <Outlet/> : <Navigate to='/login'/>
  )
}
export default ProtectedRoutes