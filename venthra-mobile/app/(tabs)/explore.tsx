import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Dimensions, Linking, StatusBar,
  Image, Modal, Pressable, Platform, useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: W } = Dimensions.get('window');

/* ─── Real project screenshot images (copied from website source) ─── */
const IMGS = {

  egm: [require('../../assets/images/egm-1.png'), require('../../assets/images/egm-2.png'), require('../../assets/images/egm-3.png')],
  siddharth: [require('../../assets/images/sidhharth-1.jpeg'), require('../../assets/images/siddhath-2.jpg'), require('../../assets/images/siddharth-3.jpg'), require('../../assets/images/siddharth-4.jpg')],
  vali: [require('../../assets/images/vali-1.png'), require('../../assets/images/vali-2.png'), require('../../assets/images/vali-3.png')],
  srikrishna: [require('../../assets/images/srikrishna-1.png'), require('../../assets/images/srikrishna-2.png'), require('../../assets/images/srikrishna-3.png')],
  ssln: [require('../../assets/images/ssln-1.png'), require('../../assets/images/ssln-2.png'), require('../../assets/images/ssln-3.png')],
};

const P = {
  bg: '#020617', card: '#0f172a', white: '#ffffff',
  blue: '#3b82f6', blueL: '#60a5fa', blueD: '#1d4ed8',
  purple: '#7c3aed', amber: '#d97706', green: '#227204',
  muted: '#94a3b8', mutedD: '#475569',
  border: 'rgba(255,255,255,0.08)',
};

const PROJECTS = [

  {
    id: 'egm',
    label: 'Divine Digital Sanctuary', labelColor: '#6366f1',
    title: 'El Shaddai Grace',
    subtitle: '| Divine Digital Sanctuary',
    desc: 'A digital gateway that offers peace and accessibility. Designed with a minimalist aesthetic, creating an atmosphere of trust and grace.',
    stack: ['Next.js', 'Vercel', 'Tailwind CSS', 'PWA'],
    highlights: ['Global Edge Deployment', 'Jio-Optimized PWA', 'Zero-Lag Media Streaming'],
    url: 'https://www.egmtrust.in/',
    btnColor: '#4338ca', btnLabel: 'Visit Sanctuary',
    images: IMGS.egm,
  },
  {
    id: 'siddharth',
    label: 'Featured Project', labelColor: '#7c3aed',
    title: 'Siddharth Hussain',
    subtitle: '| Influencer Portfolio',
    desc: "A high-performance personal brand website featuring 'Frozen Portal' 3D effects, sticky card stacking, and ultra-smooth Lenis scrolling.",
    stack: ['React', 'GSAP ScrollTrigger', 'Lenis', 'Vercel'],
    highlights: ["3D 'Frozen Portal' Effects", 'Sticky Card Stacking', 'Ultra-smooth Lenis Scrolling'],
    url: 'https://siddharthhussain.vercel.app',
    btnColor: '#7c3aed', btnLabel: 'Visit Portfolio',
    images: IMGS.siddharth,
  },
  {
    id: 'vali',
    label: 'Digital Transformation', labelColor: '#227204',
    title: 'Vali Hotel',
    subtitle: '| Catering & Pickles',
    desc: 'Digitizing the Taste of Home — bringing authentic Bethamcherla flavours online with menu display, WhatsApp ordering, and real-time Instagram feed.',
    stack: ['React', 'Lenis', 'PWA', 'Vercel'],
    highlights: ['Full menu display for meals & pickles', 'Seamless WhatsApp ordering', 'Real-time Instagram embedding'],
    url: 'https://valihotel.vercel.app',
    btnColor: '#227204', btnLabel: 'Visit Website',
    images: IMGS.vali,
  },
  {
    id: 'srikrishna',
    label: 'Premium E-Commerce', labelColor: '#3b82f6',
    title: 'Sri Krishna Collections',
    subtitle: '| Luxury Jewelry',
    desc: 'A storefront that shines as bright as the jewels. Engineered for Speedy and No Lag — mobile-first receipt generation and royal \u20b9 presentation.',
    stack: ['React', 'Firebase', 'Lenis', 'PWA'],
    highlights: ["Engineered for 'Speedy No Lag'", 'Mobile-first custom receipts', 'Royal \u20b9 Presentation'],
    url: 'https://srikrishnacollections.com',
    btnColor: '#0F172A', btnLabel: 'Visit Website',
    images: IMGS.srikrishna,
  },
  {
    id: 'ssln',
    label: 'Full-Stack E-Commerce', labelColor: '#d97706',
    title: 'Sri Sai Lakshmi',
    subtitle: '| Narashima Cloth Store',
    desc: 'A modern, high-performance e-commerce platform. Dynamic product catalog, seamless checkout, custom admin panel for real-time management.',
    stack: ['React', 'Firebase', 'Tailwind CSS', 'Vercel', 'PWA'],
    highlights: ['Dynamic Product Catalog', 'Seamless & secure checkout', 'Custom Admin Panel', 'Lightning-fast & mobile-first'],
    url: 'https://sslnclothstore.vercel.app',
    btnColor: '#d97706', btnLabel: 'Visit Store',
    images: IMGS.ssln,
  },
];

/* ─── Project Detail Modal ─── */
function ProjectModal({ p, onClose }: { p: typeof PROJECTS[0] | null; onClose: () => void }) {
  if (!p) return null;
  return (
    <Modal transparent visible animationType="slide" onRequestClose={onClose}>
      <Pressable style={st.mOverlay} onPress={onClose}>
        <Pressable style={st.mSheet} onPress={() => { }}>
          {/* Header image */}
          <View style={st.mImgWrap}>
            <Image source={p.images[0]} style={st.mImg} resizeMode="cover" />
            <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(2,6,23,0.45)' }]} />
            <View style={st.mImgOverlay}>
              <View style={[st.mCatPill, { backgroundColor: p.labelColor }]}>
                <Text style={st.mCatTx}>{p.label.toUpperCase()}</Text>
              </View>
              <Text style={st.mTitle}>{p.title}</Text>
              <Text style={st.mSub}>{p.subtitle}</Text>
            </View>
            <TouchableOpacity style={st.mClose} onPress={onClose}>
              <Ionicons name="close" size={20} color={P.white} />
            </TouchableOpacity>
          </View>
          {/* Content */}
          <ScrollView style={{ maxHeight: 340 }} showsVerticalScrollIndicator={false}>
            <View style={{ padding: 22, gap: 16 }}>
              <Text style={{ color: P.muted, fontSize: 13.5, lineHeight: 21 }}>{p.desc}</Text>
              {/* Stack badges */}
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {p.stack.map(t => (
                  <View key={t} style={st.stackBadge}>
                    <Text style={st.stackBadgeTx}>{t}</Text>
                  </View>
                ))}
              </View>
              {/* Highlights */}
              <View>
                <Text style={{ color: P.white, fontSize: 13, fontWeight: '700', marginBottom: 10 }}>
                  ⚡ Key Highlights
                </Text>
                {p.highlights.map(h => (
                  <View key={h} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: p.labelColor }} />
                    <Text style={{ color: P.muted, fontSize: 13 }}>{h}</Text>
                  </View>
                ))}
              </View>
              {/* Visit button */}
              <TouchableOpacity style={[st.visitBtn, { backgroundColor: p.btnColor }]}
                onPress={() => Linking.openURL(p.url)} activeOpacity={0.85}>
                <Text style={st.visitBtnTx}>{p.btnLabel}</Text>
                <Ionicons name="open-outline" size={16} color={P.white} style={{ marginLeft: 6 }} />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

/* ─── Project Card ─── */
function ProjectCard({ p, onPress, isDesktop }: { p: typeof PROJECTS[0]; onPress: () => void; isDesktop: boolean }) {
  return (
    <TouchableOpacity style={[st.projCard, isDesktop && { width: '48%', marginBottom: 24 }]} onPress={onPress} activeOpacity={0.88}>
      {/* Browser mockup header — matches website style */}
      <View style={st.browserBar}>
        <View style={st.browserDots}>
          <View style={[st.dot, { backgroundColor: '#ef4444' }]} />
          <View style={[st.dot, { backgroundColor: '#f59e0b' }]} />
          <View style={[st.dot, { backgroundColor: '#22c55e' }]} />
        </View>
        <View style={st.urlBar}>
          <Text style={st.urlTx} numberOfLines={1}>
            {p.title.toLowerCase().replace(/\s+/g, '-')}.vercel.app
          </Text>
        </View>
      </View>
      {/* Project image — first screenshot from real website assets */}
      <Image source={p.images[0]} style={st.projImg} resizeMode="cover" />
      {/* Content below */}
      <View style={st.projContent}>
        <View style={[st.projLabel, { backgroundColor: p.labelColor + '22', borderColor: p.labelColor + '55' }]}>
          <Ionicons name="rocket-outline" size={11} color={p.labelColor} />
          <Text style={[st.projLabelTx, { color: p.labelColor }]}>{p.label}</Text>
        </View>
        <Text style={st.projTitle}>{p.title}</Text>
        <Text style={st.projSub}>{p.subtitle}</Text>
        <Text style={st.projDesc} numberOfLines={2}>{p.desc}</Text>
        {/* Stack chips */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
          {p.stack.slice(0, 3).map(t => (
            <View key={t} style={st.stackBadge}>
              <Text style={st.stackBadgeTx}>{t}</Text>
            </View>
          ))}
          {p.stack.length > 3 && (
            <View style={st.stackBadge}>
              <Text style={st.stackBadgeTx}>+{p.stack.length - 3} more</Text>
            </View>
          )}
        </View>
        {/* View button */}
        <TouchableOpacity style={[st.projBtn, { borderColor: p.labelColor }]} onPress={onPress} activeOpacity={0.8}>
          <Text style={[st.projBtnTx, { color: p.labelColor }]}>View Project →</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

/* ─── Page Header ─── */
function PageHeader() {
  const insets = useSafeAreaInsets();
  return (
    <BlurView intensity={45} tint="dark"
      style={[st.header, { paddingTop: insets.top + 8, paddingBottom: 12 }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Image source={require('../../assets/images/VTS_NEW_LOGO.png')} style={{ width: 34, height: 34, borderRadius: 17 }} resizeMode="cover" />
        <Text style={st.headerTitle}>OUR WORK</Text>
      </View>
      <TouchableOpacity style={st.headerBtn}
        onPress={() => Linking.openURL('https://venthra.solutions/our-work')} activeOpacity={0.8}>
        <Ionicons name="open-outline" size={13} color={P.white} style={{ marginRight: 4 }} />
        <Text style={{ color: P.white, fontSize: 11, fontWeight: '700' }}>Website</Text>
      </TouchableOpacity>
    </BlurView>
  );
}

/* ─── Root ─── */
export default function OurWorkScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === 'web' && width >= 900;
  const [selected, setSelected] = useState<typeof PROJECTS[0] | null>(null);

  return (
    <View style={{ flex: 1, backgroundColor: P.bg }}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      {!isDesktop && <PageHeader />}
      <ScrollView
        style={{ flex: 1, backgroundColor: P.bg }}
        contentContainerStyle={[{ paddingBottom: insets.bottom + 24 }, !isDesktop && { paddingTop: insets.top + 56 }]}
        showsVerticalScrollIndicator={false} bounces>

        <View style={isDesktop ? st.desktopWrap : {}}>

          {/* Page hero header */}
          <View style={st.pageHero}>
            <View style={st.glow} />
            <View style={st.chip}><Text style={st.chipTx}>VENTHRA SOLUTIONS PORTFOLIO</Text></View>
            <Text style={st.pageTitle}>
              {'Crafting '}
              <Text style={{ color: P.blueL }}>Digital Excellence</Text>
              {'\nfor Everyone'}
            </Text>
            <Text style={st.pageSub}>
              We don't just write code; we build the digital foundation for businesses everywhere to reach the world.
            </Text>
          </View>

          {/* Project cards */}
          <View style={[{ paddingHorizontal: 16, gap: 24 }, isDesktop && { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }]}>
            {PROJECTS.map(p => (
              <ProjectCard key={p.id} p={p} onPress={() => setSelected(p)} isDesktop={isDesktop} />
            ))}
          </View>

          {/* Bottom CTA */}
          <View style={{ alignItems: 'center', paddingVertical: 36, paddingHorizontal: 24 }}>
            <Text style={{ color: P.muted, fontSize: 14, textAlign: 'center', marginBottom: 18, lineHeight: 21 }}>
              Want your project to be featured here?
            </Text>
            <TouchableOpacity style={st.bottomCta}
              onPress={() => Linking.openURL('https://venthra.solutions')} activeOpacity={0.85}>
              <Text style={{ color: P.white, fontSize: 15, fontWeight: '700' }}>Start Your Project →</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={{ alignItems: 'center', paddingBottom: 12 }}>
            <View style={{ width: '70%', height: 1, backgroundColor: P.border, marginBottom: 14 }} />
            <Text style={{ color: P.mutedD, fontSize: 11, textAlign: 'center', marginBottom: 4 }}>
              © {new Date().getFullYear()} Venthra Solutions. All rights reserved.
            </Text>
            <Text style={{ color: 'rgba(96,165,250,0.4)', fontSize: 9, fontWeight: '700', letterSpacing: 2.5 }}>
              THE DIGITAL ARCHITECTS
            </Text>
          </View>

        </View>
      </ScrollView>

      <ProjectModal p={selected} onClose={() => setSelected(null)} />
    </View>
  );
}

/* ─── Styles ─── */
const st = StyleSheet.create({
  desktopWrap: { maxWidth: 1000, alignSelf: 'center', width: '100%' },
  header: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, overflow: 'hidden', borderBottomWidth: 1, borderBottomColor: P.border },
  logoC: { width: 34, height: 34, borderRadius: 17, backgroundColor: P.white, alignItems: 'center', justifyContent: 'center' },
  logoTx: { color: P.bg, fontSize: 8, fontWeight: '900', letterSpacing: 0.5 },
  headerTitle: { color: P.white, fontSize: 11, fontWeight: '700', letterSpacing: 2.5 },
  headerBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: P.blue, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 7 },
  /* Page hero */
  pageHero: { alignItems: 'center', paddingHorizontal: 24, paddingTop: 32, paddingBottom: 28, overflow: 'hidden', position: 'relative' },
  glow: { position: 'absolute', top: -40, width: 200, height: 200, borderRadius: 100, backgroundColor: 'rgba(59,130,246,0.1)', shadowColor: P.blue, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.7, shadowRadius: 80 },
  chip: { backgroundColor: 'rgba(59,130,246,0.1)', borderWidth: 1, borderColor: 'rgba(59,130,246,0.25)', borderRadius: 100, paddingHorizontal: 14, paddingVertical: 6, marginBottom: 14 },
  chipTx: { color: P.blueL, fontSize: 9, fontWeight: '700', letterSpacing: 2 },
  pageTitle: { color: P.white, fontSize: 28, fontWeight: '800', textAlign: 'center', lineHeight: 38, marginBottom: 12 },
  pageSub: { color: P.muted, fontSize: 14, textAlign: 'center', lineHeight: 22, maxWidth: 320 },
  /* Project card */
  projCard: { backgroundColor: P.card, borderRadius: 20, borderWidth: 1, borderColor: P.border, overflow: 'hidden', elevation: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.3, shadowRadius: 14 },
  /* Browser bar */
  browserBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e293b', paddingHorizontal: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: P.border },
  browserDots: { flexDirection: 'row', gap: 6, marginRight: 10 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  urlBar: { flex: 1, backgroundColor: '#0f172a', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1, borderColor: P.border },
  urlTx: { color: P.muted, fontSize: 10, fontFamily: 'monospace' },
  projImg: { width: '100%', height: 190 },
  projContent: { padding: 18 },
  projLabel: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', borderWidth: 1, borderRadius: 100, paddingHorizontal: 10, paddingVertical: 4, marginBottom: 10 },
  projLabelTx: { fontSize: 10, fontWeight: '700', letterSpacing: 0.8 },
  projTitle: { color: P.white, fontSize: 20, fontWeight: '800', lineHeight: 26 },
  projSub: { color: P.muted, fontSize: 13, fontWeight: '400', marginBottom: 10, marginTop: 2 },
  projDesc: { color: P.muted, fontSize: 13, lineHeight: 20 },
  stackBadge: { backgroundColor: 'rgba(59,130,246,0.1)', borderWidth: 1, borderColor: 'rgba(59,130,246,0.22)', borderRadius: 100, paddingHorizontal: 10, paddingVertical: 4 },
  stackBadgeTx: { color: P.blueL, fontSize: 11, fontWeight: '500' },
  projBtn: { borderWidth: 1.5, borderRadius: 12, paddingVertical: 11, alignItems: 'center', marginTop: 14 },
  projBtnTx: { fontSize: 13.5, fontWeight: '700' },
  /* Bottom CTA */
  bottomCta: { backgroundColor: P.blue, borderRadius: 100, paddingHorizontal: 32, paddingVertical: 15, shadowColor: P.blue, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.6, shadowRadius: 20, elevation: 12 },
  /* Modal */
  mOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'flex-end' },
  mSheet: { backgroundColor: '#080f1e', borderTopLeftRadius: 28, borderTopRightRadius: 28, maxHeight: '88%', overflow: 'hidden', borderTopWidth: 1, borderColor: P.border },
  mImgWrap: { height: 200, position: 'relative' },
  mImg: { width: '100%', height: 200 },
  mImgOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16 },
  mCatPill: { alignSelf: 'flex-start', borderRadius: 100, paddingHorizontal: 10, paddingVertical: 4, marginBottom: 6 },
  mCatTx: { color: P.white, fontSize: 8, fontWeight: '800', letterSpacing: 1.5 },
  mTitle: { color: P.white, fontSize: 22, fontWeight: '800' },
  mSub: { color: 'rgba(255,255,255,0.6)', fontSize: 13 },
  mClose: { position: 'absolute', top: 12, right: 12, backgroundColor: 'rgba(0,0,0,0.55)', borderRadius: 20, padding: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  visitBtn: { borderRadius: 14, paddingVertical: 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 6 },
  visitBtnTx: { color: P.white, fontSize: 14, fontWeight: '700' },
});
