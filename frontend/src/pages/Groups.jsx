import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mock } from "../lib/mock";
import Logo from "../images/Logo.png";

export default function Groups() {
  const [name, setName] = useState("");
  const [items, setItems] = useState(mock.groups());
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050934] to-[#106155]">
      {/* Navbar */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={Logo} alt="QuickCash Logo" className="w-12 h-12" />
            <span className="ml-2 text-2xl font-bold text-[#ffd741]">
              QuickCash
            </span>
          </div>
          <button
            onClick={() => nav("/")}
            className="px-6 py-2 text-[#ffd741] hover:text-[#a5cf20] transition-colors"
          >
            Back to Home
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Create Group Section */}
        <div className="bg-[#106155]/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-[#ffd741]">
            Create a Group
          </h2>
          <div className="flex gap-4">
            <input
              className="flex-1 p-3 bg-white/10 border border-[#a5cf20]/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#ffd741] transition-colors"
              placeholder="e.g., Trip to Ella"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              className="px-6 py-3 bg-[#259518] text-white font-semibold rounded-lg hover:bg-[#a5cf20] transform hover:scale-105 transition-all duration-200"
              onClick={() => {
                if (name.trim()) {
                  const g = mock.addGroup(name);
                  setItems(mock.groups());
                  nav(`/group/${g.id}`);
                }
              }}
            >
              Create
            </button>
          </div>
        </div>

        {/* Groups List Section */}
        <div className="bg-[#106155]/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-[#ffd741]">
            Your Groups
          </h2>
          {items.length === 0 ? (
            <p className="text-[#a5cf20]">No groups created yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {items.map((g) => (
                <div
                  key={g.id}
                  onClick={() => nav(`/group/${g.id}`)}
                  className="bg-white/10 border border-[#a5cf20]/30 rounded-lg p-6 cursor-pointer 
                           hover:border-[#ffd741] hover:transform hover:scale-105 transition-all duration-200"
                >
                  <div className="font-semibold text-[#ffd741] text-lg mb-2">
                    {g.name}
                  </div>
                  <div className="text-[#a5cf20]">
                    {g.members.length} members
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
