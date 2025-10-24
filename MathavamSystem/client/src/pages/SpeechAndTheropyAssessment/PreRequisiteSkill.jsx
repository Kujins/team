import React, { useState, useEffect } from "react";

export default function PreRequisiteSkill({ navigateBackToTherapyAssessment, navigateToCommunication }) {
  const [formData, setFormData] = useState({
    // Joint Attention - Responding
    jointAttentionRespondingYes: false,
    jointAttentionRespondingNo: false,
    // Joint Attention - Initiation
    jointAttentionInitiationYes: false,
    jointAttentionInitiationNo: false,
    // Eye Fixation
    eyeFixationYes: false,
    eyeFixationNo: false,
    // Visual Tracking
    visualTrackingYes: false,
    visualTrackingNo: false,
    // Attention Span
    extremeDistraction: false,
    singleChannel: false,
    // Turn Taking
    waiting: false,
    takingTurn: false,
    // Name Responding
    nameRespondingAlways: false,
    nameRespondingNever: false,
  });

  // Load data from localStorage when the component mounts
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('mamaMathavam_preRequisiteSkillData');
      if (savedData) {
        // When loading, reconstruct the flattened state from the structured data in localStorage
        const parsedData = JSON.parse(savedData);
        setFormData({
          jointAttentionRespondingYes: parsedData.jointAttentionResponding?.yes || false,
          jointAttentionRespondingNo: parsedData.jointAttentionResponding?.no || false,
          jointAttentionInitiationYes: parsedData.jointAttentionInitiation?.yes || false,
          jointAttentionInitiationNo: parsedData.jointAttentionInitiation?.no || false,
          eyeFixationYes: parsedData.eyeFixation?.yes || false,
          eyeFixationNo: parsedData.eyeFixation?.no || false,
          visualTrackingYes: parsedData.visualTracking?.yes || false,
          visualTrackingNo: parsedData.visualTracking?.no || false,
          extremeDistraction: parsedData.attentionSpan?.extremeDistraction || false,
          singleChannel: parsedData.attentionSpan?.singleChannel || false,
          waiting: parsedData.turnTaking?.waiting || false,
          takingTurn: parsedData.turnTaking?.takingTurn || false,
          nameRespondingAlways: parsedData.nameResponding?.always || false,
          nameRespondingNever: parsedData.nameResponding?.never || false,
        });
      }
    } catch (error) {
      console.error("Error loading pre-requisite skill data from localStorage:", error);
    }
  }, []);

  const handleChange = (e) => {
    const { name, checked } = e.target;

    setFormData((prevData) => {
      const newState = { ...prevData, [name]: checked };

      // Handle "Yes/No" pairs as radio buttons (only one can be true)
      if (name === "jointAttentionRespondingYes" && checked) {
        newState.jointAttentionRespondingNo = false;
      } else if (name === "jointAttentionRespondingNo" && checked) {
        newState.jointAttentionRespondingYes = false;
      }

      if (name === "jointAttentionInitiationYes" && checked) {
        newState.jointAttentionInitiationNo = false;
      } else if (name === "jointAttentionInitiationNo" && checked) {
        newState.jointAttentionInitiationYes = false;
      }

      if (name === "eyeFixationYes" && checked) {
        newState.eyeFixationNo = false;
      } else if (name === "eyeFixationNo" && checked) {
        newState.eyeFixationYes = false;
      }

      if (name === "visualTrackingYes" && checked) {
        newState.visualTrackingNo = false;
      } else if (name === "visualTrackingNo" && checked) {
        newState.visualTrackingYes = false;
      }

      // Handle Attention Span: only one can be true
      if (name === "extremeDistraction" && checked) {
        newState.singleChannel = false;
      } else if (name === "singleChannel" && checked) {
        newState.extremeDistraction = false;
      }

      // Handle Name Responding: only one can be true
      if (name === "nameRespondingAlways" && checked) {
        newState.nameRespondingNever = false;
      } else if (name === "nameRespondingNever" && checked) {
        newState.nameRespondingAlways = false;
      }

      return newState;
    });
  };

  const saveFormData = () => {
    try {
      // Structure the data to match the backend schema's prerequisiteSkills
      const structuredData = {
        jointAttentionResponding: {
          yes: formData.jointAttentionRespondingYes,
          no: formData.jointAttentionRespondingNo,
        },
        jointAttentionInitiation: {
          yes: formData.jointAttentionInitiationYes,
          no: formData.jointAttentionInitiationNo,
        },
        eyeFixation: {
          yes: formData.eyeFixationYes,
          no: formData.eyeFixationNo,
        },
        visualTracking: {
          yes: formData.visualTrackingYes,
          no: formData.visualTrackingNo,
        },
        attentionSpan: {
          extremeDistraction: formData.extremeDistraction,
          singleChannel: formData.singleChannel,
        },
        turnTaking: {
          waiting: formData.waiting,
          takingTurn: formData.takingTurn,
        },
        nameResponding: { // This is the nested nameResponding in prerequisiteSkills
          always: formData.nameRespondingAlways,
          never: formData.nameRespondingNever,
        },
        // The following fields (socialSmile, peerRelationship, etc.) are part of
        // prerequisiteSkills in the schema, but are collected in OralmotorAssessment.jsx
        // They will be combined with this data in OralmotorAssessment.jsx before final submission.
      };

      // Save this form's specific data (structured for easy combination later)
      localStorage.setItem('mamaMathavam_preRequisiteSkillData', JSON.stringify(structuredData));
      console.log("Pre-Requisite Skill data saved to localStorage temporarily.");
    } catch (error) {
      console.error("Error saving pre-requisite skill data to localStorage:", error);
      alert("Error saving data. Please try again.");
    }
  };

  const handleNext = () => {
    saveFormData();
    navigateToCommunication();
  };

  const handleBack = () => {
    saveFormData(); // Save data before navigating back
    navigateBackToTherapyAssessment();
  };

  // Reusable Table Component for consistency and cleaner code
  const CheckboxTable = ({ title, categoryLabel, columns, data, fieldPrefix }) => (
    <div className="bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-xl border-l-4 border-blue-400
    hover:shadow-2xl transition-all duration-300 ease-in-out">
      <h3 className="text-2xl font-semibold text-blue-900 mb-6 border-b pb-2 border-blue-100">{title}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider border-b border-blue-200">
                {categoryLabel}
              </th>
              {columns.map((col, index) => (
                <th key={index} className="px-4 py-3 text-center text-xs font-semibold text-blue-800 uppercase tracking-wider border-b border-blue-200">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={row.label || rowIndex} className="group hover:bg-blue-50 transition-colors duration-200 ease-in-out">
                <td className="px-4 py-3 whitespace-nowrap text-gray-700 border-b border-blue-100">
                  {row.label}
                </td>
                {columns.map((col, colIndex) => (
                  <td key={`${row.label}-${col.header}-${colIndex}`} className="px-4 py-3 text-center border-b border-blue-100">
                    {row.fields[col.fieldKey] !== undefined && (
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="h-5 w-5 text-blue-600 border-blue-300 rounded focus:ring-purple-500 transition-transform duration-200 hover:scale-110"
                          name={`${fieldPrefix}${row.fields[col.fieldKey].name}`}
                          checked={formData[`${fieldPrefix}${row.fields[col.fieldKey].name}`]}
                          onChange={handleChange}
                        />
                      </label>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );


  return (
    <div className="w-full px-4 py-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl my-8 font-sans text-gray-800">
      <h2 className="text-3xl font-extrabold text-center text-indigo-800 mb-8 tracking-tight leading-tight">
        Pre-Requisite Skills Assessment
      </h2>
      <form className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Joint Attention - Responding */}
          <CheckboxTable
            title="Joint Attention - Responding"
            categoryLabel="Category"
            columns={[{ header: "Yes", fieldKey: "yes" }, { header: "No", fieldKey: "no" }]}
            data={[{ label: "Child responds to joint attention", fields: { yes: { name: "RespondingYes" }, no: { name: "RespondingNo" } } }]}
            fieldPrefix="jointAttention"
          />

          {/* Joint Attention - Initiation */}
          <CheckboxTable
            title="Joint Attention - Initiation"
            categoryLabel="Category"
            columns={[{ header: "Yes", fieldKey: "yes" }, { header: "No", fieldKey: "no" }]}
            data={[{ label: "Child initiates joint attention", fields: { yes: { name: "InitiationYes" }, no: { name: "InitiationNo" } } }]}
            fieldPrefix="jointAttention"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Eye Fixation */}
          <CheckboxTable
            title="Eye Fixation"
            categoryLabel="Category"
            columns={[{ header: "Yes", fieldKey: "yes" }, { header: "No", fieldKey: "no" }]}
            data={[{ label: "Child has adequate eye fixation", fields: { yes: { name: "Yes" }, no: { name: "No" } } }]}
            fieldPrefix="eyeFixation"
          />

          {/* Visual Tracking */}
          <CheckboxTable
            title="Visual Tracking"
            categoryLabel="Category"
            columns={[{ header: "Yes", fieldKey: "yes" }, { header: "No", fieldKey: "no" }]}
            data={[{ label: "Child tracks visually", fields: { yes: { name: "Yes" }, no: { name: "No" } } }]}
            fieldPrefix="visualTracking"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Attention Span */}
          <CheckboxTable
            title="Attention Span"
            categoryLabel="Category"
            columns={[{ header: "Extreme Distraction", fieldKey: "extreme" }, { header: "Single Channel", fieldKey: "single" }]}
            data={[{ label: "Child's attention", fields: { extreme: { name: "extremeDistraction" }, single: { name: "singleChannel" } } }]}
            fieldPrefix=""
          />

          {/* Turn Taking */}
          <CheckboxTable
            title="Turn Taking"
            categoryLabel="Category"
            columns={[{ header: "Waiting", fieldKey: "waiting" }, { header: "Taking Turn", fieldKey: "takingTurn" }]}
            data={[{ label: "Child's turn taking ability", fields: { waiting: { name: "waiting" }, takingTurn: { name: "takingTurn" } } }]}
            fieldPrefix=""
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Responding (with "Always" and "Never" in separate rows for clarity) */}
          <CheckboxTable
            title="Name Responding"
            categoryLabel="Response"
            columns={[{ header: "Select", fieldKey: "select" }]}
            data={[
              { label: "Always", fields: { select: { name: "Always" } } },
              { label: "Never", fields: { select: { name: "Never" } } },
            ]}
            fieldPrefix="nameResponding"
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-10 pt-6 border-t border-indigo-100">
          <button
            type="button"
            onClick={handleBack}
            className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 
            text-white font-semibold py-3 px-10 rounded-full shadow-lg 
            hover:shadow-2xl transform hover:scale-105 active:scale-95 
            transition-all duration-300 ease-in-out text-base tracking-wide
            focus:outline-none focus:ring-4 focus:ring-gray-400"
          >
            ← Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
            text-white font-semibold py-3 px-10 rounded-full shadow-lg 
            hover:shadow-2xl transform hover:scale-105 active:scale-95 
            transition-all duration-300 ease-in-out text-base tracking-wide
            focus:outline-none focus:ring-4 focus:ring-purple-400"
          >
            Continue to Next Step →
          </button>
        </div>
      </form>
    </div>
  );
}