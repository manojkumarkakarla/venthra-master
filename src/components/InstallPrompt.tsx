import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

const PLAY_STORE_LINK = "https://play.google.com/store/apps/details?id=app.vercel.venthrasolutions.twa&pcampaignid=web_share";

const InstallPrompt = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already dismissed it this session or in local storage
        const isDismissed = sessionStorage.getItem("vts_playstore_dismissed");

        // We can also check if they are already using an Android device or just show it anyway.
        // For now, show to everyone as requested.
        if (!isDismissed) {
            // Delay showing our prompt for better UX
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 5000); // Shows 5 seconds after they open the site

            return () => clearTimeout(timer);
        }
    }, []);

    const handleInstallClick = () => {
        // Open the Play Store link in a new tab
        window.open(PLAY_STORE_LINK, '_blank');
        
        setIsVisible(false);
        sessionStorage.setItem("vts_playstore_dismissed", "true");
    };

    const handleDismiss = () => {
        setIsVisible(false);
        sessionStorage.setItem("vts_playstore_dismissed", "true");
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-6 left-4 right-4 md:left-auto md:right-8 md:w-[350px] z-[200001] bg-white dark:bg-slate-900 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-200 dark:border-slate-800 p-4 rounded-2xl"
                >
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border border-slate-100 dark:border-slate-800 bg-white overflow-hidden">
                            <img src="/vts-logo.jpeg" alt="VTS Logo" className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-grow">
                            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Install VTS App</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 leading-relaxed">
                                Get our official app from the Google Play Store for the best experience.
                            </p>
                        </div>

                        <button
                            onClick={handleDismiss}
                            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full h-fit transition-colors"
                        >
                            <X className="w-4 h-4 text-slate-400" />
                        </button>
                    </div>

                    <div className="flex gap-3 mt-4">
                        <Button
                            variant="outline"
                            className="flex-1 text-xs h-9 rounded-lg"
                            onClick={handleDismiss}
                        >
                            Later
                        </Button>
                        <Button
                            className="flex-1 text-xs h-9 rounded-lg bg-[#001a4d] hover:bg-[#001a4d]/90 text-white shadow-md shadow-[#001a4d]/20"
                            onClick={handleInstallClick}
                        >
                            <Download className="w-3.5 h-3.5 mr-2" />
                            Install Now
                        </Button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default InstallPrompt;
