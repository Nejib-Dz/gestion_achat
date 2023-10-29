export interface User {
    //Edited
    id: number;
    name: string;
    email: string;
    password: string;
    tele: number;
    country: string;
    roles: Role[];
    sexe: string;
    agreements: string;
    avatar?: string;
    status?: string;
}

// Added
export interface Role {
    id: number;
    name : string
}
