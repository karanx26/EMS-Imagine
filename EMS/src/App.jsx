import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import LoginformA from "./components/LoginformA";
import LoginformE from "./components/LoginformE";
import LoginformC from "./components/LoginformC";
import HomePage from "./components/HomePage";
import HomeA from "./components/HomeA";
import HomeE from "./components/HomeE";
import HomeC from "./components/HomeC";
import ProfileA from "./components/ProfileA";
import ManageEmpA from "./components/ManageEmpA";
import ManageClientA from "./components/ManageClientA";
import ManageInventoryA from "./components/ManageInventoryA";

import ProfileC from "./components/ProfileC";
import CheckUpdC from "./components/CheckUpdC";

import ProfileE from "./components/ProfileE";
import TaskE from "./components/TaskE";
import AttandanceE from "./components/AttandanceE";
import ReimbursementE from "./components/ReimbursementE";
import ManageClientE from "./components/ManageClientE";

import PrivateRoute from "./components/PrivateRoute"; // Import the PrivateRoute component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginforma" element={<LoginformA />} />
        <Route path="/loginforme" element={<LoginformE />} />
        <Route path="/loginformc" element={<LoginformC />} />

        {/* Wrap protected routes with PrivateRoute */}
        <Route
          path="/homea"
          element={
            <PrivateRoute>
              <HomeA />
            </PrivateRoute>
          }
        >
          <Route path="" element={<PrivateRoute><ProfileA /></PrivateRoute>} />
          <Route path="/homea/manageempa" element={<ManageEmpA />} />

          <Route path="/homea/manageclienta" element={
            <ManageClientA />
            
            } />
          <Route
            path="/homea/manageinventorya"
            element={<ManageInventoryA />}
          />
        </Route>

        <Route
          path="/homee"
          element={
            <PrivateRoute>
              <HomeE />
            </PrivateRoute>
          }
        >
          <Route path="" element={<PrivateRoute><ProfileE /></PrivateRoute>} />
          <Route path="/homee/taske" element={<TaskE />} />
          <Route path="/homee/attandancee" element={<AttandanceE />} />
          <Route path="/homee/reimbursemente" element={<ReimbursementE />} />
          <Route path="/homee/managecliente" element={<ManageClientE />} />
        </Route>

        <Route
          path="/homec"
          element={
            <PrivateRoute>
              <HomeC />
            </PrivateRoute>
          }
        >
          <Route path="" element={<PrivateRoute><ProfileC /></PrivateRoute>} />
          <Route path="/homec/checkupdc" element={<CheckUpdC />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
