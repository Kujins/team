import axios from "axios";
import BaseForm from "../BaseForm";
import { useState } from "react";
import { createSensoryProfilePayload } from "../../../../utills/apiUtils";

function ToddlerTouchProcessingForm({
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
      qid: 26,
      text: "becomes upset when having nails trimmed.",
      quadrant: "SN",
    },
    {
      qid: 27,
      text: "resists being cuddled.",
      quadrant: "AV",
    },
    {
      qid: 28,
      text: "is upset when moving among spaces with very different temperatures (for example, colder, warmer).",
      quadrant: "AV",
    },
    {
      qid: 29,
      text: "withdraws from contact with rough, cold, or sticky surfaces (for example, carpet, countertops).",
      quadrant: "AV",
    },
    {
      qid: 30,
      text: "bumps into things, failing to notice objects or people in the way.",
      quadrant: "RG",
    },
    {
      qid: 31,
      text: "pulls at clothing or resists getting clothing on.",
      quadrant: "SN",
    },
    {
      qid: 32,
      text: "enjoys splashing during bath or swim time.",
      quadrant: "SK",
      excludeFromScore: true,
    },
    {
      qid: 33,
      text: "becomes upset if own clothing, hands, or face are messy.",
      quadrant: "AV",
      excludeFromScore: true,
    },
    {
      qid: 34,
      text: "becomes anxious when walking or crawling on certain surfaces (for example, grass, sand, carpet, tile).",
      quadrant: "SN",
      excludeFromScore: true,
    },
    {
      qid: 35,
      text: "withdraws from unexpected touch.",
      quadrant: "AV",
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
        formTitle="Touch Processing"
        isSubmitting={isSubmitting}
        initialResponses={initialResponses}
        initialComments={initialComments}
      />
      <p>* - Item/s is/are not part of the TOUCH Raw Score.</p>
    </>
  );
}

export default ToddlerTouchProcessingForm;
