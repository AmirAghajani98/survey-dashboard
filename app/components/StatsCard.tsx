import React from "react";
import {
  UserGroupIcon,
  ClipboardIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 text-center flex flex-col items-center">
      <div className="w-10 h-10 mb-2 text-blue-600">{icon}</div>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-3xl font-bold text-blue-600">{value}</p>
    </div>
  );
};

export default StatsCard;
