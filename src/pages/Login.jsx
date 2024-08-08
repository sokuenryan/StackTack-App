import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/solid";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase-config";
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log('User:', user);
            console.log('Access Token:', token);
            navigate("/bills");
        } catch (error) {
            console.error('Error during Google login:', error);
            setError('Google login failed. Please try again.');
        }
    };

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
                        
                        <p>-- or --</p>
                        
                        <button onClick={handleGoogleLogin} className="btn btn--dark">
                            <span>Sign in with Google</span>
                            <FaGoogle size={20} />
                        </button>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                </form>
                
                <div className="login-switch">
                    <p>New to <span>Stack</span>Tack?</p>
                    <h6><a href="/register">Create Account</a></h6>
                </div>
            </div>
        </div>
    );
};

export default Login;
