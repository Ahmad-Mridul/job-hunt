import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loginLottie from "../../assets/lotties/Login.json";
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthContext";
import axios from "axios";
const Login = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const { signinUserWithEmailPass } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleSignin = (e) => {
        e.preventDefault();
        signinUserWithEmailPass(email, pass)
            .then((result) => {
                console.log("sign in: ", result.user.email);
                const user = {email:email};
                axios.post("http://localhost:3000/jwt",user,{
                    withCredentials:true
                })
                .then(res=>console.log(res.data))
                navigate("/");
            })
            .catch((err) => {
                console.log(err.message);
            });
        setEmail("");
        setPass("");
    };
    return (
        <div className="md:flex items-center justify-around">
            <div className="">
                <Lottie animationData={loginLottie} />
            </div>
            <div className="card border border-blue-400 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl md:mt-[-60px]">
                <div className="card-body">
                    <p>mr@gmail.com</p>
                    <form onSubmit={handleSignin} className="fieldset">
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
                        <div>
                            <a className="link link-hover">Forgot password?</a>
                        </div>
                        <button className="btn btn-primary mt-4">Login</button>
                    </form>
                    <p>
                        Don't have an account?
                        <Link to="/register" className="hover:link">
                            {" "}
                            Register Here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
