import React from "react";

interface CardProps {
  title: string;
  value: string | number;
  /** Tailwind bg color class, e.g. "bg-blue-600" */
  bgClass?: string;
}

export default function Card({ title, value, bgClass = "bg-blue-800" }: CardProps) {
  return (
    <div className="flex flex-col rounded-lg shadow-sm p-4 bg-white border border-gray-100">
      <div className={`text-sm font-medium text-gray-500`}>{title}</div>
      <div className={`mt-2 text-2xl font-bold ${bgClass} text-white px-2 py-1 rounded`}>{value}</div>
    </div>
  );
}
