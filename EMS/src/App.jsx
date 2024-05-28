import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import HomePage from "./components/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        {/* <Route path="/Login" element={loggedIn? <Dashboard/>:<Login />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
