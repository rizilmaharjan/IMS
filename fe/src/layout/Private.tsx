import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function Private() {
  const location = useLocation()
  const isPublicPath = location.pathname === "/" || location.pathname === "/register" || location.pathname === "/reset-password" 
  const token = Cookies.get("authToken")
  console.log("token", token)

  if(isPublicPath &&  token){
    return <Navigate to="/dashboard" />
  }

  if(!isPublicPath && !token){
    console.log("logging in")
    return <Navigate to="/" />
  }
  return <Outlet />
}
