import React from "react";

const SafariAnimals = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    {/* Floating animal silhouettes */}
    <div className="absolute top-20 left-10 text-4xl text-emerald-400/70 animate-bounce">
      🦁
    </div>
    <div className="absolute top-40 right-20 text-3xl text-amber-400/60 animate-pulse">
      🦒
    </div>
    <div className="absolute bottom-40 left-20 text-4xl text-emerald-400/50 animate-bounce delay-1000">
      🐘
    </div>
    <div className="absolute bottom-60 right-10 text-2xl text-green-400/50 animate-pulse delay-500">
      🦓
    </div>
    <div className="absolute top-60 left-1/2 text-3xl text-amber-400/50 animate-bounce delay-700">
      🦉
    </div>
    <div className="absolute top-1/2 right-1/4 text-2xl text-emerald-400/50 animate-pulse delay-300">
      🐻
    </div>
    <div className="absolute bottom-1/3 left-1/4 text-3xl text-green-400/50 animate-bounce delay-1500">
      🐧
    </div>
  </div>
);
export default SafariAnimals;
