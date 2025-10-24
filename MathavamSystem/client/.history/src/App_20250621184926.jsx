import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SensoryProfileCreatePage from "./pages/SensoryProfile/SensoryProfileCreatePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path ="/sensory-profile-fillForm"/>
        <Route path />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
