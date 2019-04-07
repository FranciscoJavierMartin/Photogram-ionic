
export interface ResponsePosts {
    ok: boolean;
    page: number;
    posts: Post[];
}

export interface Post {
    imgs?: string[];
    _id?: string;
    message?: string;
    coords?: string;
    user?: User;
    created?: string;
    position?: boolean;
}

export interface User {
    avatar?: string;
    _id?: string;
    name?: string;
    email?: string;
    password?: string;
}
