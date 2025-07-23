import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthContext";

const Nav = () => {
    const { user, userSignOut } = useContext(AuthContext);
    const handleSignOut = () => {
        userSignOut()
        .then(()=>{
            console.log("Sign Out Successfully");
        })
        .catch(err=>{
            console.log(err.message);
        })
    }
    const links = (
        <>
            <li>
                <Link to="/" className="bg-base-200">Home</Link>
            </li>
        </>
    );
    return (
        <nav>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {" "}
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />{" "}
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                        >
                            {links}
                        </ul>
                    </div>
                    <Link to="/" className="btn  btn-outline btn-primary text-xl">
                        JOB🔍
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">{links}</ul>
                </div>
                <div className="navbar-end gap-3">
                    {!user ? (
                        <>
                            <Link className="btn btn-primary" to="/register">
                                Register
                            </Link>
                            <Link className="btn btn-primary" to="/login">
                                Login
                            </Link>
                        </>
                    ) : (
                        <button className="btn btn-primary" onClick={handleSignOut}>
                            SignOut
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Nav;
