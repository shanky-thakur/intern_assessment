import { Routes, Route, Form } from "react-router-dom";

import LoginSignUp from "./components/LoginSignup";
import FormAndList from "./components/FormAndList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginSignUp />} />
      <Route path="/home" element={<FormAndList />} />
    </Routes>
  );
}

export default App;
