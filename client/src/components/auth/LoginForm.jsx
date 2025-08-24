import { useState } from "react";
import AuthButton from "./AuthButton";
import AuthLogo from "./AuthLogo";
import InputField from "./InputField";
import { Lock, ArrowRight, Mail } from "lucide-react";
import React from "react";

import { z } from "zod";
import { useAuth } from "../../context/AuthContext";

const loginSchema = z.object({
  email: z.email("Invalid email").trim(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    try {
      await login(formData.email, formData.password);
    } catch (err) {
      setErrors({ login: "Login failed" });
      console.error("Login failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full max-w-md mx-auto'>
      <AuthLogo />

      <div className='mt-8 bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 border border-gray-700 shadow-2xl'>
        <div className='text-center mb-6'>
          <h2 className='text-2xl font-bold text-white'>Welcome Back</h2>
          <p className='text-gray-400 mt-2'>
            Sign in to access the zoo management system
          </p>
        </div>

        <div onSubmit={handleSubmit} className='space-y-6'>
          <InputField
            type='email'
            placeholder='Enter your email'
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            icon={Mail}
            error={errors.email}
          />

          <InputField
            type='password'
            placeholder='Enter your password'
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            icon={Lock}
            error={errors.password}
            showPasswordToggle={true}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />

          {errors.login && (
            <p className='text-red-400 text-sm'>{errors.login}</p>
          )}

          <AuthButton onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <span>Loading...</span>
            ) : (
              <span className='flex items-center justify-center space-x-2'>
                <span>Sign In</span>
                <ArrowRight className='w-4 h-4' />
              </span>
            )}
          </AuthButton>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
