import Link from 'next/link';

export default function Footer() {
    return (
        <footer className='mx-3 mb-3 mt-auto rounded-2xl border border-slate-300/20 bg-slate-900/70 py-4 text-white shadow-xl shadow-slate-950/40 backdrop-blur-xl'>
            <div className='container mx-auto text-center'>
                <p className='text-center text-xs tracking-wide text-slate-300'>
                    Weather &copy; {new Date().getFullYear()}{' '}
                    <Link className='text-sm text-sky-300 underline decoration-sky-400/60 underline-offset-2 transition hover:text-white' href='https://shariat.de'>
                        Shariat.de
                    </Link>
                </p>
            </div>
        </footer>
    );
}
