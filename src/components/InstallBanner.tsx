import { useState, useEffect } from 'react';

import { Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed';
        platform: string;
    }>;
    prompt(): Promise<void>;
}

const InstallBanner = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handler = (e: Event) => {
            const installEvent = e as BeforeInstallPromptEvent;
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            installEvent.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(installEvent);
            // Check if user has already dismissed it this session
            const isDismissed = sessionStorage.getItem('vts_install_dismissed');
            if (!isDismissed) {
                setIsVisible(true);
            }
        };

        window.addEventListener('beforeinstallprompt', handler);

        // Also show if it's already installable but we missed the event
        // or for iOS detection (simulated)
        const timer = setTimeout(() => {
            if (!window.matchMedia('(display-mode: standalone)').matches) {
                // If not already installed, show a custom banner for iOS or others
                // that don't support beforeinstallprompt
                const isDismissed = sessionStorage.getItem('vts_install_dismissed');
                if (!isDismissed && !deferredPrompt) {
                    // On iOS, beforeinstallprompt isn't supported, 
                    // we could show instructions here if we detect iOS
                    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
                    if (isIOS) {
                        setIsVisible(true);
                    }
                }
            }
        }, 5000);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
            clearTimeout(timer);
        };
    }, [deferredPrompt]);

    const handleInstallClick = async () => {
        if (!deferredPrompt) {
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
            if (isIOS) {
                alert('To install: Tap the "Share" icon at the bottom and then "Add to Home Screen"');
            }
            return;
        }

        // Show the prompt
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);

        // We've used the prompt, and can't use it again, throw it away
        setDeferredPrompt(null);
        setIsVisible(false);
    };

    const dismissBanner = () => {
        setIsVisible(false);
        sessionStorage.setItem('vts_install_dismissed', 'true');
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    className="fixed top-0 left-0 right-0 z-[200] p-4 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-2xl"
                >
                    <div className="container mx-auto flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                                <Download className="w-5 h-5 text-white" />
                            </div>
                            <div className="hidden sm:block">
                                <h3 className="text-sm font-bold text-white">Install Venthra Solutions</h3>
                                <p className="text-xs text-blue-200">Get the best experience on your home screen</p>
                            </div>
                            <div className="sm:hidden">
                                <h3 className="text-sm font-bold text-white">Install App</h3>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleInstallClick}
                                className="px-4 py-2 bg-white text-blue-900 text-xs font-bold rounded-full hover:bg-blue-50 transition-colors shadow-lg active:scale-95"
                            >
                                INSTALL
                            </button>
                            <button
                                onClick={dismissBanner}
                                className="p-2 text-white/60 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default InstallBanner;
