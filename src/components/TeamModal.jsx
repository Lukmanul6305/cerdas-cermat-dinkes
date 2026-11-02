import { useState } from "react";
import { HiXMark, HiUserGroup, HiPlusCircle, HiTrash, HiPencilSquare } from "react-icons/hi2";

export default function TeamModal({
  isOpen,
  onClose,
  teams,
  onAddTeam,
  onRenameTeam,
  onDeleteTeam,
}) {
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [tempName, setTempName] = useState("");

  if (!isOpen) return null;

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    onAddTeam(newName);
    setNewName("");
  };

  const startEdit = (team) => {
    setEditingId(team.id);
    setTempName(team.name);
  };

  const saveEdit = (teamId) => {
    onRenameTeam(teamId, tempName);
    setEditingId(null);
  };

  const handleDelete = (team) => {
    if (teams.length <= 1) return;
    if (window.confirm(`Hapus "${team.name}"? Skornya (${team.score}) ikut terhapus.`)) {
      onDeleteTeam(team.id);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-60 bg-black/75 backdrop-blur-sm">
      <div className="w-full max-w-lg p-6 text-white border shadow-2xl rounded-2xl border-slate-700 bg-slate-800">
        <div className="flex items-center justify-between pb-4 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <HiUserGroup className="w-6 h-6 text-teal-400" />
            <h2 className="text-xl font-bold">Kelola Tim</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup"
            className="p-1 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white"
          >
            <HiXMark className="w-6 h-6" />
          </button>
        </div>

        {/* Daftar tim */}
        <ul className="my-5 space-y-2 overflow-y-auto max-h-72">
          {teams.map((team) => (
            <li
              key={team.id}
              className="flex items-center gap-2 px-3 py-2 border rounded-lg border-slate-700 bg-slate-900/60"
            >
              {editingId === team.id ? (
                <>
                  <input
                    autoFocus
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEdit(team.id);
                      if (e.key === "Escape") setEditingId(null);
                    }}
                    className="flex-1 min-w-0 px-2 py-1 text-sm text-white border border-teal-500 rounded bg-slate-900 focus:outline-none"
                  />
                  <button
                    onClick={() => saveEdit(team.id)}
                    className="px-3 py-1 text-xs font-bold bg-teal-600 rounded hover:bg-teal-500"
                  >
                    Simpan
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-3 py-1 text-xs font-bold rounded bg-slate-700 hover:bg-slate-600"
                  >
                    Batal
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1 min-w-0 text-sm font-bold text-teal-300 truncate">
                    {team.name}
                  </span>
                  <span className="text-xs tabular-nums text-slate-400">
                    {team.score} poin
                  </span>
                  <button
                    onClick={() => startEdit(team)}
                    aria-label={`Ubah nama ${team.name}`}
                    className="p-1.5 rounded text-slate-300 hover:bg-slate-700"
                  >
                    <HiPencilSquare className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(team)}
                    disabled={teams.length <= 1}
                    aria-label={`Hapus ${team.name}`}
                    title={teams.length <= 1 ? "Minimal harus ada 1 tim" : "Hapus tim"}
                    className="p-1.5 rounded text-rose-400 hover:bg-rose-900/30 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <HiTrash className="w-4 h-4" />
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>

        {/* Tambah tim */}
        <form onSubmit={handleAdd} className="flex gap-2">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Nama tim baru"
            className="flex-1 min-w-0 px-3 py-2 text-sm text-white border rounded-lg border-slate-700 bg-slate-900 focus:border-teal-500 focus:outline-none"
          />
          <button
            type="submit"
            className="flex items-center gap-1 px-4 py-2 text-sm font-bold bg-teal-600 rounded-lg hover:bg-teal-500"
          >
            <HiPlusCircle className="w-5 h-5" />
            Tambah
          </button>
        </form>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-slate-700 text-slate-200 hover:bg-slate-600"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
}