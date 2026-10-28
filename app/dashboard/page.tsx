
"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";

export default function DashboardPage() {
  const [counts, setCounts] = useState({
    patients: 0,
    appointments: 0,
    ultrasound: 0,
    followups: 0,
  });

  useEffect(() => {
    const read = (key: string) => {
      try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data).length : 0;
      } catch {
        return 0;
      }
    };

    setCounts({
      patients: read("gallstone-patients") || 5,
      appointments: read("gallstone-appointments") || 2,
      ultrasound: read("gallstone-ultrasound") || 2,
      followups: read("gallstone-followups") || 2,
    });
  }, []);

  const cards = [
    { label: "Total Patients", value: counts.patients },
    { label: "Appointments", value: counts.appointments },
    { label: "Ultrasound Records", value: counts.ultrasound },
    { label: "Follow-ups", value: counts.followups },
  ];

  return (
    <>
      <Header title="Dashboard" />
      <main className="min-h-screen bg-gray-50 p-6">
        <h2 className="mb-1 text-2xl font-bold text-slate-800">
          Healthcare Dashboard
        </h2>
        <p className="mb-6 text-sm text-gray-500">
          Overview of the patient management system.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <div key={card.label} className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">{card.label}</p>
              <p className="mt-3 text-3xl font-bold text-teal-700">
                {card.value}
              </p>
            </div>
          ))}
        </div>

        <section className="mt-6 rounded-xl bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800">
            Quick Navigation
          </h3>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Patients", "/patients"],
              ["Ultrasound Records", "/ultrasound-records"],
              ["Appointments", "/appointments"],
              ["Treatment Records", "/treatment-records"],
              ["Follow-ups", "/follow-ups"],
              ["Reports", "/reports"],
              ["User Management", "/user-management"],
            ].map(([label, href]) => (
              <a key={href} href={href} className="rounded-lg border p-4 text-teal-800 hover:bg-teal-50">
                {label} →
              </a>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
