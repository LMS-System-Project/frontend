"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  GraduationCap, 
  Calendar, 
  Award, 
  Users, 
  Settings,
  Shield,
  BarChart2
} from "lucide-react";

interface SidebarProps {
  role: "student" | "instructor" | "admin";
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  const links = {
    student: [
      { name: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
      { name: "My Courses", href: "#", icon: BookOpen },
      { name: "Assignments", href: "#", icon: FileText },
      { name: "Grades", href: "#", icon: GraduationCap },
      { name: "Calendar", href: "#", icon: Calendar },
      { name: "Achievements", href: "#", icon: Award },
    ],
    instructor: [
      { name: "Dashboard", href: "/instructor/dashboard", icon: LayoutDashboard },
      { name: "My Courses", href: "#", icon: BookOpen },
      { name: "Students", href: "#", icon: Users },
      { name: "Grading", href: "#", icon: GraduationCap },
      { name: "Analytics", href: "/analytics", icon: BarChart2 },
      { name: "Settings", href: "#", icon: Settings },
    ],
    admin: [
      { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
      { name: "User Management", href: "#", icon: Users },
      { name: "Course Approval", href: "#", icon: BookOpen },
      { name: "Security", href: "#", icon: Shield },
      { name: "Analytics", href: "/analytics", icon: BarChart2 },
      { name: "Settings", href: "#", icon: Settings },
    ],
  };

  const currentLinks = links[role];

  return (
    <div className="w-full lg:w-64 flex-shrink-0 space-y-2">
      {/* Profile Summary */}
      <div className="flex items-center gap-3 p-3 mb-6">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white
          ${role === 'student' ? 'bg-gradient-to-br from-indigo-500 to-purple-600' : ''}
          ${role === 'instructor' ? 'bg-gradient-to-br from-emerald-500 to-teal-600' : ''}
          ${role === 'admin' ? 'bg-gradient-to-br from-rose-500 to-orange-600' : ''}
        `}>
          {role === 'student' && 'AJ'}
          {role === 'instructor' && 'DR'}
          {role === 'admin' && 'AD'}
        </div>
        <div>
          <p className="font-semibold capitalize">
            {role === 'student' && 'Alex Johnson'}
            {role === 'instructor' && 'Dr. Rachel Chen'}
            {role === 'admin' && 'Admin Portal'}
          </p>
          <p className="text-xs text-text-secondary capitalize">
            {role === 'student' && 'Computer Science'}
            {role === 'instructor' && 'CS Dept.'}
            {role === 'admin' && 'SysAdmin'}
          </p>
        </div>
      </div>

      {currentLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300
              ${isActive 
                ? "bg-indigo-500/15 border-l-2 border-indigo-500" 
                : "hover:bg-indigo-500/10"
              }`}
          >
            <link.icon className={`w-5 h-5 ${isActive ? "text-indigo-400" : "text-text-secondary"}`} />
            <span className={`text-sm ${isActive ? "font-medium text-text-primary" : "text-text-secondary"}`}>
              {link.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
