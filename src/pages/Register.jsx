import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { LuLogIn } from "react-icons/lu";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
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
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/bills");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleLoginRedirect = () => {
        navigate("/"); 
    };

    return (
        <div className="register">
            <div className="register-content">
                <div className="register-title">
                    <div className="register-title--content">
                        <h2>Take Control of <span className="accent">Your Money</span></h2>
                        <p>Life's better when you know you're on track</p>
                        <p>Let's get started!</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="register-form">
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                        placeholder="Email"
                        aria-label="Your Email"
                        autoComplete="email"
                    />
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

                    <div className="register-btns">
                        <button type="submit" className="btn btn--dark">
                            <span>Create Account</span>
                            <UserPlusIcon width={20} />
                        </button>

                        <p> or </p>
                        
                        <button type="button" className="btn btn--dark" onClick={handleLoginRedirect}>
                            <span>Login</span>
                            <LuLogIn />
                        </button>
                        {error && <p className="error-message">{error}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
