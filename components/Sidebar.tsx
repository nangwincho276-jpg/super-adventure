"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Patients", href: "/patients" },
  { name: "Ultrasound Records", href: "/ultrasound-records" },
  { name: "Appointments", href: "/appointments" },
  { name: "Treatment Records", href: "/treatment-records" },
  { name: "Follow-ups", href: "/follow-ups" },
  { name: "Reports", href: "/reports" },
  { name: "User Management", href: "/user-management" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <nav className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-gray-200 p-4">
      <h2 className="text-2xl font-semibold text-blue-800 mb-8">Gallstone</h2>
      <ul className="flex-1 space-y-2">
        {navigation.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                  active ? "bg-blue-800 text-white" : "text-blue-800 hover:bg-blue-100"
                }`}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
