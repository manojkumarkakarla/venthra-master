
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Shield, FileText } from "lucide-react"

export function PrivacyPolicy() {
    return (
        <Dialog>
            <DialogTrigger className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50 transition-colors">
                Privacy Policy
            </DialogTrigger>
            <DialogContent className="max-w-3xl h-[80vh] flex flex-col p-0 gap-0 overflow-hidden bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
                <DialogHeader className="p-6 pb-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                            <Shield className="w-5 h-5" />
                        </div>
                        <DialogTitle className="text-2xl font-bold">Privacy Policy</DialogTitle>
                    </div>
                    <DialogDescription className="text-base text-slate-500 dark:text-slate-400">
                        Transparency and trust are at the core of Venthra Solutions.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="flex-1 p-6">
                    <div className="space-y-6 text-slate-600 dark:text-slate-300">
                        <section className="space-y-3">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">1. Introduction</h3>
                            <p className="leading-relaxed">
                                Welcome to Venthra Solutions, based in Bethamcherla, Andhra Pradesh. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we handle your information when you use our web development services.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">2. Information We Collect</h3>
                            <p className="leading-relaxed">
                                We only collect essential information needed to communicate with you and deliver your project. This includes:
                            </p>
                            <ul className="list-disc pl-5 space-y-1 ml-2">
                                <li><strong>Contact Details:</strong> Your name, phone number, and email address.</li>
                                <li><strong>Project Requirements:</strong> Information about your business and website needs.</li>
                            </ul>
                            <p className="leading-relaxed bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-sm border-l-4 border-blue-500 mt-2">
                                <strong>Important:</strong> We do NOT collect or store sensitive financial data like Credit Card numbers, Debit Card details, or Net Banking passwords.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">3. Payment Security (UPI)</h3>
                            <p className="leading-relaxed">
                                At Venthra Solutions, we prioritize secure and simple transactions.
                            </p>
                            <ul className="list-disc pl-5 space-y-1 ml-2">
                                <li><strong>Direct UPI Payments:</strong> We accept payments directly via UPI Scanner / QR Code.</li>
                                <li><strong>No Third-Party Gateways:</strong> We do not use automated payment gateways that store card info.</li>
                                <li><strong>Your Security:</strong> All financial transactions are handled securely by your own trusted UPI app (Service Providers like PhonePe, Google Pay, Paytm, etc.). We simply receive the payment confirmation.</li>
                            </ul>
                        </section>

                        <section className="space-y-3">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">4. How We Use Your Data</h3>
                            <p className="leading-relaxed">
                                The contact information you provide is used strictly for:
                            </p>
                            <ul className="list-disc pl-5 space-y-1 ml-2">
                                <li>Discussing project details and updates.</li>
                                <li>Sending invoices and payment receipts.</li>
                                <li>Delivering the final website files and credentials.</li>
                            </ul>
                            <p className="leading-relaxed">
                                We do <strong>not</strong> sell, trade, or rent your personal identification information to others.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">5. Marketing Partnership</h3>
                            <p className="leading-relaxed">
                                We partner with local influencer <strong>Siddharth Hussain</strong> for marketing campaigns. Data shared for marketing purposes (like your business photos/videos) is done so only with your explicit consent and agreement.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">6. Contact Us</h3>
                            <p className="leading-relaxed">
                                If you have any questions about this Privacy Policy, please contact us at:<br />
                                <strong>Venthra Solutions</strong><br />
                                Bethamcherla, Andhra Pradesh<br />
                                Email: venthra.solutions@gmail.com<br />
                                Phone: +91 83091 88820
                            </p>
                        </section>
                    </div>
                </ScrollArea>
                <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-xs text-center text-slate-500 shrink-0">
                    Last Updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export function TermsOfService() {
    return (
        <Dialog>
            <DialogTrigger className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50 transition-colors">
                Terms of Service
            </DialogTrigger>
            <DialogContent className="max-w-3xl h-[80vh] flex flex-col p-0 gap-0 overflow-hidden bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
                <DialogHeader className="p-6 pb-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                            <FileText className="w-5 h-5" />
                        </div>
                        <DialogTitle className="text-2xl font-bold">Terms of Service</DialogTitle>
                    </div>
                    <DialogDescription className="text-base text-slate-500 dark:text-slate-400">
                        Clear, fair, and professional terms for a great partnership.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="flex-1 p-6">
                    <div className="space-y-6 text-slate-600 dark:text-slate-300">
                        <section className="space-y-3">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">1. Acceptance of Terms</h3>
                            <p className="leading-relaxed">
                                By engaging Venthra Solutions ("we", "us", or "our") for web development services, you ("client") agree to be bound by these Terms of Service. We are based in Bethamcherla and are dedicated to serving local businesses with high-quality digital solutions.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">2. Services We Provide</h3>
                            <p className="leading-relaxed">
                                We specialize in:
                            </p>
                            <ul className="list-disc pl-5 space-y-1 ml-2">
                                <li>Custom Web Development</li>
                                <li>High-Speed, 'Lag-Free' Websites</li>
                                <li>Progressive Web Apps (PWA)</li>
                                <li>Digital Ecosystem Building</li>
                            </ul>
                            <p className="leading-relaxed mt-2">
                                We are committed to delivering <strong>premium quality</strong> and <strong>speedy performance</strong> for every project we undertake.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">3. Payment Terms</h3>
                            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="font-bold text-emerald-700 dark:text-emerald-400">➤ Commencement:</span>
                                        <span>Project work begins <strong>only after</strong> the initial 50% advance payment is confirmed via UPI.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="font-bold text-emerald-700 dark:text-emerald-400">➤ Method:</span>
                                        <span>All payments must be made via UPI Scanner / QR Code provided by us.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="font-bold text-emerald-700 dark:text-emerald-400">➤ Completion:</span>
                                        <span>The remaining 50% balance is due upon project completion, before final handover.</span>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <section className="space-y-3">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">4. Ownership & Intellectual Property</h3>
                            <p className="leading-relaxed">
                                Upon receipt of the <strong>final full payment</strong>, the client is granted full ownership of the final website design and code. Until full payment is made, all code, designs, and assets remain the property of Venthra Solutions.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">5. Cancellation & Refunds</h3>
                            <p className="leading-relaxed">
                                Due to the custom nature of web development:
                            </p>
                            <ul className="list-disc pl-5 space-y-1 ml-2">
                                <li><strong>Non-Refundable Deposit:</strong> Once the project work has commenced (after the initial payment), the deposit is non-refundable. This covers the time, resources, and planning already invested.</li>
                                <li><strong>Cancellation:</strong> If the client cancels the project midway, they may be liable for payment for all work completed up to that point.</li>
                            </ul>
                        </section>

                        <section className="space-y-3">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">6. Marketing Services</h3>
                            <p className="leading-relaxed">
                                For packages involving marketing campaigns with <strong>Siddharth Hussain</strong>:
                            </p>
                            <ul className="list-disc pl-5 space-y-1 ml-2">
                                <li>Specific terms, deliverables, and timelines will be agreed upon separately in writing before the campaign begins.</li>
                                <li>Marketing fees are separate from web development fees unless part of a specific bundle.</li>
                            </ul>
                        </section>
                    </div>
                </ScrollArea>
                <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-xs text-center text-slate-500 shrink-0">
                    Last Updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </DialogContent>
        </Dialog>
    )
}
