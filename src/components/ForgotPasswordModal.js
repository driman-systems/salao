import React, { useState } from "react";

const ForgotPasswordModal = ({ show, onClose, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleForgotPasswordSubmit = async (email) => {
    try {
      setError(null);
      await onSubmit(email);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto ${
        show ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="fixed inset-0 bg-black opacity-50"
          aria-hidden="true"
          onClick={onClose}
        ></div>
        <div className="bg-white rounded-lg shadow-xl w-full sm:max-w-lg sm:w-auto z-10">
        <div className="bg-white rounded-sm px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Esqueceu sua senha?
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Insira seu e-mail para receber um link de redefinição de senha.
                  </p>
                </div>
                <div className="mt-4">
                  <input
                    type="email"
                    name="email"
                    id="forgot-password-email"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-[#AF1B51] focus:border-[#AF1B51]"
                    placeholder="email@email.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {error && <div className="mt-2 text-red-600 text-sm">{error}</div>}
                    {message && (
                      <div className="mt-2 text-green-600 text-sm">{message}</div>
                    )}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#AF1B51] text-base font-medium text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#AF1B51] sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => handleForgotPasswordSubmit(email)}
            >
              Enviar
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#AF1B51] sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;