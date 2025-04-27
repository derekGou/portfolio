"use client"
import Link from "next/link";
import Image from "next/image";
import { IconContext } from "react-icons";
import { IoMenuSharp, IoCloseSharp } from "react-icons/io5";
import Links from "../links/links";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [right, setRight] = useState("-100%")
    const [display, setDisplay] = useState("none")

    useEffect(()=>{
        const handler = () => {
            if (window.innerWidth>=768){
                setDisplay("none")
                setRight("0%")
            }
        }
        window.addEventListener("resize", handler)
        return () => window.removeEventListener("resize", handler)
    }, [])

    const open = () => {
        setDisplay("flex")
        setRight("0%")
    }
    const close = () => {
        setRight("-100%")
        setTimeout(() => {
            setDisplay("none")
        }, 500);
    }

    return (
        <nav className="fixed top-0 left-0 z-30">
            <div className="w-screen h-fit flex px-8 md:px-16 py-8 flex-row gap-8 md:gap-16">
                <Link href="/" className="flex flex-row gap-4 grow items-center">
                    <Image
                        alt="logo"
                        className="h-6 w-6"
                        src="/LogoPF.svg"
                        width={24}
                        height={24}
                    />
                    <h2 className="text-left">Derek Gou</h2>
                </Link>
                <Link href="/about" className="hidden md:flex flex-row gap-4">
                    <h2 className="text-right">About</h2>
                </Link>
                <Link href="/projects" className="hidden md:flex flex-row gap-4">
                    <h2 className="text-right">Projects</h2>
                </Link>
                <div onClick={()=>{open()}} className="block md:hidden cursor-pointer h-fit w-fit">
                    <IconContext.Provider value={{ color: "#fff", size: "36" }}>
                        <IoMenuSharp />
                    </IconContext.Provider>
                </div>
            </div>
            <div style={{ display: display, right: right }} className="transition-all duration-500 fixed  flex-col top-0 h-screen bg-[#04262f]">
                <div onClick={()=>{close()}} className="flex justify-end p-8">
                    <IconContext.Provider value={{ color: "#fff", size: "36" }}>
                        <IoCloseSharp className="cursor-pointer rotate-0 transition-all hover:rotate-45"/>
                    </IconContext.Provider>
                </div>
                <Link href="/" className="bg-[#04262f] transition-all hover:brightness-150 flex flex-row gap-4 p-2 px-8">
                    <h2 className="text-left">Home</h2>
                </Link>
                <Link href="/about" className="bg-[#04262f] transition-all hover:brightness-150 flex flex-row gap-4 p-2 px-8">
                    <h2 className="text-right">About</h2>
                </Link>
                <Link href="/projects" className="bg-[#04262f] transition-all hover:brightness-150 flex flex-row gap-4 p-2 px-8">
                    <h2 className="text-right">Projects</h2>
                </Link>
                <div className="flex items-end grow p-8">
                    <Links />
                </div>
            </div>
        </nav>
    )
}