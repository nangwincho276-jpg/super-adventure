
import ManagementPage, { type Field } from "../../components/ManagementPage";

const columns: Field[] = [
  { key: "id", label: "Follow-up ID" },
  { key: "patient", label: "Patient" },
  { key: "date", label: "Scheduled Date" },
  { key: "clinician", label: "Clinician" },
  { key: "status", label: "Status" },
];

const fields: Field[] = [
  { key: "patient", label: "Patient Name" },
  { key: "date", label: "Scheduled Date", type: "date" },
  { key: "clinician", label: "Clinician" },
  { key: "status", label: "Status", options: ["Pending", "Completed", "Overdue"] },
  { key: "notes", label: "Follow-up Notes" },
];

const initialRows = [
  { id: "FU-001", patient: "Aye Aye Win", date: "2026-11-05", clinician: "Dr. Example", status: "Pending", notes: "Fictional sample record" },
  { id: "FU-002", patient: "Mg Mg", date: "2026-10-25", clinician: "Dr. Example", status: "Overdue", notes: "Fictional sample record" },
];

export default function Page() {
  return <ManagementPage title="Follow-ups" storageKey="gallstone-followups" columns={columns} fields={fields} initialRows={initialRows} />;
}
