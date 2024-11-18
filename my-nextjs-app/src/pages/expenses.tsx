import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useRouter } from 'next/router';

interface Expense {
    id: number;
    name: string;
    cost: number;
}

const Expenses: React.FC = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const router = useRouter();

    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    const handleAddExpense = () => {
        if (name && cost) {
            const newExpense: Expense = {
                id: expenses.length + 1,
                name,
                cost: parseFloat(cost),
            };
            setExpenses([...expenses, newExpense]);
            setName('');
            setCost('');
        }
    };

    const handleDeleteExpense = (id: number) => {
        setExpenses(expenses.filter((expense) => expense.id !== id));
    };

    return (
        <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'} py-8 px-4`}>
            {/* Top-right buttons */}
            <div className="absolute top-4 right-4 flex space-x-4">
                <button
                    onClick={toggleTheme}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                    Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
                </button>
                <button
                    onClick={logout}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                    Logout
                </button>
            </div>

            <div className="max-w-2xl mx-auto">
                <h1 className={`text-4xl font-bold ${theme === 'light' ? 'text-blue-600' : 'text-white'} text-center mb-10`}>
                    Expense Tracker
                </h1>

                <div className={`bg-white ${theme === 'light' ? '' : 'dark:bg-gray-800'} p-6 rounded-lg shadow-lg`}>
                    <h2 className={`text-xl font-semibold ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'} mb-4`}>
                        Add New Expense
                    </h2>
                    <input
                        type="text"
                        placeholder="Expense Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                            theme === 'light' ? '' : 'bg-gray-700 text-white'
                        }`}
                    />
                    <input
                        type="number"
                        placeholder="Cost"
                        value={cost}
                        onChange={(e) => setCost(e.target.value.replace(/[^0-9.]/g, ''))}
                        className={`w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                            theme === 'light' ? '' : 'bg-gray-700 text-white'
                        }`}
                    />
                    <button
                        onClick={handleAddExpense}
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Add Expense
                    </button>
                </div>

                <h2 className={`text-2xl font-semibold ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'} mt-10 mb-4`}>
                    Your Expenses
                </h2>
                <ul className="space-y-4">
                    {expenses.map((expense) => (
                        <li
                            key={expense.id}
                            className={`flex justify-between items-center bg-white p-4 rounded-md shadow ${
                                theme === 'light' ? '' : 'dark:bg-gray-800'
                            }`}
                        >
                            <span className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
                                {expense.name} - <span className="text-blue-600">${expense.cost.toFixed(2)}</span>
                            </span>
                            <button
                                onClick={() => handleDeleteExpense(expense.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Expenses;