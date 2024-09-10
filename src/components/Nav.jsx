import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import 'react-toastify/dist/ReactToastify.css';
import { IoExitOutline } from 'react-icons/io5';

const Nav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthPage = location.pathname === '/' || location.pathname === '/register';

    const handleLogout = async () => {
        await fetch('/logout', { method: 'POST' });
        navigate('/');
    };

    return (
        <nav className="nav">
            <div className="nav-icon">
                <img src={logo} height={35} alt="Logo" />
                <h3><span>Stack</span>Tack</h3>
            </div>

            <div className="nav-btns">
                {
                    !isAuthPage && (
                        <button
                            className="logout btn btn--warning"
                            onClick={handleLogout}
                            aria-label="logout"
                        >
                            <span>Logout</span>
                            <IoExitOutline />
                        </button>
                    )
                }
            </div>
        </nav>
    );
};

export default Nav;
