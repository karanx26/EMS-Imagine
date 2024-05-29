import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import LoginformA from "./components/LoginformA";
import LoginformE from "./components/LoginformE";
import LoginformC from "./components/LoginformC";
import HomePage from "./components/HomePage";

function App() {
  
  const loggedIn = window.localStorage.getItem("isLoggedIn")
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/loginforma" element={<LoginformA />}></Route>
          <Route path="/loginforme" element={<LoginformE />}></Route>
          <Route path="/loginformc" element={<LoginformC />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
