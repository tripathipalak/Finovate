// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";
// import { useApp } from "../context/AppContext";

// const COLORS = ["#22c55e", "#ef4444", "#3b82f6", "#f59e0b"];

// const Charts = () => {
//   const { transactions } = useApp();

//   if (!transactions || transactions.length === 0) {
//     return <p>No data available</p>;
//   }

//   // ✅ FIX 1: Sort by date + amount ko Number mein convert karo
//   const lineData = [...transactions]
//     .sort((a, b) => new Date(a.date) - new Date(b.date))
//     .map((t) => ({
//       date: t.date,
//       amount: Number(t.amount),
//     }));

//   const expenses = transactions.filter(
//     (t) => t.type.toLowerCase() === "expense"
//   );

//   // ✅ FIX 2: Number(curr.amount) use karo
//   const pieData = Object.values(
//     expenses.reduce((acc, curr) => {
//       if (!acc[curr.category]) {
//         acc[curr.category] = { name: curr.category, value: 0 };
//       }
//       acc[curr.category].value += Number(curr.amount);
//       return acc;
//     }, {})
//   );

//   return (
//     <div className="grid md:grid-cols-2 gap-6">
//       {/* Line Chart */}
//       <div className="bg-white/10 backdrop-blur-xl p-4 rounded-2xl shadow-lg border border-white/20">
//         <h2 className="mb-2 font-semibold">Balance Trend</h2>
//         {/* ✅ FIX 3: data={lineData} use karo, transactions nahi */}
//         <LineChart width={400} height={250} data={lineData}>
//           <XAxis dataKey="date" />
//           <YAxis />
//           <Tooltip />
//           <Line
//             type="monotone"
//             dataKey="amount"
//             stroke="#3b82f6"
//             dot={{ r: 4 }}
//           />
//         </LineChart>
//       </div>

//       {/* Pie Chart */}
//       <div className="bg-white/10 backdrop-blur-xl p-4 rounded-2xl shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-300">
//         <h2 className="mb-2 font-semibold">Spending Breakdown</h2>
//         <PieChart width={400} height={250}>
//           {pieData.length > 0 ? (
//             <Pie
//               data={pieData}
//               dataKey="value"
//               nameKey="name"
//               cx="50%"
//               cy="50%"
//               outerRadius={80}
//               isAnimationActive={false}
//             >
//               {pieData.map((_, i) => (
//                 <Cell key={i} fill={COLORS[i % COLORS.length]} />
//               ))}
//             </Pie>
//           ) : (
//             <text x="50%" y="50%" textAnchor="middle">
//               No expense data
//             </text>
//           )}
//           <Tooltip />
//         </PieChart>
//       </div>
//     </div>
//   );
// };

// export default Charts;




import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { useApp } from "../context/AppContext";

const COLORS = ["#22c55e", "#ef4444", "#3b82f6", "#f59e0b", "#a855f7", "#ec4899"];

const Charts = () => {
  const { transactions } = useApp();

  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-white/10 p-6 rounded-2xl text-center text-gray-400">
        No data available for charts.
      </div>
    );
  }

  const lineData = [...transactions]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((t) => ({ date: t.date.slice(5), amount: Number(t.amount) }));

  const expenses = transactions.filter((t) => t.type === "expense");
  const pieData = Object.values(
    expenses.reduce((acc, curr) => {
      if (!acc[curr.category]) acc[curr.category] = { name: curr.category, value: 0 };
      acc[curr.category].value += Number(curr.amount);
      return acc;
    }, {})
  );

  return (
    <div className="grid md:grid-cols-2 gap-6" id="dashboard">
      <div className="bg-white/10 backdrop-blur-xl p-4 rounded-2xl shadow-lg border border-white/20">
        <h2 className="mb-4 font-semibold text-white">Balance Trend</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={lineData}>
            <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <Tooltip
              contentStyle={{ background: "#1e293b", border: "none", borderRadius: 8 }}
              labelStyle={{ color: "#94a3b8" }}
              itemStyle={{ color: "#fff" }}
            />
            <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white/10 backdrop-blur-xl p-4 rounded-2xl shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-300">
        <h2 className="mb-4 font-semibold text-white">Spending Breakdown</h2>
        {pieData.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: "#1e293b", border: "none", borderRadius: 8 }}
                itemStyle={{ color: "#fff" }}
              />
              <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-400 mt-10">No expense data</p>
        )}
      </div>
    </div>
  );
};

export default Charts;
