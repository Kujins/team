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
        <Route
          path="/sensory-profile-view"
          element={<SensoryProfileCreatePage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
