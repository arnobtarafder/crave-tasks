import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { Link, NavLink } from "react-router-dom";
import React from "react";
import auth from "../../firebase.init";


const Navbar = () => {
    const [user] = useAuthState(auth);

    const navItems = (
        <>
            <li>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? "bg-primary text-white rounded" : "rounded lg:mx-2"
                    }
                    to="/"
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? "bg-primary text-white rounded" : "rounded lg:mx-2"
                    }
                    to="/"
                >
                    Completed Task
                </NavLink>
            </li>
            <li>
                <Link to="/">Calender</Link>
            </li>
            <li>
                {user ? (
                    <Link onClick={() => signOut(auth)} to="/login">
                        SignOut
                    </Link>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </li>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-lg px-0">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost btn-circle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h7"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex="0"
                        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                    >

                        {navItems}

                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <span className="text-3xl font-bold">Todo App</span>
            </div>
            <div className="navbar-end">
                <button className="btn btn-ghost btn-circle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
                <button className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                            />
                        </svg>
                        <span className="badge badge-xs badge-success indicator-item"></span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Navbar;