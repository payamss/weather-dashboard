import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-screen bg-slate-800 text-white py-4 mt-auto">
            <div className="container mx-auto text-center">
                <p className="text-xs text-center  ">
                    Weather &copy; {new Date().getFullYear()}{" "}
                    <Link className="text-sm underline text-gray-400 hover:text-white" href="https://shariat.de">
                        Shariat.de
                    </Link>
                </p>
            </div>
        </footer>
    );
}
