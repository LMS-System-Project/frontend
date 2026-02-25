"use client";

import { useState } from "react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import {
    Brain,
    Sparkles,
    FileUp,
    Wand2,
    FileText,
    ListChecks,
    MessageSquare,
    Save,
    Download,
    ArrowRight,
    Loader2,
    CheckCircle,
    ChevronRight,
    Target,
    Zap,
    History,
    RefreshCw,
    Plus,
    Minus,
    Copy,
    Share2,
    ShieldCheck
} from "lucide-react";

interface Question {
    id: string;
    type: "multiple_choice" | "true_false" | "short_answer";
    question: string;
    options?: string[];
    answer: string;
    explanation?: string;
}

export default function AssessmentGenerationPage() {
    const [step, setStep] = useState(1);
    const [generating, setGenerating] = useState(false);
    const [content, setContent] = useState("");
    const [assessmentType, setAssessmentType] = useState<"quiz" | "exam" | "rubric">("quiz");
    const [difficulty, setDifficulty] = useState<"normal" | "rigorous" | "elite">("normal");
    const [questionCount, setQuestionCount] = useState(5);
    const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);

    async function handleGenerate() {
        setGenerating(true);
        // Simulate AI processing delay
        await new Promise(resolve => setTimeout(resolve, 3000));

        const mockQuestions: Question[] = Array.from({ length: questionCount }).map((_, i) => ({
            id: `q-${i}`,
            type: "multiple_choice",
            question: `Generated question ${i + 1} based on ${content.substring(0, 20)}...`,
            options: ["Option Alpha", "Option Beta", "Option Gamma", "Option Delta"],
            answer: "Option Alpha",
            explanation: "The logic behind this generated question is derived from the core pedagogical vectors in your document."
        }));

        setGeneratedQuestions(mockQuestions);
        setGenerating(false);
        setStep(3);
    }

    return (
        <DashboardShell role="instructor">
            <div className="space-y-8 max-w-[1200px] mx-auto pb-20">
                {/* Module Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
                            <Brain size={14} className="text-accent" />
                            <span>Artificial Intelligence • Didactic Synthesis</span>
                        </div>
                        <h1 className="text-3xl font-bold text-primary-text tracking-tight uppercase italic underline decoration-slate-200">Smart Assessment</h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Synthesize <span className="text-accent font-bold italic">High-Fidelity Evaluations</span> from raw instructional artifacts.
                        </p>
                    </div>

                    <div className="flex gap-1 p-1 bg-slate-100 rounded-xl">
                        {[1, 2, 3].map((s) => (
                            <div
                                key={s}
                                className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${step === s ? "bg-white text-accent shadow-sm" : "text-slate-400"
                                    }`}
                            >
                                Phase 0{s}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Interaction Panel */}
                    <div className="lg:col-span-8 space-y-8">
                        {step === 1 && (
                            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm flex flex-col border-b-4 border-b-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-xl bg-accent/5 flex items-center justify-center text-accent border border-accent/10">
                                        <FileUp size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-primary-text tracking-tight uppercase italic decoration-slate-100">Ingest Source Intelligence</h3>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Paste text or reference a modular transcript</p>
                                    </div>
                                </div>

                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Input lecture transcripts, research notes, or textbook excerpts to extract evaluation vectors..."
                                    className="w-full h-[300px] p-6 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-accent transition-all italic leading-relaxed shadow-inner"
                                />

                                <div className="mt-8 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">Axiom Link Operational</span>
                                    </div>
                                    <button
                                        disabled={!content.trim()}
                                        onClick={() => setStep(2)}
                                        className="px-8 py-3.5 bg-accent text-white rounded-xl text-xs font-bold shadow-lg border border-slate-700 hover:bg-slate-800 transition-all flex items-center gap-2 disabled:opacity-50 uppercase tracking-[0.2em]"
                                    >
                                        Proceed to Parameterize
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm border-b-4 border-b-slate-100">
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100">
                                            <Target size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-primary-text tracking-tight uppercase italic decoration-slate-100">Configure Evaluation Matrix</h3>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Define the rigor and structure of the output</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-6">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Assessment Morphology</label>
                                                <div className="grid grid-cols-3 gap-2">
                                                    {(['quiz', 'exam', 'rubric'] as const).map(type => (
                                                        <button
                                                            key={type}
                                                            onClick={() => setAssessmentType(type)}
                                                            className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${assessmentType === type
                                                                ? 'bg-slate-900 text-white border-slate-800 shadow-lg'
                                                                : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
                                                                }`}
                                                        >
                                                            {type}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Rigor Coefficient</label>
                                                <div className="grid grid-cols-3 gap-2">
                                                    {(['normal', 'rigorous', 'elite'] as const).map(diff => (
                                                        <button
                                                            key={diff}
                                                            onClick={() => setDifficulty(diff)}
                                                            className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${difficulty === diff
                                                                ? 'bg-accent text-white border-slate-700 shadow-lg'
                                                                : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
                                                                }`}
                                                        >
                                                            {diff}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Quantum of Inquiries</label>
                                                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex items-center justify-between shadow-inner">
                                                    <button
                                                        onClick={() => setQuestionCount(Math.max(1, questionCount - 1))}
                                                        className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-400 flex items-center justify-center hover:text-red-500 hover:border-red-200 transition-all shadow-sm"
                                                    >
                                                        <Minus size={18} />
                                                    </button>
                                                    <div className="text-center">
                                                        <span className="text-3xl font-black text-primary-text italic">{questionCount}</span>
                                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Units</p>
                                                    </div>
                                                    <button
                                                        onClick={() => setQuestionCount(Math.min(20, questionCount + 1))}
                                                        className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-400 flex items-center justify-center hover:text-emerald-500 hover:border-emerald-200 transition-all shadow-sm"
                                                    >
                                                        <Plus size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
                                        <button
                                            onClick={() => setStep(1)}
                                            className="text-[10px] font-black text-slate-400 hover:text-primary-text uppercase tracking-widest flex items-center gap-2 transition-colors"
                                        >
                                            <ChevronRight className="rotate-180" size={14} />
                                            Revisit Intelligence
                                        </button>
                                        <button
                                            onClick={handleGenerate}
                                            disabled={generating}
                                            className="px-10 py-4 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-xl border border-slate-800 hover:bg-black transition-all flex items-center gap-3 uppercase tracking-[0.2em]"
                                        >
                                            {generating ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} className="text-accent" />}
                                            {generating ? "Synthesizing..." : "Initiate Synthesis"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm border-b-4 border-b-slate-100">
                                    <div className="bg-slate-900 p-8 flex items-center justify-between relative overflow-hidden">
                                        {/* Decorative grid */}
                                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '15px 15px' }} />

                                        <div className="relative z-10">
                                            <h3 className="text-xl font-bold text-white tracking-tight italic uppercase underline decoration-accent/30">Output Ledger</h3>
                                            <p className="text-[10px] text-accent font-black uppercase tracking-[0.3em] mt-1">AI-Generated Verification Ready</p>
                                        </div>
                                        <div className="flex gap-2 relative z-10">
                                            <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all shadow-sm">
                                                <Copy size={16} />
                                            </button>
                                            <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all shadow-sm">
                                                <Share2 size={16} />
                                            </button>
                                            <button className="px-6 py-2.5 bg-accent text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg border border-slate-800 hover:bg-slate-800 transition-all flex items-center gap-2">
                                                <Download size={14} />
                                                Commit to Registry
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-8 space-y-6">
                                        {generatedQuestions.map((q, i) => (
                                            <div key={q.id} className="p-6 bg-slate-50 border border-slate-200 rounded-2xl group hover:bg-white hover:shadow-sharp transition-all duration-300">
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic group-hover:text-accent transition-colors">Vector {i + 1}</span>
                                                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white border border-slate-100 italic">
                                                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Multiple Choice</span>
                                                    </div>
                                                </div>
                                                <h4 className="text-base font-bold text-primary-text tracking-tight mb-6 italic">{q.question}</h4>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                                                    {q.options?.map((opt, idx) => (
                                                        <div
                                                            key={idx}
                                                            className={`px-4 py-3 rounded-xl text-xs font-bold border transition-all ${opt === q.answer
                                                                ? 'bg-emerald-50 border-emerald-100 text-emerald-700'
                                                                : 'bg-white border-slate-200 text-slate-500 group-hover:border-slate-300'
                                                                }`}
                                                        >
                                                            <span className="text-[10px] font-black opacity-30 mr-2">{String.fromCharCode(65 + idx)}</span>
                                                            {opt}
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                                                    <div className="flex items-center gap-2 text-slate-400 group-hover:text-amber-600 transition-colors">
                                                        <Wand2 size={12} />
                                                        <span className="text-[9px] font-black uppercase tracking-widest">Logic Attribution</span>
                                                    </div>
                                                    <p className="text-[10px] text-slate-400 font-medium italic leading-relaxed">{q.explanation}</p>
                                                </div>
                                            </div>
                                        ))}

                                        <div className="pt-8 flex items-center justify-center">
                                            <button
                                                onClick={() => setStep(2)}
                                                className="px-8 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-400 hover:text-accent hover:border-accent transition-all flex items-center gap-2 uppercase tracking-widest shadow-sm"
                                            >
                                                <RefreshCw size={14} />
                                                Regenerate Matrix
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Information Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Status Hub */}
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-accent/30 transition-all duration-500" />
                            <h4 className="text-[10px] font-black text-accent uppercase tracking-[0.3em] mb-6 flex items-center gap-2 relative z-10">
                                <Zap size={14} />
                                Engine Status
                            </h4>

                            <div className="space-y-6 relative z-10">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Neural Link</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-black text-emerald-500 uppercase">Synchronous</span>
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Inference Latency</span>
                                    <span className="text-[10px] font-black text-white italic">142ms</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Model Precision</span>
                                    <span className="text-[10px] font-black text-accent italic">Elite (98.4%)</span>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/5 space-y-4 relative z-10">
                                <p className="text-[10px] text-slate-500 font-medium italic leading-relaxed">
                                    Synthetic assessment generation utilizes <span className="text-white">Multi-Vector Analysis</span> to ensure pedagogical alignment.
                                </p>
                                <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
                                        <ShieldCheck size={16} />
                                    </div>
                                    <span className="text-[9px] font-black text-white/80 uppercase tracking-widest">Verification Protocol Active</span>
                                </div>
                            </div>
                        </div>

                        {/* Recent History */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm border-b-4 border-b-slate-100">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <History size={14} className="text-accent" />
                                Synthesis Ledger
                            </h4>
                            <div className="space-y-4">
                                {[
                                    { title: "Quantum Dynamics Quiz", date: "2h ago", count: 10 },
                                    { title: "Linear Algebra Final", date: "Yesterday", count: 25 },
                                    { title: "Data Structures Rubric", date: "2d ago", count: 1 },
                                ].map((h, i) => (
                                    <div key={i} className="flex items-center justify-between group cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-accent transition-colors">
                                                <FileText size={14} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-primary-text group-hover:underline decoration-slate-200">{h.title}</p>
                                                <p className="text-[9px] font-bold text-slate-300 uppercase tracking-tighter mt-0.5">{h.count} Vectors • {h.date}</p>
                                            </div>
                                        </div>
                                        <ChevronRight size={14} className="text-slate-300 group-hover:text-accent transition-all transform group-hover:translate-x-1" />
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-6 py-2.5 rounded-xl border border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-slate-50 transition-all">View Audit Vault</button>
                        </div>

                        {/* Tip Center */}
                        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 relative overflow-hidden">
                            <div className="w-12 h-12 bg-amber-100 rounded-full blur-xl absolute -top-6 -right-6" />
                            <div className="flex items-center gap-2 text-amber-600 mb-3 relative z-10">
                                <Sparkles size={14} />
                                <span className="text-[10px] font-bold uppercase tracking-widest italic">Optimization Tip</span>
                            </div>
                            <p className="text-[10px] text-amber-800 font-medium leading-relaxed italic relative z-10">
                                For <span className="font-bold underline decoration-amber-200">Elite Level</span> rigor, ensure the source material includes context-rich examples and research paper citations.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}
