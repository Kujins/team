import axios from "axios";
import BaseForm from "../BaseForm";
import { useState } from "react";
import { createSensoryProfilePayload } from "../../../../utills/apiUtils";

function ToddlerMovementProcessingForm({
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
      qid: 36,
      text: "enjoys physical activity (for example, bouncing, being held up high in the air).",
      quadrant: "SK",
    },
    {
      qid: 37,
      text: "enjoys rhythmical activities (for example, swinging, rocking, car rides).",
      quadrant: "SK",
    },
    {
      qid: 38,
      text: "takes movement or climbing risks.",
      quadrant: "SK",
    },
    {
      qid: 39,
      text: "becomes upset when placed on the back (for example, at changing times).",
      quadrant: "SN",
    },
    {
      qid: 40,
      text: "seems accident-prone or clumsy.",
      quadrant: "RG",
    },
    {
      qid: 41,
      text: "fusses when moved around (for example, walking around, when being handed over to another person).",
      quadrant: "SN",
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
        formTitle="Movement Processing"
        isSubmitting={isSubmitting}
        initialResponses={initialResponses}
        initialComments={initialComments}
      />
      <p>* - Item/s is/are not part of the MOVEMENT Raw Score.</p>
    </>
  );
}

export default ToddlerMovementProcessingForm;
