import { useState, useEffect, useRef } from "react";
import vtsLogo from "@/assets/VTS_NEW_LOGO.png";
import { MessageSquare, X, Send, Bot, Sparkles, User, ChevronRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from 'react-markdown';
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Message {
    id: string;
    text: string;
    isBot: boolean;
    timestamp: Date;
}

// Initialize Gemini API
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

const systemInstruction = `
You are the official AI Assistant for **Venthra Solutions (VTS)**, a top-tier digital agency.
Your role is to act as an expert, polite, and persuasive digital architect and sales representative. Your goal is to WOW the user and convert them into a client.

🎯 **YOUR PERSONALITY & TONE:**
- **Dynamic & Attractive**: Speak with enthusiasm, confidence, and warmth. Use beautiful, modern phrasing (e.g., "digital masterpiece," "blazing fast," "pixel-perfect").
- **Engaging**: Always try to keep the conversation moving. End your answers with a polite, engaging question (e.g., "What kind of business do you run?" or "Would you like me to recommend a package?").
- **Formatting**: Use Markdown extensively. Use **bold text** for emphasis, bullet points for readability, and well-chosen emojis to make the text visually appealing (but don't overdo it).

🏢 **CRITICAL INFORMATION ABOUT VENTHRA SOLUTIONS:**
- **Tagline**: *"Mee kalalaki maa technology thodu"* (Your dreams, supported by our technology). Use this to build an emotional connection.
- **Founder**: Kakarla Charan Kumar, a visionary Full Stack Architect from Bethamcherla. He is obsessed with zero-lag performance and premium UI.
- **Location**: Headquartered in Bethamcherla, Nandyal District, Andhra Pradesh. We serve clients globally!
- **Core Advantage**: Zero Lag Architecture, Premium Design, 1 Year Free Hosting & Domain, Local Support.
- **Contact**: Call/WhatsApp: +91 8309188820 | Email: contact@venthra.solutions

💰 **PRICING PACKAGES (Always mention that they include 1 Year Free Hosting, Domain, and SSL):**
1. 🚀 **Starter Launch**: ₹6,499 (Single Page Landing)
2. ✨ **Startup Spark**: ₹11,999 (2-3 Pages, Basic Presence)
3. ⚡ **Business Pro**: ₹20,999 (Up to 5 Pages, SEO + Animations)
4. 📈 **Growth System**: ₹29,999 (Dynamic with Admin/Login)
5. 🏢 **Enterprise Logic**: ₹39,999 (Full Stack, Billing & AI)
6. 🌐 **Ultimate Scale**: ₹54,999 (Custom Ecosystem + AI + Mobile App)
- 📱 **Add-on**: Play Store Mobile App is just +₹6,000 for any plan.

🏆 **PORTFOLIO / SUCCESS STORIES:**
- **Vali Hotel**: Digitizing the authentic taste of Bethamcherla.
- **Sri Krishna Collections**: A royal luxury jewelry store experience.
- **El Shaddai Grace**: A beautiful digital sanctuary for ministry & university.
- **SSLN Cloth Store**: High-performance textile eCommerce.
- **Siddharth Hussain**: High-end personal branding.

💻 **OUR TECH STACK (Why we are the best):**
- **Frontend**: React & Next.js for blazing fast load times.
- **Styling**: Tailwind CSS & Framer Motion for buttery-smooth animations.
- **Backend**: Node.js & Express. Database: Supabase/Firebase/MongoDB.

⏱️ **DELIVERY TIMELINES:**
- Landing Pages: 3-5 Days
- Business Sites: 7-10 Days
- eCommerce: 14-21 Days
- Custom Full-Stack: 3-5 Weeks

🚨 **CRITICAL RULES:**
1. **EXTREME BREVITY (CRITICAL)**: Keep your responses VERY short, concise, and punchy. Do not write long paragraphs. Deliver all necessary details in a small, compact message (maximum 3-4 sentences or a quick bulleted list). Get straight to the point.
2. Never invent prices, services, or timelines not listed here.
3. If a user asks for pricing, ask them what kind of business they have first, then recommend the 1 or 2 best packages (don't dump the whole list unless they ask for all).
4. If they are ready to start, push them strongly but politely to call/whatsapp **+91 8309188820**.
`;

const VTSAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            text: "👋 Namaste! I'm your AI Assistant from Venthra Solutions.\n\n✨ **\"Mee kalalaki maa technology thodu\"** — We transform local dreams into global brands with pixel-perfect, clean code.\n\nAsk me anything about our pricing, tech stack, or how we can build your dream project!",
            isBot: true,
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [chatSession, setChatSession] = useState<any>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initialize chat session once when component mounts
        try {
            if (API_KEY) {
                const model = genAI.getGenerativeModel({
                    model: "gemini-2.5-flash",
                    systemInstruction: systemInstruction,
                });
                setChatSession(model.startChat({
                    history: [],
                }));
            }
        } catch (e) {
            console.error("Failed to initialize Gemini AI", e);
        }
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const [showPulse, setShowPulse] = useState(false);
    useEffect(() => {
        if (isOpen) return;
        const interval = setInterval(() => {
            setShowPulse(true);
            setTimeout(() => setShowPulse(false), 4000);
        }, 15000);
        return () => clearInterval(interval);
    }, [isOpen]);

    useEffect(() => {
        const html = document.documentElement;
        const body = document.body;
        if (isOpen) {
            html.classList.add('no-scroll');
            body.classList.add('no-scroll');
        } else {
            html.classList.remove('no-scroll');
            body.classList.remove('no-scroll');
        }
        return () => {
            html.classList.remove('no-scroll');
            body.classList.remove('no-scroll');
        };
    }, [isOpen]);

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleSendMessage = async (text: string) => {
        if (!text.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: text,
            isBot: false,
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMsg]);
        setInputValue("");
        setIsTyping(true);

        try {
            if (!API_KEY) {
                throw new Error("API key is missing! Please set VITE_GEMINI_API_KEY in your .env file.");
            }

            if (!chatSession) {
                throw new Error("AI Chat session not initialized.");
            }

            const result = await chatSession.sendMessage(text);
            const responseText = result.response.text();

            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: responseText,
                isBot: true,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMsg]);
        } catch (error: any) {
            console.error("AI Error:", error);
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: "⚠️ Oops! " + (error.message || "I encountered an error connecting to my brain. Please try again or call us directly!"),
                isBot: true,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    const QuickButton = ({ text, query }: { text: string; query: string }) => (
        <button
            onClick={() => handleSendMessage(query)}
            disabled={isTyping}
            className="text-left text-[10px] bg-teal-50 hover:bg-teal-100 disabled:opacity-50 text-teal-900 border border-teal-200 px-2 py-1 rounded-md transition-all duration-200 hover:scale-[1.02] active:scale-95 flex items-center justify-between group"
        >
            {text}
            <ChevronRight className="w-2.5 h-2.5 text-teal-400 group-hover:text-teal-600" />
        </button>
    );

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed z-[99999] flex flex-col overflow-hidden font-sans bg-white backdrop-blur-xl border border-slate-200 shadow-2xl transition-all duration-300 rounded-2xl bottom-4 right-4 sm:bottom-6 sm:right-6 w-[92vw] sm:w-[380px] max-w-[400px] h-[80dvh] max-h-[600px] origin-bottom-right"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-4 flex items-center justify-between shadow-lg shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm border border-white/30">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm tracking-wide">VTS AI Assistant</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className={cn("w-1.5 h-1.5 rounded-full", API_KEY ? "bg-emerald-400 animate-pulse" : "bg-red-500")} />
                                        <span className="text-white text-[10px] font-bold uppercase tracking-wider">{API_KEY ? "Online" : "API Key Missing"}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <a
                                    href="tel:8309188820"
                                    className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 border border-white/20 hover:border-white/40"
                                    aria-label="Call now"
                                >
                                    <Phone className="w-3.5 h-3.5" />
                                    <span className="text-[10px] font-bold uppercase tracking-wide">Call</span>
                                </a>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                                    aria-label="Close chat"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={scrollContainerRef}
                            className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4 bg-slate-50 overscroll-contain premium-scrollbar pt-6 touch-pan-y"
                            style={{ WebkitOverflowScrolling: 'touch' }}
                        >
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={cn(
                                        "flex w-full px-1",
                                        msg.isBot ? "justify-start" : "justify-end"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed shadow-sm relative",
                                            msg.isBot
                                                ? "bg-white text-slate-700 rounded-tl-none border border-slate-200 prose prose-p:text-xs prose-li:text-xs prose-headings:text-sm prose-strong:text-xs max-w-none prose-p:my-1 prose-ul:my-1"
                                                : "bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-tr-none shadow-teal-900/10"
                                        )}
                                    >
                                        {msg.isBot ? (
                                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                                        ) : (
                                            <p className="whitespace-pre-line">{msg.text}</p>
                                        )}
                                        <span className={cn(
                                            "text-[10px] absolute -bottom-5",
                                            msg.isBot ? "left-0 text-slate-400" : "right-0 text-slate-400"
                                        )}>
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm flex gap-1 items-center">
                                        <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {!isTyping && messages[messages.length - 1]?.isBot && (
                            <div className="px-3 pb-2 bg-slate-50 pt-1">
                                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Quick Questions</p>
                                <div className="grid grid-cols-2 gap-1">
                                    <QuickButton text="💰 View Pricing" query="pricing" />
                                    <QuickButton text="📞 Contact Us" query="contact" />
                                    <QuickButton text="🚀 Tech Stack" query="full stack" />
                                    <QuickButton text="📱 Mobile App" query="app" />
                                    <QuickButton text="👤 Meet Founder" query="founder" />
                                    <QuickButton text="🛒 eCommerce" query="ecommerce" />
                                    <QuickButton text="💼 Admin Panel" query="admin dashboard" />
                                </div>
                            </div>
                        )}

                        {/* Input Area */}
                        <div className="p-3 bg-white border-t border-slate-200 shrink-0">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSendMessage(inputValue);
                                }}
                                className="flex items-center gap-2"
                            >
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1 bg-slate-100 border-none rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 text-slate-900 placeholder:text-slate-500"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim() || isTyping}
                                    className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-full transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center transform group"
                                >
                                    <Send className="w-4 h-4 ml-0.5" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="fixed bottom-6 right-6 z-[99999] group"
                    >
                        <div className={cn(
                            "absolute -inset-3 bg-teal-500/20 rounded-full blur-xl transition-all duration-1000",
                            showPulse ? "opacity-100 scale-110" : "opacity-0 scale-100"
                        )} />

                        <button
                            onClick={() => setIsOpen(true)}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className="relative bg-gradient-to-r from-teal-500 to-blue-600 text-white p-3 rounded-full shadow-[0_10px_40px_-10px_rgba(20,184,166,0.5)] hover:shadow-[0_20px_60px_-10px_rgba(20,184,166,0.7)] transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 active:translate-y-0 active:scale-100 border-2 border-teal-300/50 hover:border-white flex items-center justify-center overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <motion.div
                                animate={{
                                    y: [0, -8, 0, -5, 0]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    repeatDelay: 0.5,
                                    ease: "easeInOut"
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 100 100"
                                    className="w-6 h-6 relative z-10 drop-shadow-xl"
                                >
                                    <defs>
                                        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#f8fafc" />
                                            <stop offset="100%" stopColor="#cbd5e1" />
                                        </linearGradient>
                                        <linearGradient id="blueGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#2dd4bf" />
                                            <stop offset="100%" stopColor="#0ea5e9" />
                                        </linearGradient>
                                    </defs>

                                    <path d="M40 85 L40 95" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
                                    <path d="M60 85 L60 95" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />

                                    <rect x="35" y="55" width="30" height="30" rx="6" fill="url(#bodyGrad)" stroke="#475569" strokeWidth="1.5" />
                                    <circle cx="50" cy="70" r="5" fill="url(#blueGlow)" />

                                    <path d="M35 60 Q 25 65 20 55" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" fill="none" />
                                    <circle cx="20" cy="55" r="3" fill="#94a3b8" />

                                    <path d="M65 60 Q 75 65 80 55" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" fill="none" />
                                    <circle cx="80" cy="55" r="3" fill="#94a3b8" />

                                    <rect x="45" y="48" width="10" height="8" fill="#64748b" />

                                    <rect x="30" y="20" width="40" height="32" rx="10" fill="url(#bodyGrad)" stroke="#475569" strokeWidth="1.5" />

                                    <rect x="36" y="28" width="28" height="18" rx="4" fill="#1e293b" />

                                    <circle cx="43" cy="35" r="2.5" fill="#14b8a6" />
                                    <circle cx="57" cy="35" r="2.5" fill="#14b8a6" />

                                    <path d="M 43 40 Q 50 44 57 40" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" fill="none" />

                                    <line x1="50" y1="20" x2="50" y2="10" stroke="#64748b" strokeWidth="2" />
                                    <circle cx="50" cy="8" r="2" fill="#14b8a6" className="animate-ping" />
                                    <circle cx="50" cy="8" r="2" fill="#14b8a6" />
                                </svg>
                            </motion.div>

                            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-teal-500 border-2 border-slate-900 rounded-full flex items-center justify-center z-20">
                                <span className="w-full h-full rounded-full bg-teal-500 animate-ping opacity-75 absolute" />
                            </span>
                        </button>

                        <AnimatePresence>
                            {(showPulse || isHovered) && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: -10, scale: 0.95 }}
                                    className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-slate-900 px-4 py-2 rounded-xl shadow-xl border border-slate-200 whitespace-nowrap flex items-center gap-2"
                                >
                                    <span className="text-sm font-bold">Hi! 👋 Ask me everything about VTS</span>
                                    <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-white transform rotate-45 border-t border-r border-slate-200" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default VTSAssistant;
