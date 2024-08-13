import Link from 'next/link';

export default function Footer() {
    return (
        <footer className='mt-auto w-screen bg-slate-800 py-4 text-white'>
            <div className='container mx-auto text-center'>
                <p className='text-center text-xs'>
                    Weather &copy; {new Date().getFullYear()}{' '}
                    <Link className='text-sm text-gray-400 underline hover:text-white' href='https://shariat.de'>
                        Shariat.de
                    </Link>
                </p>
            </div>
        </footer>
    );
}
