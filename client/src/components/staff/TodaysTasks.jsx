import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import React from "react";

const TodaysTasks = () => {
  const tasks = [
    { 
      id: 1, 
      task: "Feed lions - morning routine", 
      time: "8:00 AM", 
      status: "completed", 
      animal: "🦁",
      priority: "high" 
    },
    { 
      id: 2, 
      task: "Clean penguin exhibit", 
      time: "10:30 AM", 
      status: "in-progress", 
      animal: "🐧",
      priority: "medium" 
    },
    { 
      id: 3, 
      task: "Health check - Baby elephant", 
      time: "2:00 PM", 
      status: "pending", 
      animal: "🐘",
      priority: "high" 
    },
    { 
      id: 4, 
      task: "Evening feeding - Giraffes", 
      time: "5:00 PM", 
      status: "pending", 
      animal: "🦒",
      priority: "medium" 
    },
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case "completed": return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "in-progress": return <Clock className="w-5 h-5 text-blue-400" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "completed": return "bg-green-500/20 border-l-green-500";
      case "in-progress": return "bg-blue-500/20 border-l-blue-500";
      default: return "bg-gray-800/50 border-l-gray-500";
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Today's Tasks</h3>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`p-4 rounded-lg border-l-4 ${getStatusColor(task.status)} hover:bg-gray-700/30 transition-all duration-200`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-xl">{task.animal}</span>
                <div>
                  <p className="text-sm font-medium text-white">{task.task}</p>
                  <p className="text-xs text-gray-400 mt-1">Scheduled: {task.time}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {task.priority === "high" && (
                  <span className="px-2 py-1 text-xs rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                    High Priority
                  </span>
                )}
                {getStatusIcon(task.status)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodaysTasks;