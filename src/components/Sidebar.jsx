import { FaChartPie, FaExchangeAlt, FaLightbulb } from "react-icons/fa";

const navItems = [
  { icon: <FaChartPie />,    label: "Dashboard",    id: "dashboard"    },
  { icon: <FaExchangeAlt />, label: "Transactions", id: "transactions" },
  { icon: <FaLightbulb />,   label: "Insights",     id: "insights"     },
];

const Sidebar = ({ active = "dashboard", onNavigate }) => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    onNavigate?.(id);
  };

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-slate-900 to-slate-800 dark:from-gray-100 dark:to-gray-200 text-white dark:text-gray-900 shadow-xl p-5 flex flex-col gap-6 overflow-y-auto transition-all duration-300">
      {/* <h1 className="text-xl font-bold text-blue-400 dark:text-blue-600">💰 FinTrack</h1> */}
      <h1 className="text-xl font-bold text-blue-400 dark:text-blue-600">💰 Finovate</h1>
      <nav className="flex flex-col gap-2 mt-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className={`flex items-center gap-3 p-2 rounded-lg w-full text-left transition-all duration-200 ${
              active === item.id
                ? "bg-blue-600 text-white"
                : "hover:bg-white/10 dark:hover:bg-black/10 text-gray-300 dark:text-gray-700"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;