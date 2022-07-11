import axios from "axios";
import { useState } from "react"
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { User } from "../interfaces/user";


import '../sass/registration.sass';

export default function RegistrationPage() {
    const [error, setError] = useState<boolean>(false);
    const { register, handleSubmit } = useForm();
    const auth = useAuth();
    const navigate = useNavigate();

    const onSubmit = (data: any) => {
        const registeredUsers: string | null = localStorage.getItem('users')
        let userExist = false

        if (registeredUsers) {
            JSON.parse(registeredUsers).forEach((user: User) => {
                if (user.username === data.username) {
                    userExist = true
                    setError(true)
                }
            })

            if (!userExist) {
                const toStore: User[] = JSON.parse(registeredUsers)
                toStore.push(data)
                localStorage.setItem('users', JSON.stringify(toStore))
                auth.signin(data, () => navigate("/", { replace: true }))
            }
        } else {
            localStorage.setItem('users', JSON.stringify([data]))
            auth.signin(data, () => navigate("/", { replace: true }))
        }

    }

    return (
        <div id="login">
            <form onSubmit={handleSubmit(onSubmit)} >
                <input required type="text" placeholder="username" {...register("username")} />
                <input required type="password" placeholder="password" {...register("password")} />
                <input required type="email" placeholder="email" {...register("email")} />
                <input required type="text" placeholder="name" {...register("name")} />
                <button type="submit">Register</button>
                {error && (
                    <div className="error">
                        <h3>User already taken</h3>
                    </div>
                )}
                <Link to="/login">
                    Already have an account? Log in
                </Link>
            </form>
        </div>
    )
}