
import ManagementPage, { type Field } from "../../components/ManagementPage";

const columns: Field[] = [
  { key: "id", label: "Appointment ID" },
  { key: "patient", label: "Patient" },
  { key: "date", label: "Date" },
  { key: "time", label: "Time" },
  { key: "clinician", label: "Clinician" },
  { key: "status", label: "Status" },
];

const fields: Field[] = [
  { key: "patient", label: "Patient Name" },
  { key: "date", label: "Appointment Date", type: "date" },
  { key: "time", label: "Appointment Time", type: "time" },
  { key: "clinician", label: "Clinician" },
  { key: "status", label: "Status", options: ["Scheduled", "Completed", "Cancelled"] },
];

const initialRows = [
  { id: "APT-001", patient: "Aye Aye Win", date: "2026-11-02", time: "09:00", clinician: "Dr. Example", status: "Scheduled" },
  { id: "APT-002", patient: "Mg Mg", date: "2026-11-03", time: "10:30", clinician: "Dr. Example", status: "Scheduled" },
];

export default function Page() {
  return <ManagementPage title="Appointments" storageKey="gallstone-appointments" columns={columns} fields={fields} initialRows={initialRows} />;
}
