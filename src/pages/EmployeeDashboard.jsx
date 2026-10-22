import { Users } from "lucide-react";

export default function EmployeeDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-cyan-100 p-6">

      <h1 className="text-4xl font-bold mb-8">
        Employee Dashboard
      </h1>

      <div className="bg-white p-6 rounded-3xl shadow-xl">

        <Users size={50} />

        <h2 className="text-2xl font-bold mt-4">
          Attendance
        </h2>

        <p>95% Attendance Rate</p>

      </div>

    </div>
  );
}