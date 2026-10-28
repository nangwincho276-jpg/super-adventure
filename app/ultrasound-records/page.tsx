
import ManagementPage, { type Field } from "../../components/ManagementPage";

const columns: Field[] = [
  { key: "id", label: "Record ID" },
  { key: "patient", label: "Patient" },
  { key: "date", label: "Exam Date" },
  { key: "clinician", label: "Clinician" },
  { key: "status", label: "Record Status" },
];

const fields: Field[] = [
  { key: "patient", label: "Patient Name" },
  { key: "date", label: "Exam Date", type: "date" },
  { key: "clinician", label: "Clinician" },
  { key: "status", label: "Record Status", options: ["Recorded", "Pending Review", "Reviewed"] },
  { key: "findings", label: "Findings / Notes" },
];

const initialRows = [
  { id: "US-001", patient: "Aye Aye Win", date: "2026-10-20", clinician: "Dr. Example", status: "Reviewed", findings: "Fictional sample record" },
  { id: "US-002", patient: "Mg Mg", date: "2026-10-22", clinician: "Dr. Example", status: "Pending Review", findings: "Fictional sample record" },
];

export default function Page() {
  return <ManagementPage title="Ultrasound Records" storageKey="gallstone-ultrasound" columns={columns} fields={fields} initialRows={initialRows} />;
}
