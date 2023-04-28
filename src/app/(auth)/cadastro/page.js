"use client";
import React, { useState } from "react";
import "../style.css";
import Image from "next/image";

const Cadastrar = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    birthdate: "",
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    zipcode: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handlePrevStep = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // Implemente a lógica de cadastro aqui
  };

  return (
    <div>
      <section className="bg-gray-50">
        <div className="flex flex-col h-screen items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <a href="/" className="flex items-center mb-6">
            <Image className="mr-1" src="/logo-amanda-dark.svg" alt="logo" width={250} height={72} />
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-md font-bold leading-tight tracking-tight text-[#A82D54] md:text-2xl">
                Cadastro
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSignup}>
                {step === 1 && (
                  <>
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Seu e-mail</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="email@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Senha</label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="••••••••"
                      />
                    </div>
                    <button onClick={handleNextStep} className="w-full text-white bg-[#A82D54] hover:brightness-105 focus:outline-none focus:shadow-none font-medium rounded-md text-sm px-5 py-2.5 text-center">
                      Próximo
                    </button>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Nome completo</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Telefone</label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="(99) 99999-9999"
                      />
                    </div>
                    <div>
                      <label htmlFor="birthdate" className="block mb-2 text-sm font-medium text-gray-900">Data de nascimento</label>
                      <input
                        type="date"
                        name="birthdate"
                        id="birthdate"
                        value={formData.birthdate}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      />
                    </div>
                    <div className="flex space-x-4">
                      <button onClick={handlePrevStep} className="w-full text-gray-900 bg-gray-200 hover:brightness-95 focus:outline-none focus:shadow-none font-medium rounded-md text-sm px-5 py-2.5 text-center">
                        Anterior
                      </button>
                      <button onClick={handleNextStep} className="w-full text-white bg-[#A82D54] hover:brightness-105 focus:outline-none focus:shadow-none font-medium rounded-md text-sm px-5 py-2.5 text-center">
                        Próximo
                      </button>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div>
                      <label htmlFor="street" className="block mb-2 text-sm font-medium text-gray-900">Rua</label>
                      <input
                        type="text"
                        name="street"
                        id="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Rua Exemplo"
                      />
                    </div>
                    <div>
                      <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900">Número</label>
                      <input
                        type="text"
                        name="number"
                        id="number"
                        value={formData.number}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="123"
                      />
                    </div>
                    <div>
                    <label htmlFor="neighborhood" className="block mb-2 text-sm font-medium text-gray-900">Bairro</label>
                      <input
                        type="text"
                        name="neighborhood"
                        id="neighborhood"
                        value={formData.neighborhood}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Bairro Exemplo"
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">Cidade</label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Cidade Exemplo"
                      />
                    </div>
                    <div>
                      <label htmlFor="zipcode" className="block mb-2 text-sm font-medium text-gray-900">CEP</label>
                      <input
                        type="text"
                        name="zipcode"
                        id="zipcode"
                        value={formData.zipcode}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="99999-999"
                      />
                    </div>
                    <div className="flex space-x-4">
                      <button onClick={handlePrevStep} className="w-full text-gray-900 bg-gray-200 hover:brightness-95 focus:outline-none focus:shadow-none font-medium rounded-md text-sm px-5 py-2.5 text-center">
                        Anterior
                      </button>
                      <button type="submit" className="w-full text-white bg-[#A82D54] hover:brightness-105 focus:outline-none focus:shadow-none font-medium rounded-md text-sm px-5 py-2.5 text-center">
                        Cadastrar
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cadastrar;

