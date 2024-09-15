/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { useAuth } from "../../../utils/AuthProvider";
import { authService } from "../../../services/AuthService";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useAuth(); 
  const navigate = useNavigate(); 

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authService.login({ username: email, password });
      const token = response.data.token;

      authService.saveToken(token); 
      const tokenInfo = authService.getTokenInfo(); 
      setUser(tokenInfo);

      navigate("/task");
    } catch (error) {
      setError("Email ou mot de passe incorrect");
      console.error(error);
    }
  };

  const handleGoogleLoginSuccess = async (response: any) => {
    try {
      const googleToken = response.credential; 
      const serverResponse = await authService.loginWithGoogle(googleToken);
      const token = serverResponse.data.token;

      authService.saveToken(token); 
      const tokenInfo = authService.getTokenInfo(); 
      setUser(tokenInfo);

      navigate("/task");
    } catch (error) {
      console.error("Erreur de connexion avec Google", error);
      setError("Erreur de connexion avec Google");
    }
  };

  const handleGoogleLoginError = () => {
    setError("Erreur lors de la connexion avec Google");
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-[#002D74] mb-4">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-[#002D74] focus:ring-[#002D74] sm:text-sm"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-[#002D74] focus:ring-[#002D74] sm:text-sm"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#002D74] text-white py-2 rounded-md hover:bg-[#003366] focus:outline-none focus:ring-2 focus:ring-[#003366] focus:ring-offset-2"
          >
            Login
          </button>
        </form>

        <div className="my-6 flex items-center text-gray-400">
          <hr className="flex-grow border-gray-400" />
          <p className="mx-4 text-sm text-[#002D74]">OR</p>
          <hr className="flex-grow border-gray-400" />
        </div>

        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginError}
            text="signin_with"
          />
        </GoogleOAuthProvider>

        <div className="mt-4 text-center text-sm text-[#002D74]">
          <a href="#" className="hover:underline">Forgot your password?</a>
        </div>

        <div className="mt-4 text-center text-sm text-[#002D74]">
          <p>Don't have an account?</p>
          <button className="mt-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-[#002D74] hover:bg-gray-50">Register</button>
        </div>
      </div>
    </section>
  );
};

export default Login;
