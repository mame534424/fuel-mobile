export interface User {

    id: number;
    email: string;
    username: string;
    role: string;
    createdBy: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;

}

export interface LoginPayload {

  identifier: string;

  password: string;
}

export interface SignupPayload {

  email: string;

  username: string;

  password: string;
}

export interface AuthResponse {

  token: string;

  user: User;
}