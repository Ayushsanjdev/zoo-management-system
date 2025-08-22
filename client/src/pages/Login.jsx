import React from "react";
import LoginForm from "../components/auth/LoginForm";
import BackgroundDecoration from "../components/common/BackgroundDecoration";
import SafariAnimals from "../components/common/SafariAnimals";

function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-green-900 relative overflow-hidden">
      <SafariAnimals />
      <div className="relative">
        <BackgroundDecoration position="top" />
        <BackgroundDecoration position="bottom" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
