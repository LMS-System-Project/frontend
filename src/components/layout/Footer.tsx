import Link from "next/link";
import { BookOpen, Mail, Phone, Twitter, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-accent text-white py-20 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="bg-white p-1.5 rounded">
                <BookOpen size={20} className="text-accent" />
              </div>
              <span className="text-xl font-bold tracking-tight">GradeFlow</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              The professional standard for institutional learning and management lifecycle systems.
            </p>
            <div className="space-y-3">
              <a href="mailto:contact@gradeflow.edu" className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors">
                <Mail size={16} />
                contact@gradeflow.edu
              </a>
              <a href="tel:+15550123456" className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors">
                <Phone size={16} />
                +1 (555) 012-3456
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 col-span-1 md:col-span-3 gap-8">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">Platform</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><Link href="/guide" className="hover:text-white transition-colors">See How It Works</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Start Learning</Link></li>
                <li><Link href="/instructor/login" className="hover:text-white transition-colors">Admin Portal</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">Resources</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><Link href="#" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">API Status</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">Connect</h4>
              <div className="flex gap-4">
                {[Twitter, Github, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 border border-slate-700 rounded flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-all">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
          <p>© {new Date().getFullYear()} GradeFlow Academic Systems. All rights reserved.</p>
          <p className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Security</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
