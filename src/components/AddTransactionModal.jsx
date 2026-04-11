import { useState } from "react";
import { useApp } from "../context/AppContext";

const CATEGORIES = ["Salary", "Freelance", "Food", "Transport", "Rent", "Entertainment", "Other"];

const AddTransactionModal = ({ existing, onClose }) => {
  const { addTransaction, editTransaction } = useApp();

  const [form, setForm] = useState(
    existing || { date: "", amount: "", category: "Food", type: "expense" }
  );
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    if (!form.date || !form.amount || !form.category) {
      setError("All fields are required.");
      return;
    }
    if (isNaN(Number(form.amount)) || Number(form.amount) <= 0) {
      setError("Amount must be a positive number.");
      return;
    }
    const txn = { ...form, amount: Number(form.amount) };
    if (existing) {
      editTransaction(existing.id, txn);
    } else {
      addTransaction(txn);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-800 border border-white/20 rounded-2xl p-6 w-full max-w-md text-white shadow-2xl">
        <h2 className="text-lg font-bold mb-4">
          {existing ? "Edit Transaction" : "Add Transaction"}
        </h2>
        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
        <div className="flex flex-col gap-3">
          <input
            name="date" type="date" value={form.date} onChange={handleChange}
            className="p-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm"
          />
          <input
            name="amount" type="number" placeholder="Amount (₹)" value={form.amount} onChange={handleChange}
            className="p-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm"
          />
          <select
            name="category" value={form.category} onChange={handleChange}
            className="p-2 rounded-lg bg-slate-700 border border-white/20 text-white text-sm"
          >
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select
            name="type" value={form.type} onChange={handleChange}
            className="p-2 rounded-lg bg-slate-700 border border-white/20 text-white text-sm"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="flex gap-3 mt-5 justify-end">
          <button onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm">
            Cancel
          </button>
          <button onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold text-sm hover:scale-105 transition">
            {existing ? "Save Changes" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionModal;