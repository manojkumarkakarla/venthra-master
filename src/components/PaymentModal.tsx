import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, ShieldCheck, CreditCard, X, Zap } from "lucide-react";
import { QRCodeSVG as QRCode } from "qrcode.react";

interface PaymentModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    pkg: {
        title: string;
        price: string;
    } | null;
}

const PaymentModal = ({ open, onOpenChange, pkg }: PaymentModalProps) => {
    useEffect(() => {
        if (!open) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onOpenChange(false);
        };
        document.addEventListener("keydown", handleEscape);
        document.body.classList.add('no-scroll');

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.classList.remove('no-scroll');
        };
    }, [open, onOpenChange]);

    if (!open || !pkg) return null;

    // Parse price
    const priceNumber = parseInt(pkg.price.replace(/[^0-9]/g, ''));
    const firstInstallment = Math.round(priceNumber / 2);

    // Format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div
            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto"
            data-lenis-prevent
            onClick={() => onOpenChange(false)}
        >
            <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 py-10">
                <div
                    className="relative w-full max-w-[500px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-elevated animate-scale-in"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="p-6 pb-2">
                        <div className="flex justify-between items-start mb-1">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Secure Payment</h2>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">
                                    Complete your purchase for <span className="font-semibold text-slate-900 dark:text-white">{pkg.title}</span>
                                </p>
                            </div>
                            <button
                                onClick={() => onOpenChange(false)}
                                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 pt-2 space-y-6">
                        {/* Order Summary */}
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-slate-600 dark:text-slate-400">Package Total</span>
                                <span className="text-lg font-bold text-slate-900 dark:text-white">{pkg.price}</span>
                            </div>
                            <div className="w-full h-px bg-slate-200 dark:bg-slate-800 my-3" />

                            {/* Installment Plan */}
                            <div className="space-y-3">
                                <h4 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2 text-sm">
                                    <ShieldCheck className="w-4 h-4 text-green-500" />
                                    Flexible Payment Plan Active
                                </h4>

                                <div className="flex justify-between items-center p-4 rounded-lg bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/30 shadow-sm relative overflow-hidden">
                                    <div className="absolute left-0 top-0 w-1 h-full bg-blue-600"></div>
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white text-sm">First Installment (50%)</p>
                                        <p className="text-xs text-slate-500">Due Now to Start Project</p>
                                    </div>
                                    <span className="text-xl font-bold text-blue-600">{formatCurrency(firstInstallment)}</span>
                                </div>

                                <div className="flex justify-between items-center p-3 rounded-lg opacity-70 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                                    <div>
                                        <p className="font-medium text-slate-700 dark:text-slate-300 text-sm">Second Installment (50%)</p>
                                        <p className="text-xs text-slate-500">Due on Project Completion</p>
                                    </div>
                                    <span className="font-semibold text-slate-600 dark:text-slate-400 text-sm">{formatCurrency(firstInstallment)}</span>
                                </div>
                            </div>
                        </div>

                        {/* UPI QR Code */}
                        <div className="flex flex-col items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <CreditCard className="w-4 h-4 text-purple-600" />
                                Scan to Pay <span className="text-purple-600">{formatCurrency(firstInstallment)}</span>
                            </h4>

                            <div className="bg-white p-3 rounded-xl shadow-md border border-slate-100 mb-4">
                                <QRCode
                                    value={`upi://pay?pa=8309188820-3@axl&pn=KAKARLA%20CHARAN%20KUMAR&am=${firstInstallment}&cu=INR`}
                                    size={180}
                                    level={"H"}
                                />
                            </div>

                            <p className="text-xs text-slate-500 text-center max-w-[200px]">
                                Scan with PhonePe, GPay, Paytm or any UPI app
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-4">
                            <Button
                                className="w-full py-6 text-lg font-black bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                                onClick={() => {
                                    window.location.href = `upi://pay?pa=8309188820-3@axl&pn=KAKARLA%20CHARAN%20KUMAR&am=${firstInstallment}&cu=INR`;
                                }}
                            >
                                <Zap className="w-5 h-5 text-yellow-400 group-hover:scale-125 transition-transform" />
                                PAY WITH UPI (MOBILE)
                            </Button>

                            <Button
                                className="w-full py-6 text-lg font-bold bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                                onClick={() => window.open(`https://wa.me/918309188820?text=Hi, I have made the payment of ${formatCurrency(firstInstallment)} for ${pkg.title}. Here is the screenshot.`, '_blank')}
                            >
                                SHARE SCREENSHOT
                                <Check className="w-5 h-5 ml-2" />
                            </Button>

                            <p className="text-[10px] text-center text-slate-400 leading-tight uppercase font-bold tracking-widest">
                                Secure SSL Encryption • Venthra Solutions
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;
