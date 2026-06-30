import { FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <Navbar />
            <section className="py-12 md:py-24 px-4 md:px-6">
                <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl shadow-xl p-5 md:p-12 border border-slate-100 dark:border-slate-800">

                    {/* Header */}
                    <div className="text-center mb-10 md:mb-12">
                        <div className="inline-flex items-center justify-center p-2.5 md:p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 mb-5 md:mb-6">
                            <FileText className="w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <h1 className="text-2xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3 md:mb-4">Terms of Service</h1>
                        <p className="text-sm md:text-lg text-slate-500 dark:text-slate-400">
                            Effective Date: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>

                    {/* Content */}
                    <div className="space-y-8 md:space-y-10 text-sm md:text-lg leading-relaxed text-slate-600 dark:text-slate-300">

                        <section>
                            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 md:mb-4">1. Acceptance of Terms</h2>
                            <p>
                                By engaging Venthra Solutions ("we", "us", or "our") for web development services, you ("client") agree to be bound by these Terms of Service. We are based in Bethamcherla and are dedicated to serving local businesses with high-quality digital solutions.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 md:mb-4">2. Services We Provide</h2>
                            <ul className="list-disc pl-6 space-y-2 mt-4 ml-4">
                                <li>Custom Web Development</li>
                                <li>High-Speed, 'Lag-Free' Websites</li>
                                <li>Progressive Web Apps (PWA)</li>
                                <li>Digital Ecosystem Building</li>
                            </ul>
                            <p className="mt-4 font-medium text-slate-900 dark:text-white">
                                We are committed to delivering <strong>premium quality</strong> and <strong>speedy performance</strong> for every project we undertake.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 md:mb-4">3. Payment Terms</h2>
                            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-5 md:p-6 rounded-xl border-l-4 border-emerald-500 mt-6">
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <span className="font-bold text-emerald-700 dark:text-emerald-400 text-lg md:text-xl">➤</span>
                                        <div>
                                            <strong className="block text-emerald-900 dark:text-emerald-100 mb-0.5 md:mb-1 text-base md:text-lg">Commencement:</strong>
                                            <span>Project work begins <strong>only after</strong> the initial 50% advance payment is confirmed via UPI.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="font-bold text-emerald-700 dark:text-emerald-400 text-lg md:text-xl">➤</span>
                                        <div>
                                            <strong className="block text-emerald-900 dark:text-emerald-100 mb-0.5 md:mb-1 text-base md:text-lg">Method:</strong>
                                            <span>All payments must be made via UPI Scanner / QR Code provided by us.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="font-bold text-emerald-700 dark:text-emerald-400 text-lg md:text-xl">➤</span>
                                        <div>
                                            <strong className="block text-emerald-900 dark:text-emerald-100 mb-0.5 md:mb-1 text-base md:text-lg">Completion:</strong>
                                            <span>The remaining 50% balance is due securely upon project completion, before final ownership transfer.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 md:mb-4">4. Ownership & Intellectual Property</h2>
                            <p>
                                Upon receipt of the <strong>final full payment</strong>, the client is granted full ownership of the final website design and code. Until full payment is made, all code, designs, and assets remain the property of Venthra Solutions.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 md:mb-4">5. Cancellation & Refunds</h2>
                            <ul className="list-disc pl-6 space-y-2 mt-4 ml-4">
                                <li><strong>Non-Refundable Deposit:</strong> Once the project work has commenced (after the initial payment), the deposit is non-refundable. This covers our specialized time, resources, and planning.</li>
                                <li><strong>Cancellation:</strong> If the client cancels the project midway, they may be liable for payment for all work completed up to that point.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 md:mb-4">6. Contact Us</h2>
                            <p>
                                If you have any questions, please contact us at:
                            </p>
                            <address className="not-italic mt-4 bg-slate-50 dark:bg-slate-800 p-5 md:p-6 rounded-xl border border-slate-200 dark:border-slate-700 text-sm md:text-base">
                                <strong>Venthra Solutions</strong><br />
                                Bethamcherla, Andhra Pradesh<br />
                                <a href="mailto:venthra.solutions@gmail.com" className="text-blue-600 hover:underline">venthra.solutions@gmail.com</a><br />
                                <a href="tel:+918309188820" className="text-blue-600 hover:underline">+91 83091 88820</a>
                            </address>
                        </section>

                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
