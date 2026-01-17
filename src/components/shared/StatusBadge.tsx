import React from "react";

interface StatusBadgeProps {
  status: "CONFIRMED" | "COMPLETED" | string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const base = "px-2 py-1 rounded-full text-xs font-semibold";

  const styles: Record<string, string> = {
    CONFIRMED: "bg-yellow-100 text-yellow-800",
    COMPLETED: "bg-green-100 text-green-800",
  };

  return (
    <span
      className={`${base} ${styles[status] || "bg-gray-100 text-gray-700"}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
