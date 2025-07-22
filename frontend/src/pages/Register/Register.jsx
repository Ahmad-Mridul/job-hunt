import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const Register = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="card border border-blue-400 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <fieldset className="fieldset">
                        <label className="label">Email</label>
                        <input
                            type="email"
                            className="input"
                            placeholder="Email"
                        />
                        <label className="label">Password</label>
                        <input
                            type="password"
                            className="input"
                            placeholder="Password"
                        />
                        <button className="btn btn-primary mt-4">
                            Register
                        </button>
                    </fieldset>
                    <p>Already have an account?<Link to="/login" className="hover:link"> Login here</Link></p>
                    <div className="divider">OR</div>
                    <button className="btn bg-white text-black mt-4">
                        <FcGoogle /> SignUp with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
