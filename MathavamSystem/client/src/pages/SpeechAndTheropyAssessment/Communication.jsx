import React, { useState, useEffect } from "react";

export default function Communication({ navigateToLanguage, navigateBackToPreRequisiteSkill }) {
  const [formData, setFormData] = useState({
    communicationStages: {
      ownAgendaStage: false,
      requesterStage: false,
      earlyCommunicatorStage: false,
      partnerStage: false,
    },
    communicationFunctions: {
      requestingAssistance: { yes: false, no: false, verbal: false, nonVerbal: false },
      greeting: { yes: false, no: false, verbal: false, nonVerbal: false },
      agreeing: { yes: false, no: false, verbal: false, nonVerbal: false },
      disagreeing: { yes: false, no: false, verbal: false, nonVerbal: false },
    },
  });

  useEffect(() => {
    try {
      const savedData = localStorage.getItem('mamaMathavam_communicationData');
      if (savedData) {
        setFormData(JSON.parse(savedData));
      }
    } catch (error) {
      console.error("Error loading communication data from localStorage:", error);
    }
  }, []);

  const handleCheckboxChange = (category, subCategory, field) => (e) => {
    const { checked } = e.target;

    setFormData((prevData) => {
      const newState = { ...prevData };

      if (category === 'communicationStages') {
        newState[category] = {
          ...newState[category],
          [subCategory]: checked,
        };
      } else if (category === 'communicationFunctions') {
        newState[category][subCategory] = {
          ...newState[category][subCategory],
          [field]: checked,
        };

        if (field === 'yes' && checked) {
          newState[category][subCategory].no = false;
        } else if (field === 'no' && checked) {
          newState[category][subCategory].yes = false;
        }
      }
      return newState;
    });
  };

  const saveFormData = () => {
    try {
      localStorage.setItem('mamaMathavam_communicationData', JSON.stringify(formData));
      console.log("Communication data saved to localStorage temporarily.");
    } catch (error) {
      console.error("Error saving communication data to localStorage:", error);
      alert("Error saving data. Please try again.");
    }
  };

  const handleNext = () => {
    saveFormData();
    navigateToLanguage();
  };

  const handleBack = () => {
    saveFormData();
    navigateBackToPreRequisiteSkill();
  };

  return (
    <div className="w-full px-4 py-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl my-8 font-sans text-gray-800">
      <h2 className="text-3xl font-extrabold text-center text-indigo-800 mb-8 tracking-tight leading-tight">
        Communication Assessment
      </h2>
      <form className="space-y-10">
        {/* Communication Stages */}
        <Section title="Communication Stages">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Stage
                  </th>
                  <th className="px-4 py-3 border-b text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Select
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr key="own-agenda-stage">
                  <td className="border border-gray-300 p-3">Own Agenda Stage</td>
                  <td className="border border-gray-300 p-3 text-center flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      name="ownAgendaStage"
                      checked={formData.communicationStages.ownAgendaStage}
                      onChange={handleCheckboxChange('communicationStages', 'ownAgendaStage')}
                    />
                  </td>
                </tr>
                <tr key="requester-stage">
                  <td className="border border-gray-300 p-3">Requester Stage</td>
                  <td className="border border-gray-300 p-3 text-center flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      name="requesterStage"
                      checked={formData.communicationStages.requesterStage}
                      onChange={handleCheckboxChange('communicationStages', 'requesterStage')}
                    />
                  </td>
                </tr>
                <tr key="early-communicator-stage">
                  <td className="border border-gray-300 p-3">Early Communicator Stage</td>
                  <td className="border border-gray-300 p-3 text-center flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      name="earlyCommunicatorStage"
                      checked={formData.communicationStages.earlyCommunicatorStage}
                      onChange={handleCheckboxChange('communicationStages', 'earlyCommunicatorStage')}
                    />
                  </td>
                </tr>
                <tr key="partner-stage">
                  <td className="border border-gray-300 p-3">Partner Stage</td>
                  <td className="border border-gray-300 p-3 text-center flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      name="partnerStage"
                      checked={formData.communicationStages.partnerStage}
                      onChange={handleCheckboxChange('communicationStages', 'partnerStage')}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* Communication Functions */}
        <Section title="Communication Functions">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Function
                  </th>
                  <th className="px-4 py-3 border-b text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Yes
                  </th>
                  <th className="px-4 py-3 border-b text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    No
                  </th>
                  <th className="px-4 py-3 border-b text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Verbal
                  </th>
                  <th className="px-4 py-3 border-b text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Non-Verbal
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Requesting Assistance */}
                <tr key="requesting-assistance">
                  <td className="border border-gray-300 p-3">Requesting Assistance</td>
                  <td className="border border-gray-300 p-3"> {/* Removed flex from td here */}
                    <div className="flex items-center justify-center"> {/* Added flex div */}
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        name="requestingAssistanceYes"
                        checked={formData.communicationFunctions.requestingAssistance.yes}
                        onChange={handleCheckboxChange('communicationFunctions', 'requestingAssistance', 'yes')}
                      />
                    </div>
                  </td>
                  <td className="border border-gray-300 p-3"> {/* Removed flex from td here */}
                    <div className="flex items-center justify-center"> {/* Added flex div */}
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        name="requestingAssistanceNo"
                        checked={formData.communicationFunctions.requestingAssistance.no}
                        onChange={handleCheckboxChange('communicationFunctions', 'requestingAssistance', 'no')}
                      />
                    </div>
                  </td>
                  <td className="border border-gray-300 p-3"> {/* Removed flex from td here */}
                    <div className="flex items-center justify-center"> {/* Added flex div */}
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        name="requestingAssistanceVerbal"
                        checked={formData.communicationFunctions.requestingAssistance.verbal}
                        onChange={handleCheckboxChange('communicationFunctions', 'requestingAssistance', 'verbal')}
                      />
                    </div>
                  </td>
                  <td className="border border-gray-300 p-3"> {/* Removed flex from td here */}
                    <div className="flex items-center justify-center"> {/* Added flex div */}
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        name="requestingAssistanceNonVerbal"
                        checked={formData.communicationFunctions.requestingAssistance.nonVerbal}
                        onChange={handleCheckboxChange('communicationFunctions', 'requestingAssistance', 'nonVerbal')}
                      />
                    </div>
                  </td>
                </tr>

                {/* Greeting */}
                <tr key="greeting">
                  <td className="border border-gray-300 p-3">Greeting</td>
                  <td className="border border-gray-300 p-3"> {/* Removed flex from td here */}
                    <div className="flex items-center justify-center"> {/* Added flex div */}
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        name="greetingYes"
                        checked={formData.communicationFunctions.greeting.yes}
                        onChange={handleCheckboxChange('communicationFunctions', 'greeting', 'yes')}
                      />
                    </div>
                  </td>
                  <td className="border border-gray-300 p-3"> {/* Removed flex from td here */}
                    <div className="flex items-center justify-center"> {/* Added flex div */}
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        name="greetingNo"
                        checked={formData.communicationFunctions.greeting.no}
                        onChange={handleCheckboxChange('communicationFunctions', 'greeting', 'no')}
                      />
                    </div>
                  </td>
                  <td className="border border-gray-300 p-3"> {/* Removed flex from td here */}
                    <div className="flex items-center justify-center"> {/* Added flex div */}
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        name="greetingVerbal"
                        checked={formData.communicationFunctions.greeting.verbal}
                        onChange={handleCheckboxChange('communicationFunctions', 'greeting', 'verbal')}
                      />
                    </div>
                  </td>
                  <td className="border border-gray-300 p-3"> {/* Removed flex from td here */}
                    <div className="flex items-center justify-center"> {/* Added flex div */}
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        name="greetingNonVerbal"
                        checked={formData.communicationFunctions.greeting.nonVerbal}
                        onChange={handleCheckboxChange('communicationFunctions', 'greeting', 'nonVerbal')}
                      />
                    </div>
                  </td>
                </tr>

                {/* Agreeing */}
                <tr key="agreeing">
                  <td className="border border-gray-300 p-3">Agreeing</td>
                  <td className="border border-gray-300 p-3"> {/* Removed flex from td here */}
                    <div className="flex items-center justify-center"> {/* Added flex div */}
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        name="agreeingYes"
                        checked={formData.communicationFunctions.agreeing.yes}
                        onChange={handleCheckboxChange('communicationFunctions', 'agreeing', 'yes')}
                      />
                    </div>
                  </td>
                  <td className="border border-gray-300 p-3"> {/* Removed flex from td here */}
                    <div className="flex items-center justify-center"> {/* Added flex div */}
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        name="agreeingNo"
                        checked={formData.communicationFunctions.agreeing.no}
                        onChange={handleCheckboxChange('communicationFunctions', 'agreeing', 'no')}
                      />
                    </div>
                  </td>
                  <td className="border border-gray-300 p-3"> {/* Removed flex from td here */}
                    <div className="flex items-center justify-center"> {/* Added flex div */}
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        name="agreeingVerbal"
                        checked={formData.communicationFunctions.agreeing.verbal}
                        onChange={handleCheckboxChange('communicationFunctions', 'agreeing', 'verbal')}
                      />
                    </div>
                  </td>
                  <td className="border border-gray-300 p-3"> {/* Removed flex from td here */}
                    <div className="flex items-center justify-center"> {/* Added flex div */}
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        name="agreeingNonVerbal"
                        checked={formData.communicationFunctions.agreeing.nonVerbal}
                        onChange={handleCheckboxChange('communicationFunctions', 'agreeing', 'nonVerbal')}
                      />
                    </div>
                  </td>
                </tr>

                {/* Disagreeing */}
                <tr key="disagreeing">
                  <td className="border border-gray-300 p-3">Disagreeing</td>
                  <td className="border border-gray-300 p-3"> {/* Removed flex from td here */}
                    <div className="flex items-center justify-center"> {/* Added flex div */}
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        name="disagreeingYes"
                        checked={formData.communicationFunctions.disagreeing.yes}
                        onChange={handleCheckboxChange('communicationFunctions', 'disagreeing', 'yes')}
                      />
                    </div>
                  </td>
                  <td className="border border-gray-300 p-3"> {/* Removed flex from td here */}
                    <div className="flex items-center justify-center"> {/* Added flex div */}
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        name="disagreeingNo"
                        checked={formData.communicationFunctions.disagreeing.no}
                        onChange={handleCheckboxChange('communicationFunctions', 'disagreeing', 'no')}
                      />
                    </div>
                  </td>
                  <td className="border border-gray-300 p-3"> {/* Removed flex from td here */}
                    <div className="flex items-center justify-center"> {/* Added flex div */}
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        name="disagreeingVerbal"
                        checked={formData.communicationFunctions.disagreeing.verbal}
                        onChange={handleCheckboxChange('communicationFunctions', 'disagreeing', 'verbal')}
                      />
                    </div>
                  </td>
                  <td className="border border-gray-300 p-3"> {/* Removed flex from td here */}
                    <div className="flex items-center justify-center"> {/* Added flex div */}
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        name="disagreeingNonVerbal"
                        checked={formData.communicationFunctions.disagreeing.nonVerbal}
                        onChange={handleCheckboxChange('communicationFunctions', 'disagreeing', 'nonVerbal')}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>
      </form>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-10 pt-6 border-t border-indigo-100">
        <button
          type="button"
          onClick={handleBack}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
        >
          Back
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
    </div>
  );
}

// Re-using the Section component concept for consistent styling
const Section = ({ title, children, className = "" }) => (
  <div className={`bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-xl border-l-4 border-blue-400
    hover:shadow-2xl transition-all duration-300 ease-in-out
    ${className}`}>
    <h3 className="text-2xl font-semibold text-blue-900 mb-6 border-b pb-2 border-blue-100">
      {title}
    </h3>
    {children}
  </div>
);