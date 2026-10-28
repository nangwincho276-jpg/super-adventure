import React from "react";

// Simple placeholder bar chart for patient registrations per month
const data = [
  { month: "Jan", value: 20 },
  { month: "Feb", value: 35 },
  { month: "Mar", value: 25 },
  { month: "Apr", value: 40 },
  { month: "May", value: 30 },
  { month: "Jun", value: 45 },
];

export default function RegistrationChart() {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <h3 className="mb-4 text-lg font-medium text-gray-800">Patient Registrations (Last 6 months)</h3>
      <div className="flex items-end space-x-4 h-40">
        {data.map((d) => (
          <div key={d.month} className="flex flex-col items-center">
            <div
              className="bg-teal-600 rounded-t"
              style={{ height: `${(d.value / max) * 100}%`, width: "24px" }}
            />
            <span className="mt-1 text-sm text-gray-600">{d.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
