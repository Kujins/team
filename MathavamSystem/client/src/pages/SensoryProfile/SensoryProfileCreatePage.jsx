import { useState, useCallback, useEffect } from "react";
import Base from "../../components/assessmentForms/SensoryProfile/Base";
import BaseCards from "../../components/assessmentForms/SensoryProfile/BaseCards";

function SensoryProfileCreatePage() {
  const [patientAge, setPatientAge] = useState(null);
  const [patientId, setPatientId] = useState("");
  const [examinerId, setExaminerId] = useState("");
  const [testDate, setTestDate] = useState("");

  const [expandedCard, setExpandedCard] = useState(null);

  
  const handleBaseDataChange = useCallback((ageInMonths, patientId, examinerId,testDate) => {
    setPatientAge((currentAge) => {
      if (currentAge !== ageInMonths) {
        setExpandedCard(null);
      }
      return ageInMonths;
    });
    setPatientId(patientId);
    setExaminerId(examinerId);
    setTestDate(testDate);
  }, []);

  
  const toggleCard = useCallback((cardName) => {
    setExpandedCard((currentExpandedCard) =>
      currentExpandedCard === cardName ? null : cardName
    );
  }, []); 

  
  const getFormType = () => {
    if (patientAge === null) return null;
    if (patientAge >= 36 && patientAge <= 179) return "child";
    if (patientAge >= 7 && patientAge <= 35) return "toddler";
    return "invalid"; 
  };

  const formType = getFormType();

  
  const getFormSections = () => {
    if (formType === "child") {
      return [
        "Auditory Processing",
        "Visual Processing",
        "Touch Processing",
        "Movement Processing",
        "Body Position Processing",
        "Oral Sensory Processing",
        "Conduct Associated with Sensory Processing",
        "Social Emotional Responses Associated with Sensory Processing",
        "Attentional Responses Associated with Sensory Processing",
      ];
    } else if (formType === "toddler") {
      return [
        "General Processing",
        "Auditory Processing",
        "Visual Processing",
        "Touch Processing",
        "Movement Processing",
        "Oral Sensory Processing",
        "Behavioral Associated with Sensory Processing",
      ];
    }
    return [];
  };

  const formSections = getFormSections();

  return (
    <div className="pb-16">
      <Base onDataChange={handleBaseDataChange} />

      {formType && formType !== "invalid" && patientId && examinerId && (
        <div className="max-w-3xl mx-auto mt-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
            {formType === "child"
              ? "Child Sensory Profile-2"
              : "Toddler Sensory Profile"}{" "}
            Assessment Sections
          </h2>

          {formSections.map((section) => (
            <BaseCards
              key={section}
              sensoryName={section}
              isExpanded={expandedCard === section}
              onToggle={() => toggleCard(section)}
              formType={formType}
              patientId={patientId}
              examinerId={examinerId}
              testDate={testDate}
            />
          ))}
        </div>
      )}

      {patientAge === null && (
        <div className="max-w-3xl mx-auto text-center p-6 bg-blue-50 rounded-lg mt-6">
          <p className="text-blue-600 font-medium text-lg">
            Please enter the patient's date of birth and test date to view the
            appropriate assessment forms.
          </p>
        </div>
      )}
    </div>
  );
}

export default SensoryProfileCreatePage;
