
"use client";

import { useEffect, useState, type FormEvent } from "react";
import Header from "../../components/Header";

type Patient = {
  id: string;
  name: string;
  age: string;
  gender: string;
  phone: string;
  status: string;
  lastVisit: string;
};

const initialPatients: Patient[] = [
  { id: "P-001", name: "Aye Aye Win", age: "35", gender: "Female", phone: "09-123456701", status: "Monitoring", lastVisit: "2026-10-20" },
  { id: "P-002", name: "Mg Mg", age: "42", gender: "Male", phone: "09-123456702", status: "Under Review", lastVisit: "2026-10-21" },
  { id: "P-003", name: "Su Su Hlaing", age: "29", gender: "Female", phone: "09-123456703", status: "Follow-up", lastVisit: "2026-10-22" },
  { id: "P-004", name: "Kyaw Kyaw", age: "51", gender: "Male", phone: "09-123456704", status: "Monitoring", lastVisit: "2026-10-23" },
  { id: "P-005", name: "Mya Mya Oo", age: "38", gender: "Female", phone: "09-123456705", status: "Under Review", lastVisit: "2026-10-24" },
];

const emptyForm = {
  name: "",
  age: "",
  gender: "Female",
  phone: "",
  status: "Monitoring",
  lastVisit: new Date().toISOString().slice(0, 10),
};

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useState<"add" | "edit" | "view" | null>(null);
  const [selected, setSelected] = useState<Patient | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("gallstone-patients");
      setPatients(saved ? JSON.parse(saved) : initialPatients);
    } catch {
      setPatients(initialPatients);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("gallstone-patients", JSON.stringify(patients));
    }
  }, [patients, loaded]);

  const filtered = patients.filter((p) => {
    const matchesSearch = `${p.id} ${p.name} ${p.phone}`
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesSearch && (filter === "All" || p.status === filter);
  });

  function openAdd() {
    setSelected(null);
    setForm({ ...emptyForm, lastVisit: new Date().toISOString().slice(0, 10) });
    setModal("add");
    setMessage("");
  }

  function openEdit(patient: Patient) {
    setSelected(patient);
    setForm({
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      phone: patient.phone,
      status: patient.status,
      lastVisit: patient.lastVisit,
    });
    setModal("edit");
    setMessage("");
  }

  function savePatient(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.name.trim() || !form.age || !form.phone.trim()) {
      setMessage("Please fill in the required fields.");
      return;
    }

    if (Number(form.age) < 1 || Number(form.age) > 120) {
      setMessage("Please enter a valid age.");
      return;
    }

    if (modal === "edit" && selected) {
      setPatients((prev) =>
        prev.map((p) =>
          p.id === selected.id ? { ...p, ...form } : p
        )
      );
      setMessage("Patient updated successfully.");
    } else {
      const newPatient: Patient = {
        ...form,
        id: `P-${String(Date.now()).slice(-6)}`,
      };
      setPatients((prev) => [newPatient, ...prev]);
      setMessage("Patient added successfully.");
    }

    setModal(null);
  }

  function deletePatient(patient: Patient) {
    const confirmed = window.confirm(
      `Delete patient ${patient.name} (${patient.id})?`
    );

    if (confirmed) {
      setPatients((prev) => prev.filter((p) => p.id !== patient.id));
      setMessage("Patient deleted.");
    }
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600";

  return (
    <>
      <Header title="Patients" />

      <main className="min-h-screen bg-gray-50 p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Patient Management
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage patient information and records.
            </p>
          </div>

          <button
            onClick={openAdd}
            className="rounded-lg bg-teal-700 px-5 py-3 font-medium text-white hover:bg-teal-800"
          >
            + Add Patient
          </button>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Patients</p>
            <p className="mt-2 text-3xl font-bold text-slate-800">
              {patients.length}
            </p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Monitoring</p>
            <p className="mt-2 text-3xl font-bold text-teal-700">
              {patients.filter((p) => p.status === "Monitoring").length}
            </p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Follow-up</p>
            <p className="mt-2 text-3xl font-bold text-amber-600">
              {patients.filter((p) => p.status === "Follow-up").length}
            </p>
          </div>
        </div>

        {message && (
          <div className="mb-4 rounded-lg bg-teal-50 p-3 text-sm text-teal-800">
            {message}
            <button
              onClick={() => setMessage("")}
              className="ml-3 font-semibold"
            >
              Dismiss
            </button>
          </div>
        )}

        <section className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="flex flex-wrap gap-3 border-b p-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by patient ID, name or phone..."
              className={`${inputClass} min-w-60 flex-1`}
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={`${inputClass} sm:w-48`}
            >
              <option>All</option>
              <option>Monitoring</option>
              <option>Under Review</option>
              <option>Follow-up</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-gray-500">
                <tr>
                  {["Patient", "Age / Gender", "Phone", "Status", "Last Visit", "Actions"].map((heading) => (
                    <th key={heading} className="whitespace-nowrap px-5 py-4">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-5 py-4">
                      <p className="font-semibold text-slate-800">{p.name}</p>
                      <p className="mt-1 text-xs text-gray-500">{p.id}</p>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                      {p.age} / {p.gender}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                      {p.phone}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-800">
                        {p.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                      {p.lastVisit}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <div className="flex gap-3">
                        <button onClick={() => { setSelected(p); setModal("view"); }} className="font-medium text-sky-700 hover:underline">View</button>
                        <button onClick={() => openEdit(p)} className="font-medium text-teal-700 hover:underline">Edit</button>
                        <button onClick={() => deletePatient(p)} className="font-medium text-red-600 hover:underline">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center text-gray-500">
                      No patients found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {modal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
            <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-800">
                  {modal === "add" ? "Add Patient" : modal === "edit" ? "Edit Patient" : "Patient Details"}
                </h3>
                <button onClick={() => setModal(null)} className="text-2xl text-gray-500">×</button>
              </div>

              {modal === "view" && selected ? (
                <div className="space-y-4">
                  {[
                    ["Patient ID", selected.id],
                    ["Full Name", selected.name],
                    ["Age", selected.age],
                    ["Gender", selected.gender],
                    ["Phone", selected.phone],
                    ["Status", selected.status],
                    ["Last Visit", selected.lastVisit],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4 border-b pb-3">
                      <span className="text-gray-500">{label}</span>
                      <span className="text-right font-medium text-slate-800">{value}</span>
                    </div>
                  ))}
                  <button onClick={() => openEdit(selected)} className="rounded-lg bg-teal-700 px-4 py-2 text-white">
                    Edit Patient
                  </button>
                </div>
              ) : (
                <form onSubmit={savePatient} className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium">Full Name *</label>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium">Age *</label>
                      <input required type="number" min="1" max="120" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} className={inputClass} />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">Gender</label>
                      <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className={inputClass}>
                        <option>Female</option>
                        <option>Male</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Phone *</label>
                    <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Record Status</label>
                    <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={inputClass}>
                      <option>Monitoring</option>
                      <option>Under Review</option>
                      <option>Follow-up</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Last Visit</label>
                    <input type="date" value={form.lastVisit} onChange={(e) => setForm({ ...form, lastVisit: e.target.value })} className={inputClass} />
                  </div>
                  <div className="flex justify-end gap-3 pt-3">
                    <button type="button" onClick={() => setModal(null)} className="rounded-lg border px-4 py-2 text-gray-700">
                      Cancel
                    </button>
                    <button type="submit" className="rounded-lg bg-teal-700 px-5 py-2 font-medium text-white hover:bg-teal-800">
                      {modal === "edit" ? "Save Changes" : "Add Patient"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
