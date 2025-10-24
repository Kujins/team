import axios from "axios";
import BaseForm from "../BaseForm";
import { useState } from "react";
import { createSensoryProfilePayload } from "../../../../utills/apiUtils";

function ToddlerVisualProcessingForm({
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
      qid: 18,
      text: "enjoys looking at moving or spinning objects (for example, ceiling fans, toys with wheels).",
      quadrant: "SK",
    },
    {
      qid: 19,
      text: "enjoys looking at shiny objects.",
      quadrant: "SK",
    },
    {
      qid: 20,
      text: "is attracted to TV or computer screens with fast-paced, brightly colored graphics.",
      quadrant: "SK",
    },
    {
      qid: 21,
      text: "startles at bright or unpredictable light (for example, when moving from inside to outside).",
      quadrant: "",
    },
    {
      qid: 22,
      text: "is bothered by bright lights (for example, hides from sunlight through car window).",
      quadrant: "",
    },
    {
      qid: 23,
      text: "is more bothered by bright lights than other same-aged children.",
      quadrant: "RG",
    },
    {
      qid: 24,
      text: "pushes brightly colored toys away.",
      quadrant: "RG",
      excludeFromScore: true,
    },
    {
      qid: 25,
      text: "fails to respond to self in the mirror.",
      quadrant: "RG",
      excludeFromScore: true,
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
    <>
      <BaseForm
        questions={questions}
        onSubmit={handleFormSubmit}
        formTitle="Visual Processing"
        isSubmitting={isSubmitting}
        initialResponses={initialResponses}
        initialComments={initialComments}
      />
      <p>* - Item/s is/are not part of the VISUAL Raw Score.</p>
    </>
  );
}

export default ToddlerVisualProcessingForm;
