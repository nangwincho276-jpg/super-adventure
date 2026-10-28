import React from "react";

const recentAppointments = [
  { id: 1, patient: "John Doe", date: "2024-10-01", time: "10:00 AM" },
  { id: 2, patient: "Jane Smith", date: "2024-10-01", time: "11:30 AM" },
  { id: 3, patient: "Bob Johnson", date: "2024-10-02", time: "09:15 AM" },
];

export default function RecentAppointmentsTable() {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {recentAppointments.map((appt) => (
            <tr key={appt.id}>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{appt.patient}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{appt.date}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{appt.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
