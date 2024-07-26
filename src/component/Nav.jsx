import { Form, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { TrashIcon } from "@heroicons/react/16/solid";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Nav = ({ userName }) => {
    const clearLocalStorage = () => {
        localStorage.clear();
        toast.success("You Have Successfully Delete Your Account!");
      };
    
    return (
        <nav>
            <NavLink 
                to="/"
                aria-label="Go to home"
            >
                <img src={ logo } height={35} />
                <h3><span>Stack</span>Tack</h3>
            </NavLink>
            {
                userName && (
                    <Form
                    method="post"
                    action="/logout"
                    onSubmit={(event) => {
                        if (!confirm("Delete user and all data?")) {
                            event.preventDefault();
                        }
                    }}
                >
                    <button 
                        className="btn btn--warning"
                        type="submit"
                        onClick={clearLocalStorage}
                    >
                        <span> Delete User</span>
                        <TrashIcon width={20} />
                        <ToastContainer />
                    </button>
                </Form>
            )
            }

        </nav>
    )
}
export default Nav;