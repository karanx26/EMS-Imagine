// import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./components/Login";
// import LoginformA from "./components/LoginformA";
// import LoginformE from "./components/LoginformE";
// import LoginformC from "./components/LoginformC";
// import HomePage from "./components/HomePage";
// import HomeA from "./components/HomeA";
// import HomeE from "./components/HomeE";
// import HomeC from "./components/HomeC";
// import PrivateRoute from "./components/PrivateRoute";


// function App() {
  
  
//   return ( 
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<HomePage />}></Route>
//           <Route path="/login" element={<Login />}></Route>
//           {/* <Route path="/loginforma" element={loggedIn? <HomeA/>:<LoginformA />}></Route> */}
//           <Route path="/loginforma" element={<LoginformA />}></Route>
//           <Route path="/loginforme" element={<LoginformE />}></Route>
//           <Route path="/loginformc" element={<LoginformC />}></Route>
//           <Route path="/homea" element={<PrivateRoute><HomeA /></PrivateRoute>} />

//           <Route path="/homee" element={<HomeE />}></Route>
//           <Route path="/homec" element={<HomeC />}></Route>
//           {/* <Route path="/logout" element={<LoginformA />}></Route> */}
          
          
//           {/* <Route path="\logout" element={<logout />}></Route> */}
//           {/* <Route path="/homea" element={loggedIn ? <HomeA /> : <LoginformA />}></Route> */}
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


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
        <Route path="/homea" element={<PrivateRoute>
          <HomeA /></PrivateRoute>} />
        <Route path="/homee" element={<PrivateRoute><HomeE /></PrivateRoute>} />
        <Route path="/homec" element={<PrivateRoute><HomeC /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
