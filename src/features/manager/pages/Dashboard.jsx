import React from "react";
import { Users, Clock, CheckCircle, XCircle } from "lucide-react";
import useDashboard from "../hooks/useDashboard";

const Dashboard = () => {
  const { dashboard, loading } = useDashboard();

  const stats = [
    {
      title: "Total Employees",
      value: dashboard?.stats?.total_employees || 0,
      icon: Users,
      color: "bg-indigo-500",
      lightColor: "bg-indigo-50",
      textColor: "text-indigo-600",
    },
    {
      title: "Pending Requests",
      value: dashboard?.stats?.total_pending || 0,
      icon: Clock,
      color: "bg-amber-500",
      lightColor: "bg-amber-50",
      textColor: "text-amber-600",
    },
    {
      title: "Approved Leaves",
      value: dashboard?.stats?.total_approved || 0,
      icon: CheckCircle,
      color: "bg-emerald-500",
      lightColor: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    {
      title: "Rejected Leaves",
      value: dashboard?.stats?.total_rejected || 0,
      icon: XCircle,
      color: "bg-rose-500",
      lightColor: "bg-rose-50",
      textColor: "text-rose-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Dashboard Overview
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Welcome back, here's what's happening today.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex justify-between">
                <div className={`${stat.lightColor} p-3 rounded-lg`}>
                  <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-slate-600">
                  {stat.title}
                </h3>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Requests */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Recent Leave Requests
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Latest pending approvals
                  </p>
                </div>
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                  View All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Employee
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {dashboard?.last_three_pending ? (
                      dashboard.last_three_pending.map((request) => (
                        <tr key={request.id} className="hover:bg-slate-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium text-sm">
                                {request.employee.username
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-slate-900 capitalize">
                                  {request.employee.username}
                                </p>
                                <p className="text-xs text-slate-500 capitalize">
                                  {request.employee.department}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm text-slate-700 capitalize">
                              {request.leave_type_detail.name}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm text-slate-700">
                              {request.start_date || "N/A"} -{" "}
                              {request.end_date || "N/A"}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                              {request.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="py-8 text-center text-sm text-slate-600"
                        >
                          No pending requests
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
