export interface category {
    name: string,
}

export interface creatingImage {
    data: string,
    created: boolean,
}

export interface art {
    user: user,
    link: string,
    prompt: string,
    linkTo: string,
    cost: number,
}

export interface user {
    username: string,
    email: string,
    credits: number,
    createdAtDate: Date,
    arts: art[],
}