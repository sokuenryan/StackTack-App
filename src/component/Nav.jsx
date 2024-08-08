import { Form, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.png";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { TrashIcon } from "@heroicons/react/16/solid";
import { IoExitOutline } from "react-icons/io5";

const Nav = () => {
    const clearLocalStorage = () => {
        localStorage.clear();
        toast.success("You Have Successfully Delete All Data!");
    };

    const location = useLocation();
    const isAuthPage = location.pathname === '/' || location.pathname === '/register';

    return (
        <nav className="nav">
            <div className="nav-icon">
                <img src={ logo } height={35} />
                <h3><span>Stack</span>Tack</h3>
            </div>
            
            <div className="nav-btns">
                <Form
                    to="/"
                    aria-label="logout"
                >
                    {
                        !isAuthPage && (
                            <>
                                <button
                                    className="btn btn--warning"
                                    type="submit"
                                >
                                    <span>Logout</span>
                                    <IoExitOutline
                                    />
                                </button>
                            </>
                        )
                    }
                </Form>
            </div>    
        </nav>
    )
}
export default Nav;