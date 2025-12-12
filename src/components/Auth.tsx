import { useState } from 'react';
import { Mail, Lock, Phone, User, Eye, EyeOff, ArrowRight, Car } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface AuthProps {
  onAuthSuccess: () => void;
}

export default function Auth({ onAuthSuccess }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login, register } = useApp();

  const [loginForm, setLoginForm] = useState({ email: '', password: '', name: '' });
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password || !loginForm.name) {
      alert('Please fill all fields');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      login(loginForm.email, loginForm.password, loginForm.name);
      setLoading(false);
      onAuthSuccess();
    }, 1000);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerForm.name || !registerForm.email || !registerForm.phone || !registerForm.password) {
      alert('Please fill all fields');
      return;
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      register(registerForm.name, registerForm.email, registerForm.phone, registerForm.password);
      setLoading(false);
      onAuthSuccess();
    }, 1000);
  };

return (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-1">

    {/* Smaller background blobs */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
    </div>

    <div className="relative w-full max-w-sm">
      <div className="bg-white/10 backdrop-blur-2xl rounded-xl p-4 shadow-xl border border-white/20">

        {/* Header smaller */}
        <div className="flex items-center justify-center mb-3">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-1.5 rounded-lg">
            <Car className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-black text-white ml-2">JustRide</h1>
        </div>

        {/* Tabs smaller */}
        <div className="flex space-x-2 mb-3">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-lg font-bold text-sm ${
              isLogin
                ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow"
                : "bg-white/5 text-gray-300 hover:bg-white/10"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-lg font-bold text-sm ${
              !isLogin
                ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow"
                : "bg-white/5 text-gray-300 hover:bg-white/10"
            }`}
          >
            Register
          </button>
        </div>

        {/* ---------------- LOGIN FORM ---------------- */}
        {isLogin ? (
          <form onSubmit={handleLogin} className="space-y-2">

            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-200 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={loginForm.name}
                  onChange={(e) => setLoginForm({ ...loginForm, name: e.target.value })}
                  placeholder="Enter your name"
                  className="w-full bg-white/10 border border-white/20 text-white pl-8 pr-2 py-1.5 rounded-lg text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-200 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full bg-white/10 border border-white/20 text-white pl-8 pr-2 py-1.5 rounded-lg text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-200 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-white/10 border border-white/20 text-white pl-8 pr-8 py-1.5 rounded-lg text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-gray-300" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-300" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-2 rounded-lg font-bold text-sm mt-2"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        ) : (

          /* ---------------- REGISTER FORM (Ultra-Compact) ---------------- */
          <form onSubmit={handleRegister} className="space-y-2">

            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-200 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                  placeholder="Your full name"
                  className="w-full bg-white/10 border border-white/20 text-white pl-8 pr-2 py-1.5 rounded-lg text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-200 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full bg-white/10 border border-white/20 text-white pl-8 pr-2 py-1.5 rounded-lg text-sm"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-gray-200 mb-1">Phone</label>
              <div className="relative">
                <Phone className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  value={registerForm.phone}
                  onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full bg-white/10 border border-white/20 text-white pl-8 pr-2 py-1.5 rounded-lg text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-200 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-white/10 border border-white/20 text-white pl-8 pr-8 py-1.5 rounded-lg text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-gray-300" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-300" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-200 mb-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={registerForm.confirmPassword}
                  onChange={(e) =>
                    setRegisterForm({ ...registerForm, confirmPassword: e.target.value })
                  }
                  placeholder="••••••••"
                  className="w-full bg-white/10 border border-white/20 text-white pl-8 pr-2 py-1.5 rounded-lg text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-2 rounded-lg font-bold text-sm mt-2"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>
        )}

        <p className="text-center text-gray-400 text-xs mt-3">
          Your account is secure and encrypted
        </p>
      </div>
    </div>
  </div>
);

}
