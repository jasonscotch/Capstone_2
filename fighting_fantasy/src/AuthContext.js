import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
const LOCAL_STORAGE_KEY = 'userData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const savedUserData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedUserData) {
            // console.log('Setting user from local storage:', JSON.parse(savedUserData));
            setUser(JSON.parse(savedUserData));
        }
    }, []);

    const login = async (userData) => {
        try {
            const response = await axios.post(`${BASE_URL}/login`, userData);

            const { data } = response;

            if (response.status === 200) {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.user));
                setUser(data.user);
                navigate('/');
            } else {
                console.error('Login failed:', data.error);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };
      

    const logout = async () => {
        // const userData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        // console.log(userData);

        try {
            await axios.post(`${BASE_URL}/logout`, null, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            localStorage.removeItem(LOCAL_STORAGE_KEY);
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const signUp = async (userData) => {
        try {
            const response = await axios.post(`${BASE_URL}/register`, userData);

            const { data } = response;

            if (response.status === 200) {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.user));
                setUser(data.user);
                navigate('/');
            } else {
                console.error('Sign-up failed:', data.error);
            }
        } catch (error) {
            console.error('Error during sign-up:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, signUp }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    // console.log(context);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};