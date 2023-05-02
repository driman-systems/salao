"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaSignOutAlt } from 'react-icons/fa';
import { RiMenuUnfoldLine } from 'react-icons/ri';

const Header = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const navigateToHome = () => {
    router.push('/');
  };

  return (
    <header className="flex flex-col lg:flex-row bg-[#A82D54]">
      <div className="flex w-full max-w-6xl m-auto py-3 px-3 xl:px-0 justify-between items-center">
        <div onClick={navigateToHome} className="cursor-pointer">
          <Image className="max-w-[150px] h-auto" src="/logo-amanda-bnc.svg" alt="Amanda Moura Nail Design" width={180} height={50} />
        </div>
        <nav className={`hidden lg:flex space-x-5 text-lg`}>
          <Link href="/sobre">
            <span className="text-white hover:brightness-125">Sobre</span>
          </Link>
          <Link href="/servicos">
            <span className="text-white hover:brightness-125">Servicos</span>
          </Link>
          <Link href="/login">
            <span className="text-white items-center hover:brightness-125">Entrar <FaSignOutAlt className="inline" /></span>
          </Link>
        </nav>
        <RiMenuUnfoldLine onClick={toggleMenu} className="lg:hidden text-4xl me-3 text-white" />
      </div>
      <nav className={`w-full overflow-hidden transition-all duration-300 ease-in-out h-auto ${menuOpen ? 'max-h-48' : 'max-h-0'} text-2xl lg:hidden`}>
        <div className="flex flex-col items-center pb-1">
          <Link href="/sobre" className='w-full border-t-2 border-white border-opacity-10 py-2 text-center'>
            <span className="text-white hover:brightness-125" onClick={closeMenu}>Sobre</span>
          </Link>
          <Link href="/servicos" className='w-full border-t-2 border-white border-opacity-10 py-2 text-center'>
            <span className="text-white hover:brightness-125" onClick={closeMenu}>Servicos</span>
          </Link>
          <Link href="/login" className='w-full border-t-2 border-white border-opacity-10 py-2 text-center'>
            <span className="text-white items-center hover:brightness-125" onClick={closeMenu}>Entrar <FaSignOutAlt className="inline" /></span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
