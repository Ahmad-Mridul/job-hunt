import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
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
                        <div>
                            <a className="link link-hover">Forgot password?</a>
                        </div>
                        <button className="btn btn-primary mt-4">Login</button>
                    </fieldset>
                    <p>Don't have an account?<Link to="/register" className="hover:link"> Register Here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
