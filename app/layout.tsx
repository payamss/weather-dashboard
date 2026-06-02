// app/layout.tsx or your main layout file
import type { Metadata } from 'next';
import { Outfit, Source_Sans_3 } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
    subsets: ['latin'],
    variable: '--font-outfit',
});

const sourceSans = Source_Sans_3({
    subsets: ['latin'],
    variable: '--font-source-sans',
});

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
            <body className={`${outfit.variable} ${sourceSans.variable} flex min-h-screen flex-col`}>{children}</body>
        </html>
    );
}
