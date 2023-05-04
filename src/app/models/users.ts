export type Roles = 'SUBSCRIBER' | 'EDITOR' | 'ADMIN';

export interface UserInterface {
    id: string,
    name?: string,
    email: string,
    password?:string,
    emailVerified: boolean,
    role?: Roles
}