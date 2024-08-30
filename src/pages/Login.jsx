import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/solid";
import { signInWithEmailAndPassword, } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/bills");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login">
            <div className="login-content">
                <div className="login-title">
                    <h2>Welcome <span className="accent">Back!</span></h2>
                    <p>The only app you need to check</p>
                    <p>for important dates and progress!</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Email"
                        aria-label="Your Email"
                        autoComplete="email" />

                    <div className="password-input-wrapper">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Password"
                            aria-label="Your Password"
                            autoComplete="current-password"
                            className="password-input" />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="eye-icon">
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <div className="login-btns">
                        <button type="submit" className="btn btn--dark">
                            <span>Log In</span>
                            <UserIcon width={20} />
                        </button>
                    </div>
                    {error && <p className="error-message">{error}</p>}   
                </form>
                <div className="login-switch">
                    <p>New to Stack<span>Tack</span>?</p>
                    <Link to="/register">
                        <h6>Create Account</h6>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
