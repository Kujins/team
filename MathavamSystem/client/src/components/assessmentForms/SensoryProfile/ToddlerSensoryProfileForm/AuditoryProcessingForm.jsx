import axios from 'axios';
import BaseForm from "../BaseForm";
import { useState } from 'react';
import { createSensoryProfilePayload } from "../../../../utills/apiUtils";

function ToddlerAuditoryProcessingForm({
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
      qid: 11,
      text: "only pays attention if I speak loudly.",
      quadrant: "RG",
    },
    {
      qid: 12,
      text: "only pays attention when I touch my child (and hearing is OK).",
      quadrant: "RG",
    },
    {
      qid: 13,
      text: "startles easily at sound compared to same-aged children (for example, dog barking, children shouting).",
      quadrant: "SN",
    },
    {
      qid: 14,
      text: "is distracted in noisy settings.",
      quadrant: "RG",
    },
    {
      qid: 15,
      text: "ignores sounds, including my voice.",
      quadrant: "RG",
    },
    {
      qid: 16,
      text: "becomes upset or tries to escape from noisy settings.",
      quadrant: "SN",
    },
    {
      qid: 17,
      text: "takes a long time to respond to own name.",
      quadrant: "",
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
      formTitle="Auditory Processing"
      isSubmitting={isSubmitting}
      initialResponses={initialResponses}
      initialComments={initialComments}
    />
  );
}
export default ToddlerAuditoryProcessingForm;
