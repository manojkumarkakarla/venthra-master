import { Apple, Star, Download } from 'lucide-react';

const PlayStoreShowcase = () => {
    return (
        <section className="py-32 relative overflow-hidden bg-[#f8fafc] dark:bg-slate-950">
            {/* Static Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -left-40 w-[800px] h-[800px] bg-gradient-to-br from-teal-200/40 to-emerald-100/40 dark:from-teal-900/20 dark:to-emerald-900/20 rounded-full blur-[80px] opacity-60" />
                <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-blue-200/40 to-indigo-100/40 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full blur-[80px] opacity-60" />

                {/* Micro Grid */}
                <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(#14b8a6 1px, transparent 1px), linear-gradient(90deg, #14b8a6 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-4xl mx-auto mb-20 relative">
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white mb-8 tracking-tight leading-tight">
                        Your Brand, <br />
                        <span className="relative inline-block mt-2">
                            <span className="absolute -inset-2 bg-gradient-to-r from-teal-500/20 to-blue-500/20 blur-xl rounded-full" />
                            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-600">Everywhere.</span>
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        We transform your digital presence into powerful, native mobile experiences. Published directly to the world's largest app stores.
                    </p>
                </div>

                <div className="flex flex-col gap-10 items-center max-w-4xl mx-auto">

                    {/* Google Play Ecosystem */}
                    <div className="w-full relative group bg-white dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-700/50 p-8 sm:p-10 rounded-[3rem] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] transition-shadow duration-300 hover:shadow-[0_20px_50px_-20px_rgba(20,184,166,0.2)]">
                        <div className="relative z-10 flex flex-col h-full">
                            {/* Google Play Header */}
                            <div className="flex items-center justify-between mb-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 shadow-[0_0_20px_rgba(0,0,0,0.05)] dark:shadow-[0_0_20px_rgba(0,0,0,0.3)] flex items-center justify-center p-3">
                                        {/* Google Play Multi-color SVG */}
                                        <svg viewBox="0 0 512 512" className="w-full h-full ml-1">
                                            <path fill="#4caf50" d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0z" />
                                            <path fill="#ffeb3b" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z" />
                                            <path fill="#f44336" d="M425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8z" />
                                            <path fill="#2196f3" d="M104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Google Play</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="relative flex h-2.5 w-2.5">
                                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
                                            </span>
                                            <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest">Live Now</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="text-slate-600 dark:text-slate-400 mb-8 font-medium leading-relaxed">
                                Join our growing portfolio of high-performance apps actively deployed to millions of Android devices globally.
                            </p>

                            {/* Live Apps Showcase */}
                            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 mt-auto">

                                {/* App 1: Venthra Solutions */}
                                <a
                                    href="https://play.google.com/store/apps/details?id=app.vercel.venthrasolutions.twa"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block group/app bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-3xl transition-all duration-300 hover:border-teal-400/50"
                                >
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-16 h-16 shrink-0 rounded-[1.25rem] bg-slate-900 flex items-center justify-center">
                                                <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-blue-500/20 rounded-[1.25rem]" />
                                                <span className="text-2xl font-black text-white tracking-tighter">VS</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-lg font-bold text-slate-900 dark:text-white truncate">Venthra Solutions</h4>
                                                <div className="flex items-center gap-1.5 text-sm text-slate-500 mt-1">
                                                    <div className="flex text-amber-400 shrink-0">
                                                        <Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" />
                                                    </div>
                                                    <span className="opacity-50">•</span>
                                                    <span className="font-medium truncate">Business</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-center gap-2 px-3 py-2.5 bg-white dark:bg-slate-900 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 transition-colors border border-slate-100 dark:border-slate-800">
                                            <Download className="w-4 h-4" /> Install
                                        </div>
                                    </div>
                                </a>

                                {/* App 2: SSLN Cloth Store */}
                                <a
                                    href="https://play.google.com/store/apps/details?id=online.sslnclothstore.www.twa"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block group/app bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-3xl transition-all duration-300 hover:border-blue-400/50"
                                >
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-16 h-16 shrink-0 rounded-[1.25rem] bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center">
                                                <span className="text-2xl font-black text-white tracking-tighter">SC</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-lg font-bold text-slate-900 dark:text-white truncate">SSLN Cloth Store</h4>
                                                <div className="flex items-center gap-1.5 text-sm text-slate-500 mt-1">
                                                    <div className="flex text-amber-400 shrink-0">
                                                        <Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" />
                                                    </div>
                                                    <span className="opacity-50">•</span>
                                                    <span className="font-medium truncate">Shopping</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-center gap-2 px-3 py-2.5 bg-white dark:bg-slate-900 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 transition-colors border border-slate-100 dark:border-slate-800">
                                            <Download className="w-4 h-4" /> Install
                                        </div>
                                    </div>
                                </a>

                            </div>
                        </div>
                    </div>

                    {/* Apple App Store Ecosystem */}
                    <div className="w-full relative group bg-white dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-800 p-8 sm:p-10 rounded-[3rem] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] overflow-hidden cursor-pointer hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.2)] transition-shadow duration-300">
                        {/* Dramatic frosted glass overlay for normal state */}
                        <div className="absolute inset-0 bg-slate-50/50 dark:bg-slate-950/40 z-10 pointer-events-none transition-all duration-300 group-hover:opacity-0" />

                        {/* Theatre Reveal Effect for "IN PROGRESS" */}
                        <div className="absolute inset-0 z-40 pointer-events-none flex flex-col items-center justify-center overflow-hidden rounded-[3rem]">
                            {/* Darken Background on Hover */}
                            <div className="absolute inset-0 bg-slate-900/80 dark:bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Left Theatre Curtain */}
                            <div className="absolute top-0 left-0 w-1/2 h-full bg-slate-800 dark:bg-slate-950 border-r border-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 shadow-md z-40" />

                            {/* Right Theatre Curtain */}
                            <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-800 dark:bg-slate-950 border-l border-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300 shadow-md z-40" />

                            {/* The "IN PROGRESS" Text that reveals as curtains close */}
                            <div className="relative z-50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center">
                                <h2 className="text-4xl md:text-6xl font-black text-white tracking-[0.2em]">
                                    IN PROGRESS
                                </h2>
                                <div className="mt-4 flex gap-2">
                                    <div className="w-2 h-2 rounded-full bg-teal-400" />
                                    <div className="w-2 h-2 rounded-full bg-teal-400" />
                                    <div className="w-2 h-2 rounded-full bg-teal-400" />
                                </div>
                            </div>
                        </div>

                        <div className="relative z-20 flex flex-col h-full opacity-90 transition-all duration-300">

                            {/* Premium Available Soon Tag */}
                            <div className="absolute -top-4 -right-4 sm:top-0 sm:right-0 z-30">
                                <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white text-[10px] sm:text-xs font-bold px-4 py-2 rounded-bl-2xl rounded-tr-[2rem] shadow-sm border-l border-b border-slate-700/50">
                                    AVAILABLE SOON
                                </div>
                            </div>

                            {/* App Store Header */}
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 shadow-sm flex items-center justify-center p-3 border border-slate-200 dark:border-slate-700">
                                    <Apple className="w-8 h-8 text-slate-800 dark:text-slate-200 mb-1" fill="currentColor" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">App Store</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
                                        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Available Soon</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-slate-500 dark:text-slate-400 mb-12 font-medium leading-relaxed max-w-sm">
                                The ultimate native iOS experience is just around the corner. We are fine-tuning our engine to bring your business to iPhones and iPads flawlessly.
                            </p>

                            {/* Minimalist Phone Hologram */}
                            <div className="w-full flex justify-center mt-auto relative">
                                <div className="relative w-56 h-72 bg-gradient-to-b from-slate-100 to-transparent dark:from-slate-800/80 dark:to-transparent rounded-[2.5rem] border-[6px] border-slate-200 dark:border-slate-700 p-3 flex flex-col items-center">
                                    {/* Dynamic Island Notch */}
                                    <div className="w-20 h-5 bg-slate-800 dark:bg-black rounded-full mb-6 mt-1" />

                                    {/* Abstract App UI */}
                                    <div className="w-full space-y-4 px-2">
                                        <div className="w-full h-24 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700" />
                                        <div className="flex gap-3">
                                            <div className="w-1/2 h-12 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700" />
                                            <div className="w-1/2 h-12 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700" />
                                        </div>
                                    </div>

                                    {/* Glowing Home indicator */}
                                    <div className="absolute bottom-2 w-1/3 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default PlayStoreShowcase;
