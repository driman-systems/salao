"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {FaSignOutAlt} from "react-icons/fa"
import {RiMenuUnfoldLine} from "react-icons/ri";

const Header = () => {

const router = useRouter();

  return (
    <header className="flex border-b-2 border-gray-100 shadow-sm shadow-gray-100 bg-violet-50">
      <div className="flex w-full max-w-7xl m-auto py-3 px-3 xl:px-0 justify-between items-center">
            <Image onClick={()=> router.push("/")} className="cursor-pointer max-w-[150px] h-auto" src="/logo-amanda.png" alt="Amanda Moura Nail Design" width={200} height={58} />
            <nav className="space-x-6 hidden lg:inline">
              <Link className="text-gray-700" href="/sobre">Sobre</Link>
              <Link className="text-gray-700" href="/servicos">Servicos</Link>
              <Link className="text-gray-700 items-center" href="/login">Entrar <FaSignOutAlt className="inline" /></Link>
            </nav>
            <RiMenuUnfoldLine className="lg:hidden text-4xl me-3 text-[#A82D54]" />
      </div>
    </header>
  )
}

export default Header
