import React from 'react';
import { AuthProvider } from '@/shared/extension/auth-provider';


export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}
