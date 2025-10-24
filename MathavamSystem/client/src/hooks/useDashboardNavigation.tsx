// src/hooks/useDashboardNavigation.ts
import React, { useState, useCallback } from "react";
import TherapyAssessment from "../pages/SpeechAndTheropyAssessment/TherapyAssessment";
import PreRequisiteSkill from "../pages/SpeechAndTheropyAssessment/PreRequisiteSkill";
import Speech from "../pages/SpeechAndTheropyAssessment/Speech";
import OralmotorAssessment from "../pages/SpeechAndTheropyAssessment/OralmotorAssessment";
import Communication from "../pages/SpeechAndTheropyAssessment/Communication";
import Language from "../pages/SpeechAndTheropyAssessment/Language";

interface UseDashboardNavigation {
  activeContent: React.ReactNode | null;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  showSkillAssessmentForms: () => void;
  showParentalTraining: () => void;
  showQRAttendance: () => void;
  showTherapyTracking: () => void;
  showDocuments: () => void;
  showTherapySessions: () => void;
}

export const useDashboardNavigation = (): UseDashboardNavigation => {
  const [activeContent, setActiveContent] = useState<React.ReactNode | null>(
    null
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default to open for desktop view initially

  const closeSidebarOnMobile = useCallback(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, []);

  // Navigation functions
  const navigateToTherapyAssessment = useCallback(() => {
    setActiveContent(
      <TherapyAssessment
        navigateToPreRequisiteSkill={navigateToPreRequisiteSkill}
      />
    );
    closeSidebarOnMobile();
  }, [closeSidebarOnMobile]);

  const navigateToPreRequisiteSkill = useCallback(() => {
    setActiveContent(
      <PreRequisiteSkill
        navigateBackToTherapyAssessment={navigateToTherapyAssessment}
        navigateToCommunication={navigateToCommunication}
      />
    );
    closeSidebarOnMobile();
  }, [closeSidebarOnMobile, navigateToTherapyAssessment]);

  const navigateToCommunication = useCallback(() => {
    setActiveContent(
      <Communication
        navigateBackToPreRequisiteSkill={navigateToPreRequisiteSkill}
        navigateToLanguage={navigateToLanguage}
      />
    );
    closeSidebarOnMobile();
  }, [closeSidebarOnMobile, navigateToPreRequisiteSkill]);

  const navigateToLanguage = useCallback(() => {
    setActiveContent(
      <Language
        navigateBackToCommunication={navigateToCommunication}
        navigateToSpeech={navigateToSpeech}
      />
    );
    closeSidebarOnMobile();
  }, [closeSidebarOnMobile, navigateToCommunication]);

  const navigateToSpeech = useCallback(() => {
    setActiveContent(
      <Speech
        navigateBackToLanguage={navigateToLanguage}
        navigateToOralmotorAssessment={navigateToOralmotorAssessment}
      />
    );
    closeSidebarOnMobile();
  }, [closeSidebarOnMobile, navigateToLanguage]);

  const navigateToOralmotorAssessment = useCallback(() => {
    setActiveContent(
      <OralmotorAssessment navigateBackToSpeech={navigateToSpeech} />
    );
    closeSidebarOnMobile();
  }, [closeSidebarOnMobile, navigateToSpeech]);

  const showSkillAssessmentForms = useCallback(() => {
    setActiveContent(
      <TherapyAssessment
        navigateToPreRequisiteSkill={navigateToPreRequisiteSkill}
      />
    );
    closeSidebarOnMobile();
  }, [closeSidebarOnMobile, navigateToPreRequisiteSkill]);

  const showParentalTraining = useCallback(() => {
    setActiveContent(
      <div className="p-6 text-gray-700 bg-white rounded-lg shadow">
        Parental Training Content
      </div>
    );
    closeSidebarOnMobile();
  }, [closeSidebarOnMobile]);

  const showQRAttendance = useCallback(() => {
    setActiveContent(
      <div className="p-6 text-gray-700 bg-white rounded-lg shadow">
        QR Attendance Content
      </div>
    );
    closeSidebarOnMobile();
  }, [closeSidebarOnMobile]);

  const showTherapyTracking = useCallback(() => {
    setActiveContent(
      <div className="p-6 text-gray-700 bg-white rounded-lg shadow">
        Therapy Tracking Content
      </div>
    );
    closeSidebarOnMobile();
  }, [closeSidebarOnMobile]);

  const showDocuments = useCallback(() => {
    setActiveContent(
      <div className="p-6 text-gray-700 bg-white rounded-lg shadow">
        Documents Content
      </div>
    );
    closeSidebarOnMobile();
  }, [closeSidebarOnMobile]);

  const showTherapySessions = useCallback(() => {
    setActiveContent(
      <div className="p-6 text-gray-700 bg-white rounded-lg shadow">
        Therapy Sessions and Appointments Content
      </div>
    );
    closeSidebarOnMobile();
  }, [closeSidebarOnMobile]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  return {
    activeContent,
    isSidebarOpen,
    toggleSidebar,
    showSkillAssessmentForms,
    showParentalTraining,
    showQRAttendance,
    showTherapyTracking,
    showDocuments,
    showTherapySessions,
  };
};