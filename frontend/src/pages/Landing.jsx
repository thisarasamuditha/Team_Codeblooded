import { Link } from "react-router-dom";
import Logo from "../images/Logo.png";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050934] to-[#106155]">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={Logo} alt="QuickCash Logo" className="w-12 h-12" />
            <span className="ml-2 text-2xl font-bold text-[#ffd741]">
              QuickCash
            </span>
          </div>
          {/* Navigation right side space preserved for layout balance */}
          <div className="w-24"></div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-[#ffd741] leading-tight">
              Split Expenses,
              <br />
              <span className="text-white">Keep Friendships</span>
            </h1>
            <p className="mt-6 text-xl text-[#a5cf20]">
              Effortlessly manage shared expenses and settle debts with friends,
              roommates, and groups.
            </p>
            <div className="mt-8">
              <Link
                to="/groups"
                className="inline-block px-8 py-4 bg-[#259518] text-white text-lg font-semibold rounded-lg hover:bg-[#a5cf20] transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Start a Group
              </Link>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 gap-6 items-stretch">
            <div className="bg-[#106155]/80 p-6 rounded-xl backdrop-blur-sm shadow-lg hover:transform hover:scale-105 transition-all duration-200 flex flex-col justify-between h-full">
              <div>
                <div className="text-[#ffd741] text-4xl mb-3">📊</div>
                <h3 className="text-[#ffd741] font-semibold text-lg">
                  Smart Splitting
                </h3>
                <p className="text-white/80 mt-2">
                  Automatically calculate and split expenses among group members
                </p>
              </div>
            </div>
            <div className="bg-[#106155]/80 p-6 rounded-xl backdrop-blur-sm shadow-lg hover:transform hover:scale-105 transition-all duration-200 flex flex-col justify-between h-full">
              <div>
                <div className="text-[#ffd741] text-4xl mb-3">💰</div>
                <h3 className="text-[#ffd741] font-semibold text-lg">
                  Easy Settlements
                </h3>
                <p className="text-white/80 mt-2">
                  Settle debts quickly with integrated payment tracking
                </p>
              </div>
            </div>
            <div className="bg-[#106155]/80 p-6 rounded-xl backdrop-blur-sm shadow-lg hover:transform hover:scale-105 transition-all duration-200 flex flex-col justify-between h-full">
              <div>
                <div className="text-[#ffd741] text-4xl mb-3">📱</div>
                <h3 className="text-[#ffd741] font-semibold text-lg">
                  Real-time Updates
                </h3>
                <p className="text-white/80 mt-2">
                  Stay in sync with instant expense notifications
                </p>
              </div>
            </div>
            <div className="bg-[#106155]/80 p-6 rounded-xl backdrop-blur-sm shadow-lg hover:transform hover:scale-105 transition-all duration-200 flex flex-col justify-between h-full">
              <div>
                <div className="text-[#ffd741] text-4xl mb-3">📈</div>
                <h3 className="text-[#ffd741] font-semibold text-lg">
                  Expense Analytics
                </h3>
                <p className="text-white/80 mt-2">
                  Track spending patterns with detailed reports
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section removed */}
      </div>
    </div>
  );
}
