/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface DashboardCardProps {
  title: string;
  value: any;
  color?: string; // Tailwind color for value
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  color,
}) => {
  return (
    <div className="rounded-xl bg-white p-6 shadow hover:shadow-md transition">
      <h3 className="text-sm text-muted-foreground">{title}</h3>
      <p className={`text-2xl font-bold mt-2 text-foreground ${color ?? ""}`}>
        {value}
      </p>
    </div>
  );
};

export default DashboardCard;
