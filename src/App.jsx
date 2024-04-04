import { useNavigate, Routes, Route } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import Calendar from "./Calendar";
import Events from "./Events";
import Map from "./Map";
import HomePage from "./HomePage";
import About from "./About";

function App() {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <Routes>
        <Route path="/Rutgers-Foodies/" element={<HomePage />} />
        <Route path="/Rutgers-Foodies/calendar" element={<Calendar />} />
        <Route path="/Rutgers-Foodies/map" element={<Map />} />
        <Route path="/Rutgers-Foodies/events" element={<Events />} />
        <Route path="/Rutgers-Foodies/about" element={<About />} />
      </Routes>
    </NextUIProvider>
  );
}

export default App;
