"use client"
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0">
            <div className="w-screen h-fit flex px-16 py-8 flex-row gap-16">
                <Link href="/" className="flex flex-row gap-4 grow">
                    <img
                        src="/LogoPF.svg"
                        alt="Logo"
                        style={{ width: "24px", height: "auto" }}
                    />
                    <h2>Derek Gou</h2>
                </Link>
                <Link href="/about" className="flex flex-row gap-4">
                    <h2>About</h2>
                </Link>
                <Link href="/projects" className="flex flex-row gap-4">
                    <h2>Projects</h2>
                </Link>
            </div>
        </nav>
    )
}