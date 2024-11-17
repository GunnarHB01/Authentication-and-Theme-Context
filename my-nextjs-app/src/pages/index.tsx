import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user}!</h1>
      <p className="text-lg mb-4">You are logged in. Feel free to explore the app!</p>

      <div className="flex space-x-4">
        <button
          onClick={() => router.push('/expenses')}
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go to Expense Tracker
        </button>
        <button
          onClick={logout}
          className="px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;