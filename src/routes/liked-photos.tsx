import { useEffect, useState } from "react";
import Header from "../components/header";
import { useAuth } from "../context/auth-context";
import HearthIcon from "../icons/hearth";
import { Result } from "../interfaces/results";
import { User } from "../interfaces/user";
import "../sass/liked-photos.sass"

export default function LikedPhotos() {
    const { user } = useAuth();
    const [users, setUsers] = useState<User[] | null>(null)
    const [selectedUser, setSelectedUser] = useState<string | null>(null)
    const [userLikedPhotos, setUserLikedPhots] = useState<Result[]>([])

    const getUsers = (): User[] | null => {
        const _registeredUsers: string | null = localStorage.getItem('users')
        if (_registeredUsers) {
            return (JSON.parse(_registeredUsers))
        } else {
            return null
        }
    }

    useEffect(() => {
        user && setSelectedUser(user.username);
        setUsers(getUsers());
    }, [])

    return (
        <div>
            <Header />
            {(users && user) && (
                <div id="liked-photos">
                    <div className="select">
                        <span>Photos liked by </span>
                        <select name="user" placeholder="Select User" defaultValue={user.username} onChange={(e) => setSelectedUser(e.target.value)}>
                            {users.map(_user => (
                                <option value={_user.username}>{_user.username}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        {users && users.filter(_user => _user.username === selectedUser)
                            .map((result) => (
                                <div key={result.username} className="search-results">
                                    { result.likedPhotos ? result.likedPhotos?.map(likedPhoto => (
                                        <div key={likedPhoto.id}>
                                            <img src={likedPhoto.urls.regular} alt="" />
                                            <div className="description">
                                                <h2>{likedPhoto.description ?? likedPhoto.alt_description}</h2>
                                                <div>
                                                    <button type="button">
                                                        <HearthIcon fill={likedPhoto.liked ? "red" : "black"} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )) : (<h3 className="no-likes">This user hasn't liked any photo yet</h3>)}
                                </div>
                            ))}
                    </div>
                </div>
            )}

        </div>
    )
}