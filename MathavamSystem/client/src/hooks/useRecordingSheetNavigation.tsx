// src/hooks/useRecordingSheetNavigation.ts
import React, { useState, useCallback } from "react";
// Recording Sheet Components
import MedicalFormIntro from "../pages/RecordSheet/MedicalFormIntro"; // Assuming this path
import PhysicalAssessment from "../pages/RecordSheet/PhysicalAssessment"; // Assuming this path
import DailyActivities from "../pages/RecordSheet/DailyActivities"; // Assuming this path
import MedicalHistory from "../pages/RecordSheet/MedicalHistory"; // Assuming this path

// Define the interface for the return values of this specific hook
interface UseRecordingSheetNavigation {
  activeRecordingSheetContent: React.ReactNode | null;
  navigateToMedicalFormIntro: () => void;
  navigateToPhysicalAssessment: () => void;
  navigateToDailyActivities: () => void;
  navigateToMedicalHistory: () => void;
  showRecordingSheetForms: () => void; // Entry point for recording sheet forms
}

/**
 * Custom hook to manage navigation within the Recording Sheet forms.
 * It provides functions to navigate between different stages of the recording sheet.
 *
 * @param closeSidebarOnMobile - A callback function to close the sidebar on mobile, passed from the parent hook.
 * @returns An object containing the active recording sheet content and navigation functions.
 */
export const useRecordingSheetNavigation = (
  closeSidebarOnMobile: () => void
): UseRecordingSheetNavigation => {
  const [activeRecordingSheetContent, setActiveRecordingSheetContent] =
    useState<React.ReactNode | null>(null);

  // Define navigation functions for each recording sheet stage
  const navigateToMedicalFormIntro = useCallback(() => {
    setActiveRecordingSheetContent(
      <MedicalFormIntro
        navigateToPhysicalAssessment={navigateToPhysicalAssessment}
      />
    );
    closeSidebarOnMobile();
  }, [closeSidebarOnMobile]);

  const navigateToPhysicalAssessment = useCallback(() => {
    setActiveRecordingSheetContent(
      <PhysicalAssessment
        navigateBackToMedicalFormIntro={navigateToMedicalFormIntro}
        navigateToDailyActivities={navigateToDailyActivities}
      />
    );
    closeSidebarOnMobile();
  }, [closeSidebarOnMobile, navigateToMedicalFormIntro]);

  const navigateToDailyActivities = useCallback(() => {
    setActiveRecordingSheetContent(
      <DailyActivities
        navigateBackToPhysicalAssessment={navigateToPhysicalAssessment}
        navigateToMedicalHistory={navigateToMedicalHistory}
      />
    );
    closeSidebarOnMobile();
  }, [closeSidebarOnMobile, navigateToPhysicalAssessment]);

  const navigateToMedicalHistory = useCallback(() => {
    setActiveRecordingSheetContent(
      <MedicalHistory navigateBackToDailyActivities={navigateToDailyActivities} />
    );
    closeSidebarOnMobile();
  }, [closeSidebarOnMobile, navigateToDailyActivities]);

  // This function serves as the initial entry point for the recording sheet forms
  const showRecordingSheetForms = useCallback(() => {
    setActiveRecordingSheetContent(
      <MedicalFormIntro
        navigateToPhysicalAssessment={navigateToPhysicalAssessment}
      />
    );
    closeSidebarOnMobile();
  }, [closeSidebarOnMobile, navigateToPhysicalAssessment]);

  return {
    activeRecordingSheetContent,
    navigateToMedicalFormIntro,
    navigateToPhysicalAssessment,
    navigateToDailyActivities,
    navigateToMedicalHistory,
    showRecordingSheetForms,
  };
};
