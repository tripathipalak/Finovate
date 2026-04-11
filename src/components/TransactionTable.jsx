import { useState } from "react";
import { useApp } from "../context/AppContext";
import AddTransactionModal from "./AddTransactionModal";

const TransactionTable = () => {
  const {
    transactions, role, search, setSearch,
    filterType, setFilterType,
    sortBy, setSortBy,
    deleteTransaction,
  } = useApp();

  const [showModal, setShowModal] = useState(false);
  const [editTxn,   setEditTxn]   = useState(null);

  const filtered = transactions
    .filter((t) => {
      const matchSearch = t.category.toLowerCase().includes(search.toLowerCase());
      const matchType   = filterType === "all" || t.type === filterType;
      return matchSearch && matchType;
    })
    .sort((a, b) => {
      if (sortBy === "date-desc") return new Date(b.date) - new Date(a.date);
      if (sortBy === "date-asc")  return new Date(a.date) - new Date(b.date);
      if (sortBy === "amount-desc") return b.amount - a.amount;
      if (sortBy === "amount-asc")  return a.amount - b.amount;
      return 0;
    });

  return (
    <div id="transactions" className="bg-white/10 backdrop-blur-xl p-4 rounded-2xl shadow-lg border border-white/20 text-white">
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search category..."
          className="flex-1 min-w-[160px] p-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm"
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="p-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm"
        >
          <option value="all"     className="bg-slate-800">All</option>
          <option value="income"  className="bg-slate-800">Income</option>
          <option value="expense" className="bg-slate-800">Expense</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm"
        >
          <option value="date-desc"    className="bg-slate-800">Date (Newest)</option>
          <option value="date-asc"     className="bg-slate-800">Date (Oldest)</option>
          <option value="amount-desc"  className="bg-slate-800">Amount (High)</option>
          <option value="amount-asc"   className="bg-slate-800">Amount (Low)</option>
        </select>
        {role === "admin" && (
          <button
            onClick={() => { setEditTxn(null); setShowModal(true); }}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition-all duration-200 text-sm font-semibold"
          >
            + Add
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-400 py-8">No transactions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 text-left border-b border-white/10">
                <th className="pb-2">Date</th>
                <th className="pb-2">Category</th>
                <th className="pb-2">Type</th>
                <th className="pb-2 text-right">Amount</th>
                {role === "admin" && <th className="pb-2 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="border-b border-white/5 hover:bg-white/5 transition-all">
                  <td className="py-2 text-gray-300">{t.date}</td>
                  <td className="py-2">{t.category}</td>
                  <td className="py-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      t.type === "income"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}>
                      {t.type}
                    </span>
                  </td>
                  <td className="py-2 text-right font-semibold">
                    ₹ {t.amount.toLocaleString("en-IN")}
                  </td>
                  {role === "admin" && (
                    <td className="py-2 text-right flex gap-2 justify-end">
                      <button
                        onClick={() => { setEditTxn(t); setShowModal(true); }}
                        className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded hover:bg-yellow-500/40 transition"
                      >Edit</button>
                      <button
                        onClick={() => deleteTransaction(t.id)}
                        className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/40 transition"
                      >Delete</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <AddTransactionModal
          existing={editTxn}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default TransactionTable;