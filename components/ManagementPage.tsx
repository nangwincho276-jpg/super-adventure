
"use client";

import { useEffect, useState, type FormEvent } from "react";
import Header from "./Header";

export type Field = {
    key: string;
    label: string;
    type?: string;
    options?: string[];
};

type RecordData = Record<string, string>;

export default function ManagementPage({
    title,
    storageKey,
    columns,
    fields,
    initialRows,
}: {
    title: string;
    storageKey: string;
    columns: Field[];
    fields: Field[];
    initialRows: RecordData[];
}) {
    const [rows, setRows] = useState<RecordData[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [search, setSearch] = useState("");
    const [mode, setMode] = useState<"add" | "edit" | "view" | null>(null);
    const [selected, setSelected] = useState<RecordData | null>(null);
    const [form, setForm] = useState<RecordData>({});
    const [message, setMessage] = useState("");

    useEffect(() => {
        try {
            const saved = localStorage.getItem(storageKey);
            setRows(saved ? JSON.parse(saved) : initialRows);
        } catch {
            setRows(initialRows);
        }
        setLoaded(true);
    }, [storageKey, initialRows]);

    useEffect(() => {
        if (loaded) {
            localStorage.setItem(storageKey, JSON.stringify(rows));
        }
    }, [rows, loaded, storageKey]);

    const filtered = rows.filter((row) =>
        Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase())
    );

    function openAdd() {
        const values: RecordData = {};
        fields.forEach((field) => {
            values[field.key] = field.options?.[0] ?? "";
        });
        setForm(values);
        setSelected(null);
        setMode("add");
        setMessage("");
    }

    function openEdit(row: RecordData) {
        setSelected(row);
        setForm({ ...row });
        setMode("edit");
    }

    function save(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (fields.some((f) => !form[f.key]?.trim())) {
            setMessage("Please complete all required fields.");
            return;
        }

        if (mode === "edit" && selected) {
            setRows((old) =>
                old.map((row) => row.id === selected.id ? { ...form, id: selected.id } : row)
            );
            setMessage("Record updated.");
        } else {
            const newRow = {
                ...form,
                id: `${storageKey.toUpperCase()}-${Date.now().toString().slice(-6)}`,
            };
            setRows((old) => [newRow, ...old]);
            setMessage("Record added.");
        }
        setMode(null);
    }

    function remove(row: RecordData) {
        if (window.confirm(`Delete this record: ${row.id}?`)) {
            setRows((old) => old.filter((item) => item.id !== row.id));
            setMessage("Record deleted.");
        }
    }

    const inputClass =
        "w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-teal-600 outline-none";

    return (
        <>
            <Header title={title} />
            <main className="min-h-screen bg-gray-50 p-6">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Manage and maintain {title.toLowerCase()} records.
                        </p>
                    </div>
                    <button onClick={openAdd} className="rounded-lg bg-teal-700 px-4 py-3 text-white hover:bg-teal-800">
                        + Add Record
                    </button>
                </div>

                <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-white p-5 shadow-sm">
                        <p className="text-sm text-gray-500">Total Records</p>
                        <p className="mt-2 text-3xl font-bold text-slate-800">{rows.length}</p>
                    </div>
                    <div className="rounded-xl bg-white p-5 shadow-sm">
                        <p className="text-sm text-gray-500">Search Results</p>
                        <p className="mt-2 text-3xl font-bold text-teal-700">{filtered.length}</p>
                    </div>
                </div>

                {message && (
                    <p className="mb-4 rounded-lg bg-teal-50 p-3 text-teal-800">
                        {message}
                        <button onClick={() => setMessage("")} className="ml-3 font-bold">×</button>
                    </p>
                )}

                <section className="overflow-hidden rounded-xl bg-white shadow-sm">
                    <div className="border-b p-4">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder={`Search ${title.toLowerCase()}...`}
                            className={`${inputClass} max-w-lg`}
                        />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-xs uppercase text-gray-500">
                                <tr>
                                    {columns.map((col) => (
                                        <th key={col.key} className="whitespace-nowrap px-4 py-4">{col.label}</th>
                                    ))}
                                    <th className="px-4 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {filtered.map((row) => (
                                    <tr key={row.id} className="hover:bg-gray-50">
                                        {columns.map((col) => (
                                            <td key={col.key} className="whitespace-nowrap px-4 py-4 text-gray-700">
                                                {row[col.key] || "—"}
                                            </td>
                                        ))}
                                        <td className="whitespace-nowrap px-4 py-4">
                                            <div className="flex gap-3">
                                                <button onClick={() => { setSelected(row); setMode("view"); }} className="text-sky-700">View</button>
                                                <button onClick={() => openEdit(row)} className="text-teal-700">Edit</button>
                                                <button onClick={() => remove(row)} className="text-red-600">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {!filtered.length && (
                                    <tr><td colSpan={columns.length + 1} className="p-10 text-center text-gray-500">No records found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

                {mode && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                        <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
                            <div className="mb-5 flex items-center justify-between">
                                <h3 className="text-xl font-bold text-slate-800">
                                    {mode === "add" ? `Add ${title}` : mode === "edit" ? `Edit ${title}` : `${title} Details`}
                                </h3>
                                <button onClick={() => setMode(null)} className="text-2xl text-gray-500">×</button>
                            </div>

                            {mode === "view" && selected ? (
                                <div className="space-y-4">
                                    {Object.entries(selected).map(([key, value]) => (
                                        <div key={key} className="flex justify-between gap-4 border-b pb-3">
                                            <span className="text-gray-500">{key}</span>
                                            <span className="text-right font-medium">{value}</span>
                                        </div>
                                    ))}
                                    <button onClick={() => openEdit(selected)} className="rounded-lg bg-teal-700 px-4 py-2 text-white">Edit Record</button>
                                </div>
                            ) : (
                                <form onSubmit={save} className="space-y-4">
                                    {fields.map((field) => (
                                        <div key={field.key}>
                                            <label className="mb-1 block text-sm font-medium">{field.label} *</label>
                                            {field.options ? (
                                                <select required value={form[field.key] ?? ""} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} className={inputClass}>
                                                    {field.options.map((option) => <option key={option}>{option}</option>)}
                                                </select>
                                            ) : (
                                                <input required type={field.type || "text"} value={form[field.key] ?? ""} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} className={inputClass} />
                                            )}
                                        </div>
                                    ))}
                                    <div className="flex justify-end gap-3 pt-3">
                                        <button type="button" onClick={() => setMode(null)} className="rounded-lg border px-4 py-2">Cancel</button>
                                        <button type="submit" className="rounded-lg bg-teal-700 px-5 py-2 text-white">
                                            {mode === "edit" ? "Save Changes" : "Add Record"}
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
