import React, { useState, useEffect } from "react";

export default function Language({ navigateToSpeech, navigateBackToCommunication }) {
  // State to hold form data for Language skills
  const [formData, setFormData] = useState({
    comprehension: {
      gesturalCommand: '', // 'yes', 'no', or '' initially. Matches enum in schema.
      verbalComprehensionSingle: false,
      verbalComprehensionTwo: false,
      verbalComprehensionThree: false,
      verbalComprehensionSentences: false,
      verbalComprehensionPicture: false,
      verbalComprehensionSequencing: false,
      verbalComprehensionStory: false,
    },
    expression: {
      useGesture: '', // 'yes', 'no', or '' initially. Matches enum in schema.
      verbalExpressionSingle: false,
      verbalExpressionTwo: false,
      verbalExpressionThree: false,
      verbalExpressionSentences: false,
      verbalExpressionPicture: false,
      verbalExpressionSequencing: false,
      verbalExpressionStory: false,
      verbalExpressionAnswer: false,
    },
    vocabulary: {
      familyMembersCom: false, familyMembersExp: false,
      bodyPartsCom: false, bodyPartsExp: false,
      householdItemsCom: false, householdItemsExp: false,
      fruitsCom: false, fruitsExp: false,
      vegetablesCom: false, vegetablesExp: false,
      animalsCom: false, animalsExp: false,
      birdsCom: false, birdsExp: false,
      vehiclesCom: false, vehiclesExp: false,
      clothesCom: false, clothesExp: false,
      verbsCom: false, verbsExp: false,
    },
    auditoryMemory: "", // Textarea input
    verbalMemory: "",    // Textarea input
  });

  // Load data from localStorage when the component mounts
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('mamaMathavam_languageData');
      if (savedData) {
        setFormData(JSON.parse(savedData));
      }
    } catch (error) {
      console.error("Error loading language data from localStorage:", error);
    }
  }, []);

  const handleCheckboxChange = (category, field) => (e) => {
    const { checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        [field]: checked,
      },
    }));
  };

  const handleRadioChange = (category, field) => (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        [field]: value,
      },
    }));
  };

  const handleTextareaChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveFormData = () => {
    try {
      localStorage.setItem('mamaMathavam_languageData', JSON.stringify(formData));
      console.log("Language data saved to localStorage temporarily.");
    } catch (error) {
      console.error("Error saving language data to localStorage:", error);
      alert("Error saving data. Please try again.");
    }
  };

  const handleNext = () => {
    saveFormData();
    navigateToSpeech();
  };

  const handleBack = () => {
    saveFormData();
    navigateBackToCommunication();
  };

  return (
    <div className="w-full px-4 py-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl my-8 font-sans text-gray-800">
      <h2 className="text-3xl font-extrabold text-center text-indigo-800 mb-8 tracking-tight leading-tight">
        Language Assessment
      </h2>
      <form className="space-y-10">
        {/* Comprehension */}
        <Section title="Comprehension">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Gestural Command:
            </label>
            <div className="mt-2">
              <label className="inline-flex items-center mr-6">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-blue-600 focus:ring-blue-500"
                  name="gesturalCommand"
                  value="yes"
                  checked={formData.comprehension.gesturalCommand === 'yes'}
                  onChange={handleRadioChange('comprehension', 'gesturalCommand')}
                />
                <span className="ml-2 text-gray-700">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-blue-600 focus:ring-blue-500"
                  name="gesturalCommand"
                  value="no"
                  checked={formData.comprehension.gesturalCommand === 'no'}
                  onChange={handleRadioChange('comprehension', 'gesturalCommand')}
                />
                <span className="ml-2 text-gray-700">No</span>
              </label>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Verbal Comprehension
                  </th>
                  <th className="px-4 py-3 border-b text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Select
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr key="verbal-comprehension-single">
                  <td className="border border-gray-300 p-3">Single commands</td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        name="verbalComprehensionSingle"
                        checked={formData.comprehension.verbalComprehensionSingle}
                        onChange={handleCheckboxChange('comprehension', 'verbalComprehensionSingle')}
                      />
                    </div>
                  </td>
                </tr>
                <tr key="verbal-comprehension-two">
                  <td className="border border-gray-300 p-3">Two part commands</td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        name="verbalComprehensionTwo"
                        checked={formData.comprehension.verbalComprehensionTwo}
                        onChange={handleCheckboxChange('comprehension', 'verbalComprehensionTwo')}
                      />
                    </div>
                  </td>
                </tr>
                <tr key="verbal-comprehension-three">
                  <td className="border border-gray-300 p-3">Three part commands</td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        name="verbalComprehensionThree"
                        checked={formData.comprehension.verbalComprehensionThree}
                        onChange={handleCheckboxChange('comprehension', 'verbalComprehensionThree')}
                      />
                    </div>
                  </td>
                </tr>
                <tr key="verbal-comprehension-sentences">
                  <td className="border border-gray-300 p-3">Sentences</td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        name="verbalComprehensionSentences"
                        checked={formData.comprehension.verbalComprehensionSentences}
                        onChange={handleCheckboxChange('comprehension', 'verbalComprehensionSentences')}
                      />
                    </div>
                  </td>
                </tr>
                <tr key="verbal-comprehension-picture">
                  <td className="border border-gray-300 p-3">Picture identification</td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        name="verbalComprehensionPicture"
                        checked={formData.comprehension.verbalComprehensionPicture}
                        onChange={handleCheckboxChange('comprehension', 'verbalComprehensionPicture')}
                      />
                    </div>
                  </td>
                </tr>
                <tr key="verbal-comprehension-sequencing">
                  <td className="border border-gray-300 p-3">Sequencing</td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        name="verbalComprehensionSequencing"
                        checked={formData.comprehension.verbalComprehensionSequencing}
                        onChange={handleCheckboxChange('comprehension', 'verbalComprehensionSequencing')}
                      />
                    </div>
                  </td>
                </tr>
                <tr key="verbal-comprehension-story">
                  <td className="border border-gray-300 p-3">Story comprehension</td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        name="verbalComprehensionStory"
                        checked={formData.comprehension.verbalComprehensionStory}
                        onChange={handleCheckboxChange('comprehension', 'verbalComprehensionStory')}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* Expression */}
        <Section title="Expression">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Use of Gestures:
            </label>
            <div className="mt-2">
              <label className="inline-flex items-center mr-6">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-blue-600 focus:ring-blue-500"
                  name="useGesture"
                  value="yes"
                  checked={formData.expression.useGesture === 'yes'}
                  onChange={handleRadioChange('expression', 'useGesture')}
                />
                <span className="ml-2 text-gray-700">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-blue-600 focus:ring-blue-500"
                  name="useGesture"
                  value="no"
                  checked={formData.expression.useGesture === 'no'}
                  onChange={handleRadioChange('expression', 'useGesture')}
                />
                <span className="ml-2 text-gray-700">No</span>
              </label>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Verbal Expression
                  </th>
                  <th className="px-4 py-3 border-b text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Select
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr key="verbal-expression-single">
                  <td className="border border-gray-300 p-3">Single words</td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        name="verbalExpressionSingle"
                        checked={formData.expression.verbalExpressionSingle}
                        onChange={handleCheckboxChange('expression', 'verbalExpressionSingle')}
                      />
                    </div>
                  </td>
                </tr>
                <tr key="verbal-expression-two">
                  <td className="border border-gray-300 p-3">Two word phrases</td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        name="verbalExpressionTwo"
                        checked={formData.expression.verbalExpressionTwo}
                        onChange={handleCheckboxChange('expression', 'verbalExpressionTwo')}
                      />
                    </div>
                  </td>
                </tr>
                <tr key="verbal-expression-three">
                  <td className="border border-gray-300 p-3">Three word phrases</td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        name="verbalExpressionThree"
                        checked={formData.expression.verbalExpressionThree}
                        onChange={handleCheckboxChange('expression', 'verbalExpressionThree')}
                      />
                    </div>
                  </td>
                </tr>
                <tr key="verbal-expression-sentences">
                  <td className="border border-gray-300 p-3">Sentences</td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        name="verbalExpressionSentences"
                        checked={formData.expression.verbalExpressionSentences}
                        onChange={handleCheckboxChange('expression', 'verbalExpressionSentences')}
                      />
                    </div>
                  </td>
                </tr>
                <tr key="verbal-expression-picture">
                  <td className="border border-gray-300 p-3">Picture description</td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        name="verbalExpressionPicture"
                        checked={formData.expression.verbalExpressionPicture}
                        onChange={handleCheckboxChange('expression', 'verbalExpressionPicture')}
                      />
                    </div>
                  </td>
                </tr>
                <tr key="verbal-expression-sequencing">
                  <td className="border border-gray-300 p-3">Sequencing</td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        name="verbalExpressionSequencing"
                        checked={formData.expression.verbalExpressionSequencing}
                        onChange={handleCheckboxChange('expression', 'verbalExpressionSequencing')}
                      />
                    </div>
                  </td>
                </tr>
                <tr key="verbal-expression-story">
                  <td className="border border-gray-300 p-3">Story narration</td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        name="verbalExpressionStory"
                        checked={formData.expression.verbalExpressionStory}
                        onChange={handleCheckboxChange('expression', 'verbalExpressionStory')}
                      />
                    </div>
                  </td>
                </tr>
                <tr key="verbal-expression-answer">
                  <td className="border border-gray-300 p-3">Answering questions</td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        name="verbalExpressionAnswer"
                        checked={formData.expression.verbalExpressionAnswer}
                        onChange={handleCheckboxChange('expression', 'verbalExpressionAnswer')}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* Vocabulary */}
        <Section title="Vocabulary">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-3 border-b text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Comprehension
                  </th>
                  <th className="px-4 py-3 border-b text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Expression
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr key="vocabulary-family-members">
                  <td className="border border-gray-300 p-3">Family Members</td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        name="familyMembersCom"
                        checked={formData.vocabulary.familyMembersCom}
                        onChange={handleCheckboxChange('vocabulary', 'familyMembersCom')}
                      />
                    </div>
                  </td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        name="familyMembersExp"
                        checked={formData.vocabulary.familyMembersExp}
                        onChange={handleCheckboxChange('vocabulary', 'familyMembersExp')}
                      />
                    </div>
                  </td>
                </tr>
                <tr key="vocabulary-body-parts">
                  <td className="border border-gray-300 p-3">Body Parts</td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        name="bodyPartsCom"
                        checked={formData.vocabulary.bodyPartsCom}
                        onChange={handleCheckboxChange('vocabulary', 'bodyPartsCom')}
                      />
                    </div>
                  </td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        name="bodyPartsExp"
                        checked={formData.vocabulary.bodyPartsExp}
                        onChange={handleCheckboxChange('vocabulary', 'bodyPartsExp')}
                      />
                    </div>
                  </td>
                </tr>
                <tr key="vocabulary-household-items">
                  <td className="border border-gray-300 p-3">Household Items</td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        name="householdItemsCom"
                        checked={formData.vocabulary.householdItemsCom}
                        onChange={handleCheckboxChange('vocabulary', 'householdItemsCom')}
                      />
                    </div>
                  </td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        name="householdItemsExp"
                        checked={formData.vocabulary.householdItemsExp}
                        onChange={handleCheckboxChange('vocabulary', 'householdItemsExp')}
                      />
                    </div>
                  </td>
                </tr>
                <tr key="vocabulary-fruits">
                  <td className="border border-gray-300 p-3">Fruits</td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        name="fruitsCom"
                        checked={formData.vocabulary.fruitsCom}
                        onChange={handleCheckboxChange('vocabulary', 'fruitsCom')}
                      />
                    </div>
                  </td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        name="fruitsExp"
                        checked={formData.vocabulary.fruitsExp}
                        onChange={handleCheckboxChange('vocabulary', 'fruitsExp')}
                      />
                    </div>
                  </td>
                </tr>
                <tr key="vocabulary-vegetables">
                  <td className="border border-gray-300 p-3">Vegetables</td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        name="vegetablesCom"
                        checked={formData.vocabulary.vegetablesCom}
                        onChange={handleCheckboxChange('vocabulary', 'vegetablesCom')}
                      />
                    </div>
                  </td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        name="vegetablesExp"
                        checked={formData.vocabulary.vegetablesExp}
                        onChange={handleCheckboxChange('vocabulary', 'vegetablesExp')}
                      />
                    </div>
                  </td>
                </tr>
                <tr key="vocabulary-animals">
                  <td className="border border-gray-300 p-3">Animals</td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        name="animalsCom"
                        checked={formData.vocabulary.animalsCom}
                        onChange={handleCheckboxChange('vocabulary', 'animalsCom')}
                      />
                    </div>
                  </td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        name="animalsExp"
                        checked={formData.vocabulary.animalsExp}
                        onChange={handleCheckboxChange('vocabulary', 'animalsExp')}
                      />
                    </div>
                  </td>
                </tr>
                <tr key="vocabulary-birds">
                  <td className="border border-gray-300 p-3">Birds</td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        name="birdsCom"
                        checked={formData.vocabulary.birdsCom}
                        onChange={handleCheckboxChange('vocabulary', 'birdsCom')}
                      />
                    </div>
                  </td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        name="birdsExp"
                        checked={formData.vocabulary.birdsExp}
                        onChange={handleCheckboxChange('vocabulary', 'birdsExp')}
                      />
                    </div>
                  </td>
                </tr>
                <tr key="vocabulary-vehicles">
                  <td className="border border-gray-300 p-3">Vehicles</td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        name="vehiclesCom"
                        checked={formData.vocabulary.vehiclesCom}
                        onChange={handleCheckboxChange('vocabulary', 'vehiclesCom')}
                      />
                    </div>
                  </td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        name="vehiclesExp"
                        checked={formData.vocabulary.vehiclesExp}
                        onChange={handleCheckboxChange('vocabulary', 'vehiclesExp')}
                      />
                    </div>
                  </td>
                </tr>
                <tr key="vocabulary-clothes">
                  <td className="border border-gray-300 p-3">Clothes</td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        name="clothesCom"
                        checked={formData.vocabulary.clothesCom}
                        onChange={handleCheckboxChange('vocabulary', 'clothesCom')}
                      />
                    </div>
                  </td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        name="clothesExp"
                        checked={formData.vocabulary.clothesExp}
                        onChange={handleCheckboxChange('vocabulary', 'clothesExp')}
                      />
                    </div>
                  </td>
                </tr>
                <tr key="vocabulary-verbs">
                  <td className="border border-gray-300 p-3">Verbs</td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        name="verbsCom"
                        checked={formData.vocabulary.verbsCom}
                        onChange={handleCheckboxChange('vocabulary', 'verbsCom')}
                      />
                    </div>
                  </td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        name="verbsExp"
                        checked={formData.vocabulary.verbsExp}
                        onChange={handleCheckboxChange('vocabulary', 'verbsExp')}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Auditory Memory */}
          <Section title="Auditory Memory" className="mt-8">
            <label htmlFor="auditoryMemory" className="block text-gray-700 text-sm font-bold mb-2">
              Details:
            </label>
            <textarea
              id="auditoryMemory"
              name="auditoryMemory"
              value={formData.auditoryMemory}
              onChange={handleTextareaChange}
              rows="4"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
              placeholder="Enter auditory memory details..."
            ></textarea>
          </Section>

          {/* Verbal Memory */}
          <Section title="Verbal Memory" className="mt-8">
            <label htmlFor="verbalMemory" className="block text-gray-700 text-sm font-bold mb-2">
              Details:
            </label>
            <textarea
              id="verbalMemory"
              name="verbalMemory"
              value={formData.verbalMemory}
              onChange={handleTextareaChange}
              rows="4"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
              placeholder="Enter verbal memory details..."
            ></textarea>
          </Section>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-10 pt-6 border-t border-indigo-100">
          <button
            type="button"
            onClick={handleBack}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Back
          </button>
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
}

// Re-using the Section component concept for consistent styling
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