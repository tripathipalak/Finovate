import SummaryCard from "../components/SummaryCard";
import Charts from "../components/Charts";
import TransactionTable from "../components/TransactionTable";
import Insights from "../components/Insights";
import Navbar from "../components/Navbar";
import { useApp } from "../context/AppContext";

const Dashboard = () => {
  const { transactions } = useApp();

  const income  = transactions.filter(t => t.type === "income").reduce((a, b) => a + b.amount, 0);
  const expense = transactions.filter(t => t.type === "expense").reduce((a, b) => a + b.amount, 0);
  const balance = income - expense;

  return (
    <div className="p-6 w-full min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 dark:from-slate-700 dark:via-slate-800 dark:to-slate-900 text-white space-y-6 transition-all duration-300">
      <h1 className="text-2xl font-bold">Finance Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-4">
        <SummaryCard title="Balance"  value={balance} />
        <SummaryCard title="Income"   value={income}  />
        <SummaryCard title="Expenses" value={expense} />
      </div>

      <Navbar />
      <Charts />
      <TransactionTable />
      <Insights />
    </div>
  );
};

export default Dashboard;