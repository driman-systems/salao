"use client";
import React from "react";
import "./style.css";
import Image from "next/image";

const Login = () => {
  return ( 
    <div>
      <section class="bg-gray-50">
        <div class="flex flex-col h-screen items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <a href="/" class="flex items-center mb-6">
                <Image class="mr-1" src="/logo-amanda-dark.svg" alt="logo" width={250} height={72} />  
            </a>
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Entrar
                    </h1>
                    <form class="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Seu e-mail</label>
                            <input type="email" name="email" id="email" 
                              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                              placeholder="email@email.com" 
                            />
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
                            <input type="password" name="password" id="password" 
                              placeholder="••••••••" 
                              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"  
                            />
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                  <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" />
                                </div>
                                <div class="ml-3 text-sm">
                                  <label for="remember" class="text-gray-500">Lembrar</label>
                                </div>
                            </div>
                            <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Esqueceu a senha?</a>
                        </div>
                        <button type="submit" class="w-full text-white bg-[#A82D54] hover:brightness-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 text-center">Entrar</button>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Não tem conta? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Cadastrar</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
      </section>
    </div>
  )
}

export default Login
