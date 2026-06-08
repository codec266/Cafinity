import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const STATS = [
  { icon: 'shopping-bag', value: '128', label: 'Orders' },
  { icon: 'star', value: '2,850', label: 'Reward Points' },
  { icon: 'coffee', value: '18', label: 'Favorite Drinks' },
  { icon: 'message-circle', value: '42', label: 'Reviews' },
] as const;

export default function ProfileScreen() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#080808' }} edges={['top']}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 128 }}>

        {/* ── Header ─────────────────────────── */}
        <View
          style={{
            flexDirection: 'row', alignItems: 'center',
            paddingHorizontal: 24, paddingTop: 20, paddingBottom: 22,
          }}
        >
          {/* Avatar + crown badge */}
          <View style={{ marginRight: 16 }}>
            <View
              style={{
                width: 80, height: 80, borderRadius: 40,
                borderWidth: 2.5, borderColor: '#D4A24C', overflow: 'hidden',
                shadowColor: '#D4A24C', shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.4, shadowRadius: 14, elevation: 8,
              }}
            >
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' }}
                style={{ width: 80, height: 80 }}
                resizeMode="cover"
              />
            </View>
            <View
              style={{
                position: 'absolute', bottom: 0, left: 0,
                width: 26, height: 26, borderRadius: 13,
                backgroundColor: '#D4A24C',
                borderWidth: 2, borderColor: '#080808',
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Feather name="award" size={12} color="#080808" />
            </View>
          </View>

          {/* Name + Gold Member + tagline */}
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 5 }}>
              <Text style={{ color: '#FFFFFF', fontSize: 22, fontWeight: '700', letterSpacing: -0.3 }}>
                Kyle Austria
              </Text>
              <View
                style={{
                  width: 19, height: 19, borderRadius: 10,
                  backgroundColor: '#3B82F6',
                  alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Feather name="check" size={11} color="#FFFFFF" />
              </View>
            </View>
            <Text style={{ color: '#D4A24C', fontSize: 14, fontWeight: '600', marginBottom: 4 }}>
              Gold Member
            </Text>
            <Text style={{ color: '#737373', fontSize: 12 }}>Coffee Enthusiast Since 2026</Text>
          </View>

          {/* Bell + settings */}
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <View>
              <TouchableOpacity
                style={{
                  width: 42, height: 42, borderRadius: 21,
                  backgroundColor: '#111111', borderWidth: 1, borderColor: '#2A1A0D',
                  alignItems: 'center', justifyContent: 'center',
                }}
                activeOpacity={0.8}
              >
                <Feather name="bell" size={18} color="#D4A24C" />
              </TouchableOpacity>
              <View
                style={{
                  position: 'absolute', top: 9, right: 9,
                  width: 8, height: 8, borderRadius: 4,
                  backgroundColor: '#F59E0B', borderWidth: 1.5, borderColor: '#080808',
                }}
              />
            </View>
            <TouchableOpacity
              style={{
                width: 42, height: 42, borderRadius: 21,
                backgroundColor: '#111111', borderWidth: 1, borderColor: '#2A1A0D',
                alignItems: 'center', justifyContent: 'center',
              }}
              activeOpacity={0.8}
            >
              <Feather name="settings" size={18} color="#737373" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Membership card ─────────────────── */}
        <View
          style={{
            marginHorizontal: 24, marginBottom: 20,
            height: 172, borderRadius: 22, overflow: 'hidden',
            borderWidth: 1, borderColor: 'rgba(212,162,76,0.35)',
          }}
        >
          {/* Card background layers */}
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#110C06' }} />
          <View style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '50%', backgroundColor: 'rgba(35,20,4,0.9)' }} />
          {/* Gold top edge shimmer */}
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1.5, backgroundColor: 'rgba(212,162,76,0.6)' }} />
          {/* Watermark */}
          <Feather
            name="feather"
            size={115}
            color="rgba(212,162,76,0.05)"
            style={{ position: 'absolute', left: -14, top: -14 }}
          />

          <View style={{ flexDirection: 'row', padding: 20, flex: 1 }}>
            {/* Left — brand + points */}
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
              <View>
                <Text style={{ color: '#D4A24C', fontSize: 10, fontWeight: '600', letterSpacing: 3.5, textTransform: 'uppercase', marginBottom: 2 }}>
                  CAFINITY
                </Text>
                <Text style={{ color: '#D4A24C', fontSize: 38, fontWeight: '800', letterSpacing: -1, lineHeight: 42, marginBottom: 14 }}>
                  GOLD
                </Text>
              </View>

              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 8 }}>
                  <View
                    style={{
                      width: 20, height: 20, borderRadius: 10,
                      backgroundColor: '#D4A24C',
                      alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <Feather name="disc" size={11} color="#080808" />
                  </View>
                  <Text style={{ color: '#FFFFFF', fontSize: 17, fontWeight: '700' }}>2,850 Points</Text>
                </View>

                {/* Progress bar */}
                <View
                  style={{
                    height: 5, backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: 3, marginBottom: 6,
                  }}
                >
                  <View style={{ width: '95%', height: 5, backgroundColor: '#D4A24C', borderRadius: 3 }} />
                </View>

                <Text style={{ color: '#737373', fontSize: 11 }}>150 Points until Platinum</Text>
              </View>
            </View>

            {/* Right — member ID + decorative coffee */}
            <View style={{ width: 120, alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ color: '#737373', fontSize: 9, fontWeight: '500', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 3 }}>
                  MEMBER ID
                </Text>
                <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: '700', letterSpacing: 0.5 }}>
                  CAF-102938
                </Text>
              </View>
              <Feather name="coffee" size={68} color="rgba(212,162,76,0.6)" />
            </View>
          </View>
        </View>

        {/* ── Stats (4 cards) ──────────────────── */}
        <View style={{ paddingHorizontal: 24, flexDirection: 'row', gap: 10, marginBottom: 20 }}>
          {STATS.map(stat => (
            <View
              key={stat.label}
              style={{
                flex: 1, backgroundColor: '#111111',
                borderRadius: 16, borderWidth: 1, borderColor: '#2A1A0D',
                padding: 11, alignItems: 'center', gap: 6,
              }}
            >
              <View
                style={{
                  width: 36, height: 36, borderRadius: 12,
                  backgroundColor: 'rgba(212,162,76,0.1)',
                  borderWidth: 1, borderColor: 'rgba(212,162,76,0.2)',
                  alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Feather name={stat.icon} size={16} color="#D4A24C" />
              </View>
              <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '800', letterSpacing: -0.3 }}>
                {stat.value}
              </Text>
              <Text
                style={{ color: '#737373', fontSize: 9, fontWeight: '500', textAlign: 'center', lineHeight: 13 }}
                numberOfLines={2}
              >
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        {/* ── Favorite Drink + Recent Orders ──── */}
        <View style={{ paddingHorizontal: 24, flexDirection: 'row', gap: 12, marginBottom: 20, alignItems: 'flex-start' }}>

          {/* Favorite Drink */}
          <View
            style={{
              flex: 1, backgroundColor: '#111111',
              borderRadius: 20, borderWidth: 1, borderColor: '#2A1A0D', overflow: 'hidden',
            }}
          >
            <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: '700', padding: 14, paddingBottom: 10 }}>
              Your Favorite Drink
            </Text>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=400&auto=format&fit=crop' }}
              style={{ width: '100%', height: 130 }}
              resizeMode="cover"
            />
            <View style={{ padding: 12 }}>
              <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '700', marginBottom: 6 }}>
                Caramel Macchiato
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: 6 }}>
                {[1, 2, 3, 4].map(i => (
                  <Feather key={i} name="star" size={11} color="#D4A24C" />
                ))}
                <Feather name="star" size={11} color="rgba(212,162,76,0.35)" />
                <Text style={{ color: '#A3A3A3', fontSize: 11, marginLeft: 3 }}>4.8 (256)</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <Feather name="coffee" size={11} color="#737373" />
                <Text style={{ color: '#737373', fontSize: 11 }}>Ordered 37 times</Text>
              </View>
            </View>
          </View>

          {/* Recent Orders */}
          <View
            style={{
              flex: 1.1, backgroundColor: '#111111',
              borderRadius: 20, borderWidth: 1, borderColor: '#2A1A0D', padding: 14,
            }}
          >
            <View
              style={{
                flexDirection: 'row', alignItems: 'center',
                justifyContent: 'space-between', marginBottom: 14,
              }}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: '700' }}>Recent Orders</Text>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }} activeOpacity={0.7}>
                <Text style={{ color: '#D4A24C', fontSize: 11 }}>See all</Text>
                <Feather name="chevron-right" size={12} color="#D4A24C" />
              </TouchableOpacity>
            </View>

            {/* Order 1 */}
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }} activeOpacity={0.7}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=200&auto=format&fit=crop' }}
                style={{ width: 52, height: 52, borderRadius: 12, marginRight: 10 }}
                resizeMode="cover"
              />
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
                  <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '700' }}>Order #1023</Text>
                  <View style={{ paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, backgroundColor: 'rgba(34,197,94,0.1)', borderWidth: 1, borderColor: 'rgba(34,197,94,0.3)' }}>
                    <Text style={{ color: '#22C55E', fontSize: 9, fontWeight: '600' }}>Delivered</Text>
                  </View>
                </View>
                <Text style={{ color: '#737373', fontSize: 10, lineHeight: 14 }} numberOfLines={2}>
                  {'Caramel Macchiato\nIced Spanish Latte'}
                </Text>
                <Text style={{ color: '#525252', fontSize: 9, marginTop: 3 }}>May 20, 2026 • 2 Items</Text>
              </View>
              <Feather name="chevron-right" size={13} color="#3A3A3A" style={{ marginLeft: 4 }} />
            </TouchableOpacity>

            <View style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.05)', marginBottom: 12 }} />

            {/* Order 2 */}
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} activeOpacity={0.7}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=200&auto=format&fit=crop' }}
                style={{ width: 52, height: 52, borderRadius: 12, marginRight: 10 }}
                resizeMode="cover"
              />
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
                  <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '700' }}>Order #1021</Text>
                  <View style={{ paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, backgroundColor: 'rgba(34,197,94,0.1)', borderWidth: 1, borderColor: 'rgba(34,197,94,0.3)' }}>
                    <Text style={{ color: '#22C55E', fontSize: 9, fontWeight: '600' }}>Delivered</Text>
                  </View>
                </View>
                <Text style={{ color: '#737373', fontSize: 10, lineHeight: 14 }} numberOfLines={2}>
                  {'Matcha Latte\nCroissant'}
                </Text>
                <Text style={{ color: '#525252', fontSize: 9, marginTop: 3 }}>May 18, 2026 • 2 Items</Text>
              </View>
              <Feather name="chevron-right" size={13} color="#3A3A3A" style={{ marginLeft: 4 }} />
            </TouchableOpacity>
          </View>

        </View>

        {/* ── Account settings card ─────────────── */}
        <View
          style={{
            marginHorizontal: 24, marginBottom: 14,
            backgroundColor: '#111111', borderRadius: 20,
            borderWidth: 1, borderColor: '#2A1A0D', overflow: 'hidden',
          }}
        >
          {[
            [{ icon: 'user', label: 'Edit Profile' }, { icon: 'gift', label: 'Rewards Program' }],
            [{ icon: 'map-pin', label: 'Delivery Addresses' }, { icon: 'bell', label: 'Notifications' }],
            [{ icon: 'credit-card', label: 'Payment Methods' }, { icon: 'help-circle', label: 'Help Center' }],
          ].map((row, rowIdx) => (
            <View
              key={rowIdx}
              style={{
                flexDirection: 'row',
                borderBottomWidth: rowIdx < 2 ? 1 : 0,
                borderBottomColor: 'rgba(255,255,255,0.05)',
              }}
            >
              {row.map((item, colIdx) => (
                <TouchableOpacity
                  key={item.label}
                  style={{
                    flex: 1, flexDirection: 'row', alignItems: 'center',
                    paddingVertical: 14, paddingHorizontal: 14, gap: 10,
                    borderRightWidth: colIdx === 0 ? 1 : 0,
                    borderRightColor: 'rgba(255,255,255,0.05)',
                  }}
                  activeOpacity={0.7}
                >
                  <View
                    style={{
                      width: 32, height: 32, borderRadius: 10,
                      backgroundColor: 'rgba(212,162,76,0.1)',
                      borderWidth: 1, borderColor: 'rgba(212,162,76,0.18)',
                      alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <Feather name={item.icon as any} size={15} color="#D4A24C" />
                  </View>
                  <Text style={{ flex: 1, color: '#FFFFFF', fontSize: 12, fontWeight: '500' }} numberOfLines={1}>
                    {item.label}
                  </Text>
                  <Feather name="chevron-right" size={13} color="#3A3A3A" />
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        {/* ── Settings card ─────────────────────── */}
        <View
          style={{
            marginHorizontal: 24, marginBottom: 20,
            backgroundColor: '#111111', borderRadius: 20,
            borderWidth: 1, borderColor: '#2A1A0D', overflow: 'hidden',
          }}
        >
          {/* Row 1: Dark Mode | Security */}
          <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' }}>
            {/* Dark Mode with toggle */}
            <View
              style={{
                flex: 1, flexDirection: 'row', alignItems: 'center',
                paddingVertical: 13, paddingHorizontal: 14, gap: 10,
                borderRightWidth: 1, borderRightColor: 'rgba(255,255,255,0.05)',
              }}
            >
              <View
                style={{
                  width: 32, height: 32, borderRadius: 10,
                  backgroundColor: 'rgba(212,162,76,0.1)',
                  borderWidth: 1, borderColor: 'rgba(212,162,76,0.18)',
                  alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Feather name="sun" size={15} color="#D4A24C" />
              </View>
              <Text style={{ flex: 1, color: '#FFFFFF', fontSize: 12, fontWeight: '500' }}>Dark Mode</Text>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#2A2A2A', true: 'rgba(212,162,76,0.55)' }}
                thumbColor={darkMode ? '#D4A24C' : '#888888'}
                ios_backgroundColor="#2A2A2A"
                style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
              />
            </View>

            {/* Security */}
            <TouchableOpacity
              style={{
                flex: 1, flexDirection: 'row', alignItems: 'center',
                paddingVertical: 13, paddingHorizontal: 14, gap: 10,
              }}
              activeOpacity={0.7}
            >
              <View
                style={{
                  width: 32, height: 32, borderRadius: 10,
                  backgroundColor: 'rgba(212,162,76,0.1)',
                  borderWidth: 1, borderColor: 'rgba(212,162,76,0.18)',
                  alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Feather name="lock" size={15} color="#D4A24C" />
              </View>
              <Text style={{ flex: 1, color: '#FFFFFF', fontSize: 12, fontWeight: '500' }} numberOfLines={1}>Security</Text>
              <Feather name="chevron-right" size={13} color="#3A3A3A" />
            </TouchableOpacity>
          </View>

          {/* Row 2: Privacy | App Preferences */}
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{
                flex: 1, flexDirection: 'row', alignItems: 'center',
                paddingVertical: 13, paddingHorizontal: 14, gap: 10,
                borderRightWidth: 1, borderRightColor: 'rgba(255,255,255,0.05)',
              }}
              activeOpacity={0.7}
            >
              <View
                style={{
                  width: 32, height: 32, borderRadius: 10,
                  backgroundColor: 'rgba(212,162,76,0.1)',
                  borderWidth: 1, borderColor: 'rgba(212,162,76,0.18)',
                  alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Feather name="shield" size={15} color="#D4A24C" />
              </View>
              <Text style={{ flex: 1, color: '#FFFFFF', fontSize: 12, fontWeight: '500' }}>Privacy</Text>
              <Feather name="chevron-right" size={13} color="#3A3A3A" />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1, flexDirection: 'row', alignItems: 'center',
                paddingVertical: 13, paddingHorizontal: 14, gap: 10,
              }}
              activeOpacity={0.7}
            >
              <View
                style={{
                  width: 32, height: 32, borderRadius: 10,
                  backgroundColor: 'rgba(212,162,76,0.1)',
                  borderWidth: 1, borderColor: 'rgba(212,162,76,0.18)',
                  alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Feather name="sliders" size={15} color="#D4A24C" />
              </View>
              <Text style={{ flex: 1, color: '#FFFFFF', fontSize: 12, fontWeight: '500' }} numberOfLines={1}>App Preferences</Text>
              <Feather name="chevron-right" size={13} color="#3A3A3A" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Sign Out ─────────────────────────── */}
        <TouchableOpacity
          style={{
            marginHorizontal: 24, height: 60, borderRadius: 20,
            borderWidth: 1.5, borderColor: 'rgba(212,162,76,0.45)',
            backgroundColor: 'rgba(212,162,76,0.04)',
            flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}
          activeOpacity={0.75}
        >
          <Feather name="log-out" size={18} color="#D4A24C" />
          <Text style={{ color: '#D4A24C', fontSize: 16, fontWeight: '700' }}>Sign Out</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}
