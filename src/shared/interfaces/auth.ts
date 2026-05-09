export interface AuthUser {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: 'admin' | 'editor' | 'viewer';
}

export interface AuthSession {
    user: AuthUser;
    token: string;
    expiresAt: number;
}

export interface AuthContextValue {
    session: AuthSession | null;
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    logout: () => void;
}
