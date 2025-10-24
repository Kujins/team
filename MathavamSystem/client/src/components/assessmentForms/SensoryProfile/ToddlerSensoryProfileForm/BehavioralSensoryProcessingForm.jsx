import axios from 'axios';
import BaseForm from "../BaseForm";
import { useState } from 'react';
import { createSensoryProfilePayload } from "../../../../utills/apiUtils";

function ToddlerBehavioralSensoryProcessingForm({
  patientId,
  examinerId,
  testDate,
  initialResponses,
  initialComments,
  onFormSubmit, 
  isSubmitting: isSubmittingProp, 
}) {

  const [isCreating, setIsCreating] = useState(false);

  const isSubmitting = isSubmittingProp !== undefined ? isSubmittingProp : isCreating;
  
  const questions = [
    {
      qid: 49,
      text: "has temper tantrums.",
      quadrant: "AV",
    },
    {
      qid: 50,
      text: "is clingy.",
      quadrant: "",
    },
    {
      qid: 51,
      text: "stays calm only when being held.",
      quadrant: "",
    },
    {
      qid: 52,
      text: "is fussy or irritable.",
      quadrant: "SN",
    },
    {
      qid: 53,
      text: "is bothered by new settings.",
      quadrant: "AV",
    },
    {
      qid: 54,
      text: "becomes so upset in new settings that it's hard to calm down.",
      quadrant: "AV",
    },
  ];

  const handleFormSubmit = async (formSpecificData) => {
    if (onFormSubmit) {
      onFormSubmit(formSpecificData);
      return;
    }

    if (isCreating) return;
    setIsCreating(true);

    const sharedData = {
      patientId,
      examinerId,
      testDate,
      ageGroup: "Toddler",
    };

    const formData = createSensoryProfilePayload(formSpecificData, sharedData);

    try {
      const result = await axios.post(
        "/api/assessments/sensory-profile",
        formData
      );
      console.log("Form Submitted Successfully:", result.data);
      alert("Assessment saved!");
    } catch (error) {
      console.error("There was an error submitting the form:", error);
      alert("Error: Could not save the assessment.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <BaseForm
      questions={questions}
      onSubmit={handleFormSubmit}
      formTitle="Behavioral Responses Associated with Sensory Processing"
      isSubmitting={isSubmitting}
      initialResponses={initialResponses}
      initialComments={initialComments}
    />
  );
}

export default ToddlerBehavioralSensoryProcessingForm;
