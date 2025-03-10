// This will prevent authenticated users from accessing this route
import { Navigate, useNavigate } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
// import { logout } from "../../../services/operations/authAPI";

function OpenRoute({ children }) {

  const { token } = useContext(AuthContext);

  // const { tokenExpiry } = useSelector((state) => state.auth)
  
  // if(tokenExpiry < Date.now())
  //   dispatch(logout(navigate));
  
  if (token === null) {
    return children
  } else {
    // console.log(token);
    return <Navigate to={'/dashboard/profile'}/>
  }
}

export default OpenRoute;