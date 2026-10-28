
import ManagementPage, { type Field } from "../../components/ManagementPage";

const columns: Field[] = [
  { key: "id", label: "Report ID" },
  { key: "name", label: "Report Name" },
  { key: "period", label: "Period" },
  { key: "preparedBy", label: "Prepared By" },
  { key: "status", label: "Status" },
];

const fields: Field[] = [
  { key: "name", label: "Report Name" },
  { key: "period", label: "Reporting Period" },
  { key: "preparedBy", label: "Prepared By" },
  { key: "status", label: "Status", options: ["Draft", "Ready", "Archived"] },
];

const initialRows = [
  { id: "REP-001", name: "Patient Summary", period: "October 2026", preparedBy: "Admin", status: "Ready" },
  { id: "REP-002", name: "Appointment Summary", period: "October 2026", preparedBy: "Admin", status: "Draft" },
];

export default function Page() {
  return <ManagementPage title="Reports" storageKey="gallstone-reports" columns={columns} fields={fields} initialRows={initialRows} />;
}
