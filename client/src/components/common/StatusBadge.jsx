import React from "react";

const StatusBadge = ({ status, type = "default" }) => {
  const getStatusConfig = () => {
    if (type === "health") {
      switch (status.toLowerCase()) {
        case "excellent":
          return {
            bg: "bg-green-500/20",
            text: "text-green-400",
            border: "border-green-500/30",
          };
        case "good":
          return {
            bg: "bg-blue-500/20",
            text: "text-blue-400",
            border: "border-blue-500/30",
          };
        case "fair":
          return {
            bg: "bg-yellow-500/20",
            text: "text-yellow-400",
            border: "border-yellow-500/30",
          };
        case "poor":
          return {
            bg: "bg-red-500/20",
            text: "text-red-400",
            border: "border-red-500/30",
          };
        default:
          return {
            bg: "bg-gray-500/20",
            text: "text-gray-400",
            border: "border-gray-500/30",
          };
      }
    } else {
      switch (status.toLowerCase()) {
        case "active":
        case "available":
          return {
            bg: "bg-green-500/20",
            text: "text-green-400",
            border: "border-green-500/30",
          };
        case "busy":
        case "feeding":
          return {
            bg: "bg-yellow-500/20",
            text: "text-yellow-400",
            border: "border-yellow-500/30",
          };
        case "inactive":
        case "sleeping":
          return {
            bg: "bg-gray-500/20",
            text: "text-gray-400",
            border: "border-gray-500/30",
          };
        default:
          return {
            bg: "bg-blue-500/20",
            text: "text-blue-400",
            border: "border-blue-500/30",
          };
      }
    }
  };

  const config = getStatusConfig();

  return (
    <span
      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${config.bg} ${config.text} ${config.border}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
