import { useApp } from "../context/AppContext";

const RoleSwitcher = () => {
  const { role, setRole } = useApp();

  return (
    <select
      value={role}
      onChange={(e) => setRole(e.target.value)}
      className="p-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="viewer" className="bg-slate-800">👁 Viewer</option>
      <option value="admin"  className="bg-slate-800">🛡 Admin</option>
    </select>
  );
};

export default RoleSwitcher;
