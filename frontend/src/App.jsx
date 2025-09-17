import { Routes, Route, Link, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Groups from "./pages/Groups";
import Group from "./pages/Group";

export default function App(){
  return (
    <div className="min-h-dvh bg-gray-50 text-gray-900">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
          <Link to="/" className="font-semibold">QuickCash</Link>
          <nav className="text-sm text-gray-600"><Link to="/groups">Groups</Link></nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/groups" element={<Groups/>} />
          <Route path="/group/:id" element={<Group/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}
