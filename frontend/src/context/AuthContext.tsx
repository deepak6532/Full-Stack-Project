import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import API from '../api/axios';
import type { User } from '../types';

interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<User | void>;
    register: (name: string, email: string, password: string, phone: string) => Promise<void>;
    logout: () => void;
    isAdmin: boolean;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifySession = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                try {
                    // Temporarily set token for this request
                    API.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
                    const { data } = await API.get('/auth/me');
                    setUser(data.user);
                    localStorage.setItem('user', JSON.stringify(data.user)); // Sync latest user data
                } catch (error) {
                    console.error('Session verification failed', error);
                    logout();
                }
            } else {
                setIsLoading(false);
            }
            // Always set loading to false after check
            setIsLoading(false);
        };

        verifySession();
    }, []);

    const login = async (email: string, password: string) => {
        const { data } = await API.post('/auth/login', { email, password });
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return data.user;
    };

    const register = async (name: string, email: string, password: string, phone: string) => {
        const { data } = await API.post('/auth/register', { name, email, password, phone });
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isLoading,
                login,
                register,
                logout,
                isAdmin: user?.role === 'admin',
                isAuthenticated: !!user && !!token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
