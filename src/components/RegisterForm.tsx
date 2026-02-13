import React, { useState } from 'react';
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import Toast from './Toast';
import { signUp } from '@/services/auth';

type ToastType = 'error' | 'success' | 'warning' | 'info';

type Notification = {
  message: string;
  type: ToastType;
};

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<Notification | null>(null);

  const navigate = useNavigate();

  const showNotification = (message: string, type: ToastType = 'error') => {
    setNotification({ message, type });
  };

  const clearNotification = () => {
    setNotification(null);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    localStorage.setItem('email', email);

    if (!email.trim()  || !password.trim() || !confirmPassword.trim()) {
      showNotification('Por favor complete todos los campos', 'warning');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      showNotification('Las contraseñas no coinciden', 'error');
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      showNotification('La contraseña debe tener al menos 8 caracteres', 'error');
      setIsLoading(false);
      return;
    }

    try {
      await signUp(email, password);
      
      // Guardar email para la verificación
      localStorage.setItem('email', email);
      
      showNotification('Registro exitoso. Verifica tu email.', 'success');
      setTimeout(() => {
        clearNotification();
        navigate('/verify');
      }, 1500);
    } catch (error: unknown) {
      let errorMessage = 'Error al registrar usuario';
      if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = (error as { message: string }).message;
      }
      showNotification(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="card bg-white w-full max-w-sm shrink-0 shadow-2xl">
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label font-gotham">
              <span className="text-black">Email</span>
            </label>
            <input
              type="email"
              placeholder="correo@ejemplo.com"
              className="input input-bordered bg-gray-200 text-black shadow-md w-full rounded-xl"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>


          <div className="form-control">
            <label className="label">
              <span className="text-black">Contraseña</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña (mín. 8 caracteres)"
                className="input input-bordered w-full pr-10 bg-gray-200 text-black shadow-md rounded-xl"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10"
                disabled={isLoading}
              >
                {showPassword ? (
                  <IoMdEyeOff className="h-5 w-5 text-black cursor-pointer" />
                ) : (
                  <IoEye className="h-5 w-5 text-black cursor-pointer" />
                )}
              </button>
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="text-black">Confirmar contraseña</span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirmar contraseña"
                className="input input-bordered w-full pr-10 bg-gray-200 text-black shadow-md rounded-xl"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10"
                disabled={isLoading}
              >
                {showConfirmPassword ? (
                  <IoMdEyeOff className="h-5 w-5 text-black cursor-pointer" />
                ) : (
                  <IoEye className="h-5 w-5 text-black cursor-pointer" />
                )}
              </button>
            </div>
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn w-full bg-black text-white hover:bg-[#cd1e1a] border-none rounded-xl"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner text-[#E65F2B]"></span>
              ) : 'Registrarse'}
            </button>
          </div>

          <div className="form-control mt-4 text-center">
            <p className="text-sm font-gotham text-black">
              ¿Ya tienes cuenta?
              {' '}
              <a
                href="/"
                className="link link-hover text-[#870303]"
                tabIndex={isLoading ? -1 : 0}
              >
                Inicia sesión aquí
              </a>
            </p>
          </div>
        </form>
      </div>

      {notification && (
        <Toast
          message={notification.message}
          type={notification.type}
          onClose={clearNotification}
        />
      )}
    </>
  );
};

export default RegisterForm;