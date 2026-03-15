import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Hostels from "./pages/Hostels";
import Allocation from "./pages/Allocation";
import ApplyHostel from "./pages/ApplyHostel";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hostels" element={<Hostels />} />
        <Route path="/apply/:id" element={<ApplyHostel />} />
        <Route path="/allocation" element={<Allocation />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;