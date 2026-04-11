import { motion } from "framer-motion";

const colorMap = {
  Balance:  "from-blue-500 to-indigo-500",
  Income:   "from-green-500 to-teal-500",
  Expenses: "from-red-500 to-pink-500",
};

const SummaryCard = ({ title, value }) => {
  const gradient = colorMap[title] || "from-slate-500 to-slate-600";

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white/10 backdrop-blur-xl p-5 rounded-2xl shadow-xl border border-white/20"
    >
      <div className={`inline-block text-xs font-semibold px-2 py-1 rounded-full bg-gradient-to-r ${gradient} text-white mb-3`}>
        {title}
      </div>
      <p className="text-2xl font-bold">₹ {value.toLocaleString("en-IN")}</p>
    </motion.div>
  );
};

export default SummaryCard;