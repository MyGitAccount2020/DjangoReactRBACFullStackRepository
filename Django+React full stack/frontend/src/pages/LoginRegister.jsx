import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginRegister = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    role: 'patient'
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is already logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    
    if (token && role) {
      setMessage('You are already logged in. Redirecting...');
      const redirectPath = {
        admin: '/admin/dashboard',
        doctor: '/doctor/dashboard',
        nurse: '/nurse/dashboard',
        patient: '/patient/dashboard'
      }[role] || '/';
      
      // Redirect after a short delay to show the message
      const timer = setTimeout(() => {
        navigate(redirectPath);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      if (isLogin) {
        const response = await axios.post('http://localhost:8000/api/login/', {
          username: formData.username,
          password: formData.password,
        });

        if (response.data.token && response.data.user) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          localStorage.setItem('role', response.data.user.role);

          setMessage(`Login successful! Redirecting to ${response.data.user.role} dashboard...`);
          
          // Redirect based on role
          const redirectPath = {
            admin: '/admin/dashboard',
            doctor: '/doctor/dashboard',
            nurse: '/nurse/dashboard',
            patient: '/patient/dashboard'
          }[response.data.user.role] || '/';
          
          setTimeout(() => navigate(redirectPath), 1000);
        } else {
          throw new Error('Invalid response from server');
        }
      } else {
        // Registration logic
        const response = await axios.post('http://localhost:8000/api/register/', formData);
        
        if (response.status === 201) {
          setMessage('Registration successful! Please login with your credentials.');
          setIsLogin(true);
          // Clear password field but keep username
          setFormData({
            ...formData,
            password: '',
            email: '',
            role: 'patient'
          });
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      const errorMessage = error.response?.data?.error || 
                         error.response?.data?.detail || 
                         error.message || 
                         'Authentication failed';
      setMessage(errorMessage);
      
      // Clear password field on error
      setFormData({...formData, password: ''});
    } finally {
      setIsLoading(false);
    }
  };

  // If user is already logged in, show redirect message
  if (localStorage.getItem('token')) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">Already Logged In</h2>
          <p className="text-gray-700 mb-4">{message || 'You are already logged in.'}</p>
          <p className="text-gray-500">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          {isLogin ? 'Login' : 'Register'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Username:</label>
            <input 
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={isLoading}
            />
          </div>
          
          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input 
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="8"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={isLoading}
            />
          </div>

          {/* Registration Fields (shown only when registering) */}
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email:</label>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role:</label>
                <select 
                  name="role" 
                  value={formData.role} 
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  disabled={isLoading}
                >
                  <option value="admin">Admin</option>
                  <option value="doctor">Doctor</option>
                  <option value="nurse">Nurse</option>
                  <option value="patient">Patient</option>
                </select>
              </div>
            </>
          )}

          <button
            type="submit"
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              isLogin ? 'Login' : 'Register'
            )}
          </button>
        </form>

        <p 
          onClick={() => !isLoading && setIsLogin(!isLogin)} 
          className={`mt-4 text-center text-blue-500 hover:underline cursor-pointer ${isLoading ? 'text-gray-400 cursor-not-allowed' : ''}`}
        >
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </p>

        {message && (
          <p className={`mt-4 text-center font-medium ${message.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginRegister;