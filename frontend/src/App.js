import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminAddTiming from "./pages/AdminAddTiming";
import AdminCheckAppointments from "./pages/AdminCheckAppointments";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/adminAddTiming" element={<AdminAddTiming />} />
        <Route path="/adminCheckAppointments" element={<AdminCheckAppointments />} />
      </Routes>
    </>
  );
}

export default App;
