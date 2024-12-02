import React from "react";

const NavigationTabs = ({activeSection, onSectionChange}) => {
  return (
    <div className="bg-white shadow-md rounded-lg mb-8">
      <div className="border-b flex">
        {["overview", "leave-history"].map((section) => (
          <button
            key={section}
            className={`flex-1 py-3 px-4 text-center transition-colors ${
              activeSection === section
                ? "border-b-2 border-red-600 text-red-600 font-semibold"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => onSectionChange(section)}
          >
            {section === "overview"
              ? "Personal Details"
              : "Leave History"}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavigationTabs;
