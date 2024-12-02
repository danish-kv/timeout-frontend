import { Briefcase, Calendar, Mail, MapPin, Phone, User } from "lucide-react";
import React from "react";
import { DateFormat } from "../../../utils/format";

const PersonalOverview = ({employeeData}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 grid md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Personal Information
        </h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Mail className="h-5 w-5 text-gray-400" />
            <span>{employeeData.email}</span>
          </div>
          <div className="flex items-center space-x-4">
            <Phone className="h-5 w-5 text-gray-400" />
            <span>{employeeData.phone ? employeeData.phone : 'N/A'}</span>
          </div>
          <div className="flex items-center space-x-4">
            <MapPin className="h-5 w-5 text-gray-400" />
            <span>{employeeData.location ? employeeData.location : 'N/A'}</span>
          </div>

        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Work Details
        </h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Calendar className="h-5 w-5 text-gray-400" />
            <span>Join Date: {employeeData.date_joined ? DateFormat(employeeData.date_joined) : 'N/A'}</span>
          </div>
          <div className="flex items-center space-x-4">
            <Briefcase className="h-5 w-5 text-gray-400 " />
            <span className="capitalize">Department: {employeeData.department}</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PersonalOverview;
