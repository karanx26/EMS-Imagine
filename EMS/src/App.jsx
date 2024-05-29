import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import HomePage from "./components/HomePage";

function App() {
  
  const loggedIn = window.localStorage.getItem("isLoggedIn")
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={loggedIn? <Dashboard/>:<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
