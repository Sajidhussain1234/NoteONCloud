import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Alert from "./components/Alert";
import Home from "./components/Home";

import Navbar from "./components/Navbar";
import NoteState from "./context/NoteState";
import Login from "./components/Login"
import Signup from "./components/Signup"
import AlertState from "./context/AlertState";


function App() {
  return (
    <>
       <AlertState> 
       <NoteState>
        <Router>
          <Navbar />
         
          <Alert />
         
          <div className="container my-4">
            <Routes>
              <Route exact path="/" element={<Home />} />

              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
       </AlertState>
    </>
  );
}

export default App;
