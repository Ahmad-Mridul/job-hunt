import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthContext";

const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;