import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useRouter } from 'next/router';

const Home: React.FC = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && !user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>
      <div className="flex flex-col items-center mt-20">
        <h1 className="text-4xl font-bold text-black dark:text-white mb-6">Welcome, {user}!</h1>
        <p className="text-lg mb-4">You are logged in. Feel free to explore the app!</p>
        <button
          onClick={() => router.push('/expenses')}
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go to Expense Tracker
        </button>
      </div>
    </div>
  );
};

export default Home;