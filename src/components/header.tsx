import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth-context"
import "../sass/header.sass"

export default function Header() {
    const { user, signout } = useAuth();
    return (
        <header>
            <ul>
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) => `${isActive && 'active'}`}
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/liked-photos"
                        className={({ isActive }) => `${isActive && 'active'}`}
                    >
                        Liked photos
                    </NavLink>
                </li>
            </ul>
            <ul>
                <li>
                    <span>{user?.name}</span>
                </li>
                <li>
                    <a onClick={() => signout()}>Logout</a>
                </li>
            </ul>
        </header>
    )
}