import React from "react";

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color?: string;
  percentageChange?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  color = "bg-blue-600",
  percentageChange = "",
}) => {
  return (
    <div className="bg-white shadow-lg grid grid-cols-2 items-center rounded-xl p-6 transition-all hover:shadow-xl card-hover">
      <h2 className="text-2xl font-medium text-gray-700 mt-4 col-span-2 mx-auto">
        {title}
      </h2>
      <div className="flex items-center justify-between my-auto">
        <div
          className={`w-16 h-16 flex items-center justify-center my-auto ${color} text-white rounded-full`}
        >
          {icon}
        </div>

        {percentageChange && (
          <div
            className={`text-sm font-semibold ${
              percentageChange.includes("-") ? "text-red-600" : "text-green-600"
            }`}
          >
            {percentageChange}
          </div>
        )}
      </div>
      <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
    </div>
  );
};

export default StatsCard;
