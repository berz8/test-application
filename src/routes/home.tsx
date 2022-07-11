import { useState } from "react";
import axios from 'axios';
import { Result } from "../interfaces/results";
import Header from "../components/header";
import HearthIcon from "../icons/hearth";
import { User } from "../interfaces/user";
import { useAuth } from "../context/auth-context";
import LikedPhotos from "./liked-photos";

export default function HomePage() {
    const [ searchQuery, setSearchQuery ] = useState<string>("");
    const [ searchResults, setSearchResults ] = useState<Result[]>([]);
    const { user } = useAuth();

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        search();
    }

    const search = () => {
        axios.get(`https://api.unsplash.com/search/photos?page=1&query=${searchQuery}`)
            .then((res) => setSearchResults(res.data.results))
    }

    const toggleLike = (_result: Result) => {
        setSearchResults(current => current.map(result => {
            if(_result.id === result.id && result.liked !== true){
                saveLikedPhoto(_result, "add");
                return {...result, liked: result.liked ? false : true }
            } else if(_result.id === result.id && result.liked === true){
                saveLikedPhoto(_result, "remove");
                return {...result, liked: false }
            }
            return result;
        }))
    }

    const saveLikedPhoto = (_result: Result, action: "add" | "remove") => {
        const registeredUsers: string | null = localStorage.getItem('users');
        let isLiked = false;

        if (registeredUsers) {
            const newRegisteredUsers = JSON.parse(registeredUsers).map((_user: User) => {
                if (_user.username === user?.username){
                    _user.likedPhotos && _user.likedPhotos.forEach((likedPhoto, index) => {
                        if(likedPhoto.id === _result.id && action === "add"){
                            isLiked = true;
                            likedPhoto.liked = true;
                        } else if (likedPhoto.id === _result.id && action === "remove"){
                            isLiked = true;
                            _user.likedPhotos?.splice(index, 1);
                        }
                    })
                    if(isLiked === false && action === "add") {
                        console.log('is liked faslse')
                        _user.likedPhotos ? _user.likedPhotos.push(_result) : _user.likedPhotos = [_result]
                    }
                    return _user
                } else {
                    return _user
                } 
        })
        localStorage.setItem('users', JSON.stringify(newRegisteredUsers));
    }}

    return (
        <div id="home">
            <Header />
            <div>
                <div className="search-input">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="search images"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}    
                        />
                        <button type="submit">Search</button>
                    </form>
                </div>
                {(searchResults && searchResults.length > 0) && (
                    <div className="search-results">
                        {searchResults.map((result) => (
                            <div key={result.id}>
                                <img src={result.urls.regular} alt="" />
                                <div className="description">
                                    <h2>{result.description ?? result.alt_description}</h2>
                                    <div>
                                        <button type="button" onClick={() => toggleLike(result)}>
                                            <HearthIcon fill={result.liked ? "red" : "black"} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
