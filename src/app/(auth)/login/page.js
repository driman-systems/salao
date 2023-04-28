"use client";
import React from "react";
import "../style.css";
import Image from "next/image";

const Login = () => {

  const handleSubmit = (e)=>{
    e.preventDefault();
  }


  return ( 
    <div>
      <section className="bg-gray-50">
        <div className="flex flex-col h-screen items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <a href="/" className="flex items-center mb-6">
                <Image className="mr-1" src="/logo-amanda-dark.svg" alt="logo" width={250} height={72} />  
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Entrar
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Seu e-mail</label>
                            <input type="email" name="email" id="email" 
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                              placeholder="email@email.com" 
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
                            <input type="password" name="password" id="password" 
                              placeholder="••••••••" 
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"  
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                  <input id="remember" aria-describedby="remember" type="checkbox" className="accent-[#A82D54] w-4 h-4" />
                                </div>
                                <div className="ml-3 text-sm">
                                  <label htmlFor="remember" className="text-gray-500">Lembrar</label>
                                </div>
                            </div>
                            <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Esqueceu a senha?</a>
                        </div>
                        <button type="submit" 
                        className="w-full text-white bg-[#A82D54] hover:brightness-105 focus:outline-none focus:shadow-none
                       font-medium rounded-md text-sm px-5 py-2.5 text-center">
                          Entrar
                        </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Não tem conta? <a href="/cadastro" className="font-medium text-[#A82D54] hover:underline">Crie uma</a>
                        </p>
                    </form>
                    <button type="submit" 
                        className="w-full flex flex-row space-x-3 justify-center items-center  text-gray-400 bg-gray-50 hover:brightness-95 focus:outline-none focus:shadow-none
                       font-medium rounded-md text-sm px-5 py-4 text-center">
                        <Image src="/google-icon.svg" alt="Google" width={25} height={25} />
                        <span>Entrar com o Google</span>
                        </button>
                </div>
            </div>
        </div>
      </section>
    </div>
  )
}

export default Login
