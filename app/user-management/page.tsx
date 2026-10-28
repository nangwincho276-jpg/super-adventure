
import ManagementPage, { type Field } from "../../components/ManagementPage";

const columns: Field[] = [
  { key: "id", label: "User ID" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "status", label: "Status" },
];

const fields: Field[] = [
  { key: "name", label: "Full Name" },
  { key: "email", label: "Email", type: "email" },
  { key: "role", label: "Role", options: ["Admin", "Doctor", "Staff"] },
  { key: "status", label: "Status", options: ["Active", "Inactive"] },
];

const initialRows = [
  { id: "USR-001", name: "System Administrator", email: "admin@example.test", role: "Admin", status: "Active" },
  { id: "USR-002", name: "Demo Clinician", email: "doctor@example.test", role: "Doctor", status: "Active" },
];

export default function Page() {
  return <ManagementPage title="User Management" storageKey="gallstone-users" columns={columns} fields={fields} initialRows={initialRows} />;
}
