import React from "react";

const ProfileHeader = ({employeeData}) => {
  console.log('child ==', employeeData);
  
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8 mt-10">
      <div className="flex items-center space-x-6">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
          <span className="text-3xl font-bold text-red-600 capitalize">{(employeeData.username).charAt(0)}</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800 capitalize">
            {employeeData.username}
          </h1>
          <p className="text-gray-600 capitalize">
            {employeeData.department}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
