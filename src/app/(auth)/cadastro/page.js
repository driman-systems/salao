"use client";
import React, { useState } from "react";
import "../style.css";
import Image from "next/image";
import Footer from "@/components/Footer";

const Cadastrar = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
  password: '',
  confirmPassword: '',
  name: '',
  phone: '',
  birthdate: '',
  city: '',
  emailError: '',
  passwordError: '',
  confirmPasswordError: '',
  nameError: '',
  phoneError: '',
  birthdateError: '',
  cityError: '',
  });

  const formatPhone = (input) => {
    const value = input.replace(/\D/g, "");
    const formattedValue = value
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
    return formattedValue;
  };
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "phone") {
      setFormData({ ...formData, [name]: formatPhone(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (validateFields()) {
      setStep((prevStep) => prevStep + 1);
    }
  };
  

  const handlePrevStep = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const isValidPhone = (phone) => {
    const phoneRegex = /^\(?([0-9]{2})\)?[-.\s]?([0-9]{4,5})[-.\s]?([0-9]{4})$/;
    return phoneRegex.test(phone);
  };

  const validateFields = () => {
    let isValid = true;
  
    // Etapa 1
    if (step === 1) {
      // Validação de e-mail
      if (formData.email === '' || !isValidEmail(formData.email)) {
        setFormData((prevData) => ({ ...prevData, emailError: 'Por favor, insira um e-mail válido.' }));
        isValid = false;
      } else {
        setFormData((prevData) => ({ ...prevData, emailError: '' }));
      }
  
      // Validação de senha
      if (formData.password === '') {
        setFormData((prevData) => ({ ...prevData, passwordError: 'Por favor, insira uma senha.' }));
        isValid = false;
      } else {
        setFormData((prevData) => ({ ...prevData, passwordError: '' }));
      }
  
      // Validação de confirmação de senha
      if (formData.confirmPassword === '' || formData.password !== formData.confirmPassword) {
        setFormData((prevData) => ({ ...prevData, confirmPasswordError: 'As senhas não coincidem.' }));
        isValid = false;
      } else {
        setFormData((prevData) => ({ ...prevData, confirmPasswordError: '' }));
      }
    }
  
    // Etapa 2
    if (step === 2) {
      // Validação do nome
      if (formData.name === '') {
        setFormData((prevData) => ({ ...prevData, nameError: 'Por favor, insira seu nome completo.' }));
        isValid = false;
      } else {
        setFormData((prevData) => ({ ...prevData, nameError: '' }));
      }
  
      // Validação do telefone
      if (formData.phone === '' || !isValidPhone(formData.phone)) {
        setFormData((prevData) => ({ ...prevData, phoneError: 'Por favor, insira um número de telefone válido.' }));
        isValid = false;
      } else {
        setFormData((prevData) => ({ ...prevData, phoneError: '' }));
      }
  
      // Validação da data de nascimento
      if (formData.birthdate === '') {
        setFormData((prevData) => ({ ...prevData, birthdateError: 'Por favor, insira sua data de nascimento.' }));
        isValid = false;
      } else {
        setFormData((prevData) => ({ ...prevData, birthdateError: '' }));
      }
  
      // Validação da cidade
      if (formData.city === '') {
        setFormData((prevData) => ({ ...prevData, cityError: 'Por favor, insira sua cidade.' }));
        isValid = false;
      } else {
        setFormData((prevData) => ({ ...prevData, cityError: '' }));
      }
    }
  
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
      alert("Cadastro enviado");
      console.log('Formulário enviado com sucesso:', formData);
    }
  };
  

  return (
    <div>
      <section className="bg-gray-50">
        <div className="flex flex-col h-screen items-center justify-center px-6 py-3 mx-auto lg:py-0">
          <a href="/" className="flex items-center mb-1">
            <Image className="max-w-[250px]" src="/logo-amanda-bk.svg" alt="logo" width={800} height={400} />
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-3 sm:p-8">
              <h1 className="text-md font-bold leading-tight tracking-tight text-[#AF1B51] md:text-2xl">
                Cadastro
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
                      {formData.emailError && <p className="mt-1 text-sm text-red-600">{formData.emailError}</p>}
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
                      {formData.passwordError && <p className="mt-1 text-sm text-red-600">{formData.passwordError}</p>}

                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">Confirmar senha</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="••••••••"
                      />
                      {formData.confirmPasswordError && <p className="mt-1 text-sm text-red-600">{formData.confirmPasswordError}</p>}

                    </div>
                    <button onClick={handleNextStep} className="w-full text-white bg-[#AF1B51] hover:brightness-105 focus:outline-none focus:shadow-none font-medium rounded-md text-sm px-5 py-2.5 text-center">
                      Próximo
                    </button>
                    <p className="text-sm font-light text-gray-500 text-center">
                            Já tem conta? <a href="/login" className="font-medium text-[#AF1B51] hover:underline">Entrar</a>
                        </p>
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
                      {formData.nameError && <p className="mt-1 text-sm text-red-600">{formData.nameError}</p>}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Telefone</label>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="(99) 99999-9999"
                      />
                      {formData.phoneError && <p className="mt-1 text-sm text-red-600">{formData.phoneError}</p>}
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
                      {formData.birthdateError && <p className="mt-1 text-sm text-red-600">{formData.birthdateError}</p>}
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
                        placeholder="Sua cidade"
                      />
                      {formData.cityError && <p className="mt-1 text-sm text-red-600">{formData.cityError}</p>}
                    </div>
                    <div className="flex space-x-4">
                      <button onClick={handlePrevStep} className="w-full text-gray-900 bg-gray-200 hover:brightness-95 focus:outline-none focus:shadow-none font-medium rounded-md text-sm px-5 py-2.5 text-center">
                        Anterior
                      </button>
                      <button type="submit" className="w-full text-white bg-[#AF1B51] hover:brightness-105 focus:outline-none focus:shadow-none font-medium rounded-md text-sm px-5 py-2.5 text-center">
                        Cadastrar
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
          <Footer />
        </div>
      </section>
    </div>
  );
};

export default Cadastrar;

