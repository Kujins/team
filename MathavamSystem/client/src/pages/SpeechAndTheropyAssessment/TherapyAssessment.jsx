import React, { useState, useEffect } from "react";

const TherapyAssessment = ({ navigateToPreRequisiteSkill }) => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    age: "", // This field will be calculated from DOB
    regNo: "",
    languageUsed: "",
    primaryCarer: "",
    medicalDiagnosis: "",
    communicationDiagnosis: "",
    familyHistory: "",
    hearing: "",
    vision: "",
    siblings: "",
    motorDevelopment: false,
    speechRegression: false,
    assessmentDate: "",
    accessBy: "",
    nameResponding: "", // This is the top-level nameResponding
    canWaitTurn: false,
    canTakeTurns: false,
  });

  // Load data from localStorage when the component mounts
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(
        "mamaMathavam_therapyAssessmentData"
      );
      if (savedData) {
        setFormData(JSON.parse(savedData));
      }
    } catch (error) {
      console.error(
        "Error loading therapy assessment data from localStorage:",
        error
      );
    }
  }, []);

  // Effect to calculate age whenever DOB changes
  useEffect(() => {
    if (formData.dob) {
      const dobDate = new Date(formData.dob);
      const today = new Date();
      let ageYears = today.getFullYear() - dobDate.getFullYear();
      let ageMonths = today.getMonth() - dobDate.getMonth();

      if (
        ageMonths < 0 ||
        (ageMonths === 0 && today.getDate() < dobDate.getDate())
      ) {
        ageYears--;
        ageMonths += 12;
      }

      setFormData((prevData) => ({
        ...prevData,
        age: `${ageYears} years, ${ageMonths} months`, // You can adjust format as needed
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        age: "", // Clear age if DOB is cleared
      }));
    }
  }, [formData.dob]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => {
      // Handle checkboxes
      if (type === "checkbox") {
        return {
          ...prevData,
          [name]: checked,
        };
      }
      // Handle radio buttons (assuming nameResponding is a radio group)
      else if (name === "nameResponding" || name === "hearing" || name === "vision") {
        return {
          ...prevData,
          [name]: value,
        };
      }
      // Handle other input types
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleNext = () => {
    try {
      // Save data to localStorage
      localStorage.setItem(
        "mamaMathavam_therapyAssessmentData",
        JSON.stringify(formData) // Ensure formData is stringified
      );
      console.log("Therapy Assessment data saved to localStorage temporarily.");
      navigateToPreRequisiteSkill();
    } catch (error) {
      console.error(
        "Error saving therapy assessment data to localStorage:",
        error
      );
      alert("Error saving data. Please try again."); // Display user-friendly message
    }
  };

  return (
    <div className="w-full px-4 py-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl my-8 font-sans text-gray-800">
      <h2 className="text-3xl font-extrabold text-center text-indigo-800 mb-8 tracking-tight leading-tight">
        Therapy Assessment Form
      </h2>
      <form className="space-y-10"> {/* Increased spacing between sections */}
        {/* Basic Information */}
        <Section title="Basic Information">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            <InputField
              label="Child's Name"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter child's full name"
            />
            <InputField
              label="Date of Birth"
              id="dob"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
            />
            <InputField
              label="Age"
              id="age"
              name="age"
              value={formData.age}
              readOnly={true}
            />
            <SelectField
              label="Gender"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              options={[
                { value: "", label: "Select Gender" },
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
                { value: "Other", label: "Other" },
              ]}
            />
            <InputField
              label="Registration Number"
              id="regNo"
              name="regNo"
              value={formData.regNo}
              onChange={handleChange}
              placeholder="Enter registration number"
            />
            <InputField
              label="Language Used"
              id="languageUsed"
              name="languageUsed"
              value={formData.languageUsed}
              onChange={handleChange}
              placeholder="e.g., Sinhala, Tamil, English"
            />
            <InputField
              label="Primary Carer"
              id="primaryCarer"
              name="primaryCarer"
              value={formData.primaryCarer}
              onChange={handleChange}
              placeholder="e.g., Mother, Father, Guardian"
            />
            <InputField
              label="Medical Diagnosis"
              id="medicalDiagnosis"
              name="medicalDiagnosis"
              value={formData.medicalDiagnosis}
              onChange={handleChange}
              placeholder="e.g., ASD, CP, Down Syndrome"
            />
            <InputField
              label="Communication Diagnosis"
              id="communicationDiagnosis"
              name="communicationDiagnosis"
              value={formData.communicationDiagnosis}
              onChange={handleChange}
              placeholder="e.g., Expressive Language Disorder"
            />
            <TextAreaField
              label="Family History"
              id="familyHistory"
              name="familyHistory"
              value={formData.familyHistory}
              onChange={handleChange}
              placeholder="Any relevant family medical or developmental history"
              rows={3}
              className="md:col-span-2 lg:col-span-3"
            />
          </div>
        </Section>

        {/* Sensory and Development */}
        <Section title="Sensory and Development">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <RadioGroupField
              label="Hearing"
              name="hearing"
              options={["Normal", "Impaired"]}
              selectedValue={formData.hearing}
              onChange={handleChange}
              row={true}
            />
            <RadioGroupField
              label="Vision"
              name="vision"
              options={["Normal", "Impaired"]}
              selectedValue={formData.vision}
              onChange={handleChange}
              row={true}
            />
            <InputField
              label="Siblings"
              id="siblings"
              name="siblings"
              value={formData.siblings}
              onChange={handleChange}
              placeholder="Number of siblings, their ages/genders"
            />
            <div className="md:col-span-2 grid grid-cols-1 gap-y-3 pt-2">
              <LabelledCheckbox
                label="Significant motor development delay"
                id="motorDevelopment"
                name="motorDevelopment"
                checked={formData.motorDevelopment}
                onChange={handleChange}
              />
              <LabelledCheckbox
                label="History of speech regression"
                id="speechRegression"
                name="speechRegression"
                checked={formData.speechRegression}
                onChange={handleChange}
              />
            </div>
          </div>
        </Section>

        {/* Assessment Details */}
        <Section title="Assessment Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <InputField
              label="Assessment Date"
              id="assessmentDate"
              name="assessmentDate"
              type="date"
              value={formData.assessmentDate}
              onChange={handleChange}
            />
            <InputField
              label="Accessed By"
              id="accessBy"
              name="accessBy"
              value={formData.accessBy}
              onChange={handleChange}
              placeholder="Name of assessor"
            />
          </div>
        </Section>

        {/* Name Responding and Turn-Taking */}
        <Section title="Prerequisite Skills (Initial Observation)">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <RadioGroupField
              label="Name Responding"
              name="nameResponding"
              options={["Always", "Sometimes", "Never"]}
              selectedValue={formData.nameResponding}
              onChange={handleChange}
              row={true}
            />
            <div className="flex flex-col justify-center space-y-4">
              <label className="block text-base font-bold text-gray-900 mb-2">
                {/* Increased bottom margin for label */}
                Turn Taking:
              </label>
              <LabelledCheckbox
                label="Can Wait for Turn"
                id="canWaitTurn"
                name="canWaitTurn"
                checked={formData.canWaitTurn}
                onChange={handleChange}
              />
              <LabelledCheckbox
                label="Can Take Turns"
                id="canTakeTurns"
                name="canTakeTurns"
                checked={formData.canTakeTurns}
                onChange={handleChange}
              />
            </div>
          </div>
        </Section>

        {/* Next Button */}
     {/* Next Button Area */}
<div className="flex justify-end mt-10 pt-6 border-t border-indigo-100">
  <button
    type="button"
    onClick={handleNext}
    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
    text-white font-semibold py-3 px-10 rounded-full shadow-lg 
    hover:shadow-2xl transform hover:scale-105 active:scale-95 
    transition-all duration-300 ease-in-out text-base tracking-wide
    focus:outline-none focus:ring-4 focus:ring-purple-400"
  >
    Continue to Next Step →
  </button>
</div>


      </form>
    </div>
  );
};

export default TherapyAssessment;


const Section = ({ title, children, className = "" }) => (
  <div className={`bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-xl border-l-4 border-blue-400
    hover:shadow-2xl transition-all duration-300 ease-in-out
    ${className}`}>
    <h3 className="text-2xl font-semibold text-blue-900 mb-6 border-b pb-2 border-blue-100">
      {title}
    </h3>
    {children}
  </div>
);

const InputField = ({
  label, id, name, value, onChange,
  type = "text", placeholder, readOnly = false, className = ""
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-semibold text-blue-900 mb-1">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      className={`w-full rounded-md px-4 py-3 text-gray-800 bg-white border-2 border-blue-200 
        focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-blue-400
        transition duration-200 ease-in-out shadow-sm
        ${readOnly ? 'bg-gray-100 cursor-not-allowed' : 'hover:border-blue-300'} ${className}`}
    />
  </div>
);


const TextAreaField = ({ label, id, name, value, onChange, placeholder, rows = 3, className = "" }) => (
  <div className={`md:col-span-2 ${className}`}>
    <label htmlFor={id} className="block text-sm font-semibold text-blue-900 mb-1">
      {label}
    </label>
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      className="w-full rounded-md px-4 py-3 text-gray-800 bg-white border-2 border-blue-200 
        focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-blue-400
        transition duration-200 ease-in-out shadow-sm resize-y hover:border-blue-300"
    />
  </div>
);

const SelectField = ({ label, id, name, value, onChange, options, className = "" }) => (
  <div className={className}>
    <label htmlFor={id} className="block text-sm font-semibold text-blue-900 mb-1">
      {label}
    </label>
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full rounded-md px-4 py-3 text-gray-800 bg-white border-2 border-blue-200 
        focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-blue-400
        transition duration-200 ease-in-out shadow-sm hover:border-blue-300"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const LabelledCheckbox = ({ label, id, name, checked, onChange, className = "" }) => (
  <div className={`flex items-center gap-3 py-2 ${className}`}>
    <input
      type="checkbox"
      id={id}
      name={name}
      checked={checked}
      onChange={onChange}
      className="h-5 w-5 text-blue-600 border-blue-300 rounded focus:ring-purple-500 transition-transform duration-200 hover:scale-110"
    />
    <label htmlFor={id} className="text-sm text-gray-800 font-medium">
      {label}
    </label>
  </div>
);

const RadioGroupField = ({ label, name, options, selectedValue, onChange, row = false, className = "" }) => (
  <div className={`py-2 ${className}`}>
    <label className="block text-sm font-semibold text-blue-900 mb-1">
      {label}
    </label>
    <div className={`flex ${row ? 'flex-wrap gap-6' : 'flex-col gap-3'}`}>
      {options.map((option) => (
        <label key={option} className="flex items-center cursor-pointer gap-2">
          <input
            type="radio"
            name={name}
            value={option.toLowerCase()}
            checked={selectedValue === option.toLowerCase()}
            onChange={onChange}
            className="h-5 w-5 text-blue-600 border-blue-300 rounded-full focus:ring-purple-500 transition-transform duration-200 hover:scale-110"
          />
          <span className="text-sm text-gray-800">{option}</span>
        </label>
      ))}
    </div>
  </div>
);
