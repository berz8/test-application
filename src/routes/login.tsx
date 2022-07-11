import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { User } from "../interfaces/user";
import { useAuth } from "../context/auth-context";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [loginError, setLoginError] = useState<boolean>(false);
    const { register, handleSubmit } = useForm();
    const auth = useAuth();
    const navigate = useNavigate();

    const onSubmit = (data: any) => {
        const registeredUsers: string | null = localStorage.getItem('users');

        if (registeredUsers) {
            JSON.parse(registeredUsers).forEach((user: User) => {
                if (user.username === data.username && user.password === data.password) {
                    auth.signin(user, () => navigate("/", { replace: true }))
                } else {
                    setLoginError(true)
                }
            })
        }
    }

    return (
        <div id="login">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    required
                    type="text"
                    placeholder="username"
                    {...register("username")}
                />
                <input
                    required
                    type="password"
                    placeholder="password"
                    {...register("password")}
                />
                <button type="submit">Login</button>
                {loginError && (
                    <div className="error">
                        <h3>Wrong username or password, try again</h3>
                    </div>
                )}
                <Link to="/registration">
                    Don't have an account? Create one
                </Link>
            </form>
        </div>
    )
}