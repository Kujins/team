import React, { useState } from 'react';
// Import all your assessment forms from the current directory
import TherapyAssessment from './TherapyAssessment';
import PreRequisiteSkill from './PreRequisiteSkill';
import Communication from './Communication';
import Language from './Language';
import Speech from './Speech';
import OralmotorAssessment from './OralmotorAssessment';

const SkillAssessmentFlow = () => {
  const [currentStep, setCurrentStep] = useState(1); // Start with the first form (TherapyAssessment)

  // Navigation functions to pass as props to child components
  const navigateToPreRequisiteSkill = () => setCurrentStep(2);
  const navigateBackToTherapyAssessment = () => setCurrentStep(1);

  const navigateToCommunication = () => setCurrentStep(3);
  const navigateBackToPreRequisiteSkill = () => setCurrentStep(2);

  const navigateToLanguage = () => setCurrentStep(4);
  const navigateBackToCommunication = () => setCurrentStep(3);

  const navigateToSpeech = () => setCurrentStep(5);
  const navigateBackToLanguage = () => setCurrentStep(4);

  const navigateToOralmotorAssessment = () => setCurrentStep(6);
  const navigateBackToSpeech = () => setCurrentStep(5);

  // Function to handle the final submission of the assessment (from the last form)
  const handleSubmitAssessment = () => {
    alert('Assessment Completed! Data will be saved to the backend (implementation needed).');
    // After submission, you might want to reset the flow or navigate to a different page
    setCurrentStep(1); // For demonstration, resets to the first step
    // In a real application, you would send data to your backend here
  };

  // Conditionally render the current form based on the currentStep state
  switch (currentStep) {
    case 1:
      return <TherapyAssessment navigateToPreRequisiteSkill={navigateToPreRequisiteSkill} />;
    case 2:
      return (
        <PreRequisiteSkill
          navigateBackToTherapyAssessment={navigateBackToTherapyAssessment}
          navigateToCommunication={navigateToCommunication}
        />
      );
    case 3:
      return (
        <Communication
          navigateBackToPreRequisiteSkill={navigateBackToPreRequisiteSkill}
          navigateToLanguage={navigateToLanguage}
        />
      );
    case 4:
      return (
        <Language
          navigateBackToCommunication={navigateBackToCommunication}
          navigateToSpeech={navigateToSpeech}
        />
      );
    case 5:
      return (
        <Speech
          navigateBackToLanguage={navigateBackToLanguage}
          navigateToOralmotorAssessment={navigateToOralmotorAssessment}
        />
      );
    case 6:
      return (
        <OralmotorAssessment
          navigateBackToSpeech={navigateBackToSpeech}
          handleSubmitAssessment={handleSubmitAssessment} // The last form will have a submit handler
        />
      );
    default:
      // Fallback in case of an invalid step
      return (
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-red-600">Error: Invalid Assessment Step</h2>
          <button
            onClick={() => setCurrentStep(1)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Start Assessment Over
          </button>
        </div>
      );
  }
};

export default SkillAssessmentFlow;