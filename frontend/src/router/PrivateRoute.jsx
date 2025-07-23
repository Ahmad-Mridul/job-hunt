import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthContext";
import Login from "../pages/Login/Login";

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    if(loading){
        return <span className="loading loading-bars loading-xl"></span>
    }
    if(user){
        return children;
    }
    return <Login/>
};

export default PrivateRoute;