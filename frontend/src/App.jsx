import { Routes, Route, Link, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Groups from "./pages/Groups";
import Group from "./pages/Group";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import StartUp from "./pages/Startup";

export default function App(){
  return (
        <Routes>
          <Route path="/" element={<StartUp/>} />
          <Route path="/landing" element={<Landing/>} />
          <Route path="/groups" element={<Groups/>} />
          <Route path="/group/:id" element={<Group/>} />
          <Route path="/login" element={<LogIn/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
  );
}
