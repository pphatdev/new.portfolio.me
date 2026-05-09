import React from 'react';
import { AuthProvider } from '@/shared/components/extension/auth-provider';


export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}
