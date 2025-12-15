// react imports
import { Routes, Route } from "react-router-dom";

// import components
import Login_signup from "./components/Login_signup";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login_signup />}></Route>
      </Routes>
    </>
  )
}

export default App;
