// src/hooks/useSpeechTherapyAssessmentNavigation.ts
import React, { useState, useCallback } from "react";
import TherapyAssessment from "../pages/SpeechAndTheropyAssessment/TherapyAssessment";
import PreRequisiteSkill from "../pages/SpeechAndTheropyAssessment/PreRequisiteSkill";
import Speech from "../pages/SpeechAndTheropyAssessment/Speech";
import OralmotorAssessment from "../pages/SpeechAndTheropyAssessment/OralmotorAssessment";
import Communication from "../pages/SpeechAndTheropyAssessment/Communication";
import Language from "../pages/SpeechAndTheropyAssessment/Language";

// Define the interface for the return values of this specific hook
interface UseSpeechTherapyAssessmentNavigation {
  activeAssessmentContent: React.ReactNode | null;
  navigateToTherapyAssessment: () => void;
  navigateToPreRequisiteSkill: () => void;
  navigateToCommunication: () => void;
  navigateToLanguage: () => void;
  navigateToSpeech: () => void;
  navigateToOralmotorAssessment: () => void;
  showSkillAssessmentForms: () => void; // This is an entry point for the assessments
}

/**
 * Custom hook to manage navigation within the Speech and Therapy Assessment forms.
 * It provides functions to navigate between different assessment stages.
 *
 * @param closeSidebarOnMobile - A callback function to close the sidebar on mobile, passed from the parent hook.
 * @returns An object containing the active assessment content and navigation functions.
 */
export const useSpeechTherapyAssessmentNavigation = (
  closeSidebarOnMobile: () => void
): UseSpeechTherapyAssessmentNavigation => {
  const [activeAssessmentContent, setActiveAssessmentContent] = useState<
    React.ReactNode | null
  >(null);

  // Define navigation functions for each assessment stage
  const navigateToTherapyAssessment = useCallback(() => {
    setActiveAssessmentContent(
      <TherapyAssessment navigateToPreRequisiteSkill={navigateToPreRequisiteSkill} />
    );
    closeSidebarOnMobile();
  }, [closeSidebarOnMobile]);

  const navigateToPreRequisiteSkill = useCallback(() => {
    setActiveAssessmentContent(
      <PreRequisiteSkill navigateBackToTherapyAssessment={navigateToTherapyAssessment} navigateToCommunication={navigateToCommunication} />
    );
    closeSidebarOnMobile();
  }, [closeSidebarOnMobile, navigateToTherapyAssessment]);

  const navigateToCommunication = useCallback(() => {
    setActiveAssessmentContent(
      <Communication
        navigateBackToPreRequisiteSkill={navigateToPreRequisiteSkill}
        navigateToLanguage={navigateToLanguage}
      />
    );
    closeSidebarOnMobile();
  }, [closeSidebarOnMobile, navigateToPreRequisiteSkill]);

  const navigateToLanguage = useCallback(() => {
    setActiveAssessmentContent(
      <Language
        navigateBackToCommunication={navigateToCommunication}
        navigateToSpeech={navigateToSpeech}
      />
    );
    closeSidebarOnMobile();
  }, [closeSidebarOnMobile, navigateToCommunication]);

  const navigateToSpeech = useCallback(() => {
    setActiveAssessmentContent(
      <Speech
        navigateBackToLanguage={navigateToLanguage}
        navigateToOralmotorAssessment={navigateToOralmotorAssessment}
      />
    );
    closeSidebarOnMobile();
  }, [closeSidebarOnMobile, navigateToLanguage]);

  const navigateToOralmotorAssessment = useCallback(() => {
    setActiveAssessmentContent(
      <OralmotorAssessment navigateBackToSpeech={navigateToSpeech} />
    );
    closeSidebarOnMobile();
  }, [closeSidebarOnMobile, navigateToSpeech]);

  // This function serves as the initial entry point for the skill assessment forms
  const showSkillAssessmentForms = useCallback(() => {
    setActiveAssessmentContent(
      <TherapyAssessment
        navigateToPreRequisiteSkill={navigateToPreRequisiteSkill}
      />
    );
    closeSidebarOnMobile();
  }, [closeSidebarOnMobile, navigateToPreRequisiteSkill]);

  return {
    activeAssessmentContent,
    navigateToTherapyAssessment,
    navigateToPreRequisiteSkill,
    navigateToCommunication,
    navigateToLanguage,
    navigateToSpeech,
    navigateToOralmotorAssessment,
    showSkillAssessmentForms,
  };
};