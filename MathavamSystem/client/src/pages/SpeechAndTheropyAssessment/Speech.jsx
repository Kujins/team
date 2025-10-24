import React, { useState, useEffect } from "react";

export default function Speech({ navigateBackToLanguage, navigateToOralmotorAssessment }) {
  const [formData, setFormData] = useState({
    intelligibility: "unintelligible",
    fluency: "",
    articulation: "",
    phonology: "",
    voice: {
      pitch: "",
      loudness: "",
      quality: "",
      nasality: "",
    },
  });

  useEffect(() => {
    try {
      const savedData = localStorage.getItem('mamaMathavam_speechData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setFormData(prevData => ({
          ...prevData,
          ...parsedData,
          voice: {
            ...(prevData.voice || {}),
            ...(parsedData.voice || {}),
          }
        }));
      }
    } catch (error) {
      console.error("Error loading speech data from localStorage:", error);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("voice.")) {
      const voiceField = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        voice: {
          ...prevData.voice,
          [voiceField]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const saveFormData = () => {
    try {
      localStorage.setItem('mamaMathavam_speechData', JSON.stringify(formData));
      console.log("Speech data saved to localStorage temporarily.");
    } catch (error) {
      console.error("Error saving speech data to localStorage:", error);
      alert("Error saving data. Please try again.");
    }
  };

  const handleNext = () => {
    saveFormData();
    navigateToOralmotorAssessment();
  };

  const handleBack = () => {
    saveFormData();
    navigateBackToLanguage();
  };

  return (
    <div className="w-full px-4 py-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl my-8 font-sans text-gray-800">
      <h2 className="text-3xl font-extrabold text-center text-indigo-800 mb-8 tracking-tight leading-tight">
        Speech Assessment
      </h2>
      <form className="space-y-10">
        <Section title="Speech Components">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Added grid for 2 columns */}
            <div>
              <label htmlFor="intelligibility" className="block text-sm font-semibold text-blue-900 mb-2">
                Intelligibility:
              </label>
              <select
                id="intelligibility"
                name="intelligibility"
                value={formData.intelligibility}
                onChange={handleChange}
                className="w-full rounded-md px-4 py-3 text-gray-800 bg-white border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-blue-400 transition duration-200 ease-in-out shadow-sm"
              >
                <option value="unintelligible">Unintelligible</option>
                <option value="50%">50%</option>
                <option value="75%">75%</option>
                <option value="100%">100%</option>
              </select>
            </div>

            <div>
              <label htmlFor="fluency" className="block text-sm font-semibold text-blue-900 mb-2">
                Fluency:
              </label>
              <input
                type="text"
                id="fluency"
                name="fluency"
                value={formData.fluency}
                onChange={handleChange}
                placeholder="e.g., Stuttering, Cluttering"
                className="w-full rounded-md px-4 py-3 text-gray-800 bg-white border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-blue-400 transition duration-200 ease-in-out shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="articulation" className="block text-sm font-semibold text-blue-900 mb-2">
                Articulation:
              </label>
              <input
                type="text"
                id="articulation"
                name="articulation"
                value={formData.articulation}
                onChange={handleChange}
                placeholder="e.g., Clear, Distorted"
                className="w-full rounded-md px-4 py-3 text-gray-800 bg-white border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-blue-400 transition duration-200 ease-in-out shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="phonology" className="block text-sm font-semibold text-blue-900 mb-2">
                Phonology:
              </label>
              <input
                type="text"
                id="phonology"
                name="phonology"
                value={formData.phonology}
                onChange={handleChange}
                placeholder="e.g., Age-appropriate, Phonological processes present"
                className="w-full rounded-md px-4 py-3 text-gray-800 bg-white border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-blue-400 transition duration-200 ease-in-out shadow-sm"
              />
            </div>
          </div>
        </Section>

        <Section title="Voice">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="voice.pitch" className="block text-sm font-semibold text-blue-900 mb-2">
                Pitch:
              </label>
              <input
                type="text"
                id="voice.pitch"
                name="voice.pitch"
                value={formData.voice.pitch}
                onChange={handleChange}
                placeholder="e.g., High, Low, Monotone"
                className="w-full rounded-md px-4 py-3 text-gray-800 bg-white border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-blue-400 transition duration-200 ease-in-out shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="voice.loudness" className="block text-sm font-semibold text-blue-900 mb-2">
                Loudness:
              </label>
              <input
                type="text"
                id="voice.loudness"
                name="voice.loudness"
                value={formData.voice.loudness}
                onChange={handleChange}
                placeholder="e.g., Loud, Soft, Normal"
                className="w-full rounded-md px-4 py-3 text-gray-800 bg-white border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-blue-400 transition duration-200 ease-in-out shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="voice.quality" className="block text-sm font-semibold text-blue-900 mb-2">
                Quality:
              </label>
              <input
                type="text"
                id="voice.quality"
                name="voice.quality"
                value={formData.voice.quality}
                onChange={handleChange}
                placeholder="e.g., Hoarse, Breathy, Clear"
                className="w-full rounded-md px-4 py-3 text-gray-800 bg-white border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-blue-400 transition duration-200 ease-in-out shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="voice.nasality" className="block text-sm font-semibold text-blue-900 mb-2">
                Nasality:
              </label>
              <input
                type="text"
                id="voice.nasality"
                name="voice.nasality"
                value={formData.voice.nasality}
                onChange={handleChange}
                placeholder="e.g., Hypernasal, Hyponasal, Normal"
                className="w-full rounded-md px-4 py-3 text-gray-800 bg-white border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-blue-400 transition duration-200 ease-in-out shadow-sm"
              />
            </div>
          </div>
        </Section>

        <div className="flex justify-between mt-10 pt-6 border-t border-indigo-100">
          <button
            type="button"
            onClick={handleBack}
            className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-3 px-10 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out text-base tracking-wide focus:outline-none focus:ring-4 focus:ring-gray-400"
          >
            ← Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-10 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out text-base tracking-wide focus:outline-none focus:ring-4 focus:ring-purple-400"
          >
            Continue to Next Step →
          </button>
        </div>
      </form>
    </div>
  );
}

const Section = ({ title, children, className = "" }) => (
  <div className={`bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-xl border-l-4 border-blue-400 hover:shadow-2xl transition-all duration-300 ease-in-out ${className}`}>
    <h3 className="text-2xl font-semibold text-blue-900 mb-6 border-b pb-2 border-blue-100">
      {title}
    </h3>
    {children}
  </div>
);