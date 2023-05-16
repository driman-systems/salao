"use client";
import { useState, useEffect } from "react";
import "../style.css";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Image from "next/image";
import Footer from "@/components/Footer";
import { auth, provider } from "@/config/Firebase";
import { signInWithPopup, createUserWithEmailAndPassword, updateProfile, fetchSignInMethodsForEmail } from "firebase/auth";
import { useSearchParams, useRouter } from "next/navigation";
import { getFirestore, collection, doc, setDoc, getDocs, query, where } from "firebase/firestore";


const Cadastrar = () => {

  const firestore = getFirestore();
  const router = useRouter();

  const params = useSearchParams();
  const userEmail = params.get('email');
  const displayName = params.get('name');
  const googleUp = params.get('isGoogleSignUp');
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [isGoogleSignUp, setIsGoogleSignUp] = useState(false);
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

  useEffect(() => {

    if (googleUp === 'true') {
      setIsGoogleSignUp(true);
      setFormData((prevData) => ({
        ...prevData,
        email: userEmail,
        name: displayName,
      }));
      setStep(2);
    }
  }, [displayName, googleUp, isGoogleSignUp, params, userEmail]);

  const formatPhone = (input) => {
    const value = input.replace(/\D/g, "");
    const formattedValue = value
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
    return formattedValue;
  };  
  
 const handleInputChange = (e) => {
  const { name, value } = e.target;
  // Limpa o erro específico para o campo que está sendo alterado
  const errorField = name + 'Error'; 
  setFormData(prevData => ({
    ...prevData,
    [name]: value,
    [errorField]: ''
  }));

  if (name === "phone") {
    setFormData({ ...formData, [name]: formatPhone(value) });
  }
};

  const handleNextStep = async (e) => {
    e.preventDefault();
    if (await validateFields()) {
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

  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*\d])[a-zA-Z!@#$%^&*\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const checkIfEmailExists = async (email) => {
    const userQuery = query(collection(firestore, 'users'), where('email', '==', email));
    const querySnapshot = await getDocs(userQuery);
  
    return !querySnapshot.empty;
  };

  const validateFields = async() => {
    let isValid = true;
  
    // Etapa 1
    if (step === 1 && !isGoogleSignUp) { // Adicione a condição !isGoogleSignUp aqui
    
      if (formData.email === '' || !isValidEmail(formData.email)) {
        setFormData((prevData) => ({ ...prevData, emailError: 'Por favor, insira um e-mail válido.' }));
        isValid = false;
      } else {
        const emailExists = await checkIfEmailExists(formData.email);
        if(emailExists) {
          setFormData((prevData) =>  ({ ...prevData, emailError: 'Este e-mail já está em uso.' }));
          isValid = false;
        } else {
          setFormData((prevData) => ({ ...prevData, emailError: '' }));
        }
      }
  
      // Validação de senha
      if (formData.password === '' || !isValidPassword(formData.password)) {
        setFormData((prevData) => ({ ...prevData, passwordError: 'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula e um caractere especial.' }));
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
        setLoading(false);
        setFormData((prevData) => ({ ...prevData, nameError: 'Por favor, insira seu nome completo.' }));
        isValid = false;
      } else {
        setFormData((prevData) => ({ ...prevData, nameError: '' }));
      }
  
      // Validação do telefone
      if (formData.phone === '' || !isValidPhone(formData.phone)) {
        setLoading(false);
        setFormData((prevData) => ({ ...prevData, phoneError: 'Por favor, insira um número de telefone válido.' }));
        isValid = false;
      } else {
        setFormData((prevData) => ({ ...prevData, phoneError: '' }));
      }
  
      // Validação da data de nascimento
      if (formData.birthdate === '') {
        setLoading(false);
        setFormData((prevData) => ({ ...prevData, birthdateError: 'Por favor, insira sua data de nascimento.' }));
        isValid = false;
      } else {
        setFormData((prevData) => ({ ...prevData, birthdateError: '' }));
      }
  
      // Validação da cidade
      if (formData.city === '') {
        setLoading(false);
        setFormData((prevData) => ({ ...prevData, cityError: 'Por favor, insira sua cidade.' }));
        isValid = false;
      } else {
        setFormData((prevData) => ({ ...prevData, cityError: '' }));
      }
    }
  
    return isValid;
  };
  
const handleGoogleSignIn = async (e) => {
  e.preventDefault();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const displayName = user.displayName ?? '';
    const email = user.email ?? '';

    setFormData((prevData) => ({
      ...prevData,
      email,
      name: displayName
    }));

    const emailExists = await checkIfEmailExists(email);
    if (emailExists) {
      router.push('/cliente');
    } else {
      setIsGoogleSignUp(true);
      setStep(2);
    }
  } catch (error) {
    console.error("Erro ao fazer login com o Google:", error);
  }
};

const saveUserInfo = async (uid, userInfo) => {
  const userRef = doc(firestore, 'users', uid);
  await setDoc(userRef, userInfo);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  if (validateFields()) {
    try {
      let user;

      const emailExists = await checkIfEmailExists(formData.email);

      if (isGoogleSignUp) {
        if (emailExists) {
          // Se o email já existe, seguir com o login e ir para o /cliente
          user = auth.currentUser;
          router.push('/cliente');
        } else {
          // Se o email não existe, atualizar o perfil do usuário
          user = auth.currentUser;
          await updateProfile(user, {
            displayName: formData.name,
            phoneNumber: formData.phone,
          });
        }
      } else {
          // Cadastrar usuário com e-mail e senha
         const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            user = userCredential.user;
            await updateProfile(user, {
              displayName: formData.name,
              phoneNumber: formData.phone,
            });
        }

      if (user) {
        // Salvar informações adicionais do usuário no Firestore
        const userInfo = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          birthDate: formData.birthdate,
          city: formData.city,
        };
        await saveUserInfo(user.uid, userInfo);

        // Mostrar mensagem de sucesso e aguardar 3 segundos antes de redirecionar
        setSuccessMessage(true);
        setLoading(false);
        setTimeout(() => {
          setSuccessMessage(false);
          router.push('/cliente');
        }, 1000);
      } else {
        setLoading(false);
      }

    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  }
};

  return (
    <div>
      <section className="bg-gray-50">
        <div className="flex flex-col h-screen items-center justify-center px-6 py-3 mx-auto lg:py-0">
          <a href="/" className="mb-2">
            <Image className="max-w-[250px] h-auto" src="/logo-amanda-bk.svg" alt="logo" width={800} height={400} priority={true} />
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-8 space-y-6 md:space-y-4">
              <h1 className="text-md font-bold leading-tight tracking-tight text-[#AF1B51] md:text-2xl">
                Cadastro
              </h1>
              <form className="space-y-6" onSubmit={handleSubmit}>
                {step === 1 && (
                  <>
                  {/*  Email */}
                    <div className="relative">
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Seu e-mail</label>
                      <div className="flex items-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus-within:border-[#AF1B51] focus:border-4 w-full">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="focus:ring-0 focus:border-transparent focus:outline-none flex-grow p-2.5 rounded-lg bg-transparent"
                          placeholder="email@email.com"
                        />
                      </div>
                      {formData.emailError && <p className="mt-1 text-sm text-red-600">{formData.emailError}</p>}
                      {error !== null && <div className="text-red-600 mt-1 text-center">{error}</div>}
                    </div>
                  {/*  Senha */}
                    <div className="relative">
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Senha</label>
                      <div className="flex items-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus-within:border-[#AF1B51] focus:border-4 w-full">
                        <input
                          type={passwordVisible ? "text" : "password"}
                          name="password"
                          id="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="focus:ring-0 focus:border-transparent focus:outline-none flex-grow p-2.5 rounded-lg bg-transparent"
                          onFocus={() => setShowPasswordRequirements(true)}
                          onBlur={() => setShowPasswordRequirements(false)}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setPasswordVisible(!passwordVisible)}
                          className="mr-2 text-gray-600 bg-transparent"
                        >
                          {passwordVisible ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
                        </button>
                      </div>
                      {showPasswordRequirements && !formData.passwordError  &&  (
                        <div className="block w-full mt-1 text-sm text-gray-600 px-2">
                          A senha tem que ter um mínimo de 8 algarismos, 1 letra maiúscula, 1 minúscula e 1 caractere especial
                        </div>
                      )}
                      {formData.passwordError && <p className="mt-1 text-sm text-red-600">{formData.passwordError}</p>}
                    </div>
                  {/*  Confirma senha */}
                    <div className="relative">
                      <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">Confirmar senha</label>
                      <div className="flex items-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus-within:border-[#AF1B51] focus:border-4 w-full">
                        <input
                          type={confirmPasswordVisible ? "text" : "password"}
                          name="confirmPassword"
                          id="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="focus:ring-0 focus:border-transparent focus:outline-none flex-grow p-2.5 rounded-lg bg-transparent"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                          className="mr-2 text-gray-600 bg-transparent"
                        >
                          {confirmPasswordVisible ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
                        </button>
                      </div>
                      {formData.confirmPasswordError && <p className="mt-1 text-sm text-red-600">{formData.confirmPasswordError}</p>}
                    </div>
                                        
                    <button onClick={handleNextStep} className="w-full text-white bg-[#AF1B51] hover:brightness-105 focus:outline-none focus:shadow-none font-medium rounded-md text-sm mt-3 px-5 py-2.5 text-center">
                      Próximo
                    </button>
                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full flex flex-row space-x-3 justify-center items-center  text-gray-400 bg-gray-50 hover:brightness-95 focus:outline-none focus:shadow-none
                        font-medium rounded-md text-sm px-5 py-3 text-center"
                      >
                        <Image src="/google-icon.svg" alt="Google" width={25} height={25}  />
                        <span>Cadastrar com o Google</span>
                      </button>
                    <p className="text-sm font-light text-gray-500 text-center">
                            Já tem conta? <a href="/login" className="font-medium text-[#AF1B51] hover:underline">Entrar</a>
                        </p>
                  </>
                )}

                {step === 2 && (
                  <>
                  {/*  Nome */}
                    <div className="relative">
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Nome completo</label>
                      <div className="flex items-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus-within:border-[#AF1B51] focus:border-4 w-full">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="focus:ring-0 focus:border-transparent focus:outline-none flex-grow p-2.5 rounded-lg bg-transparent"
                          placeholder="Seu nome completo"
                        />
                      </div>
                      {formData.nameError && <p className="mt-1 text-sm text-red-600">{formData.nameError}</p>}
                    </div>
                  {/*  Telefone */}
                    <div className="relative">
                      <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Telefone</label>
                      <div className="flex items-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus-within:border-[#AF1B51] focus:border-4 w-full">
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="focus:ring-0 focus:border-transparent focus:outline-none flex-grow p-2.5 rounded-lg bg-transparent"
                          placeholder="(99) 99999-9999"
                        />
                      </div>
                      {formData.phoneError && <p className="mt-1 text-sm text-red-600">{formData.phoneError}</p>}
                    </div>
                  {/*  Data de nascimento */}
                    <div className="relative">
                      <label htmlFor="birthdate" className="block mb-2 text-sm font-medium text-gray-900">Data de nascimento</label>
                      <div className="flex items-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus-within:border-[#AF1B51] focus:border-4 w-full">
                        <input
                          type="date"
                          name="birthdate"
                          id="birthdate"
                          value={formData.birthdate}
                          onChange={handleInputChange}
                          className="focus:ring-0 focus:border-transparent focus:outline-none flex-grow p-2.5 rounded-lg bg-transparent"
                        />
                      </div>
                      {formData.birthdateError && <p className="mt-1 text-sm text-red-600">{formData.birthdateError}</p>}
                    </div>
                  {/*  Cidade */}
                    <div className="relative">
                      <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">Cidade</label>
                      <div className="flex items-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus-within:border-[#AF1B51] focus:border-4 w-full">
                        <input
                          type="text"
                          name="city"
                          id="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="focus:ring-0 focus:border-transparent focus:outline-none flex-grow p-2.5 rounded-lg bg-transparent"
                          placeholder="Sua cidade"
                        />
                      </div>
                      {formData.cityError && <p className="mt-1 text-sm text-red-600">{formData.cityError}</p>}
                    </div>
                    <div className="flex space-x-4">
                      <button onClick={handlePrevStep} className="w-full text-gray-900 bg-gray-200 hover:brightness-95 focus:outline-none focus:shadow-none font-medium rounded-md text-sm px-5 py-2.5 text-center">
                        Anterior
                      </button>
                      <button type="submit" className="items-center w-full text-white bg-[#AF1B51] hover:brightness-105 focus:outline-none focus:shadow-none font-medium rounded-md text-sm px-5 py-2.5 text-center">
                       {loading && <Image className="mr-1 inline" src="/loading.svg" alt="carregamdo" width={20} height={20} />}  <div className="inline">Cadastrar</div> 
                      </button>
                    </div>
                  </>
                )}
              </form>
              {successMessage && (
                <div>
                  <p className="text-lime-600 text-center font-bold">Cadastro realizado com sucesso!</p>
                </div>
              )}
            </div>
          </div>
          <Footer />
        </div>
      </section>
    </div>
  );
};

export default Cadastrar;