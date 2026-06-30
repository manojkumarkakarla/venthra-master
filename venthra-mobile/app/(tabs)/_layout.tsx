import { Tabs, useRouter, useSegments } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform, useWindowDimensions, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const C = {
  bg: '#020617',
  card: '#0a1020',
  blue: '#3b82f6',
  blueL: '#60a5fa',
  white: '#ffffff',
  muted: '#94a3b8',
  border: 'rgba(255,255,255,0.1)',
};

const NAV_LINKS = [
  { name: 'index', label: 'Home', icon: 'home' as const },
  { name: 'explore', label: 'Our Work', icon: 'briefcase' as const },
  { name: 'about', label: 'About', icon: 'person' as const },
];

/** Horizontal desktop top navbar — shown only on web & width >= 900 */
function DesktopNav() {
  const router = useRouter();
  const segments = useSegments();
  const insets = useSafeAreaInsets();
  const active = (segments[1] as string) ?? 'index';

  return (
    <View style={[s.desktopNav, { paddingTop: insets.top + 4 }]}>
      {/* Logo */}
      <TouchableOpacity style={s.desktopLogo} onPress={() => router.push('/')} activeOpacity={0.8}>
        <Image source={require('../../assets/images/VTS_NEW_LOGO.png')} style={{ width: 36, height: 36, borderRadius: 18 }} resizeMode="cover" />
        <Text style={s.logoLabel}>VENTHRA.SOLUTIONS</Text>
      </TouchableOpacity>

      {/* Nav links */}
      <View style={s.desktopLinks}>
        {NAV_LINKS.map(lk => {
          const isActive = active === lk.name || (lk.name === 'index' && active === '(tabs)');
          return (
            <TouchableOpacity
              key={lk.name}
              style={[s.navLink, isActive && s.navLinkActive]}
              onPress={() => router.push((lk.name === 'index' ? '/' : `/${lk.name}`) as any)}
              activeOpacity={0.75}
            >
              <Ionicons name={lk.icon} size={15} color={isActive ? C.blueL : C.muted} />
              <Text style={[s.navLinkTx, isActive && s.navLinkTxActive]}>{lk.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* CTA button */}
      <TouchableOpacity style={s.desktopCta}
        onPress={() => router.push('/')} activeOpacity={0.85}>
        <Text style={s.desktopCtaTx}>Get Started →</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function TabLayout() {
  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === 'web' && width >= 900;

  const TAB_BAR_STYLE = isDesktop
    ? { display: 'none' as const }       // hide on desktop — DesktopNav replaces it
    : {
      backgroundColor: '#0a1020',
      borderTopColor: 'rgba(59,130,246,0.2)',
      borderTopWidth: 1,
      height: 64,
      paddingBottom: 10,
      paddingTop: 8,
    };

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      {/* Desktop nav bar sits above everything */}
      {isDesktop && <DesktopNav />}

      <Tabs screenOptions={{
        headerShown: false,
        tabBarStyle: TAB_BAR_STYLE,
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: '#475569',
        tabBarLabelStyle: { fontSize: 10, fontWeight: '700', letterSpacing: 0.8, marginTop: 2 },
      }}>
        <Tabs.Screen name="index" options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }} />
        <Tabs.Screen name="explore" options={{
          title: 'Our Work',
          tabBarIcon: ({ color, size }) => <Ionicons name="briefcase" size={size} color={color} />,
        }} />
        <Tabs.Screen name="about" options={{
          title: 'About',
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
        }} />
      </Tabs>
    </View>
  );
}

const s = StyleSheet.create({
  desktopNav: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.card,
    borderBottomWidth: 1, borderBottomColor: C.border,
    paddingHorizontal: 40, paddingBottom: 14,
    zIndex: 200,
    // web shadow
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3, shadowRadius: 8,
  },
  desktopLogo: { flexDirection: 'row', alignItems: 'center', gap: 10, marginRight: 40 },
  logoCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: C.white, alignItems: 'center', justifyContent: 'center' },
  logoTx: { color: C.bg, fontSize: 9, fontWeight: '900', letterSpacing: 0.5 },
  logoLabel: { color: C.white, fontSize: 12, fontWeight: '800', letterSpacing: 2 },
  desktopLinks: { flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1 },
  navLink: { flexDirection: 'row', alignItems: 'center', gap: 7, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10 },
  navLinkActive: { backgroundColor: 'rgba(59,130,246,0.1)' },
  navLinkTx: { color: C.muted, fontSize: 13, fontWeight: '600' },
  navLinkTxActive: { color: C.blueL, fontWeight: '700' },
  desktopCta: {
    backgroundColor: C.blue, borderRadius: 100,
    paddingHorizontal: 22, paddingVertical: 10,
    shadowColor: C.blue, shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5, shadowRadius: 14, elevation: 8,
  },
  desktopCtaTx: { color: C.white, fontSize: 13, fontWeight: '700', letterSpacing: 0.4 },
});
