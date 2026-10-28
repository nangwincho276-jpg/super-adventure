
import ManagementPage, { type Field } from "../../components/ManagementPage";

const columns: Field[] = [
  { key: "id", label: "Treatment ID" },
  { key: "patient", label: "Patient" },
  { key: "date", label: "Date" },
  { key: "clinician", label: "Clinician" },
  { key: "status", label: "Status" },
];

const fields: Field[] = [
  { key: "patient", label: "Patient Name" },
  { key: "date", label: "Treatment Date", type: "date" },
  { key: "clinician", label: "Clinician" },
  { key: "status", label: "Status", options: ["Active", "Completed", "Under Review"] },
  { key: "notes", label: "Treatment Notes" },
];

const initialRows = [
  { id: "TR-001", patient: "Aye Aye Win", date: "2026-10-20", clinician: "Dr. Example", status: "Under Review", notes: "Fictional sample record" },
  { id: "TR-002", patient: "Mg Mg", date: "2026-10-22", clinician: "Dr. Example", status: "Active", notes: "Fictional sample record" },
];

export default function Page() {
  return <ManagementPage title="Treatment Records" storageKey="gallstone-treatments" columns={columns} fields={fields} initialRows={initialRows} />;
}
