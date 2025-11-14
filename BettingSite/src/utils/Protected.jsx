import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
  
return (
    localStorage.length > 0 ? <Outlet/> : <Navigate to='/login'/>
  )
}
export default ProtectedRoutes