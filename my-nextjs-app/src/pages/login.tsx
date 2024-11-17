import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
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
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <h1 className="text-4xl font-bold text-black mb-6">Login</h1>
            <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border p-2 rounded mb-4 w-80 text-black"
            />
            <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 rounded mb-4 w-80 text-black"
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