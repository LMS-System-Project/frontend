"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Lock, User, Github } from "lucide-react";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="min-h-screen pt-20 pb-12 flex items-center justify-center relative overflow-hidden hero-gradient">
        {/* Background blobs similar to hero */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-delay"></div>

        <div className="w-full max-w-md mx-4 relative z-10">
           <div className="gradient-border p-8 bg-background-card/80 backdrop-blur-xl shadow-2xl">
              <Link href="/" className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors text-text-secondary">
                  <ArrowLeft className="w-5 h-5" />
              </Link>
              
              <div className="text-center mb-8">
                  <div className="w-12 h-12 rounded-xl animated-gradient flex items-center justify-center mx-auto mb-4">
                     <span className="text-lg font-bold text-white">GF</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">
                      {isRegister ? "Create an Account" : "Welcome Back"}
                  </h2>
                  <p className="text-text-secondary text-sm">
                      {isRegister ? "Join thousands of learners today" : "Sign in to continue your progress"}
                  </p>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  {isRegister && (
                      <div className="space-y-1">
                          <label className="text-sm font-medium ml-1">Full Name</label>
                          <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                              <input type="text" className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:bg-white/10 transition-colors outline-none" placeholder="John Doe" />
                          </div>
                      </div>
                  )}

                  <div className="space-y-1">
                      <label className="text-sm font-medium ml-1">Email</label>
                      <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                          <input type="email" className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:bg-white/10 transition-colors outline-none" placeholder="you@example.com" />
                      </div>
                  </div>

                  <div className="space-y-1">
                      <label className="text-sm font-medium ml-1">Password</label>
                      <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                          <input type="password" className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:bg-white/10 transition-colors outline-none" placeholder="••••••••" />
                      </div>
                  </div>

                  {!isRegister && (
                      <div className="flex justify-end">
                          <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300">Forgot password?</a>
                      </div>
                  )}

                  <button className="w-full btn-primary py-3 rounded-xl font-semibold text-white mt-2">
                      {isRegister ? "Sign Up" : "Sign In"}
                  </button>
              </form>

              <div className="mt-8 text-center space-y-4">
                  <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-white/10"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-background-card text-text-secondary">Or continue with</span>
                      </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                      <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 transition-colors">
                          <Github className="w-5 h-5" />
                          <span className="text-sm font-medium">GitHub</span>
                      </button>
                      <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 transition-colors">
                          <span className="text-lg font-bold">G</span>
                          <span className="text-sm font-medium">Google</span>
                      </button>
                  </div>

                  <p className="text-sm text-text-secondary">
                      {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
                      <button onClick={() => setIsRegister(!isRegister)} className="text-indigo-400 font-medium hover:text-indigo-300">
                          {isRegister ? "Sign In" : "Sign Up"}
                      </button>
                  </p>
              </div>
           </div>
        </div>
    </div>
  );
}
