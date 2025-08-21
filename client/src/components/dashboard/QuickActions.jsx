import React from "react";

const QuickActions = () => {
  const actions = [
    {
      name: "New Animal Entry",
      description: "Register new arrival",
      color: "emerald",
    },
    {
      name: "Health Check",
      description: "Schedule examination",
      color: "blue",
    },
    { name: "Staff Schedule", description: "Manage shifts", color: "purple" },
    {
      name: "Generate Report",
      description: "Create daily summary",
      color: "orange",
    },
  ];

  return (
    <div className='bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6'>
      <h3 className='text-lg font-semibold text-white mb-4'>Quick Actions</h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
        {actions.map((action) => (
          <button
            key={action.name}
            className={`p-4 rounded-lg border border-${action.color}-500/30 bg-${action.color}-500/10 hover:bg-${action.color}-500/20 transition-all duration-200 text-left group`}
          >
            <div
              className={`font-medium text-${action.color}-400 group-hover:text-${action.color}-300`}
            >
              {action.name}
            </div>
            <div className='text-sm text-gray-400 mt-1'>
              {action.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
export default QuickActions;
