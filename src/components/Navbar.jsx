import RoleSwitcher from "./RoleSwitcher";
import { useApp } from "../context/AppContext";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const { darkMode, setDarkMode } = useApp();

  return (
    <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10">
      <p className="text-sm text-gray-400">
        Switch role to <span className="text-blue-400 font-semibold">Admin</span> to add / edit / delete transactions.
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
          title="Toggle dark mode"
        >
          {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-blue-400" />}
        </button>
        <RoleSwitcher />
      </div>
    </div>
  );
};

export default Navbar;