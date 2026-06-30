import { useState, useEffect } from "react";
import { Bell, BellRing, X } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

// Utility to convert base64 to Uint8Array
const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};

const NotificationPrompt = () => {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if already subscribed
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            navigator.serviceWorker.ready.then(registration => {
                registration.pushManager.getSubscription().then(subscription => {
                    if (subscription) {
                        setIsSubscribed(true);
                    } else {
                        // Check if we haven't dismissed it
                        const isDismissed = sessionStorage.getItem("vts_notification_dismissed");
                        if (!isDismissed && Notification.permission !== 'denied') {
                            const timer = setTimeout(() => {
                                setIsVisible(true);
                            }, 8000); // Show after 8 seconds
                            return () => clearTimeout(timer);
                        }
                    }
                });
            });
        }
    }, []);

    const subscribeToNotifications = async () => {
        if (!('serviceWorker' in navigator)) {
            toast.error('Service Worker not supported');
            return;
        }

        try {
            const registration = await navigator.serviceWorker.ready;
            
            // Get public key from server
            let response;
            try {
                // In production, you would fetch from your backend URL
                response = await fetch('http://localhost:3000/api/vapidPublicKey');
            } catch (e) {
                // Fallback to proxy path
                response = await fetch('/api/vapidPublicKey');
            }
            if (!response.ok) throw new Error('Failed to fetch VAPID key');
            const vapidPublicKey = await response.text();
            
            const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: convertedVapidKey
            });

            // Send subscription to server
            let subscribeRes;
            try {
                subscribeRes = await fetch('http://localhost:3000/api/subscribe', {
                    method: 'POST',
                    body: JSON.stringify(subscription),
                    headers: { 'content-type': 'application/json' }
                });
            } catch (e) {
                subscribeRes = await fetch('/api/subscribe', {
                    method: 'POST',
                    body: JSON.stringify(subscription),
                    headers: { 'content-type': 'application/json' }
                });
            }
            if (!subscribeRes.ok) throw new Error('Failed to save subscription to server');

            setIsSubscribed(true);
            setIsVisible(false);
            toast.success('Successfully subscribed to notifications!');
        } catch (error) {
            console.error('Failed to subscribe:', error);
            toast.error('Failed to subscribe to notifications.');
        }
    };

    const handleDismiss = () => {
        setIsVisible(false);
        sessionStorage.setItem("vts_notification_dismissed", "true");
    };

    if (isSubscribed) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-6 left-4 right-4 md:left-8 md:right-auto md:w-[350px] z-[200001] bg-white dark:bg-slate-900 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-200 dark:border-slate-800 p-4 rounded-2xl"
                >
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border border-slate-100 dark:border-slate-800 bg-white overflow-hidden">
                            <img src="/vts-logo.jpeg" alt="VTS Logo" className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-grow">
                            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Get Notifications</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 leading-relaxed">
                                Never miss an update on your projects or new services.
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
                            Not Now
                        </Button>
                        <Button
                            className="flex-1 text-xs h-9 rounded-lg bg-[#001a4d] hover:bg-[#001a4d]/90 text-white shadow-md shadow-[#001a4d]/20"
                            onClick={subscribeToNotifications}
                        >
                            <Bell className="w-3.5 h-3.5 mr-2" />
                            Enable
                        </Button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default NotificationPrompt;
