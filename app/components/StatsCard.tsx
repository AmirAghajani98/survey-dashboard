import React from "react";

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-2 text-center flex flex-col items-center">
      <div className="w-8 h-8 mb-2 text-blue-600">{icon}</div>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-3xl font-bold text-blue-600">{value}</p>
    </div>
  );
};

export default StatsCard;
