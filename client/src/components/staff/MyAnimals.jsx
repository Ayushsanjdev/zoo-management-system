import React from "react";

const MyAnimals = () => {
  const animals = [
    { name: "Luna & Leo", species: "Lions", health: "Excellent", lastCheck: "Yesterday", icon: "🦁" },
    { name: "Penny & Pete", species: "Penguins", health: "Good", lastCheck: "2 days ago", icon: "🐧" },
    { name: "Ellie", species: "Elephant", health: "Fair", lastCheck: "Today", icon: "🐘" },
    { name: "Grace", species: "Giraffe", health: "Excellent", lastCheck: "Yesterday", icon: "🦒" },
  ];

  const getHealthColor = (health) => {
    switch(health) {
      case "Excellent": return "text-green-400";
      case "Good": return "text-blue-400";
      case "Fair": return "text-yellow-400";
      default: return "text-red-400";
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">My Animals</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {animals.map((animal, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-all duration-200 border border-gray-600"
          >
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-2xl">{animal.icon}</span>
              <div>
                <p className="font-medium text-white">{animal.name}</p>
                <p className="text-sm text-gray-400">{animal.species}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Health:</span>
                <span className={getHealthColor(animal.health)}>{animal.health}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Last Check:</span>
                <span className="text-gray-300">{animal.lastCheck}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAnimals;