"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {FaSignOutAlt} from "react-icons/fa"
import {RiMenuUnfoldLine} from "react-icons/ri";

const Header = () => {

const router = useRouter();

  return (
    <header className="flex border-b-2 border-gray-100 shadow-sm shadow-gray-100 bg-[#A82D54]">
      <div className="flex w-full max-w-6xl m-auto py-3 px-3 xl:px-0 justify-between items-center">
            <Image onClick={()=> router.push("/")} className="cursor-pointer max-w-[150px] h-auto" src="/logo-amanda-bnc.svg" alt="Amanda Moura Nail Design" width={180} height={50} />
            <nav className="space-x-6 hidden lg:inline">
              <Link className="text-white" href="/sobre">Sobre</Link>
              <Link className="text-white" href="/servicos">Servicos</Link>
              <Link className="text-white items-center" href="/login">Entrar <FaSignOutAlt className="inline" /></Link>
            </nav>
            <RiMenuUnfoldLine className="lg:hidden text-4xl me-3 text-white" />
      </div>
    </header>
  )
}

export default Header
