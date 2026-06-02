import Footer from '@/app/components/footer';

export default function RootGroupLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main className='flex-grow'>{children}</main>
            <Footer />
        </>
    );
}
