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
        <Route path="/" element={<HomePage />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/map" element={<Map />} />
        <Route path="/events" element={<Events />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </NextUIProvider>
  );
}

export default App;
