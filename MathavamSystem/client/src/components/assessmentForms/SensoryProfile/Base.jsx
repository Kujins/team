import { useState, useEffect } from "react";

function Base({onDataChange, initialData}) {
  const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

  const [patientData, setPatientData] = useState(()=>{

    if (initialData) {
      return {
        patientId: initialData.patientId,
        testDate: new Date(initialData.testDate).toISOString().split("T")[0],
        dateOfBirth: new Date(initialData.dateOfBirth), //need to check
        examinerId: initialData.examinerId,
        //examinerName: initialData.examinerName,
        //examinerProfession: initialData.examinerProfession,
        //caregiverName: initialData.caregiverName,
        //caregiverRelation: initialData.caregiverRelation,
        //level: initialData.level,
        //morethan3: initialData.morethan3,
        //check the need for this in the form???
      };
    }

    return {
      patientId: "",
      testDate: today, // Initialize with today's date
      dateOfBirth: "",
      examinerId: "",
      examinerName: "",
      examinerProfession: "",
      caregiverName: "",
      caregiverRelation: "",
      level: "",
      morethan3: "",
    };
  });

  const [ageData, setAgeData] = useState({
    years: "",
    months: "",
    totalMonths: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "testDate") {
      setPatientData((prev) => {
        if (prev.dateOfBirth && prev.dateOfBirth > value) {
          return {
            ...prev,
            [name]: value,
            dateOfBirth: "",
          };
        }
        return {
          ...prev,
          [name]: value,
        };
      });
    } else {
      setPatientData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };


  useEffect(() => {
    let calculatedMonths = null;

    if (patientData.testDate && patientData.dateOfBirth) {
      const testDate = new Date(patientData.testDate);
      const birthDate = new Date(patientData.dateOfBirth);

      if (!isNaN(testDate) && !isNaN(birthDate) && birthDate <= testDate) {
        let years = testDate.getFullYear() - birthDate.getFullYear();
        let months = testDate.getMonth() - birthDate.getMonth();

        if (months < 0) {
          years--;
          months += 12;
        }
        if (testDate.getDate() < birthDate.getDate()) {
          months--;
          if (months < 0) {
            years--;
            months += 12;
          }
        }

        const totalMonths = years * 12 + months;
        calculatedMonths = totalMonths; // Store the calculated age

        setAgeData({ years, months, totalMonths });
      } else {
        setAgeData({ years: "", months: "", totalMonths: null });
      }
    }

    onDataChange(
      calculatedMonths,
      patientData.patientId,
      patientData.examinerId,
      patientData.testDate
    );
  }, [
    patientData.testDate,
    patientData.dateOfBirth,
    patientData.patientId,
    patientData.examinerId,
    onDataChange,
  ]);

  // Determine which form title to show based on age
  const getFormTitle = () => {
    const { totalMonths } = ageData;

    if (totalMonths === null) {
      return {
        title: "Sensory Profile Assessment",
        subtitle:
          "Please enter test date and date of birth to get the correct form",
        ageRange: "Valid ranges: 7-35 months or 3:0-14:11 years",
      };
    } else if (totalMonths >= 36 && totalMonths <= 179) {
      return {
        title: "Child Sensory Profile-2",
        subtitle: "Caregiver Questionnaire",
        ageRange: "Ages 3:0 to 14:11 years",
      };
    } else if (totalMonths >= 7 && totalMonths <= 35) {
      return {
        title: "Toddler Sensory Profile",
        subtitle: "Caregiver Questionnaire",
        ageRange: "Ages 7 to 35 months",
      };
    } else {
      return {
        title: "Sensory Profile Assessment",
        subtitle: "Age outside supported range",
        ageRange: "Valid ranges: 7-35 months or 3:0-14:11 years",
      };
    }
  };

  const formInfo = getFormTitle();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-sky-100 to-pink-100 p-6 font-sans">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
          {formInfo.title}
        </h1>
        <h2 className="text-xl text-center text-gray-700 mb-1">
          {formInfo.subtitle}
        </h2>
        <h3 className="text-md text-center text-gray-500 mb-6">
          {formInfo.ageRange}
        </h3>

        <div className="space-y-4">
          {/* Patient ID */}
          <div className="flex items-center gap-4">
            <label
              htmlFor="patientID"
              className="w-64 text-sm font-medium text-gray-700 text-left"
            >
              Patient ID
            </label>
            <input
              type="text"
              id="patientId"
              name="patientId"
              value={patientData.patientId}
              onChange={handleChange}
              required
              className="flex-1 p-2 border border-gray-300 rounded-md text-black"
            />
          </div>

          {/* Test Date */}
          <div className="flex items-center gap-4">
            <label
              htmlFor="testDate"
              className="w-64 text-sm font-medium text-gray-700 text-left"
            >
              Test Date
            </label>
            <input
              type="date"
              id="testDate"
              name="testDate"
              value={patientData.testDate}
              onChange={handleChange}
              max={today} // Prevent selecting future dates
              required
              className="flex-1 p-2 border border-gray-300 rounded-md text-black"
            />
          </div>

          {/* Date of Birth */}
          <div className="flex items-center gap-4">
            <label
              htmlFor="dateOfBirth"
              className="w-64 text-sm font-medium text-gray-700 text-left"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={patientData.dateOfBirth}
              onChange={handleChange}
              max={patientData.testDate} // Cannot be after test date
              required
              className="flex-1 p-2 border border-gray-300 rounded-md text-black"
            />
          </div>

          {/* Remaining fields */}
          {[
            {
              id: "examinerId",
              label: "Examiner ID",
              type: "text",
            },
            ,
            {
              id: "examinerName",
              label: "Examiner/Service Provider's Name",
              type: "text",
            },
            {
              id: "examinerProfession",
              label: "Examiner/Service Provider's Profession",
              type: "text",
            },
            { id: "caregiverName", label: "Caregiver's Name", type: "text" },
            {
              id: "caregiverRelation",
              label: "Relationship to Child",
              type: "text",
            },
            { id: "level", label: "Level", type: "number" },
          ].map((field) => (
            <div className="flex items-center gap-4" key={field.id}>
              <label
                htmlFor={field.id}
                className="w-64 text-sm font-medium text-gray-700 text-left"
              >
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.id}
                name={field.id}
                value={patientData[field.id]}
                onChange={handleChange}
                required
                className="flex-1 p-2 border border-gray-300 rounded-md text-black"
              />
            </div>
          ))}

          {/* Calculated Age Display */}
          {ageData.totalMonths !== null && (
            <div className="flex items-center gap-4">
              <div className="w-64 text-sm font-medium text-gray-700 text-left">
                Child's Age (Calculated)
              </div>
              <div className="flex-1 p-2 bg-gray-50 border border-gray-200 rounded-md">
                <span className="font-medium text-blue-600">
                  {ageData.years} years, {ageData.months} months
                </span>
                <span className="text-xs text-gray-500 ml-2">
                  ({ageData.totalMonths} total months)
                </span>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Have there been more than three children between the ages of birth
              through 18 years in your household in the past 12 months?
            </label>
            <div className="flex gap-6 ml-64">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  id="yes"
                  name="morethan3"
                  value="yes"
                  checked={patientData.morethan3 === "yes"}
                  onChange={handleChange}
                  required
                  className="text-blue-600"
                />
                <span className="ml-2 text-gray-700">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  id="no"
                  name="morethan3"
                  value="no"
                  checked={patientData.morethan3 === "no"}
                  onChange={handleChange}
                  required
                  className="text-blue-600"
                />
                <span className="ml-2 text-gray-700">No</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Base;
