import React from "react";

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color?: string;
  percentageChange?: string;
  log: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  log,
  color = "bg-blue-600",
  percentageChange = "",
}) => {
  return (
    <>
      <div className="bg-white shadow-lg items-center justify-evenly rounded-xl px-6 py-4 transition-all hover:shadow-xl card-hover">
        <div className="flex items-center justify-between my-auto w-full h-1/2 mb-2">
          <div
            className={`w-14 h-14 flex items-center justify-center my-auto ${color} text-white rounded-full`}
          >
            {icon}
          </div>
          <h2 className="text-2xl font-medium text-gray-700 mt-4 col-span-2 mx-auto">
            {title}
          </h2>
          {percentageChange && (
            <div
              className={`text-sm font-semibold ${
                percentageChange.includes("-")
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {percentageChange}
            </div>
          )}
        </div>
        <div className="flex items-center justify-center w-full gap-11 h-1/2">
          <p className="text-sm text-red-600 mt-1">{log}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
      </div>
    </>
  );
};

export default StatsCard;
