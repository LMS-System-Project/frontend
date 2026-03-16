"use client";

import { useState } from "react";
import {
    GraduationCap,
    Search,
    Plus,
    Edit3,
    Trash2,
    X,
    UserCheck,
    UserX,
    UserPlus,
    Clock,
    Mail,
    Building,
    BookOpen,
    ShieldCheck,
    CheckCircle,
    Briefcase,
    Users
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Instructor {
    id: number;
    name: string;
    email: string;
    empId: string;
    dept: string;
    courses: number;
    joinDate: string;
    status: "Active" | "On Leave" | "Pending";
    specialization: string;
}

const initialInstructors: Instructor[] = [
    { id: 1, name: "Dr. Rahul Verma", email: "rahul.verma@uni.edu", empId: "FAC2019012", dept: "Computer Science", courses: 3, joinDate: "Jun 10, 2019", status: "Active", specialization: "Machine Learning" },
    { id: 2, name: "Prof. Sarah Chen", email: "sarah.chen@uni.edu", empId: "FAC2018005", dept: "Mathematics", courses: 2, joinDate: "Jan 15, 2018", status: "Active", specialization: "Applied Mathematics" },
    { id: 3, name: "Dr. Michael Park", email: "michael.park@uni.edu", empId: "FAC2020021", dept: "Physics", courses: 2, joinDate: "Aug 20, 2020", status: "Active", specialization: "Quantum Mechanics" },
    { id: 4, name: "Prof. Anita Desai", email: "anita.desai@uni.edu", empId: "FAC2017008", dept: "Electronics", courses: 4, joinDate: "Mar 5, 2017", status: "On Leave", specialization: "VLSI Design" },
    { id: 5, name: "Dr. James Wilson", email: "james.wilson@uni.edu", empId: "FAC2021034", dept: "Mechanical", courses: 2, joinDate: "Jul 8, 2021", status: "Active", specialization: "Thermodynamics" },
    { id: 6, name: "Prof. Li Wei", email: "li.wei@uni.edu", empId: "FAC2019018", dept: "Computer Science", courses: 3, joinDate: "Sep 1, 2019", status: "Active", specialization: "Data Structures" },
    { id: 7, name: "Dr. Kavitha Nair", email: "kavitha.nair@uni.edu", empId: "FAC2022040", dept: "Chemistry", courses: 1, joinDate: "Aug 15, 2022", status: "Pending", specialization: "Organic Chemistry" },
    { id: 8, name: "Prof. David Brown", email: "david.brown@uni.edu", empId: "FAC2016003", dept: "Civil", courses: 3, joinDate: "Feb 12, 2016", status: "Active", specialization: "Structural Engineering" },
];

const STATUS_THEMES: Record<string, { label: string; color: string; bg: string; border: string; icon: any }> = {
    Active: { label: "ACTIVE", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", icon: UserCheck },
    "On Leave": { label: "ON LEAVE", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100", icon: Clock },
    Pending: { label: "PENDING", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100", icon: Clock },
};

const DEPARTMENTS = ["Computer Science", "Electronics", "Mechanical", "Civil", "Mathematics", "Physics", "Chemistry", "Humanities"];

export default function AdminInstructorsPage() {
    const [instructors, setInstructors] = useState<Instructor[]>(initialInstructors);
    const [search, setSearch] = useState("");
    const [deptFilter, setDeptFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingInstructor, setEditingInstructor] = useState<Instructor | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

    // Form state
    const [formName, setFormName] = useState("");
    const [formEmail, setFormEmail] = useState("");
    const [formDept, setFormDept] = useState("Computer Science");
    const [formSpec, setFormSpec] = useState("");

    const filtered = instructors.filter((i) => {
        const matchesSearch =
            i.name.toLowerCase().includes(search.toLowerCase()) ||
            i.email.toLowerCase().includes(search.toLowerCase()) ||
            i.empId.toLowerCase().includes(search.toLowerCase()) ||
            i.specialization.toLowerCase().includes(search.toLowerCase());
        const matchesDept = deptFilter === "All" || i.dept === deptFilter;
        const matchesStatus = statusFilter === "All" || i.status === statusFilter;
        return matchesSearch && matchesDept && matchesStatus;
    });

    const stats = {
        total: instructors.length,
        active: instructors.filter(i => i.status === "Active").length,
        onLeave: instructors.filter(i => i.status === "On Leave").length,
        departments: new Set(instructors.map(i => i.dept)).size,
    };

    function openAddModal() {
        setFormName(""); setFormEmail(""); setFormDept("Computer Science"); setFormSpec("");
        setEditingInstructor(null);
        setShowAddModal(true);
    }

    function openEditModal(instructor: Instructor) {
        setFormName(instructor.name); setFormEmail(instructor.email); setFormDept(instructor.dept); setFormSpec(instructor.specialization);
        setEditingInstructor(instructor);
        setShowAddModal(true);
    }

    function handleSave() {
        if (!formName.trim() || !formEmail.trim()) return;
        if (editingInstructor) {
            setInstructors(prev => prev.map(i =>
                i.id === editingInstructor.id ? { ...i, name: formName, email: formEmail, dept: formDept, specialization: formSpec } : i
            ));
        } else {
            const newId = Math.max(...instructors.map(i => i.id)) + 1;
            setInstructors(prev => [...prev, {
                id: newId,
                name: formName,
                email: formEmail,
                empId: `FAC2025${String(newId).padStart(3, '0')}`,
                dept: formDept,
                courses: 0,
                joinDate: "Mar 7, 2025",
                status: "Pending" as const,
                specialization: formSpec || "General",
            }]);
        }
        setShowAddModal(false);
    }

    function handleDelete(id: number) {
        setInstructors(prev => prev.filter(i => i.id !== id));
        setShowDeleteConfirm(null);
    }

    function toggleStatus(instructor: Instructor) {
        const nextStatus = instructor.status === "Active" ? "On Leave" : "Active";
        setInstructors(prev => prev.map(i => i.id === instructor.id ? { ...i, status: nextStatus } : i));
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 max-w-[1200px] mx-auto pb-20"
        >
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-[0.25em] mb-3">
                        <ShieldCheck size={14} className="text-accent" />
                        <span>Administration • Faculty Management</span>
                    </div>
                    <h1 className="text-4xl font-bold text-primary-text tracking-tight mb-2">
                        Instructor Management
                    </h1>
                    <p className="text-sm text-slate-500 max-w-xl">
                        Manage <span className="text-accent font-bold">{stats.total} faculty members</span> across {stats.departments} departments.
                    </p>
                </div>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 px-6 py-3.5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl border border-slate-800 hover:bg-black transition-all"
                >
                    <UserPlus size={16} />
                    Add Instructor
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { label: "Total Faculty", val: stats.total, icon: GraduationCap, color: "text-blue-600", bg: "bg-blue-50/50" },
                    { label: "Active", val: stats.active, icon: UserCheck, color: "text-emerald-600", bg: "bg-emerald-50/50" },
                    { label: "On Leave", val: stats.onLeave, icon: Clock, color: "text-amber-600", bg: "bg-amber-50/50" },
                    { label: "Departments", val: stats.departments, icon: Building, color: "text-purple-600", bg: "bg-purple-50/50" },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.08 }}
                        className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                                <stat.icon size={20} />
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-primary-text mb-0.5 tracking-tighter">{stat.val}</div>
                        <div className="text-[10px] font-black text-slate-400 tracking-[0.15em] uppercase">{stat.label}</div>
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-50 group-hover:bg-accent transition-colors" />
                    </motion.div>
                ))}
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative flex-1 group w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors" size={18} />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name, email, ID, or specialization..."
                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-accent transition-all shadow-sm"
                    />
                </div>
                <select
                    value={deptFilter}
                    onChange={(e) => setDeptFilter(e.target.value)}
                    className="w-full sm:w-auto px-5 py-3 border border-slate-200 rounded-xl text-[11px] font-bold text-slate-600 bg-white shadow-sm uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-accent appearance-none"
                >
                    <option value="All">All Departments</option>
                    {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full sm:w-auto px-5 py-3 border border-slate-200 rounded-xl text-[11px] font-bold text-slate-600 bg-white shadow-sm uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-accent appearance-none"
                >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Pending">Pending</option>
                </select>
            </div>

            {/* Instructor Table */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm border-b-4 border-b-slate-100">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-200">
                                {["Profile", "Email", "Employee ID", "Department", "Specialization", "Courses", "Status", "Actions"].map((h, i) => (
                                    <th key={i} className="text-left px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filtered.map((instructor) => {
                                const theme = STATUS_THEMES[instructor.status];
                                return (
                                    <tr key={instructor.id} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-xs font-bold text-white border border-slate-800 group-hover:scale-105 transition-transform">
                                                    {instructor.name.split(' ').filter(n => n.length > 1 && n[0] === n[0].toUpperCase()).map(n => n[0]).join('').slice(0, 2)}
                                                </div>
                                                <div>
                                                    <span className="text-sm font-bold text-slate-800 tracking-tight group-hover:text-accent transition-colors block">{instructor.name}</span>
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Since {instructor.joinDate.split(', ')[1]}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className="text-xs text-slate-500 font-medium">{instructor.email}</span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className="text-[11px] font-bold text-slate-500 font-mono">{instructor.empId}</span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2.5 py-1 bg-slate-100/50 border border-slate-200 rounded-full whitespace-nowrap">
                                                {instructor.dept}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className="text-xs font-medium text-slate-600 italic">{instructor.specialization}</span>
                                        </td>
                                        <td className="px-5 py-4 text-center">
                                            <div className="flex items-center gap-1.5">
                                                <BookOpen size={13} className="text-slate-400" />
                                                <span className="text-xs font-bold text-accent">{instructor.courses}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border w-fit ${theme.bg} ${theme.border}`}>
                                                <theme.icon size={12} className={theme.color} />
                                                <span className={`text-[9px] font-black uppercase tracking-widest ${theme.color}`}>{theme.label}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => openEditModal(instructor)}
                                                    className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-accent hover:border-accent transition-all shadow-sm"
                                                    title="Edit"
                                                >
                                                    <Edit3 size={14} />
                                                </button>
                                                <button
                                                    onClick={() => toggleStatus(instructor)}
                                                    className={`p-2 rounded-lg bg-white border border-slate-200 transition-all shadow-sm ${instructor.status === "Active" ? "text-slate-400 hover:text-amber-500 hover:border-amber-400" : "text-slate-400 hover:text-emerald-500 hover:border-emerald-400"}`}
                                                    title={instructor.status === "Active" ? "Set On Leave" : "Activate"}
                                                >
                                                    {instructor.status === "Active" ? <UserX size={14} /> : <UserCheck size={14} />}
                                                </button>
                                                <button
                                                    onClick={() => setShowDeleteConfirm(instructor.id)}
                                                    className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-400 transition-all shadow-sm"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="px-6 py-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                        Showing <span className="text-primary-text">{filtered.length}</span> of <span className="text-primary-text">{instructors.length}</span> instructors
                    </p>
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">Faculty Directory</span>
                    </div>
                </div>
            </div>

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowAddModal(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg p-8"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-xl font-bold text-primary-text tracking-tight uppercase">
                                        {editingInstructor ? "Edit Instructor" : "Add New Instructor"}
                                    </h2>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                        {editingInstructor ? "Update faculty details" : "Register a new faculty member"}
                                    </p>
                                </div>
                                <button onClick={() => setShowAddModal(false)} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 transition-all">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Full Name</label>
                                    <input
                                        type="text"
                                        value={formName}
                                        onChange={(e) => setFormName(e.target.value)}
                                        placeholder="e.g. Dr. Jane Smith"
                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-accent transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Email Address</label>
                                    <input
                                        type="email"
                                        value={formEmail}
                                        onChange={(e) => setFormEmail(e.target.value)}
                                        placeholder="e.g. jane.smith@uni.edu"
                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-accent transition-all"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Department</label>
                                        <select
                                            value={formDept}
                                            onChange={(e) => setFormDept(e.target.value)}
                                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-accent transition-all appearance-none"
                                        >
                                            {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Specialization</label>
                                        <input
                                            type="text"
                                            value={formSpec}
                                            onChange={(e) => setFormSpec(e.target.value)}
                                            placeholder="e.g. AI / ML"
                                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-accent transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-8">
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="flex-1 py-3.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] hover:bg-slate-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="flex-1 py-3.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.15em] shadow-xl hover:bg-black transition-all flex items-center justify-center gap-2"
                                >
                                    <CheckCircle size={14} />
                                    {editingInstructor ? "Save Changes" : "Create Instructor"}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation */}
            <AnimatePresence>
                {showDeleteConfirm !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowDeleteConfirm(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-sm p-8 text-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-500 mx-auto mb-5">
                                <Trash2 size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-primary-text tracking-tight mb-2">Remove Instructor</h3>
                            <p className="text-xs text-slate-500 mb-6">This action will permanently remove the faculty member account. This cannot be undone.</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDeleteConfirm(null)}
                                    className="flex-1 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] hover:bg-slate-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDelete(showDeleteConfirm)}
                                    className="flex-1 py-3 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.15em] shadow-xl hover:bg-red-700 transition-all"
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
