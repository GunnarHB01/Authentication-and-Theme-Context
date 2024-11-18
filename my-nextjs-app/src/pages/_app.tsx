import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '../context/ThemeContext';
import { AuthProvider } from '../context/AuthContext';

const MyApp = ({ Component, pageProps }: AppProps) => (
    <AuthProvider>
        <ThemeProvider>
            <Component {...pageProps} />
        </ThemeProvider>
    </AuthProvider>
);

export default MyApp;