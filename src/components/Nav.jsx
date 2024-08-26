import { Form, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.png";
import 'react-toastify/dist/ReactToastify.css';
import { IoExitOutline } from "react-icons/io5";

const Nav = () => {
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