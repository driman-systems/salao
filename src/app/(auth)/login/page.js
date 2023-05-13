"use client"
import "../style.css";
import React, { useState } from "react";
import Image from "next/image";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { auth, firestore, provider } from "@/config/Firebase";
import Footer from "@/components/Footer";
import { stringify } from 'querystring';

const Login = () => {

  const router = useRouter();

  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ email: null, password: null });

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError({ email: null, password: null });

    if (!email || !password) {
      if (!email) {
        setError((prevError) => ({ ...prevError, email: "E-mail é obrigatório" }));
      }
      if (!password) {
        setError((prevError) => ({ ...prevError, password: "Senha é obrigatória" }));
      }
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess(true);
      setTimeout(() => {
        router.push("/cliente");
      }, 2000);
    } catch (error) {
      const errorCode = error.code || error.error?.message;

      if (errorCode === "auth/user-not-found" || errorCode === "INVALID_EMAIL") {
        setError((prevError) => ({ ...prevError, email: "E-mail não encontrado" }));
      } else if (errorCode === "auth/wrong-password" || errorCode === "INVALID_PASSWORD") {
        setError((prevError) => ({ ...prevError, password: "Senha incorreta" }));
      } else if (errorCode === "auth/too-many-requests") {
        setError((prevError) => ({
          ...prevError,
          email: "Muitas tentativas erradas. Por favor, tente novamente mais tarde.",
        }));
      } else {
        setError((prevError) => ({ ...prevError, email: error.message }));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const redirectToSignUp = async(email, name) => {
    const queryString = stringify({ email, name, isGoogleSignUp: "true" });
    await router.push(`/cadastro?${queryString}`);
  };

const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const user = result.user;
      const displayName = user.displayName ?? "";
      const email = user.email ?? "";

      const usersRef = collection(firestore, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        redirectToSignUp(email, displayName);
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push("/cliente");
        }, 2000);
      }
    } catch (error) {
      console.error("Erro ao fazer login com o Google:", error);
    }
  };

  return (
    <div>
      <section className="bg-gray-50">
        <div className="flex flex-col h-screen items-center justify-center px-6 py-3 mx-auto lg:py-0">
          <a href="/" className="mb-2">
            <Image className="max-w-[250px] h-auto" src="/logo-amanda-bk.svg" alt="logo" width={800} height={400} priority={true} />
          </a>
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-8 space-y-6 md:space-y-4">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-[#AF1B51] md:text-2xl">Entrar</h1>
              <form className="space-y-4 md:space-y-6" onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin(formData.email, formData.password);
                }}>
                <div className="relative">
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Seu e-mail</label>
                  <div className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus-within:border-[#AF1B51] focus:border-4 w-full">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="focus:ring-0 focus:border-transparent focus:outline-none block w-full p-2.5 rounded-lg bg-transparent"
                      placeholder="email@email.com"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                {error.email && (
                  <p className="text-sm text-red-500 mt-1">{error.email}</p>
                )}
                <div className="relative">
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Senha</label>
                  <div className="flex items-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus-within:border-[#AF1B51] focus:border-4 w-full">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      name="password"
                      id="password"
                      className="focus:ring-0 focus:border-transparent focus:outline-none flex-grow p-2.5 rounded-lg bg-transparent"
                      placeholder="••••••••"
                      onChange={handleInputChange}
                    />
                    <button
                      type="button"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className="mr-2 text-gray-600 bg-transparent"
                    >
                      {passwordVisible ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                {error.password && (
                  <p className="text-sm text-red-500 mt-1">{error.password}</p>
                )}
                                       
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox" className="accent-[#AF1B51] w-4 h-4" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500">Lembrar</label>
                      </div>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-[#AF1B51] hover:text-[#AF1B51]">
                      Esqueceu sua senha?
                    </a>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 text-white bg-[#AF1B51] rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#AF1B51]"
                >
                 {loading && <Image className="mr-1 inline" src="/loading.svg" alt="carregamdo" width={20} height={20} />}  <div className="inline">Entrar</div> 
                </button>
              </form>

              <div className="mt-6 py-2">
                <p className="text-sm text-gray-500">
                  Não tem conta?{" "}
                  <a
                    href="/cadastro"
                    className="font-medium text-[#AF1B51] hover:text-[#AF1B51]"
                  >
                    Crie uma
                  </a>
                </p>
              </div>
              <button  className="w-full flex flex-row space-x-3 justify-center items-center  text-gray-400 bg-gray-50 hover:brightness-95 focus:outline-none focus:shadow-none font-medium rounded-md text-sm px-5 py-3 text-center"
                onClick={handleGoogleSignIn}
              >
                <Image src="/google-icon.svg" alt="Google" width={25} height={25} />
                <span>Entrar com o Google</span>
              </button>

              {success && (
                    <div className="mt-4 text-center">
                      <div className="text-green-500">
                        <h3>Login bem-sucedido!</h3> 
                        <Image className="mr-1 inline" src="/spinner.svg" alt="carregamdo" width={30} height={30} />  
                        <div className="inline">Redirecionando... </div>
                      </div>
                    </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Login;