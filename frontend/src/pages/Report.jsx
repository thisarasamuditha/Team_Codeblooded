import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../images/Logo.png";

function Report() {
  const navigate = useNavigate();

  // Function to generate and download PDF report
  const downloadReport = () => {
    // This is a placeholder function - you'll need to implement the actual PDF generation
    // You might want to use libraries like jsPDF or html2pdf
    const data = {
      // Add your expense data here
      expenses: [],
      balances: {},
      date: new Date().toLocaleDateString(),
    };

    // For now, we'll just download a JSON file
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const href = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = href;
    link.download = `expense-report-${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-0.5 bg-white shadow-md">
        <div className="flex items-center">
          <img src={Logo} alt="QuickCash Logo" className="w-20 h-20 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">QuickCash</h1>
        </div>
        <div className="space-x-4 mr-4">
          <button
            onClick={() => navigate("/groups")}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition duration-200"
          >
            Back to Groups
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">
            Expense Summary Report
          </h2>

          {/* Summary Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-blue-600">$0.00</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Members</p>
                <p className="text-2xl font-bold text-green-600">0</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-purple-600">0</p>
              </div>
            </div>
          </div>

          {/* Expense List */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Recent Expenses</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Paid By
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      No expenses to display
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Download Button */}
          <div className="flex justify-end">
            <button
              onClick={downloadReport}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition duration-200 flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;
