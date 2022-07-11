import { Result } from "./results";

export interface User {
    username: string,
    password: string,
    email: string,
    name: string,
    likedPhotos?: Result[];
}