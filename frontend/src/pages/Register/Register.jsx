import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Lottie from "lottie-react";
import registerLottie from "../../assets/lotties/Register.json";
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthContext";
const Register = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const {createNewUserWithEmailPass, createNewUserWithGoogle} = useContext(AuthContext);
    const handleRegister = (e) => {
        e.preventDefault();
        createNewUserWithEmailPass(email,pass)
        .then(result=>{
            console.log(result);
        })
        .catch(err=>{
            console.log(err.message);
        })
    };
    const handleGooglePopUp = (e) => {
        e.preventDefault();
        createNewUserWithGoogle()
        .then(result => {
            console.log(result);
        })
        .catch(err=>{
            console.log(err.message);
        })
    }
    return (
        <div className="md:flex items-center space-y-10 justify-around">
            <div className="">
                <Lottie animationData={registerLottie} />
            </div>
            <div className="card border border-blue-400 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <form onSubmit={handleRegister} className="fieldset">
                        <label className="label">Email</label>
                        <input
                            type="email"
                            className="input"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="label">Password</label>
                        <input
                            type="password"
                            className="input"
                            placeholder="Password"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                        />
                        <button className="btn btn-primary mt-4">
                            Register
                        </button>
                    </form>
                    <p>
                        Already have an account?
                        <Link to="/login" className="hover:link">
                            Login here
                        </Link>
                    </p>
                    <div className="divider">OR</div>
                    <button className="btn bg-white text-black mt-4" onClick={handleGooglePopUp}>
                        <FcGoogle /> SignUp with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
