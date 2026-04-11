import { useApp } from "../context/AppContext";

const monthName = (dateStr) =>
  new Date(dateStr).toLocaleString("en-IN", { month: "long", year: "numeric" });

const Insights = () => {
  const { transactions } = useApp();

  const expenses = transactions.filter((t) => t.type === "expense");
  const income   = transactions.filter((t) => t.type === "income");

  // Highest spending category
  const categoryTotals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});
  const topCategories = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  // Monthly breakdown
  const monthlyExpense = expenses.reduce((acc, t) => {
    const m = t.date.slice(0, 7);
    acc[m] = (acc[m] || 0) + t.amount;
    return acc;
  }, {});
  const monthlyIncome = income.reduce((acc, t) => {
    const m = t.date.slice(0, 7);
    acc[m] = (acc[m] || 0) + t.amount;
    return acc;
  }, {});

  const months = [...new Set([
    ...Object.keys(monthlyExpense),
    ...Object.keys(monthlyIncome),
  ])].sort().slice(-3);

  const totalIncome  = income.reduce((a, t) => a + t.amount, 0);
  const totalExpense = expenses.reduce((a, t) => a + t.amount, 0);
  const savingsRate  = totalIncome > 0
    ? (((totalIncome - totalExpense) / totalIncome) * 100).toFixed(1)
    : 0;

  return (
    <div id="insights" className="bg-white/10 backdrop-blur-xl p-5 rounded-2xl shadow-lg border border-white/20 text-white space-y-5">
      <h2 className="font-bold text-lg">Insights</h2>

      {transactions.length === 0 ? (
        <p className="text-gray-400">No data to show insights.</p>
      ) : (
        <>
          {/* Top categories */}
          <div>
            <p className="text-sm text-gray-400 mb-2">Top spending categories</p>
            <div className="flex flex-col gap-2">
              {topCategories.map(([cat, val], i) => (
                <div key={cat} className="flex items-center gap-3">
                  <span className="text-xs w-5 text-gray-400">{i + 1}.</span>
                  <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                      style={{ width: `${Math.min((val / topCategories[0][1]) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold w-24 text-right">
                    {cat} — ₹{val.toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly comparison */}
          <div>
            <p className="text-sm text-gray-400 mb-2">Monthly comparison</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400 text-left border-b border-white/10">
                    <th className="pb-1">Month</th>
                    <th className="pb-1 text-green-400">Income</th>
                    <th className="pb-1 text-red-400">Expense</th>
                    <th className="pb-1">Savings</th>
                  </tr>
                </thead>
                <tbody>
                  {months.map((m) => {
                    const inc = monthlyIncome[m]  || 0;
                    const exp = monthlyExpense[m] || 0;
                    const sav = inc - exp;
                    return (
                      <tr key={m} className="border-b border-white/5">
                        <td className="py-1 text-gray-300">
                          {new Date(m + "-01").toLocaleString("en-IN", { month: "short", year: "2-digit" })}
                        </td>
                        <td className="py-1 text-green-400">₹{inc.toLocaleString("en-IN")}</td>
                        <td className="py-1 text-red-400">₹{exp.toLocaleString("en-IN")}</td>
                        <td className={`py-1 font-semibold ${sav >= 0 ? "text-blue-400" : "text-orange-400"}`}>
                          ₹{sav.toLocaleString("en-IN")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="bg-white/5 rounded-xl p-3">
              <p className="text-xs text-gray-400">Total Transactions</p>
              <p className="text-xl font-bold">{transactions.length}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3">
              <p className="text-xs text-gray-400">Savings Rate</p>
              <p className={`text-xl font-bold ${Number(savingsRate) >= 0 ? "text-green-400" : "text-red-400"}`}>
                {savingsRate}%
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-3">
              <p className="text-xs text-gray-400">Highest Expense</p>
              <p className="text-sm font-bold">
                {topCategories[0] ? `${topCategories[0][0]}` : "—"}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Insights;
