/**
 * ABOUT TAB — mirrors the Venthra Solutions /about page
 * Dark navy hero with founder profile, bio, tech tags, Our Story, Mission
 */
import React from 'react';
import {
    View, Text, ScrollView, TouchableOpacity,
    StyleSheet, Linking, StatusBar, Image,
    Platform, useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const P = {
    bg: '#020617', nav: '#0a192f', card: '#0f172a',
    blue: '#3b82f6', blueL: '#60a5fa', blueD: '#1d4ed8',
    cyan: '#22d3ee', white: '#ffffff',
    muted: '#94a3b8', mutedD: '#475569',
    border: 'rgba(255,255,255,0.08)',
    borderB: 'rgba(59,130,246,0.25)',
};

const TECH = ['React.js', 'Node.js', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GSAP'];

const SKILLS = [
    { icon: '🌐', label: 'Full Stack Dev', desc: 'React, Node.js, TypeScript' },
    { icon: '🎨', label: 'Premium Design', desc: 'GSAP animations, Framer Motion' },
    { icon: '⚡', label: 'Performance First', desc: 'Lag-free, fast-loading sites' },
    { icon: '📱', label: 'Mobile-First', desc: 'Responsive on all devices' },
];

/* ─── Page Header ─── */
function PageHeader() {
    const insets = useSafeAreaInsets();
    return (
        <BlurView intensity={45} tint="dark"
            style={[st.header, { paddingTop: insets.top + 8, paddingBottom: 12 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Image source={require('../../assets/images/VTS_NEW_LOGO.png')} style={{ width: 34, height: 34, borderRadius: 17 }} resizeMode="cover" />
                <Text style={st.headerTitle}>ABOUT</Text>
            </View>
            <TouchableOpacity style={st.headerBtn}
                onPress={() => Linking.openURL('https://venthra.solutions/about')} activeOpacity={0.8}>
                <Text style={{ color: P.white, fontSize: 11, fontWeight: '700' }}>Website ↗</Text>
            </TouchableOpacity>
        </BlurView>
    );
}

/* ─── Founder Hero ─── */
function FounderHero() {
    return (
        <View style={st.founderHero}>
            {/* Background blobs — matching the dark navy on the website */}
            <View style={st.blobBlue} />
            <View style={st.blobIndigo} />

            {/* Profile avatar — real founder photo */}
            <View style={st.avatarRing}>
                <View style={st.avatarInner}>
                    <Image
                        source={require('../../assets/images/venthrafounder.jpeg')}
                        style={{ width: '100%', height: '100%', borderRadius: 62 }}
                        resizeMode="cover"
                    />
                </View>
            </View>

            {/* "Founder of" label */}
            <Text style={st.founderOf}>FOUNDER OF</Text>
            <Text style={st.founderBrand}>VENTHRA.SOLUTIONS</Text>

            {/* Name */}
            <Text style={st.founderName}>Kakarla Charan Kumar</Text>

            {/* Dev badge */}
            <View style={st.devBadge}>
                <Ionicons name="terminal-outline" size={14} color={P.blueL} />
                <Text style={st.devBadgeTx}>FULL STACK DEVELOPER</Text>
            </View>

            {/* Bio */}
            <Text style={st.bio}>
                I build accessible,{' '}
                <Text style={{ color: P.white, fontWeight: '600' }}>pixel-perfect</Text>{', '}
                and performant web experiences. Passionate about merging{' '}
                <Text style={{ color: P.blueL, fontWeight: '700' }}>clean code</Text>
                {' '}with{' '}
                <Text style={{ color: P.cyan, fontWeight: '700' }}>premium design</Text>
                {' '}to create digital solutions that stand out.
            </Text>

            {/* Tech tags */}
            <View style={st.techRow}>
                {TECH.map(t => (
                    <View key={t} style={st.techTag}>
                        <Text style={st.techTagTx}>{t}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

/* ─── Skills Grid ─── */
function SkillsGrid() {
    const { width: winW } = useWindowDimensions();
    const isDesktop = Platform.OS === 'web' && winW >= 900;
    const contentW = isDesktop ? Math.min(winW, 1000) : winW;
    const cardW = isDesktop ? (contentW - 60) / 4 : (contentW - 44) / 2;

    return (
        <View style={st.sec}>
            <View style={st.secHead}>
                <View style={st.chip}><Text style={st.chipTx}>WHAT I DO</Text></View>
                <Text style={st.secTitle}>
                    {'Skills & '}
                    <Text style={{ color: P.blueL }}>Expertise</Text>
                </Text>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                {SKILLS.map(sk => (
                    <View key={sk.label} style={[st.skillCard, { width: cardW }]}>
                        <Text style={{ fontSize: 28, marginBottom: 10 }}>{sk.icon}</Text>
                        <Text style={st.skillLabel}>{sk.label}</Text>
                        <Text style={st.skillDesc}>{sk.desc}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

/* ─── Our Story ─── */
function OurStory() {
    return (
        <View style={[st.sec, { backgroundColor: P.white, paddingTop: 36, paddingBottom: 36 }]}>
            <Text style={[st.secTitle, { color: '#0f172a', textAlign: 'center', marginBottom: 8 }]}>
                Our Story
            </Text>
            {/* Blue underline bar — matches website */}
            <View style={st.storyBar} />

            <Text style={st.storyP}>
                <Text style={st.storyDrop}>F</Text>
                rom the vibrant streets of{' '}
                <Text style={{ fontWeight: '700', color: '#0f172a' }}>Bethamcherla</Text>
                {' '}to the vast digital world, my journey has been driven by one simple observation: our local businesses have incredible potential, but they often struggle to reach customers beyond our town.{' '}
                <Text style={{ fontStyle: 'italic', color: '#1d4ed8', fontWeight: '600' }}>
                    "Manam edagalante, manam kanipinchali"
                </Text>
                {' '}(To grow, we must be seen).
            </Text>

            <Text style={st.storyP}>
                I am a tech enthusiast obsessed with building{' '}
                <Text style={{ fontWeight: '700', color: '#0f172a' }}>speedy</Text>
                {' '}and{' '}
                <Text style={{ fontWeight: '700', color: '#0f172a' }}>lag-free</Text>
                {' '}websites. Because every business, no matter how small, deserves a premium digital presence that rivals the biggest brands.
            </Text>

            {/* Mission box */}
            <View style={st.missionBox}>
                <Text style={st.missionTitle}>My Mission</Text>
                <Text style={st.missionTx}>
                    It isn't just to write code, but to{' '}
                    <Text style={{ fontWeight: '700' }}>turn local visions into digital realities</Text>
                    . Bridging the gap between local craftsmanship and global visibility.
                </Text>
            </View>

            <Text style={st.storyP}>
                At Venthra Solutions, I bring more than just technical skills — I bring the values of hard work and community pride. When you work with me, you're not just getting a developer; you're getting a{' '}
                <Text style={{ fontWeight: '700', color: '#0f172a' }}>partner who cares about your success</Text>.
            </Text>
        </View>
    );
}

/* ─── CTA ─── */
function CTARow() {
    return (
        <View style={[st.sec, { paddingTop: 32, paddingBottom: 36, alignItems: 'center', gap: 12 }]}>
            <TouchableOpacity style={st.ctaBlue}
                onPress={() => Linking.openURL('https://venthra.solutions')} activeOpacity={0.85}>
                <Text style={{ color: P.white, fontSize: 15, fontWeight: '700' }}>Start Your Project →</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => Linking.openURL('https://wa.me/918919757303')} activeOpacity={0.7}>
                <Text style={{ color: P.blueL, fontSize: 13, fontWeight: '600', textDecorationLine: 'underline' }}>
                    💬  Chat on WhatsApp
                </Text>
            </TouchableOpacity>
        </View>
    );
}

/* ─── Root ─── */
export default function AboutScreen() {
    const insets = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const isDesktop = Platform.OS === 'web' && width >= 900;

    return (
        <View style={{ flex: 1, backgroundColor: P.bg }}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            {!isDesktop && <PageHeader />}
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={[{ paddingBottom: insets.bottom + 24 }, !isDesktop && { paddingTop: insets.top + 56 }]}
                showsVerticalScrollIndicator={false} bounces>
                <View style={isDesktop ? st.desktopWrap : {}}>
                    <FounderHero />
                    <SkillsGrid />
                    <OurStory />
                    <CTARow />
                    {/* Footer */}
                    <View style={{ alignItems: 'center', paddingBottom: 16 }}>
                        <View style={{ width: '70%', height: 1, backgroundColor: P.border, marginBottom: 14 }} />
                        <Text style={{ color: P.mutedD, fontSize: 11, textAlign: 'center' }}>
                            © {new Date().getFullYear()} Venthra Solutions
                        </Text>
                    </View>
                </View>
            </ScrollView>
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
    headerBtn: { backgroundColor: P.blue, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 7 },
    /* Founder hero */
    founderHero: { backgroundColor: P.nav, paddingTop: 40, paddingBottom: 40, paddingHorizontal: 24, alignItems: 'center', overflow: 'hidden', position: 'relative' },
    blobBlue: { position: 'absolute', top: -100, right: -80, width: 280, height: 280, borderRadius: 140, backgroundColor: 'rgba(59,130,246,0.18)', shadowColor: P.blue, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 1, shadowRadius: 80 },
    blobIndigo: { position: 'absolute', bottom: -80, left: -80, width: 240, height: 240, borderRadius: 120, backgroundColor: 'rgba(99,102,241,0.15)' },
    avatarRing: { width: 140, height: 140, borderRadius: 70, borderWidth: 3, borderColor: P.blue, padding: 4, marginBottom: 18, shadowColor: P.blue, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.7, shadowRadius: 20 },
    avatarInner: { flex: 1, borderRadius: 65, backgroundColor: P.card, alignItems: 'center', justifyContent: 'center' },
    avatarEmoji: { fontSize: 56 },
    founderOf: { color: 'rgba(191,219,254,0.8)', fontSize: 10, fontWeight: '700', letterSpacing: 3, marginBottom: 4 },
    founderBrand: { color: P.white, fontSize: 13, fontWeight: '800', letterSpacing: 2.5, marginBottom: 16, textShadowColor: 'rgba(59,130,246,0.4)', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 10 },
    founderName: { color: P.white, fontSize: 26, fontWeight: '800', textAlign: 'center', fontStyle: 'italic', letterSpacing: 0.5, marginBottom: 14, textShadowColor: 'rgba(59,130,246,0.4)', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 10 },
    devBadge: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: P.card, borderWidth: 1, borderColor: P.borderB, borderRadius: 100, paddingHorizontal: 16, paddingVertical: 8, marginBottom: 18 },
    devBadgeTx: { color: P.blueL, fontSize: 11, fontWeight: '700', letterSpacing: 2 },
    bio: { color: 'rgba(191,219,254,0.8)', fontSize: 15, textAlign: 'center', lineHeight: 24, marginBottom: 20, maxWidth: 340 },
    techRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center' },
    techTag: { backgroundColor: 'rgba(30,41,59,0.85)', borderWidth: 1, borderColor: P.borderB, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 7 },
    techTagTx: { color: 'rgba(191,219,254,0.9)', fontSize: 12, fontWeight: '500' },
    /* Sections */
    sec: { paddingHorizontal: 16, paddingTop: 32, paddingBottom: 20 },
    secHead: { alignItems: 'center', marginBottom: 20 },
    chip: { backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: P.border, borderRadius: 100, paddingHorizontal: 14, paddingVertical: 6, marginBottom: 14 },
    chipTx: { color: P.muted, fontSize: 9.5, fontWeight: '700', letterSpacing: 2.2 },
    secTitle: { color: P.white, fontSize: 26, fontWeight: '800', textAlign: 'center', lineHeight: 34, marginBottom: 10 },
    /* Skills */
    skillCard: { backgroundColor: P.card, borderWidth: 1, borderColor: P.border, borderRadius: 18, padding: 18 },
    skillLabel: { color: P.white, fontSize: 14, fontWeight: '700', marginBottom: 4 },
    skillDesc: { color: P.muted, fontSize: 12, lineHeight: 17 },
    /* Story */
    storyBar: { width: 80, height: 4, backgroundColor: P.blue, borderRadius: 2, alignSelf: 'center', marginBottom: 24 },
    storyDrop: { fontSize: 40, fontWeight: '900', color: '#1e3a8a', lineHeight: 40 },
    storyP: { color: '#334155', fontSize: 14, lineHeight: 24, marginBottom: 16 },
    missionBox: { backgroundColor: '#eff6ff', borderLeftWidth: 4, borderLeftColor: P.blue, borderRadius: 12, padding: 18, marginBottom: 16 },
    missionTitle: { color: '#1e3a8a', fontSize: 15, fontWeight: '800', marginBottom: 6 },
    missionTx: { color: '#1e40af', fontSize: 13.5, fontStyle: 'italic', lineHeight: 21 },
    /* CTA */
    ctaBlue: { backgroundColor: P.blue, borderRadius: 100, paddingHorizontal: 32, paddingVertical: 15, shadowColor: P.blue, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.6, shadowRadius: 18, elevation: 12 },
});
