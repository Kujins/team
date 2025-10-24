import axios from 'axios';
import BaseForm from "../BaseForm";
import { useState } from 'react';
import { createSensoryProfilePayload } from "../../../../utills/apiUtils";

function ToddlerGeneralProcessingForm({
  patientId,
  examinerId,
  testDate,
  initialResponses,
  initialComments,
  onFormSubmit,
  isSubmitting: isSubmittingProp,
}) {
  const [isCreating, setIsCreating] = useState(false);

  const isSubmitting =
    isSubmittingProp !== undefined ? isSubmittingProp : isCreating;

  const questions = [
    {
      qid: 1,
      text: "needs a routine to stay content or calm.",
      quadrant: "SN",
    },
    {
      qid: 2,
      text: "acts in a way that interferes with family schedules and plans.",
      quadrant: "SN",
    },
    {
      qid: 3,
      text: "resists playing among other children.",
      quadrant: "AV",
    },
    {
      qid: 4,
      text: "takes longer than same-aged children to respond to questions or actions.",
      quadrant: "",
    },
    {
      qid: 5,
      text: "withdraws from situations.",
      quadrant: "",
    },
    {
      qid: 6,
      text: "has an unpredictable sleeping pattern.",
      quadrant: "",
    },
    {
      qid: 7,
      text: "has an unpredictable eating pattern.",
      quadrant: "",
    },
    {
      qid: 8,
      text: "is easily awakened.",
      quadrant: "",
    },
    {
      qid: 9,
      text: "misses eye contact with me during everyday interactions.",
      quadrant: "RG",
    },
    {
      qid: 10,
      text: "gets anxious in new situations.",
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
      formTitle="General Processing"
      isSubmitting={isSubmitting}
      initialResponses={initialResponses}
      initialComments={initialComments}
    />
  );
}
export default ToddlerGeneralProcessingForm;
