import { Shield, Trash2, Mail, MapPin, User, FileText, CreditCard } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
            <Navbar />
            <section className="py-12 md:py-24 px-4 md:px-6 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30">
                    <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                    <div className="absolute top-[30%] right-[10%] w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="bg-white dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-16 border border-slate-100 dark:border-slate-800 transition-all duration-300 hover:shadow-blue-500/10">
                        
                        {/* Header */}
                        <div className="text-center mb-12 md:mb-16">
                            <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 mb-6 group">
                                <Shield className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-500 group-hover:rotate-12" />
                            </div>
                            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
                                Privacy Policy
                            </h1>
                            <div className="flex items-center justify-center space-x-2 text-slate-500 dark:text-slate-400">
                                <span className="w-8 h-px bg-slate-200 dark:bg-slate-700"></span>
                                <p className="text-sm md:text-base font-medium">Last Updated: April 20, 2026</p>
                                <span className="w-8 h-px bg-slate-200 dark:bg-slate-700"></span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-12 text-slate-600 dark:text-slate-300">
                            
                            {/* Section 1 */}
                            <section className="group">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        1
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Introduction</h2>
                                </div>
                                <p className="text-lg leading-relaxed pl-13">
                                    Welcome to <span className="font-semibold text-blue-600 dark:text-blue-400">Venthra Solutions</span>. We provide digital services and business automation tools. This Privacy Policy explains how we collect, use, and protect your information when you use our mobile application and website.
                                </p>
                            </section>

                            {/* Section 2 */}
                            <section className="group">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        2
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Information We Collect</h2>
                                </div>
                                
                                <div className="grid gap-6 pl-13">
                                    <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-blue-500/50 transition-all">
                                        <div className="flex items-start space-x-4">
                                            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                                <User className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 dark:text-white mb-1">Account Information</h3>
                                                <p className="text-sm md:text-base opacity-80">Name, email address, and phone number.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-blue-500/50 transition-all">
                                        <div className="flex items-start space-x-4">
                                            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 dark:text-white mb-1">Business Data</h3>
                                                <p className="text-sm md:text-base opacity-80">Information provided for digital record-keeping (Digital Khata) and service subscriptions.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-blue-500/50 transition-all">
                                        <div className="flex items-start space-x-4">
                                            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                                                <CreditCard className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 dark:text-white mb-1">Payment Data</h3>
                                                <p className="text-sm md:text-base opacity-80">Securely processed via UPI. We do not store credit card or bank details (See Section 4).</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Section 3 */}
                            <section className="group">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white font-bold group-hover:bg-red-600 group-hover:text-white transition-colors">
                                        3
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Data Deletion & Account Removal</h2>
                                    <span className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider">Mandatory</span>
                                </div>
                                <div className="pl-13">
                                    <p className="text-lg leading-relaxed mb-6">
                                        Users have the right to request the deletion of their personal data. We ensure a transparent and swift process for data removal.
                                    </p>
                                    <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl p-6 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-10">
                                            <Trash2 className="w-12 h-12 text-red-600" />
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-center space-x-3">
                                                <Mail className="w-5 h-5 text-red-600 dark:text-red-400" />
                                                <p className="font-semibold text-slate-900 dark:text-white">
                                                    Email Request: <a href="mailto:charankumarkakarla985@gmail.com" className="text-red-600 dark:text-red-400 hover:underline">charankumarkakarla985@gmail.com</a>
                                                </p>
                                            </div>
                                            <p className="text-sm md:text-base">
                                                <strong>Process:</strong> Your account and all associated business data will be permanently removed from our servers within <span className="font-bold underline">48 hours</span>.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Section 4 */}
                            <section className="group">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        4
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Payment Security & UPI</h2>
                                </div>
                                <div className="pl-13 space-y-4">
                                    <p className="text-lg leading-relaxed">
                                        We prioritize secure transactions and <span className="font-bold text-slate-900 dark:text-white underline decoration-blue-500">do NOT store</span> sensitive financial data.
                                    </p>
                                    <div className="grid gap-4">
                                        <div className="flex items-start space-x-3">
                                            <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-600 shrink-0"></div>
                                            <p><span className="font-bold text-slate-900 dark:text-white">Direct UPI:</span> We accept payments strictly via UPI Scanner / QR Code.</p>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-600 shrink-0"></div>
                                            <p><span className="font-bold text-slate-900 dark:text-white">No Storage:</span> We do not collect or store Credit Card numbers, Debit Card details, or Net Banking passwords.</p>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-600 shrink-0"></div>
                                            <p><span className="font-bold text-slate-900 dark:text-white">External Processing:</span> All transactions are handled by your trusted UPI app (Google Pay, PhonePe, etc.).</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Section 5 */}
                            <section className="group">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        5
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Contact Us</h2>
                                </div>
                                <div className="pl-13 grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <User className="w-5 h-5 text-blue-600" />
                                            <span className="font-medium text-slate-900 dark:text-white">Kakarla Charan Kumar</span>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                                            <span className="text-sm md:text-base leading-snug">
                                                19-293 Sanjeevanagar, Betamcherla,<br />
                                                Andhra Pradesh - 518599
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="p-4 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/20 flex flex-col">
                                            <span className="text-xs uppercase font-bold opacity-80 mb-1">Direct Support</span>
                                            <a href="mailto:charankumarkakarla985@gmail.com" className="font-bold hover:underline">
                                                charankumarkakarla985@gmail.com
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    
                    {/* Trust Banner */}
                    <div className="mt-12 text-center">
                        <p className="text-slate-400 dark:text-slate-500 text-sm italic">
                            © 2026 Venthra Solutions. All rights reserved. Your trust is our priority.
                        </p>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
