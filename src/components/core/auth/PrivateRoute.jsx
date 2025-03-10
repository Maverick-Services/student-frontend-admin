// This will prevent authenticated users from accessing this route
import { Navigate} from "react-router-dom"
import { AuthContext } from "../../../Context/AuthContext";
import { useContext } from "react";

function PrivateRoute({ children }) {

  const { token } = useContext(AuthContext)
  // const { tokenExpiry } = useSelector((state) => state.auth)
  
  // if(tokenExpiry < Date.now())
  //   dispatch(logout(navigate));
  
  if (token !== null) {
    return children
  } else {
    // console.log(token);
    return <Navigate to="/" />
  }
}

export default PrivateRoute;