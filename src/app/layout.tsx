// app/layout.tsx or your main layout file
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from './components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Weather | Shariat.de',
    description: 'Weather page for shariat.de created with NextJS',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={`${inter.className} flex min-h-screen flex-col bg-gray-900`}>
                {/* <Header /> */}
                <main className='flex-grow'>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
