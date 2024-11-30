import React, { useState } from "react";
import { Users, Clock, CheckCircle, XCircle } from "lucide-react";

const Dashboard = () => {
  // Sample data - in real app would come from API/props
  const stats = [
    {
      title: "Total Employees",
      value: "124",
      icon: Users,
      trend: "+5%",
      color: "bg-blue-500",
    },
    {
      title: "Pending Requests",
      value: "8",
      icon: Clock,
      trend: "-2%",
      color: "bg-yellow-500",
    },
    {
      title: "Approved Leaves",
      value: "45",
      icon: CheckCircle,
      trend: "+12%",
      color: "bg-green-500",
    },
    {
      title: "Rejected Leaves",
      value: "3",
      icon: XCircle,
      trend: "-8%",
      color: "bg-red-500",
    },
  ];

  const pendingRequests = [
    {
      id: 1,
      employee: "John Doe",
      type: "Annual Leave",
      from: "2024-12-01",
      to: "2024-12-05",
      status: "pending",
    },
    {
      id: 2,
      employee: "Jane Smith",
      type: "Sick Leave",
      from: "2024-12-03",
      to: "2024-12-04",
      status: "pending",
    },
    {
      id: 3,
      employee: "Mike Johnson",
      type: "Personal Leave",
      from: "2024-12-06",
      to: "2024-12-07",
      status: "pending",
    },
  ];

  const teamAvailability = [
    { name: "Design Team", available: 8, total: 10, color: "bg-purple-500" },
    {
      name: "Development Team",
      available: 12,
      total: 15,
      color: "bg-blue-500",
    },
    { name: "Marketing Team", available: 5, total: 6, color: "bg-green-500" },
  ];

  return (
    <>
      {/* Header */}

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.title} className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>
              <div className={`rounded-full ${stat.color} p-3`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm font-medium text-green-600">
                {stat.trend}
              </span>
              <span className="ml-2 text-sm text-gray-500">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Pending Requests */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">
              Pending Leave Requests
            </h2>
            <button className="text-sm text-blue-600 hover:text-blue-700">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm font-medium text-gray-500">
                  <th className="pb-3">Employee</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Duration</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {pendingRequests.map((request) => (
                  <tr key={request.id} className="border-b">
                    <td className="py-3">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-200" />
                        <span className="ml-2 font-medium text-gray-800">
                          {request.employee}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 text-gray-600">{request.type}</td>
                    <td className="py-3 text-gray-600">
                      {request.from} - {request.to}
                    </td>
                    <td className="py-3">
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
                        {request.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Team Availability */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">
              Team Availability
            </h2>
            <button className="text-sm text-blue-600 hover:text-blue-700">
              View Details
            </button>
          </div>
          <div className="space-y-4">
            {teamAvailability.map((team) => (
              <div key={team.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">{team.name}</span>
                  <span className="text-sm text-gray-500">
                    {team.available} / {team.total} available
                  </span>
                </div>
                <div className="h-2 rounded-full bg-gray-200">
                  <div
                    className={`h-2 rounded-full ${team.color}`}
                    style={{ width: `${(team.available / team.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
