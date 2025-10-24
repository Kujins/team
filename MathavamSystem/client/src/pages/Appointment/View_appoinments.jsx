import React, { useState } from "react";

const initialAppointments = [
  { srNo: "01", date: "27-02-2026", time: "3:00 PM", name: "Nirojan", contact: "+0170000000", action: "Pending" },
  { srNo: "02", date: "27-02-2020", time: "3:00 PM", name: "Abishan", contact: "+0170000001", action: "Pending" },
];

const View_appoinments = () => {
  const [activeTab, setActiveTab] = useState("recent");
  const [appointments, setAppointments] = useState(initialAppointments);
  const [editingIndex, setEditingIndex] = useState(null);

  const today = new Date();
  const parseDate = (d) => {
    const [day, month, year] = d.split("-").map(Number);
    // Note: month is 0-indexed in Date constructor
    return new Date(year, month - 1, day);
  };

  const upcomingAppointments = appointments.filter(a => parseDate(a.date) >= today);
  const historyAppointments = appointments.filter(a => parseDate(a.date) < today);
  const todayAppointments = upcomingAppointments.filter(a => parseDate(a.date).toDateString() === today.toDateString());

  const handleActionChange = (index, newAction) => {
    const updated = [...appointments];
    updated[index].action = newAction;
    setAppointments(updated);
    setEditingIndex(null);
  };

  const getButtonStyles = (action) => {
    switch (action) {
      case "Pending": return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      case "Approved": return "bg-emerald-100 text-emerald-800 hover:bg-emerald-200";
      case "Cancelled": return "bg-red-100 text-red-800 hover:bg-red-200";
      default: return "bg-slate-100 text-slate-800 hover:bg-slate-200";
    }
  };

  const renderTable = (data, editable = true) => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 uppercase tracking-wider">Sr. No</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 uppercase tracking-wider">Date</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 uppercase tracking-wider">Time</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 uppercase tracking-wider">Name</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 uppercase tracking-wider">Contact</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-100">
          {data.map((appointment, index) => (
            <tr key={index} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{appointment.date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{appointment.time}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-800">{appointment.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{appointment.contact}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {editable ? (
                  editingIndex === index ? (
                    <select
                      value={appointment.action}
                      onChange={(e) => handleActionChange(index, e.target.value)}
                      onBlur={() => setEditingIndex(null)}
                      className="border border-slate-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  ) : (
                    <div
                      onClick={() => setEditingIndex(index)}
                      className={`cursor-pointer inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-colors ${getButtonStyles(appointment.action)}`}
                    >
                      {appointment.action}
                    </div>
                  )
                ) : (
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${getButtonStyles(appointment.action)}`}>
                    {appointment.action}
                  </div>
                )}
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-8 text-slate-500">No appointments found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen p-8 font-sans">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Appointments Dashboard</h1>

      {/* Cards */}
      <div className="flex flex-wrap justify-start gap-6 mb-8">
        <div className="bg-white p-6 w-48 h-32 flex flex-col items-center justify-center rounded-xl shadow-md border border-slate-200">
          <span className="text-4xl font-extrabold text-blue-600 drop-shadow-sm">{upcomingAppointments.filter(a => a.action === "Pending").length}</span>
          <span className="mt-2 text-md text-slate-600 font-medium text-center">Pending Appointments</span>
        </div>
        <div className="bg-white p-6 w-48 h-32 flex flex-col items-center justify-center rounded-xl shadow-md border border-slate-200">
          <span className="text-4xl font-extrabold text-green-600 drop-shadow-sm">{todayAppointments.length}</span>
          <span className="mt-2 text-md text-slate-600 font-medium text-center">Today's Appointments</span>
        </div>
      </div>

      {/* Tabs + Table in single card */}
      <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
        {/* Tabs */}
        <div className="flex w-full bg-slate-100 border-b border-slate-200">
          <button
            onClick={() => setActiveTab("recent")}
            className={`flex-1 py-4 px-6 font-semibold transition-colors ${activeTab === "recent" ? "bg-white text-blue-600 border-b-4 border-blue-600" : "text-slate-700 hover:bg-slate-200"}`}
          >
            Upcoming Appointments
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 py-4 px-6 font-semibold transition-colors ${activeTab === "history" ? "bg-white text-blue-600 border-b-4 border-blue-600" : "text-slate-700 hover:bg-slate-200"}`}
          >
            Appointment History
          </button>
        </div>

        {/* Table */}
        <div className="p-6">
          {activeTab === "recent" && renderTable(upcomingAppointments, true)}
          {activeTab === "history" && renderTable(historyAppointments, false)}
        </div>
      </div>
    </div>
  );
};

export default View_appoinments;
