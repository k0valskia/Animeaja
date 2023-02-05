import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Stream from "./pages/Stream/Stream";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/streaming" element={<Stream />} />
      </Routes>
    </>
  );
};

export default App;
