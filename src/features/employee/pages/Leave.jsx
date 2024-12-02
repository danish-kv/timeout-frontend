 import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase, 
  Clock,
  Building,
  Users,
  Award,
  FileText
} from 'lucide-react';

const Profile = () => {
  // Sample data - replace with actual data from your backend
  const employeeData = {
    name: "Sarah Anderson",
    role: "Senior Software Engineer",
    department: "Engineering",
    employeeId: "EMP-2024-0123",
    email: "sarah.anderson@company.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "March 15, 2022",
    manager: "John Mitchell",
    team: "Frontend Development",
  };

  const leaveBalance = [
    { type: "Annual Leave", total: 21, used: 12, pending: 2 },
    { type: "Sick Leave", total: 10, used: 3, pending: 0 },
    { type: "Personal Leave", total: 5, used: 2, pending: 1 }
  ];

  return (
    <div className="container mx-auto py-8">
      {/* Profile Header */}
      <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
        <div className="flex items-start space-x-6">
          <div className="h-24 w-24 overflow-hidden rounded-lg bg-gray-200">
            {/* Replace with actual image */}
            <div className="flex h-full items-center justify-center text-2xl font-bold text-gray-400">
              SA
            </div>
          </div>
          <div className="flex-1">
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-gray-800">{employeeData.name}</h1>
              <p className="text-gray-600">{employeeData.role}</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <span className="flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600">
                <Building className="mr-2 h-4 w-4" />
                {employeeData.department}
              </span>
              <span className="flex items-center rounded-full bg-purple-50 px-3 py-1 text-sm text-purple-600">
                <FileText className="mr-2 h-4 w-4" />
                {employeeData.employeeId}
              </span>
              <span className="flex items-center rounded-full bg-green-50 px-3 py-1 text-sm text-green-600">
                <Users className="mr-2 h-4 w-4" />
                {employeeData.team}
              </span>
            </div>
          </div>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Edit Profile
          </button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Personal Information */}
        <div className="col-span-2 space-y-8">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-bold text-gray-800">Personal Information</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-800">{employeeData.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-800">{employeeData.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium text-gray-800">{employeeData.location}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Join Date</p>
                  <p className="font-medium text-gray-800">{employeeData.joinDate}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Briefcase className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Manager</p>
                  <p className="font-medium text-gray-800">{employeeData.manager}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Work History section can be added here */}
        </div>

        {/* Total Leave Card */}
        <div className="space-y-8">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-bold text-gray-800">Total Leave</h2>
            <div className="space-y-6">
              {leaveBalance.map((leave) => (
                <div key={leave.type} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">{leave.type}</span>
                    <span className="text-sm text-gray-500">
                      {leave.used}/{leave.total} days used
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-blue-600"
                      style={{ width: `${(leave.used / leave.total) * 100}%` }}
                    />
                  </div>
                  {leave.pending > 0 && (
                    <p className="text-sm text-yellow-600">
                      {leave.pending} day{leave.pending > 1 ? 's' : ''} pending approval
                    </p>
                  )}
                </div>
              ))}
            </div>
            <button className="mt-6 w-full rounded-lg border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50">
              Request Leave
            </button>
          </div>

          {/* Quick Actions Card */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-gray-800">Quick Actions</h2>
            <div className="space-y-3">
              <button className="flex w-full items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50">
                <Clock className="mr-3 h-5 w-5 text-gray-400" />
                View Attendance Log
              </button>
              <button className="flex w-full items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50">
                <FileText className="mr-3 h-5 w-5 text-gray-400" />
                Download Documents
              </button>
              <button className="flex w-full items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50">
                <Award className="mr-3 h-5 w-5 text-gray-400" />
                View Benefits
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;