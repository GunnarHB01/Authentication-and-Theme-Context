import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const router = useRouter();

    const handleLogin = () => {
        if (username && password) {
            login(username);
            router.push('/expenses');
        } else {
            alert('Please enter both username and password');
        }
    };

    return (
        <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'} flex flex-col justify-center items-center text-gray-900 dark:text-gray-100 relative`}>
            <button
                onClick={toggleTheme}
                className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
                Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
            </button>

            <h1 className={`text-4xl font-bold mb-6 ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                Login
            </h1>
            <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`border p-2 rounded mb-4 w-80 text-black ${theme === 'light' ? '' : 'dark:bg-gray-700 dark:text-white'}`}
            />
            <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`border p-2 rounded mb-4 w-80 text-black ${theme === 'light' ? '' : 'dark:bg-gray-700 dark:text-white'}`}
            />
            <button
                onClick={handleLogin}
                className="bg-blue-500 px-4 py-2 text-white rounded hover:bg-blue-600 w-80"
            >
                Login
            </button>
        </div>
    );
};

export default Login;