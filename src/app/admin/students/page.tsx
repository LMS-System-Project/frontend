"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Users,
  Search,
  Plus,
  Trash2,
  X,
  UserCheck,
  UserPlus,
  Clock,
  Mail,
  Building,
  ShieldCheck,
  Loader2,
  AlertTriangle,
  GraduationCap,
  Edit3,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/services/api";

interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
  department: string | null;
  created_at: string | null;
}

const ROLE_THEME: Record<string, { label: string; color: string; bg: string; icon: any }> = {
  student:    { label: "STUDENT",    color: "text-blue-600",    bg: "bg-blue-50",    icon: Users },
  instructor: { label: "INSTRUCTOR", color: "text-emerald-600", bg: "bg-emerald-50", icon: GraduationCap },
  admin:      { label: "ADMIN",      color: "text-purple-600",  bg: "bg-purple-50",  icon: ShieldCheck },
};

const DEPARTMENTS = [
  "Computer Science", "Electronics", "Mechanical", "Civil",
  "Mathematics", "Physics", "Chemistry", "Humanities",
];

export default function AdminUsersPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-96"><Loader2 className="animate-spin text-accent" size={32} /></div>}>
      <AdminUsersContent />
    </Suspense>
  );
}

function AdminUsersContent() {
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") || "";

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState(initialRole);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formRole, setFormRole] = useState("student");
  const [formDept, setFormDept] = useState("");
  const [saving, setSaving] = useState(false);

  async function loadUsers() {
    try {
      setLoading(true);
      const data = await api.admin.users.list(roleFilter || undefined);
      setUsers(data);
    } catch (err: any) {
      setError(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, [roleFilter]);

  function openCreate() {
    setEditingUser(null);
    setFormName(""); setFormEmail(""); setFormPassword(""); setFormRole("student"); setFormDept("");
    setShowModal(true);
  }

  function openEdit(u: User) {
    setEditingUser(u);
    setFormName(u.full_name); setFormEmail(u.email); setFormPassword(""); setFormRole(u.role); setFormDept(u.department || "");
    setShowModal(true);
  }

  async function handleSave() {
    if (!formName.trim()) return;
    setSaving(true);
    try {
      if (editingUser) {
        await api.admin.users.update(editingUser.id, {
          full_name: formName,
          role: formRole,
          department: formDept || undefined,
        });
      } else {
        if (!formEmail.trim() || !formPassword.trim()) return;
        await api.admin.users.create({
          email: formEmail,
          password: formPassword,
          full_name: formName,
          role: formRole,
          department: formDept || undefined,
        });
      }
      setShowModal(false);
      loadUsers();
    } catch (err: any) {
      alert(err.message || "Failed to save user");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    try {
      await api.admin.users.delete(deleteId);
      setDeleteId(null);
      loadUsers();
    } catch (err: any) {
      alert(err.message || "Failed to delete user");
    }
  }

  const filtered = users.filter((u) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      u.full_name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      (u.department || "").toLowerCase().includes(q)
    );
  });

  const stats = {
    total: users.length,
    students: users.filter((u) => u.role === "student").length,
    instructors: users.filter((u) => u.role === "instructor").length,
    admins: users.filter((u) => u.role === "admin").length,
  };

  if (loading && users.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="animate-spin text-accent" size={32} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 max-w-[1200px] mx-auto pb-20"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-[0.25em] mb-3">
            <ShieldCheck size={14} className="text-accent" />
            <span>Administration • User Management</span>
          </div>
          <h1 className="text-4xl font-bold text-primary-text tracking-tight mb-2">
            All Users
          </h1>
          <p className="text-sm text-slate-500">
            Manage <span className="text-accent font-bold">{stats.total} accounts</span> —{" "}
            {stats.students} students, {stats.instructors} instructors, {stats.admins} admins.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-6 py-3.5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all"
        >
          <UserPlus size={16} />
          Add User
        </button>
      </div>

      {/* Stat pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total", val: stats.total, color: "text-slate-600", bg: "bg-slate-100", role: "" },
          { label: "Students", val: stats.students, color: "text-blue-600", bg: "bg-blue-50", role: "student" },
          { label: "Instructors", val: stats.instructors, color: "text-emerald-600", bg: "bg-emerald-50", role: "instructor" },
          { label: "Admins", val: stats.admins, color: "text-purple-600", bg: "bg-purple-50", role: "admin" },
        ].map((s, i) => (
          <button
            key={s.label}
            onClick={() => setRoleFilter(s.role)}
            className={`bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all text-left ${roleFilter === s.role ? "border-accent ring-1 ring-accent/30" : "border-slate-200"}`}
          >
            <div className={`text-2xl font-bold tracking-tighter ${s.color}`}>{s.val}</div>
            <div className="text-[10px] font-black text-slate-400 tracking-[0.15em] uppercase mt-1">{s.label}</div>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors" size={18} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, or department..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-accent shadow-sm"
        />
      </div>

      {/* Users Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Name</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] hidden md:table-cell">Email</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Role</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] hidden lg:table-cell">Department</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center text-sm text-slate-400">
                  {search ? "No users match your search." : "No users found."}
                </td>
              </tr>
            ) : (
              filtered.map((u) => {
                const theme = ROLE_THEME[u.role] || ROLE_THEME.student;
                return (
                  <tr key={u.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-sm text-primary-text">{u.full_name}</div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell text-sm text-slate-500">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${theme.bg} ${theme.color}`}>
                        <theme.icon size={12} />
                        {theme.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell text-sm text-slate-500">
                      {u.department || "—"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(u)}
                          className="p-2 text-slate-400 hover:text-accent hover:bg-slate-100 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          onClick={() => setDeleteId(u.id)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── Create / Edit Modal ────────────────────────────────── */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-primary-text">
                  {editingUser ? "Edit User" : "Create New User"}
                </h2>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Full Name</label>
                  <input
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                    placeholder="John Doe"
                  />
                </div>

                {!editingUser && (
                  <>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Email</label>
                      <input
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                        placeholder="user@university.edu"
                        type="email"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Password</label>
                      <input
                        value={formPassword}
                        onChange={(e) => setFormPassword(e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                        placeholder="Min 6 characters"
                        type="password"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Role</label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-accent bg-white"
                  >
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Department</label>
                  <select
                    value={formDept}
                    onChange={(e) => setFormDept(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-accent bg-white"
                  >
                    <option value="">None</option>
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-8">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 px-4 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving && <Loader2 size={14} className="animate-spin" />}
                  {editingUser ? "Save Changes" : "Create User"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Delete Confirmation ────────────────────────────────── */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => setDeleteId(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trash2 size={24} />
              </div>
              <h3 className="text-lg font-bold text-primary-text mb-2">Delete User?</h3>
              <p className="text-sm text-slate-500 mb-6">
                This will permanently remove the user and their auth account. This cannot be undone.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
