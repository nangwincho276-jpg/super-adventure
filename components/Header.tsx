import React from "react";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="flex items-center justify-between bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-blue-800">Gallstone Patient Management System</h1>
        <span className="text-lg font-medium text-gray-600">{title}</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-gray-300" />
        <span className="text-sm text-gray-700">Admin</span>
      </div>
    </header>
  );
}
