import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../images/Logo.png";

function Startup() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    amount: "",
    category: "",
    paidBy: "",
    sharedWith: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add expense
  const addExpense = () => {
    if (
      form.name &&
      form.amount &&
      form.category &&
      form.paidBy &&
      form.sharedWith
    ) {
      const sharedUsers = form.sharedWith.split(",").map((u) => u.trim());
      setExpenses([
        ...expenses,
        { ...form, amount: parseFloat(form.amount), sharedWith: sharedUsers },
      ]);
      setForm({
        name: "",
        amount: "",
        category: "",
        paidBy: "",
        sharedWith: "",
      });
    } else {
      alert("Please fill all fields!");
    }
  };

  // Calculate balances
  const calculateBalances = () => {
    const balances = {};
    expenses.forEach((e) => {
      const perPerson = e.amount / e.sharedWith.length;
      e.sharedWith.forEach((user) => {
        if (user !== e.paidBy) {
          balances[user] = (balances[user] || 0) - perPerson;
          balances[e.paidBy] = (balances[e.paidBy] || 0) + perPerson;
        }
      });
    });
    return balances;
  };

  const balances = calculateBalances();

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
          <div className="space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 text-[#ffd741] hover:text-[#a5cf20] transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-[#259518] text-white rounded-lg hover:bg-[#a5cf20] transition-all duration-200"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row justify-center items-start p-6 md:space-x-8 space-y-6 md:space-y-0">
        {/* Expense Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Add Group Expense
          </h2>
          <p className="text-gray-600 mb-4">
            Enter the expense details. Use comma-separated names for shared
            users.
          </p>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Expense Name (e.g., Dinner)"
            className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Amount ($)"
            className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category (e.g., Food, Travel)"
            className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="text"
            name="paidBy"
            value={form.paidBy}
            onChange={handleChange}
            placeholder="Paid By (Person)"
            className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="text"
            name="sharedWith"
            value={form.sharedWith}
            onChange={handleChange}
            placeholder="Shared With (comma-separated names)"
            className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <button
            onClick={addExpense}
            className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Add Expense
          </button>
        </div>

        {/* Expenses & Summary */}
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Expenses</h2>
          {expenses.length === 0 ? (
            <p className="text-gray-600">No expenses added yet.</p>
          ) : (
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {expenses.map((e, idx) => (
                <li key={idx} className="flex justify-between border-b pb-1">
                  <span>
                    {e.name} ({e.category})
                  </span>
                  <span>
                    ${e.amount.toFixed(2)} paid by {e.paidBy}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">
            Balances
          </h2>
          {Object.keys(balances).length === 0 ? (
            <p className="text-gray-600">No balances yet.</p>
          ) : (
            <ul>
              {Object.entries(balances).map(([person, balance], idx) => (
                <li
                  key={idx}
                  className={`flex justify-between p-2 rounded ${
                    balance >= 0
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  } mb-2`}
                >
                  <span>{person}</span>
                  <span>
                    {balance >= 0
                      ? `Gets $${balance.toFixed(2)}`
                      : `Owes $${Math.abs(balance).toFixed(2)}`}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Startup;
