import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SensoryProfileCreatePage from "./pages/SensoryProfile/SensoryProfileCreatePage";
//import SensoryProfileReadPage from "./pages/SensoryProfile/SensoryProfileReadPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/sensory-profile-fill-form"
          element={<SensoryProfileCreatePage />}
        />
       import { useState, useEffect } from 'react';
import axios from 'axios';

// This component is a "Page", meaning it's tied to a specific route.
// Its job is to fetch data and then display it using smaller, reusable components if needed.
function SensoryProfileReadPage() {
  // --- STATE MANAGEMENT ---
  
  // State to hold the list of assessments after we fetch them from the API.
  // We initialize it as an empty array.
  const [assessments, setAssessments] = useState([]);
  
  // State to track whether we are currently fetching data.
  // and error states, and displaying the results in a nicely formatted table.

You can copy this entire block and save it as `frontend/src/pages/SensoryProfile/SensoryProfileReadPage.jsx`.

---

### **`frontend/src/pages/SensoryProfile/SensoryProfileReadPage.jsx`**

```javascript
import { useState, useEffect } from 'react';
import axios from 'axios';

// This is a "Page Component". Its main job is to fetch data
// and assemble other smaller components to display a full page.
function SensoryProfileReadPage() {
  // State #1: To store the array of assessments we get from the API.
  // It starts as an empty array.
  const [assessments, setAssessments] = useState([]);
  
  // State #2: To track if we are currently fetching data.
  // This lets us show a "Loading..." message to the user. Starts as true.
  const [isLoading, setIsLoading] = useState(true);
  
  // State #3: To store any error message if the API call fails.
  // Starts as null because there is no error initially.
  const [error, setError] = useState(null);

  // The useEffect hook is perfect for fetching initial data.
  // The empty array [] at the end means it will only run ONCE,
  // right after the component first renders on the screen.
  useEffect(() => {
    // We define an async function inside the effect so we can use `await`.
    const fetchSensoryProfiles = async () => {
      try {
        // Use axios to send a GET request to our backend endpoint.
        const response = await axios.get('/api/assessments/sensory-profile');
        
        // If the request is successful, update our state with the fetched data.
        setAssessments(response.data);
        setError(null); // Clear any previous errors.

      } catch (err) {
        // If the request fails, save the error message to display to the user.
        const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch assessments.';
        setError(errorMessage);
        console.error('Error fetching sensory profiles:', err);

      } finally {
        // This block runs no matter what (success or failure).
        // It's the perfect place to set loading to false.
        setIsLoading(false);
      }
    };

    // Call the function to start the data fetching process.
    fetchSensoryProfiles();

  }, []); // The empty array is crucial. Without it, this would be an infinite loop!

  // --- Conditional Rendering ---
  // Depending on our state, we show a different UI.

  // 1. If we are still loading, show a simple message.
  if (isLoading) {
    return <div className="text-center p-10 text-lg font-medium">Loading Sensory Profiles...</div>;
  }

  // 2. If an error occurred, show the error message.
  if (error) {
    return <div className="text-center p-10 text-red-600 font-bold">Error: {error}</div>;
  }

  // 3. If loading is done and there's no error, show the data table.
  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Saved Sensory Profiles</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* If the assessments array is empty, show a helpful message */}
            {assessments.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-8 text-gray-500">
                  No sensory profiles have been saved yet.
                </td>
              </tr>
            ) : (
              // If we have data, we map over the array to create a table row for each item.
              assessments.map((assessment) => (
                <tr key={assessment._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{assessment.patientId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{assessment.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {/* Format the date string into a more readable local format (e.g., 5/15/2024) */}
                    {new Date(assessment.testDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {/* These are placeholders for our next steps: Update and Delete */}
                    <button className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SensoryProfileReadPage;
      </Routes>
    </BrowserRouter>
  );
}

export default App;
