'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { AuthContextValue, AuthSession } from '@/shared/interfaces/auth';
import { AUTH_TOKEN_KEY, DEFAULT_LOGIN_REDIRECT } from '@/shared/libs/constants';

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const AuthContext = createContext<AuthContextValue | null>(null);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [session, setSession] = useState<AuthSession | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    /** Read the session from cookie on first mount */
    useEffect(() => {
        const token = document.cookie
            .split('; ')
            .find((row) => row.startsWith(`${AUTH_TOKEN_KEY}=`))
            ?.split('=')[1];

        if (token) {
            // In a real app you would decode the JWT or call /api/auth/me here.
            // For now we reconstruct a minimal session from the token.
            setSession({
                token,
                user: {
                    id: 'unknown',
                    name: 'Admin',
                    email: '',
                    role: 'admin',
                },
                expiresAt: Date.now() + 1000 * 60 * 60, // 1 h fallback
            });
        }

        setIsLoading(false);
    }, []);

    const logout = useCallback(() => {
        // Clear the auth cookie
        document.cookie = `${AUTH_TOKEN_KEY}=; path=/; max-age=0`;
        setSession(null);
        router.push(DEFAULT_LOGIN_REDIRECT);
    }, [router]);

    const value = useMemo<AuthContextValue>(
        () => ({
            session,
            user: session?.user ?? null,
            isAuthenticated: session !== null,
            isLoading,
            logout,
        }),
        [session, isLoading, logout],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Access auth state anywhere inside the <AuthProvider> tree.
 *
 * @example
 * const { user, logout, isAuthenticated } = useAuth();
 */
export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('useAuth must be used within an <AuthProvider>');
    }
    return ctx;
}
