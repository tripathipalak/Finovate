import { createContext, useContext, useState, useEffect } from "react";
import { transactionsData } from "../data/mockData";

const AppContext = createContext();
const STORAGE_KEY = "fintrack_transactions";

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : transactionsData;
    } catch { return transactionsData; }
  });

  const [role, setRole]         = useState("viewer");
  const [search, setSearch]     = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy]     = useState("date-desc");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("fintrack_theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("fintrack_theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("fintrack_theme", "light");
  }
}, [darkMode]);

  const addTransaction = (txn) =>
    setTransactions((prev) => [...prev, { ...txn, id: Date.now() }]);

  const editTransaction = (id, updated) =>
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
    );

  const deleteTransaction = (id) =>
    setTransactions((prev) => prev.filter((t) => t.id !== id));

  return (
    <AppContext.Provider value={{
      transactions, role, setRole,
      search, setSearch,
      filterType, setFilterType,
      sortBy, setSortBy,
      darkMode, setDarkMode,
      addTransaction, editTransaction, deleteTransaction,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
