/**
 * HOME TAB — mirrors the Venthra Solutions website home page
 * Sections: Navbar · Hero · Stats · Packages · FAQ · Contact · Footer
 */
import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Dimensions, Animated, Linking,
  StatusBar, ImageBackground, Modal, Pressable,
  Platform, useWindowDimensions, Image, Easing,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const { width: W } = Dimensions.get('window');

/* ─── Brand Palette (exact website values) ─── */
const P = {
  bg: '#020617',   // slate-950
  card: '#0f172a',   // slate-900
  card2: '#111827',   // gray-900
  blue: '#3b82f6',   // blue-500
  blueD: '#1d4ed8',   // blue-700
  blueL: '#60a5fa',   // blue-400
  indigoL: '#a5b4fc',   // indigo-300
  purple: '#7c3aed',
  pink: '#ec4899',
  cyan: '#22d3ee',
  teal: '#14b8a6',
  green: '#16a34a',
  white: '#ffffff',
  muted: '#94a3b8',   // slate-400
  mutedD: '#475569',   // slate-600
  border: 'rgba(255,255,255,0.08)',
  borderB: 'rgba(59,130,246,0.3)',
};

/* ─── Packages data (matching website exactly) ─── */
const PKGS = [
  { icon: '🚀', name: 'Starter Launch', cat: 'Landing Page', price: '₹6,499', acc: P.teal, bg: 'rgba(20,184,166,0.09)', popular: false, feats: ['Single Page Landing', 'Mobile Friendly', 'WhatsApp & Call Buttons', 'Hosting Included', 'Basic Contact Info'] },
  { icon: '⭐', name: 'Startup Spark', cat: 'Basic Presence', price: '₹11,999', acc: P.blue, bg: 'rgba(59,130,246,0.09)', popular: false, feats: ['1 Year Free Hosting', '2–3 Pages', 'Mobile Responsive', 'Contact Form', 'Social Media Links'] },
  { icon: '⚡', name: 'Business Pro', cat: 'Professional Website', price: '₹20,999', acc: P.purple, bg: 'rgba(124,58,237,0.09)', popular: true, feats: ['Everything in Startup', 'Up to 5 Pages', 'Premium Animations', 'Basic SEO Setup', 'Image Gallery'] },
  { icon: '🛡️', name: 'Growth System', cat: 'Dynamic Application', price: '₹29,999', acc: P.blue, bg: 'rgba(59,130,246,0.09)', popular: true, feats: ['Custom Database', 'Admin Dashboard', 'User Login', 'Payment Integration', 'Search & Filter'] },
  { icon: '🔗', name: 'Enterprise Logic', cat: 'Full Stack Solution', price: '₹39,999', acc: P.pink, bg: 'rgba(236,72,153,0.09)', popular: false, feats: ['Billing & Receipt Engine', 'Payment Integration', 'Role-Based Admin', 'REST API', 'Real-time Visualization'] },
  { icon: '🌐', name: 'Ultimate Scale', cat: 'Enterprise Solution', price: '₹54,999', acc: P.cyan, bg: 'rgba(34,211,238,0.09)', popular: false, feats: ['Everything in Enterprise', 'Advanced AI Chatbot', 'Mobile App (Android/iOS)', 'AI/ML Integration', 'DevOps Support'] },
];

/* ─── FAQ data ─── */
const FAQS = [
  {
    q: 'What services does Venthra Solutions provide?',
    a: 'We specialize in creating premium, high-performance websites for Hospitality, Real Estate, Healthcare, Education, and more — end-to-end from design to deployment.'
  },
  {
    q: 'How long does it take to build a website?',
    a: 'Most standard projects are completed within 2–4 weeks. Larger custom applications may take 6–8 weeks.'
  },
  {
    q: 'Do you provide hosting and domain names?',
    a: 'Yes! All packages include 1 year of free hosting and a domain name. We handle all technical setup.'
  },
  {
    q: 'Will my website look good on mobile?',
    a: 'Absolutely. We follow a mobile-first approach, ensuring stunning results on phones, tablets, laptops, and desktops.'
  },
  {
    q: 'Can I update the website content myself?',
    a: 'Yes, we integrate a CMS that lets you update text and images without any technical skills.'
  },
  {
    q: 'Do you offer post-launch support?',
    a: 'Yes, we offer ongoing support and maintenance packages to keep your website secure and running smoothly.'
  },
];

/* ─── Hooks ─── */
function useFade(delay = 0) {
  const op = useRef(new Animated.Value(0)).current;
  const ty = useRef(new Animated.Value(28)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(op, { toValue: 1, duration: 750, delay, useNativeDriver: true }),
      Animated.timing(ty, { toValue: 0, duration: 750, delay, useNativeDriver: true }),
    ]).start();
  }, []);
  return { opacity: op, transform: [{ translateY: ty }] };
}

function usePress(to = 0.96) {
  const sc = useRef(new Animated.Value(1)).current;
  const pressIn = () => Animated.spring(sc, { toValue: to, useNativeDriver: true }).start();
  const pressOut = () => Animated.spring(sc, { toValue: 1, useNativeDriver: true }).start();
  return { scale: sc, pressIn, pressOut };
}

/* ─── Hamburger Drawer ─── */
function Drawer({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const router = useRouter();
  const links = [
    { label: 'Home', icon: 'home-outline' as const, route: '/' },
    { label: 'Package', icon: 'cube-outline' as const, route: 'https://venthra.solutions/#packages' },
    { label: 'About', icon: 'person-outline' as const, route: '/about' },
    { label: 'Our Work', icon: 'briefcase-outline' as const, route: '/explore' },
  ];
  return (
    <Modal transparent visible={visible} animationType="slide" onRequestClose={onClose}>
      <Pressable style={st.dOverlay} onPress={onClose}>
        <Pressable style={st.drawer} onPress={() => { }}>
          <View style={st.dHead}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Image source={require('../../assets/images/VTS_NEW_LOGO.png')} style={{ width: 34, height: 34, borderRadius: 17 }} resizeMode="cover" />
              <Text style={{ color: P.white, fontSize: 15, fontWeight: '800', letterSpacing: 2 }}>VENTHRA</Text>
            </View>
            <TouchableOpacity onPress={onClose}><Ionicons name="close" size={26} color={P.white} /></TouchableOpacity>
          </View>
          {links.map((lk, i) => (
            <TouchableOpacity
              key={lk.label}
              style={[st.dLink, i === 0 && st.dLinkActive]}
              onPress={() => {
                onClose();
                if (lk.route.startsWith('http')) {
                  Linking.openURL(lk.route);
                } else {
                  router.push(lk.route as any);
                }
              }}
              activeOpacity={0.7}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <Ionicons name={lk.icon} size={18} color={i === 0 ? P.blueL : P.muted} />
                <Text style={[st.dLinkTx, i === 0 && { color: P.blueL, fontWeight: '700' }]}>{lk.label}</Text>
              </View>
              {i === 0 && <View style={st.dDot} />}
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={st.dCta}
            onPress={() => { onClose(); Linking.openURL('https://venthra.solutions'); }}
            activeOpacity={0.85}>
            <Text style={{ color: P.white, fontSize: 15, fontWeight: '700' }}>Get Started →</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

/* ─── Top NavBar ─── */
function NavBar({ onMenu }: { onMenu: () => void }) {
  const router = useRouter();
  return (
    <BlurView intensity={45} tint="dark" style={st.nav}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Image source={require('../../assets/images/VTS_NEW_LOGO.png')} style={{ width: 34, height: 34, borderRadius: 17 }} resizeMode="cover" />
        <Text style={st.navBrand}>VENTHRA.SOLUTIONS</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
        <TouchableOpacity onPress={() => router.push('/')} activeOpacity={0.7}>
          <Text style={{ color: P.muted, fontSize: 11, fontWeight: '600' }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://venthra.solutions/#packages')} activeOpacity={0.7}>
          <Text style={{ color: P.muted, fontSize: 11, fontWeight: '600' }}>Package</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onMenu} activeOpacity={0.7}>
          <Ionicons name="menu-outline" size={28} color={P.white} />
        </TouchableOpacity>
      </View>
    </BlurView>
  );
}

/* ─── Hero Section ─── */
function HeroSection({ isDesktop, winH }: { isDesktop: boolean; winH: number }) {
  const badge = useFade(150);
  const title = useFade(300);
  const tag = useFade(450);
  const sub = useFade(580);
  const cta = useFade(720);
  const ps = usePress(0.96);

  return (
    <ImageBackground
      source={require('../../assets/images/hero-tech-bg.png')}
      style={[st.heroBg, isDesktop && { minHeight: winH }]} resizeMode="cover">
      {/* Dark overlay */}
      <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(2,6,23,0.50)' }]} />
      {/* Vignette border */}
      <View style={[StyleSheet.absoluteFillObject, { borderWidth: 60, borderColor: 'rgba(2,6,23,0.4)' }]} />
      {/* Glow blobs */}
      <View style={st.glowBlue} /><View style={st.glowPurp} />
      {/* TECH AGENCY watermark */}
      <View style={st.techW}><Text style={st.techWTx}>TECH AGENCY</Text></View>

      <View style={st.heroWrap}>
        <BlurView intensity={20} tint="dark" style={st.heroGlass}>

          {/* Badge */}
          <Animated.View style={[{ marginBottom: 20 }, badge]}>
            <View style={st.heroBadge}>
              <View style={st.heroBadgeDot} />
              <Text style={st.heroBadgeTx}>THE DIGITAL ARCHITECTS</Text>
            </View>
          </Animated.View>

          {/* Main title */}
          <Animated.Text style={[st.heroTitle, title, { fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif' }]} adjustsFontSizeToFit numberOfLines={1}>
            VENTHRA<Text style={{ color: '#3b82f6', textShadowColor: '#3b82f6', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 15 }}>.</Text>SOLUTIONS
          </Animated.Text>

          {/* Tagline */}
          <Animated.Text style={[st.heroTag, tag]}>
            {"We don't just build websites.\nWe engineer "}
            <Text style={st.heroHL}>Digital Legacies</Text>
            <Text style={st.heroTag}>.</Text>
          </Animated.Text>

          {/* Subtext */}
          <Animated.Text style={[st.heroSub, sub]}>
            {'Elevating brands through premium web architecture.\nExperience '}
            <Text style={{ color: P.white, fontWeight: '600' }}>lag-free perfection.</Text>
          </Animated.Text>

          {/* CTA pill */}
          <Animated.View style={[cta, { transform: [...cta.transform, { scale: ps.scale }] }]}>
            <TouchableOpacity onPressIn={ps.pressIn} onPressOut={ps.pressOut}
              onPress={() => Linking.openURL('https://venthra.solutions')} activeOpacity={1}>
              <View style={st.ctaPill}>
                <Text style={st.ctaTx}>Start Your Project</Text>
                <Ionicons name="arrow-forward" size={16} color={P.blueL} style={{ marginLeft: 8 }} />
              </View>
            </TouchableOpacity>
          </Animated.View>

        </BlurView>
      </View>
    </ImageBackground>
  );
}

/* ─── Stats Bar ─── */
function StatsBar() {
  const items: [string, string][] = [['50+', 'Projects Delivered'], ['100%', 'Satisfaction'], ['3+', 'Years']];
  return (
    <View style={st.statsBar}>
      {items.map(([v, l], i) => (
        <React.Fragment key={l}>
          <View style={{ alignItems: 'center' }}>
            <Text style={st.statV}>{v}</Text>
            <Text style={st.statL}>{l}</Text>
          </View>
          {i < 2 && <View style={{ width: 1, height: 36, backgroundColor: P.border }} />}
        </React.Fragment>
      ))}
    </View>
  );
}

/* ─── Package Card (Matches Website) ─── */
function PkgCard({ p, isDesktop, onSelect }: { p: typeof PKGS[0]; isDesktop?: boolean, onSelect: (pkg: any) => void }) {
  const ps = usePress(0.97);

  // Derive logic for styling popular VS non-popular exactly like the website (adapted for our dark app bg)
  // Non-popular: bg-slate-900 border-slate-800
  // Popular: bg-white text-slate-900 border-blue-900 shadow-xl
  const isPop = p.popular;
  const bgC = isPop ? P.white : P.card;
  const txtC = isPop ? '#0f172a' : P.white;
  const subC = isPop ? '#1e3a8a' : P.muted; // text-blue-900 vs text-slate-400
  const borderC = isPop ? '#1e3a8a' : P.border;
  const iconBg = isPop ? '#dbeafe' : '#1e293b'; // bg-blue-100 vs bg-slate-800
  const iconC = isPop ? '#1e3a8a' : '#60a5fa'; // text-blue-900 vs text-blue-400
  const dotC = isPop ? '#1e3a8a' : P.blueL;
  const btnBg = isPop ? '#0f172a' : P.white;
  const btnTx = isPop ? P.white : '#0f172a';

  return (
    <Animated.View style={[{ marginBottom: 16, transform: [{ scale: ps.scale }] }, isDesktop && { width: '31%', marginBottom: 24 }]}>
      <TouchableOpacity onPressIn={ps.pressIn} onPressOut={ps.pressOut}
        onPress={() => onSelect(p)} activeOpacity={1}>

        {/* Badge wrapper so card can push down slightly if needed, matching absolute -top-2.5 */}
        <View style={{ paddingTop: isPop ? 10 : 0 }}>
          <View style={[st.pkgCard, { backgroundColor: bgC, borderColor: borderC }]}>

            {isPop && (
              <View style={[st.popBadge, { position: 'absolute', top: -14, alignSelf: 'center', backgroundColor: '#1e3a8a' }]}>
                <Text style={st.popTx}>POPULAR</Text>
              </View>
            )}

            {/* Header row */}
            <View style={{ marginBottom: 16, alignItems: 'flex-start' }}>
              <View style={[st.pkgIconWrap, { backgroundColor: iconBg }]}>
                <Text style={{ fontSize: 20 }}>{p.icon}</Text>
              </View>
              <Text style={{ fontSize: 20, fontWeight: '800', color: txtC, marginBottom: 2 }}>{p.name}</Text>
              <Text style={{ fontSize: 10, fontWeight: '800', color: subC, textTransform: 'uppercase', letterSpacing: -0.2 }}>{p.cat}</Text>
            </View>

            {/* Price area */}
            <View style={{ marginBottom: 20, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: isPop ? 'rgba(15,23,42,0.1)' : 'rgba(255,255,255,0.1)', borderStyle: 'dashed' }}>
              <Text style={{ fontSize: 28, fontWeight: '900', color: txtC }}>{p.price}</Text>
            </View>

            {/* Features */}
            <View style={{ marginBottom: 24, flex: 1 }}>
              {p.feats.map(f => (
                <View key={f} style={st.featRow}>
                  <View style={[st.featDot, { backgroundColor: dotC }]} />
                  <Text style={[st.featTx, { color: isPop ? '#334155' : '#cbd5e1' }]}>{f}</Text>
                </View>
              ))}
            </View>

            {/* Subtext and Button */}
            <View style={{ marginTop: 'auto' }}>
              <Text style={{ fontSize: 11, fontStyle: 'italic', textAlign: 'center', color: isPop ? '#475569' : P.muted, marginBottom: 12 }}>
                Best for businesses needing a dedicated platform...
              </Text>
              <View style={[st.pkgBtn, { backgroundColor: btnBg }]}>
                <Text style={[st.pkgBtnTx, { color: btnTx }]}>CLICK TO BUY</Text>
              </View>
            </View>

          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

/* ─── Interactive Hero Section ─── */
function InteractiveHeroSection({ isDesktop }: { isDesktop: boolean }) {
  const rot = useRef(new Animated.Value(0)).current;
  const float = useRef(new Animated.Value(0)).current;
  const entryScale = useRef(new Animated.Value(0.5)).current;
  const entryOpac = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    // entry
    Animated.parallel([
      Animated.timing(entryScale, { toValue: 1, duration: 1500, easing: Easing.out(Easing.back(1.7)), useNativeDriver: true }),
      Animated.timing(entryOpac, { toValue: 1, duration: 1500, easing: Easing.out(Easing.ease), useNativeDriver: true })
    ]).start();

    // continuous rotation
    Animated.loop(
      Animated.timing(rot, { toValue: 1, duration: 40000, easing: Easing.linear, useNativeDriver: true })
    ).start();

    // continuous float
    Animated.loop(
      Animated.sequence([
        Animated.timing(float, { toValue: -15, duration: 2500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(float, { toValue: 0, duration: 2500, easing: Easing.inOut(Easing.ease), useNativeDriver: true })
      ])
    ).start();

    // continuous pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 0.8, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.4, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: true })
      ])
    ).start();
  }, []);

  const spin = rot.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const counterSpin = rot.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-360deg'] });
  const innerSpin = rot.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '720deg'] });

  const apps = [
    { name: 'Shopify', icon: '🛒', color: '#10b981', angle: -45 },
    { name: 'React', icon: '⚛️', color: '#0ea5e9', angle: 45 },
    { name: 'WordPress', icon: '📝', color: '#6366f1', angle: 135 },
    { name: 'Next.js', icon: '▲', color: '#1e293b', angle: 225 },
  ];

  return (
    <View style={[st.sec, { paddingVertical: 60, alignItems: 'center', overflow: 'hidden' }]}>
      <Text style={[st.secTitle, { fontSize: isDesktop ? 46 : 30, lineHeight: isDesktop ? 54 : 38 }]}>
        Empowering Your{'\n'}
        <Text style={{ color: P.blueL }}>Digital Ecosystem</Text>
      </Text>
      <Text style={[st.secSub, { marginBottom: 60, maxWidth: 500 }]}>
        Crafting seamless web experiences with cutting-edge technologies
      </Text>

      {/* Huge Orbit Container */}
      <Animated.View style={{ width: isDesktop ? 600 : W * 0.9, height: isDesktop ? 600 : W * 0.9, alignItems: 'center', justifyContent: 'center', opacity: entryOpac, transform: [{ scale: entryScale }] }}>

        {/* Orbiting ring with icons */}
        <Animated.View style={[StyleSheet.absoluteFillObject, { transform: [{ rotate: spin }] }]}>
          {apps.map((a, i) => {
            const radius = 45; // 45% of container
            const x = Math.cos((a.angle * Math.PI) / 180) * radius;
            const y = Math.sin((a.angle * Math.PI) / 180) * radius;
            return (
              <Animated.View key={a.name} style={[st.ihIconOuter, { left: `${50 + x}%` as any, top: `${50 + y}%` as any, transform: [{ translateX: -28 }, { translateY: -28 }, { rotate: counterSpin }] }]}>
                <View style={[st.ihIcon, { backgroundColor: a.color }]}>
                  <Text style={{ fontSize: 24, color: P.white }}>{a.icon}</Text>
                </View>
              </Animated.View>
            );
          })}
        </Animated.View>

        {/* Center Logo Hub */}
        <Animated.View style={{ transform: [{ translateY: float }], zIndex: 10, alignItems: 'center', justifyContent: 'center' }}>
          {/* Outer glowing ring */}
          <Animated.View style={[{ position: 'absolute', width: 220, height: 220, borderRadius: 110, backgroundColor: 'rgba(124,58,237,0.3)', shadowColor: P.purple, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 1, shadowRadius: 30, opacity: pulse }]} />

          {/* Middle spinning ring */}
          <Animated.View style={[{ position: 'absolute', width: 170, height: 170, borderRadius: 85, borderWidth: 2, borderColor: 'rgba(124,58,237,0.3)', borderStyle: 'dashed', transform: [{ rotate: innerSpin }] }]} />

          {/* Logo container (Text based, matching website) */}
          <View style={{ width: 130, height: 130, borderRadius: 65, backgroundColor: P.card, borderWidth: 4, borderColor: P.purple, elevation: 20, shadowColor: P.purple, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 20, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <Text style={{ fontSize: 38, fontWeight: '800', color: P.white }}>VTS</Text>
            <Text style={{ fontSize: 10, color: P.white, fontWeight: '500', letterSpacing: 2, marginTop: 2 }}>VENTHRA</Text>
          </View>
        </Animated.View>

      </Animated.View>
    </View>
  );
}

/* ─── Website Grid Section (Matches Website exactly) ─── */
function WebsiteGridSection({ isDesktop }: { isDesktop: boolean }) {
  const [selectedWeb, setSelectedWeb] = useState<any | null>(null);

  const websites = [
    {
      id: "ecommerce",
      title: "eCommerce",
      description: "Online stores that sell products or services directly to consumers. Features shopping carts, payment processing, and inventory management.",
      icon: 'cart',
      image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=800",
      category: "Business",
      popularTools: ["Shopify", "WooCommerce", "BigCommerce"],
      keyFeatures: ["Product catalog with search and filters", "Shopping cart and secure checkout"],
      purpose: "To sell physical or digital products online, handle transactions securely, and manage inventory efficiently.",
      bestFor: ["Retailers", "Wholesalers", "Digital Creators", "Dropshippers"],
      color: P.teal
    },
    {
      id: "portfolio",
      title: "Portfolio",
      description: "Showcase creative work and professional achievements. Perfect for designers, artists, photographers, and freelancers.",
      icon: 'briefcase',
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      category: "Creative",
      popularTools: ["Webflow", "Squarespace", "Cargo"],
      keyFeatures: ["Visual gallery layouts", "Project case studies"],
      purpose: "To display creative work, attract clients, and build a professional online presence through visual storytelling.",
      bestFor: ["Designers", "Photographers", "Artists", "Freelancers"],
      color: P.purple
    },
    {
      id: "blog",
      title: "Blog",
      description: "Content-focused websites for publishing articles, news, and thought leadership pieces with SEO optimization.",
      icon: 'document-text',
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
      category: "Personal",
      popularTools: ["WordPress", "Ghost", "Medium"],
      keyFeatures: ["Content management system", "Categories and tags"],
      purpose: "To publish written content regularly, build an audience, establish authority, and improve search engine rankings.",
      bestFor: ["Writers", "Journalists", "Thought Leaders", "Companies"],
      color: '#f59e0b'
    },
    {
      id: "educational",
      title: "Educational",
      description: "Learning platforms with courses, tutorials, and educational resources. Includes LMS features and progress tracking.",
      icon: 'school',
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800",
      category: "Technical",
      popularTools: ["Teachable", "Thinkific", "Kajabi"],
      keyFeatures: ["Course creation tools", "Video hosting and streaming"],
      purpose: "To deliver educational content, track student progress, and monetize knowledge through structured online courses.",
      bestFor: ["Course Creators", "Schools", "Coaches", "Training Centers"],
      color: P.blueD
    },
    {
      id: "nonprofit",
      title: "Non-Profit",
      description: "Websites for charitable organizations featuring donation systems, volunteer sign-ups, and impact storytelling.",
      icon: 'heart',
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800",
      category: "Business",
      popularTools: ["Classy", "Donorbox", "WordPress"],
      keyFeatures: ["Online donation system", "Impact metrics and stories"],
      purpose: "To raise awareness for a cause, collect donations securely, and recruit volunteers for organizational missions.",
      bestFor: ["Charities", "Foundations", "NGOs", "Community Groups"],
      color: P.pink
    },
    {
      id: "landing-page",
      title: "Landing Page",
      description: "Conversion-focused single pages designed to capture leads or promote specific products and campaigns.",
      icon: 'rocket',
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
      category: "Business",
      popularTools: ["Unbounce", "Instapage", "Webflow"],
      keyFeatures: ["Clear value proposition", "Lead capture forms"],
      purpose: "To drive targeted traffic to a specific offer and maximize conversion rates for marketing campaigns.",
      bestFor: ["Marketers", "Event Organizers", "Product Launches", "Agencies"],
      color: P.green
    }
  ];

  return (
    <View style={[{ backgroundColor: '#f8fafc', paddingVertical: 60, width: '100%' }]}>
      <View style={[isDesktop && st.desktopWrap]}>
        <View style={{ alignItems: 'center', marginBottom: 40, paddingHorizontal: 16 }}>
          <Text style={[st.secTitle, { fontSize: isDesktop ? 46 : 30, color: '#0f172a' }]}>Explore Our Digital Solutions</Text>
          <Text style={[st.secSub, { color: '#475569', maxWidth: 600, textAlign: 'center' }]}>
            Find the perfect website category for your project. Each type comes with specific features and recommendations.
          </Text>
        </View>
        <View style={[{ paddingHorizontal: 16, gap: 16 }, isDesktop && { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }]}>
          {websites.map(w => (
            <TouchableOpacity
              key={w.id}
              style={[st.wgGridCard, isDesktop ? { width: '31%', marginBottom: 16 } : { width: '100%', marginBottom: 16 }]}
              activeOpacity={0.9}
              onPress={() => setSelectedWeb(w)}
            >
              <View style={st.wgImgWrap}>
                <Image source={{ uri: w.image }} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
                <View style={st.wgBadge}>
                  <Text style={st.wgBadgeTx}>{w.category}</Text>
                </View>
                <View style={st.wgIconTopRight}>
                  <Ionicons name={"open-outline" as any} size={14} color={P.white} />
                </View>
              </View>
              <View style={[st.wgColorLine, { backgroundColor: w.color }]} />
              <View style={st.wgBody}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <Text style={st.wgCardTitle} numberOfLines={1}>{w.title}</Text>
                  <Ionicons name={`${w.icon}-outline` as any} size={20} color={P.muted} />
                </View>
                <Text style={st.wgCardDesc} numberOfLines={2}>{w.description}</Text>
                {w.keyFeatures.map((f, i) => (
                  <View key={i} style={st.wgFeatRow}>
                    <View style={st.wgCheckWrap}>
                      <Ionicons name="checkmark" size={10} color={P.blueL} />
                    </View>
                    <Text style={st.wgFeatTx} numberOfLines={1}>{f}</Text>
                  </View>
                ))}
                <View style={st.wgToolsRow}>
                  {w.popularTools.slice(0, 2).map((t, idx) => (
                    <View key={idx} style={st.wgToolBadge}>
                      <Text style={st.wgToolTx}>{t}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Website Detail Overlay Modal */}
        {selectedWeb && (
          <Modal transparent visible={!!selectedWeb} animationType="fade" onRequestClose={() => setSelectedWeb(null)}>
            <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center', padding: 16 }} onPress={() => setSelectedWeb(null)}>
              <Pressable style={{ width: '100%', maxWidth: 850, backgroundColor: '#020617', borderRadius: 40, overflow: 'hidden', borderWidth: 1, borderColor: P.border, maxHeight: '95%' }} onPress={() => { }}>

                {/* Close Button */}
                <TouchableOpacity
                  onPress={() => setSelectedWeb(null)}
                  style={{ position: 'absolute', top: 20, right: 20, zIndex: 110, width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}
                >
                  <Ionicons name="close" size={24} color={P.white} />
                </TouchableOpacity>

                <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                  {/* Image Header */}
                  <View style={{ height: isDesktop ? 320 : 220, width: '100%' }}>
                    <Image source={{ uri: selectedWeb.image }} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
                    <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.5)' }]} />
                    <View style={{ position: 'absolute', bottom: 32, left: 32, right: 32 }}>
                      <View style={{ alignSelf: 'flex-start', backgroundColor: P.blueL, paddingHorizontal: 16, paddingVertical: 6, borderRadius: 100, marginBottom: 16 }}>
                        <Text style={{ color: P.white, fontSize: 10, fontWeight: '800', letterSpacing: 2, textTransform: 'uppercase' }}>{selectedWeb.category}</Text>
                      </View>
                      <Text style={{ color: P.white, fontSize: 36, fontWeight: '800', textShadowColor: 'rgba(0,0,0,0.5)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 8 }}>{selectedWeb.title}</Text>
                    </View>
                  </View>

                  {/* Content Area */}
                  <View style={{ padding: isDesktop ? 40 : 24 }}>
                    <Text style={{ color: '#cbd5e1', fontSize: 18, lineHeight: 28, marginBottom: 32 }}>{selectedWeb.description}</Text>

                    {/* Tools Row */}
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 40 }}>
                      {selectedWeb.popularTools.map((t: string) => (
                        <View key={t} style={{ backgroundColor: '#0f172a', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 16, borderWidth: 1, borderColor: P.border }}>
                          <Text style={{ color: P.white, fontSize: 14, fontWeight: '700' }}>{t}</Text>
                        </View>
                      ))}
                    </View>

                    {/* Purpose & Best For Grid */}
                    <View style={{ flexDirection: isDesktop ? 'row' : 'column', gap: 24, marginBottom: 32 }}>

                      {/* Purpose */}
                      <View style={{ flex: 1, backgroundColor: 'rgba(56,189,248,0.05)', borderRadius: 32, padding: 32, borderWidth: 1, borderColor: 'rgba(56,189,248,0.2)' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 16 }}>
                          <View style={{ width: 48, height: 48, borderRadius: 16, backgroundColor: P.blueL, alignItems: 'center', justifyContent: 'center' }}>
                            <Ionicons name="bulb-outline" size={24} color={P.white} />
                          </View>
                          <Text style={{ color: P.white, fontSize: 20, fontWeight: '800' }}>Purpose</Text>
                        </View>
                        <Text style={{ color: '#94a3b8', fontSize: 15, lineHeight: 24 }}>{selectedWeb.purpose}</Text>
                      </View>

                      {/* Best For */}
                      <View style={{ flex: 1, backgroundColor: 'rgba(168,85,247,0.05)', borderRadius: 32, padding: 32, borderWidth: 1, borderColor: 'rgba(168,85,247,0.2)' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 16 }}>
                          <View style={{ width: 48, height: 48, borderRadius: 16, backgroundColor: '#9333ea', alignItems: 'center', justifyContent: 'center' }}>
                            <Ionicons name="people-outline" size={24} color={P.white} />
                          </View>
                          <Text style={{ color: P.white, fontSize: 20, fontWeight: '800' }}>Best For</Text>
                        </View>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                          {selectedWeb.bestFor.map((bf: string) => (
                            <View key={bf} style={{ backgroundColor: '#1e1b4b', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 100, borderWidth: 1, borderColor: 'rgba(168,85,247,0.4)' }}>
                              <Text style={{ color: '#c084fc', fontSize: 12, fontWeight: '700' }}>{bf}</Text>
                            </View>
                          ))}
                        </View>
                      </View>

                    </View>

                    {/* Key Features block */}
                    <View style={{ backgroundColor: '#0f172a', borderRadius: 40, padding: isDesktop ? 40 : 28, borderWidth: 1, borderColor: P.border, overflow: 'hidden' }}>

                      {/* Glowing blur ball */}
                      <View style={{ position: 'absolute', top: -100, right: -100, width: 250, height: 250, borderRadius: 125, backgroundColor: 'rgba(37,99,235,0.1)' }} />

                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 32 }}>
                        <View style={{ width: 48, height: 48, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}>
                          <Ionicons name="construct-outline" size={24} color={P.blueL} />
                        </View>
                        <Text style={{ color: P.white, fontSize: 24, fontWeight: '800' }}>Key Features</Text>
                      </View>

                      <View style={{ flexDirection: isDesktop ? 'row' : 'column', flexWrap: 'wrap', gap: 16 }}>
                        {selectedWeb.keyFeatures.map((kf: string) => (
                          <View key={kf} style={[{ flexDirection: 'row', alignItems: 'flex-start', gap: 16, backgroundColor: 'rgba(255,255,255,0.05)', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' }, isDesktop && { width: '48%' }]}>
                            <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'rgba(59,130,246,0.2)', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                              <Ionicons name="checkmark" size={12} color={P.blueL} />
                            </View>
                            <Text style={{ color: '#cbd5e1', fontSize: 15, fontWeight: '500', flex: 1 }}>{kf}</Text>
                          </View>
                        ))}
                      </View>
                    </View>

                  </View>
                </ScrollView>
              </Pressable>
            </Pressable>
          </Modal>
        )}

      </View>
    </View>
  );
}

/* ─── Packages Section & Payment Modal ─── */
function PackagesSection() {
  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === 'web' && width >= 900;

  const [selectedPkg, setSelectedPkg] = useState<typeof PKGS[0] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const priceNumber = selectedPkg ? parseInt(selectedPkg.price.replace(/[^0-9]/g, '')) : 0;
  const firstInstallment = Math.round(priceNumber / 2);
  const formatCurrency = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

  return (
    <View style={st.sec}>
      <View style={st.secHead}>
        <View style={st.chip}><Text style={st.chipTx}>VENTHRA SOLUTIONS PRICING</Text></View>
        <Text style={st.secTitle}>
          {'Choose Your '}
          <Text style={{ color: P.blueL }}>Growth Engine</Text>
        </Text>
        <Text style={st.secSub}>Transparent pricing packages designed to scale with your ambition.</Text>
      </View>
      <View style={isDesktop ? { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' } : {}}>
        {PKGS.map(p => <PkgCard key={p.name} p={p} isDesktop={isDesktop} onSelect={(pkg) => { setSelectedPkg(pkg); setModalOpen(true); }} />)}
      </View>
      {/* Mobile add-on note */}
      <View style={{ marginTop: 32, alignItems: 'center' }}>
        <View style={st.addOn}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <View style={st.addOnDot} />
            <Text style={{ color: P.muted, fontSize: 13, fontWeight: '600' }}>Need a Mobile App?</Text>
          </View>
          <Text style={{ color: P.white, fontSize: 16, fontWeight: '800' }}>
            Add Play Store App for just +₹6,000
          </Text>
        </View>
      </View>

      {/* Payment Modal */}
      {selectedPkg && (
        <Modal transparent visible={modalOpen} animationType="fade" onRequestClose={() => setModalOpen(false)}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center', padding: 16 }}>
            <TouchableOpacity style={StyleSheet.absoluteFillObject} onPress={() => setModalOpen(false)} activeOpacity={1} />
            <View style={{ width: '100%', maxWidth: 500, backgroundColor: P.card, borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: P.border }}>
              {/* Header */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 24, paddingBottom: 16 }}>
                <View>
                  <Text style={{ fontSize: 24, fontWeight: 'bold', color: P.white }}>Secure Payment</Text>
                  <Text style={{ fontSize: 14, color: P.muted, marginTop: 4 }}>Complete your purchase for <Text style={{ color: P.white, fontWeight: 'bold' }}>{selectedPkg.name}</Text></Text>
                </View>
                <TouchableOpacity onPress={() => setModalOpen(false)} style={{ backgroundColor: 'rgba(255,255,255,0.05)', height: 36, width: 36, alignItems: 'center', justifyContent: 'center', borderRadius: 18 }}>
                  <Ionicons name="close" size={20} color={P.muted} />
                </TouchableOpacity>
              </View>

              <ScrollView style={{ paddingHorizontal: 24, paddingBottom: 24, maxHeight: 600 }}>
                {/* Order Summary */}
                <View style={{ backgroundColor: P.bg, borderRadius: 12, padding: 16, borderWidth: 1, borderColor: P.border, marginBottom: 24 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                    <Text style={{ color: P.muted }}>Package Total</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: P.white }}>{selectedPkg.price}</Text>
                  </View>
                  <View style={{ height: 1, backgroundColor: P.border, marginBottom: 12 }} />

                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                    <Ionicons name="shield-checkmark" size={16} color={P.green} style={{ marginRight: 8 }} />
                    <Text style={{ color: P.white, fontWeight: 'bold', fontSize: 14 }}>Flexible Payment Plan Active</Text>
                  </View>

                  <View style={{ backgroundColor: P.card, borderRadius: 8, padding: 16, borderWidth: 1, borderColor: P.blue, borderLeftWidth: 4, marginBottom: 12 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <View>
                        <Text style={{ fontWeight: 'bold', color: P.white, fontSize: 14 }}>First Installment (50%)</Text>
                        <Text style={{ color: P.muted, fontSize: 12, marginTop: 2 }}>Due Now to Start Project</Text>
                      </View>
                      <Text style={{ fontSize: 20, fontWeight: 'bold', color: P.blue }}>{formatCurrency(firstInstallment)}</Text>
                    </View>
                  </View>

                  <View style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: 8, padding: 12, borderWidth: 1, borderColor: P.border }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', opacity: 0.7 }}>
                      <View>
                        <Text style={{ fontWeight: 'bold', color: P.white, fontSize: 14 }}>Second Installment (50%)</Text>
                        <Text style={{ color: P.muted, fontSize: 12, marginTop: 2 }}>Due on Project Completion</Text>
                      </View>
                      <Text style={{ fontWeight: 'bold', color: P.muted, fontSize: 14 }}>{formatCurrency(firstInstallment)}</Text>
                    </View>
                  </View>
                </View>

                {/* QR Code pseudo-block */}
                <View style={{ alignItems: 'center', backgroundColor: P.card, borderRadius: 12, padding: 24, borderWidth: 1, borderColor: P.border, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 }}>
                  <Text style={{ color: P.white, fontWeight: 'bold', marginBottom: 16, fontSize: 15 }}>
                    Scan to Pay <Text style={{ color: P.purple }}>{formatCurrency(firstInstallment)}</Text>
                  </Text>
                  <View style={{ backgroundColor: P.white, padding: 12, borderRadius: 12, marginBottom: 16 }}>
                    <Image source={{ uri: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=8309188820-3@axl&pn=KAKARLA%20CHARAN%20KUMAR&am=' + firstInstallment + '&cu=INR' }} style={{ width: 140, height: 140 }} />
                  </View>
                  <Text style={{ color: P.muted, fontSize: 12, textAlign: 'center', maxWidth: 200 }}>Scan with PhonePe, GPay, Paytm or any UPI app</Text>
                </View>

                {/* Submit button */}
                <TouchableOpacity
                  style={{ backgroundColor: P.green, paddingVertical: 18, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}
                  onPress={() => Linking.openURL(`https://wa.me/918309188820?text=Hi, I have made the payment of ${formatCurrency(firstInstallment)} for ${selectedPkg.name}. Here is the screenshot.`)}
                  activeOpacity={0.85}>
                  <Text style={{ color: P.white, fontWeight: '800', fontSize: 16, marginRight: 8 }}>Share Payment Screenshot</Text>
                  <Ionicons name="checkmark-circle" size={20} color={P.white} />
                </TouchableOpacity>
                <Text style={{ fontSize: 10, color: P.muted, textAlign: 'center', opacity: 0.6 }}>Secure SSL Encryption. Payments are non-refundable once the project has commenced.</Text>
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

/* ─── FAQ Section (Matches Website) ─── */
function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <View style={[st.sec]}>
      <View style={{ backgroundColor: '#0f172a', paddingVertical: 40, paddingHorizontal: 16, borderRadius: 32, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
        {/* Dynamic Background Elements */}
        <View style={{ position: 'absolute', top: 0, right: 0, width: 400, height: 400, backgroundColor: 'rgba(124,58,237,0.05)', borderRadius: 200 }} />
        <View style={{ position: 'absolute', bottom: 0, left: 0, width: 400, height: 400, backgroundColor: 'rgba(34,211,238,0.05)', borderRadius: 200 }} />

        <View style={{ alignItems: 'center', marginBottom: 32, zIndex: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', marginBottom: 16 }}>
            <Ionicons name="help-circle" size={14} color={P.cyan} style={{ marginRight: 6 }} />
            <Text style={{ color: P.white, fontSize: 12, fontWeight: '600' }}>Help Center</Text>
          </View>
          <Text style={[st.secTitle, { fontSize: 30, marginBottom: 8 }]}>
            {'Frequently Asked '}
            <Text style={{ color: P.cyan }}>Questions</Text>
          </Text>
          <Text style={[st.secSub, { fontSize: 14 }]}>Answers to common questions about our services.</Text>
        </View>

        <View style={{ zIndex: 10 }}>
          {FAQS.map((f, i) => (
            <TouchableOpacity key={i} style={st.faqCardMatch} onPress={() => setOpen(open === i ? null : i)} activeOpacity={0.85}>
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 4 }}>
                <View style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: '#f1f5f9', alignItems: 'center', justifyContent: 'center', marginRight: 12, display: 'flex' }}>
                  <Ionicons name={i % 2 === 0 ? "sparkles" : "chatbubble"} size={16} color={i % 2 === 0 ? P.purple : P.blueL} />
                </View>
                <Text style={[st.faqQ, { flex: 1, color: '#0f172a', fontSize: 14 }]}>{f.q}</Text>
              </View>
              {open === i && (
                <View style={{ paddingLeft: 44, paddingBottom: 8, paddingTop: 4 }}>
                  <Text style={[st.faqA, { borderTopWidth: 0, paddingTop: 0, marginTop: 0, color: '#475569', fontSize: 13 }]}>{f.a}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

/* ─── Contact Section ─── */
function ContactSection() {
  const ps = usePress(0.97);
  const WA = 'https://wa.me/918919757303?text=Hi%20Venthra%20Solutions%2C%20I%20am%20interested%20in%20your%20services.';
  return (
    <View style={[st.sec, { paddingTop: 36 }]}>
      <View style={[StyleSheet.absoluteFillObject, { top: 0, left: 0, right: 0, height: 200, overflow: 'hidden' }]}>
        <View style={st.contactGlow} />
      </View>
      <View style={st.secHead}>
        <View style={st.chip}><Text style={st.chipTx}>GET IN TOUCH</Text></View>
        <Text style={st.secTitle}>
          {'Ready to Build\n'}
          <Text style={{ color: P.blueL }}>Something Great?</Text>
        </Text>
        <Text style={[st.secSub, { marginBottom: 28 }]}>
          Let's architect your digital future together.
        </Text>
      </View>
      <Animated.View style={{ width: '100%', marginBottom: 12, transform: [{ scale: ps.scale }] }}>
        <TouchableOpacity style={[st.ctaBtn, { backgroundColor: P.green }]}
          onPressIn={ps.pressIn} onPressOut={ps.pressOut}
          onPress={() => Linking.openURL(WA)} activeOpacity={1}>
          <Ionicons name="logo-whatsapp" size={20} color={P.white} />
          <Text style={st.ctaBtnTx}>WhatsApp Us</Text>
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity style={[st.ctaBtn, st.ctaBtnOutline]}
        onPress={() => Linking.openURL('mailto:venthrasolutions@gmail.com')} activeOpacity={0.8}>
        <Ionicons name="mail-outline" size={20} color={P.white} />
        <Text style={st.ctaBtnTx}>Email Us</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: 20, marginBottom: 28 }}
        onPress={() => Linking.openURL('https://venthra.solutions')} activeOpacity={0.7}>
        <Text style={{ color: P.blueL, fontSize: 14, fontWeight: '600', textDecorationLine: 'underline' }}>
          🌐  Visit venthra.solutions
        </Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
        {[
          ['📸  Instagram', 'https://instagram.com/venthra.solutions'],
          ['💼  LinkedIn', 'https://www.linkedin.com/in/venthra-solutions-5a7ba63ab/'],
          ['▶️  YouTube', 'https://www.youtube.com/@venthara.solutions'],
        ].map(([l, u]) => (
          <TouchableOpacity key={l} style={st.socialChip}
            onPress={() => Linking.openURL(u)} activeOpacity={0.7}>
            <Text style={{ color: P.muted, fontSize: 12, fontWeight: '500' }}>{l}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <View style={{ alignItems: 'center', paddingVertical: 28, paddingHorizontal: 24 }}>
      <View style={{ width: '70%', height: 1, backgroundColor: P.border, marginBottom: 16 }} />
      <Text style={{ color: P.mutedD, fontSize: 11.5, textAlign: 'center', marginBottom: 4 }}>
        © {new Date().getFullYear()} Venthra Solutions. All rights reserved.
      </Text>
      <Text style={{ color: 'rgba(96,165,250,0.45)', fontSize: 9, fontWeight: '700', letterSpacing: 2.5 }}>
        THE DIGITAL ARCHITECTS
      </Text>
    </View>
  );
}

/* ─── Root ─── */
export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const isDesktop = Platform.OS === 'web' && width >= 900;
  const [menu, setMenu] = useState(false);
  const openMenu = useCallback(() => setMenu(true), []);
  const closeMenu = useCallback(() => setMenu(false), []);
  return (
    <View style={{ flex: 1, backgroundColor: P.bg }}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      {/* Drawer first so it's in the tree above navWrap */}
      <Drawer visible={menu} onClose={closeMenu} />
      {/* Floating NavBar */}
      {!isDesktop && (
        <View style={[st.navWrap, { paddingTop: insets.top }]} pointerEvents="box-none">
          <NavBar onMenu={openMenu} />
        </View>
      )}
      <ScrollView style={{ flex: 1, backgroundColor: P.bg }}
        contentContainerStyle={[{ paddingBottom: insets.bottom + 24 }, !isDesktop && { paddingTop: insets.top + 56 }]}
        showsVerticalScrollIndicator={false} bounces>

        <HeroSection isDesktop={isDesktop} winH={height} />

        <View style={[isDesktop ? st.desktopWrap : {}]}>
          <StatsBar />
          <InteractiveHeroSection isDesktop={isDesktop} />
        </View>

        <WebsiteGridSection isDesktop={isDesktop} />

        <View style={[isDesktop ? st.desktopWrap : {}]}>
          <PackagesSection />
          <FAQSection />
          <ContactSection />
          <Footer />
        </View>

      </ScrollView>
    </View>
  );
}

/* ─── StyleSheet ─── */
const st = StyleSheet.create({
  desktopWrap: { maxWidth: 1000, alignSelf: 'center', width: '100%' },
  navWrap: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50 },
  nav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: P.border, overflow: 'hidden' },
  logoC: { width: 34, height: 34, borderRadius: 17, backgroundColor: P.white, alignItems: 'center', justifyContent: 'center' },
  logoTx: { color: P.bg, fontSize: 8, fontWeight: '900', letterSpacing: 0.5 },
  navBrand: { color: P.white, fontSize: 10, fontWeight: '700', letterSpacing: 2 },
  /* Drawer */
  dOverlay: { flex: 1, backgroundColor: 'rgba(2,6,23,0.8)', justifyContent: 'flex-end' },
  drawer: { backgroundColor: '#080f1e', borderTopLeftRadius: 28, borderTopRightRadius: 28, borderTopWidth: 1, borderColor: P.border, paddingHorizontal: 24, paddingBottom: 44, paddingTop: 22 },
  dHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 },
  dLink: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 15, paddingHorizontal: 14, borderRadius: 14 },
  dLinkActive: { backgroundColor: 'rgba(59,130,246,0.1)' },
  dLinkTx: { color: P.muted, fontSize: 16, fontWeight: '500' },
  dDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: P.blue },
  dCta: { backgroundColor: P.blue, borderRadius: 100, paddingVertical: 15, alignItems: 'center', marginTop: 16, shadowColor: P.blue, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.7, shadowRadius: 18, elevation: 12 },
  /* Hero */
  heroBg: { width: '100%', minHeight: 600, alignItems: 'center', justifyContent: 'center', backgroundColor: P.bg },
  glowBlue: { position: 'absolute', top: -50, right: -60, width: 220, height: 220, borderRadius: 110, backgroundColor: 'rgba(59,130,246,0.18)', shadowColor: P.blue, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 1, shadowRadius: 80 },
  glowPurp: { position: 'absolute', bottom: -60, left: -60, width: 200, height: 200, borderRadius: 100, backgroundColor: 'rgba(124,58,237,0.15)', shadowColor: '#7c3aed', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 1, shadowRadius: 80 },
  techW: { position: 'absolute', top: 20, right: 20, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 5 },
  techWTx: { color: 'rgba(255,255,255,0.28)', fontSize: 9, fontWeight: '700', letterSpacing: 2 },
  heroWrap: { width: '90%', borderRadius: 28, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', shadowColor: P.blue, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.2, shadowRadius: 30, elevation: 16 },
  heroGlass: { paddingHorizontal: 22, paddingVertical: 36, alignItems: 'center', overflow: 'hidden' },
  heroBadge: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(59,130,246,0.12)', borderWidth: 1, borderColor: P.borderB, borderRadius: 100, paddingHorizontal: 14, paddingVertical: 7 },
  heroBadgeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: P.blue, shadowColor: P.blue, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 1, shadowRadius: 6 },
  heroBadgeTx: { color: P.blueL, fontSize: 9.5, fontWeight: '700', letterSpacing: 2.5 },
  heroTitle: { color: P.white, fontSize: Math.min(W * 0.135, 54), letterSpacing: -2, textAlign: 'center', lineHeight: Math.min(W * 0.155, 62), marginBottom: 18, textShadowColor: 'rgba(59,130,246,0.55)', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 24 },
  heroTag: { color: P.white, fontSize: 17.5, fontWeight: '500', textAlign: 'center', lineHeight: 28, marginBottom: 12 },
  heroHL: { color: P.blueL, fontWeight: '700', textShadowColor: 'rgba(96,165,250,0.6)', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 10 },
  heroSub: { color: 'rgba(241,245,249,0.72)', fontSize: 13.5, textAlign: 'center', lineHeight: 21, marginBottom: 30, maxWidth: 310 },
  ctaPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0a192f', paddingHorizontal: 32, paddingVertical: 15, borderRadius: 100, borderWidth: 1.5, borderColor: 'rgba(59,130,246,0.38)', shadowColor: P.blue, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.55, shadowRadius: 22, elevation: 12 },
  ctaTx: { color: P.white, fontSize: 15.5, fontWeight: '700', letterSpacing: 0.4 },
  /* Stats */
  statsBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: P.card, marginHorizontal: 16, borderRadius: 18, paddingVertical: 18, marginTop: -20, borderWidth: 1, borderColor: P.border, zIndex: 2, elevation: 8, shadowColor: P.blue, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 12 },
  statV: { color: P.blue, fontSize: 22, fontWeight: '900', letterSpacing: -0.5, textShadowColor: 'rgba(59,130,246,0.5)', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 8 },
  statL: { color: P.muted, fontSize: 10, fontWeight: '600', marginTop: 2, textAlign: 'center' },
  /* Sections */
  sec: { paddingHorizontal: 16, paddingTop: 36, paddingBottom: 20 },
  secHead: { alignItems: 'center', marginBottom: 22 },
  chip: { backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: P.border, borderRadius: 100, paddingHorizontal: 14, paddingVertical: 6, marginBottom: 14 },
  chipTx: { color: P.muted, fontSize: 9.5, fontWeight: '700', letterSpacing: 2.2 },
  secTitle: { color: P.white, fontSize: 27, fontWeight: '800', textAlign: 'center', lineHeight: 36, marginBottom: 10 },
  secSub: { color: P.muted, fontSize: 14, textAlign: 'center', lineHeight: 21, maxWidth: 290 },
  /* Packages */
  pkgCard: { borderRadius: 16, borderWidth: 1, borderColor: P.border, overflow: 'hidden', padding: 24, minHeight: 380, flex: 1 },
  popBadge: { borderRadius: 100, paddingHorizontal: 12, paddingVertical: 4, zIndex: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 8 },
  popTx: { color: P.white, fontSize: 9, fontWeight: '800', letterSpacing: 1.5 },
  pkgIconWrap: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  featRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  featDot: { width: 6, height: 6, borderRadius: 3, flexShrink: 0 },
  featTx: { fontSize: 12.5, flex: 1, fontWeight: '500' },
  pkgBtn: { borderRadius: 12, paddingVertical: 14, alignItems: 'center', width: '100%' },
  pkgBtnTx: { fontSize: 11, fontWeight: '900', letterSpacing: 0.8 },
  addOn: { flexDirection: 'column', alignItems: 'center', backgroundColor: P.card, borderWidth: 1, borderColor: P.border, borderRadius: 18, paddingVertical: 16, paddingHorizontal: 32 },
  addOnDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: P.blue, shadowColor: P.blue, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 1, shadowRadius: 8, flexShrink: 0 },
  /* FAQ Matches Website */
  faqCardMatch: { backgroundColor: P.white, borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  /* Contact */
  contactGlow: { position: 'absolute', top: -60, alignSelf: 'center', width: 220, height: 220, borderRadius: 110, backgroundColor: 'rgba(59,130,246,0.1)', shadowColor: P.blue, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.7, shadowRadius: 90 },
  ctaBtn: { width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 16, borderRadius: 14 },
  ctaBtnOutline: { borderWidth: 1.5, borderColor: P.border, backgroundColor: 'rgba(255,255,255,0.04)' },
  ctaBtnTx: { color: P.white, fontSize: 15, fontWeight: '700' },
  socialChip: { backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: P.border, borderRadius: 100, paddingHorizontal: 14, paddingVertical: 8 },
  /* Interactive Hero */
  ihIconOuter: { position: 'absolute', width: 56, height: 56, zIndex: 5 },
  ihIcon: { width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8 },
  /* Website Grid Matches Website */
  wgGridCard: { backgroundColor: '#0a192f', borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(30,58,138,0.3)', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8 },
  wgImgWrap: { height: 160, backgroundColor: '#0f172a', width: '100%', overflow: 'hidden' },
  wgBadge: { position: 'absolute', top: 12, left: 12, backgroundColor: 'rgba(10,25,47,0.8)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  wgBadgeTx: { color: P.white, fontSize: 9, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  wgIconTopRight: { position: 'absolute', top: 12, right: 12, width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  wgColorLine: { height: 4, width: '100%' },
  wgBody: { padding: 16, flex: 1 },
  wgCardTitle: { color: P.white, fontSize: 16, fontWeight: '800' },
  wgCardDesc: { color: P.muted, fontSize: 11.5, lineHeight: 18, marginBottom: 12 },
  wgFeatRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  wgCheckWrap: { width: 14, height: 14, borderRadius: 7, backgroundColor: 'rgba(30,58,138,0.4)', alignItems: 'center', justifyContent: 'center' },
  wgFeatTx: { color: '#cbd5e1', fontSize: 10.5, fontWeight: '500' },
  wgToolsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: 'rgba(30,58,138,0.3)' },
  wgToolBadge: { backgroundColor: '#112240', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: 'rgba(30,58,138,0.3)' },
  wgToolTx: { color: '#bfdbfe', fontSize: 9, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
});
