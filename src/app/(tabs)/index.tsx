import { View, Text, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const CATEGORIES = [
  { label: 'All', icon: 'coffee' as const },
  { label: 'Coffee', icon: 'coffee' as const },
  { label: 'Non-Coffee', icon: 'droplet' as const },
  { label: 'Pastries', icon: 'sun' as const },
  { label: 'Food', icon: 'package' as const },
];

const POPULAR_ITEMS = [
  {
    id: 1,
    name: 'Caramel Macchiato',
    desc: 'Espresso & caramel drizzle',
    price: '₱165',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Iced Spanish Latte',
    desc: 'Espresso & sweet milk',
    price: '₱155',
    rating: '4.7',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Matcha Latte',
    desc: 'Premium Japanese matcha',
    price: '₱145',
    rating: '4.6',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Pour Over',
    desc: 'Single origin filter',
    price: '₱175',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=400&auto=format&fit=crop',
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#080808' }} edges={['top']}>
      <StatusBar style="light" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 128 }}
      >

        {/* ── Header ─────────────────────────── */}
        <View
          style={{
            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
            paddingHorizontal: 24, paddingTop: 24, paddingBottom: 24,
          }}
        >
          <View>
            <Text style={{ color: '#737373', fontSize: 14, marginBottom: 4 }}>Good Morning,</Text>
            <Text style={{ color: '#FFFFFF', fontSize: 30, fontWeight: '700', letterSpacing: -0.5 }}>
              Kyle ☕
            </Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            {/* Bell with dot */}
            <View>
              <TouchableOpacity
                style={{
                  width: 46, height: 46, borderRadius: 23,
                  backgroundColor: '#111111',
                  borderWidth: 1, borderColor: '#2A1A0D',
                  alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Feather name="bell" size={20} color="#D4A24C" />
              </TouchableOpacity>
              <View
                style={{
                  position: 'absolute', top: 8, right: 8,
                  width: 9, height: 9, borderRadius: 5,
                  backgroundColor: '#F59E0B',
                  borderWidth: 1.5, borderColor: '#080808',
                }}
              />
            </View>

            {/* Avatar photo */}
            <View
              style={{
                width: 46, height: 46, borderRadius: 23,
                borderWidth: 2, borderColor: 'rgba(212,162,76,0.5)',
                overflow: 'hidden',
              }}
            >
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' }}
                style={{ width: 46, height: 46 }}
                resizeMode="cover"
              />
            </View>
          </View>
        </View>

        {/* ── Search bar ──────────────────────── */}
        <View
          style={{
            height: 52, flexDirection: 'row', alignItems: 'center',
            marginHorizontal: 24, marginBottom: 24,
            backgroundColor: '#111111', borderRadius: 26,
            borderWidth: 1, borderColor: '#2A1A0D', paddingHorizontal: 18,
          }}
        >
          <Feather name="search" size={18} color="#4A4A4A" style={{ marginRight: 12 }} />
          <TextInput
            placeholder="Search your drink..."
            placeholderTextColor="#4A4A4A"
            style={{ flex: 1, color: '#FFFFFF', fontSize: 15 }}
          />
          <TouchableOpacity
            style={{
              width: 36, height: 36, borderRadius: 12,
              backgroundColor: 'rgba(212,162,76,0.08)',
              borderWidth: 1, borderColor: 'rgba(212,162,76,0.2)',
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Feather name="sliders" size={15} color="#D4A24C" />
          </TouchableOpacity>
        </View>

        {/* ── Hero banner ─────────────────────── */}
        <View
          style={{
            height: 280, marginHorizontal: 24,
            borderRadius: 24, overflow: 'hidden', marginBottom: 28,
          }}
        >
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?q=80&w=900&auto=format&fit=crop' }}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            resizeMode="cover"
          />
          {/* Dark overlay */}
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.38)' }} />
          {/* Bottom gradient for text */}
          <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '70%', backgroundColor: 'rgba(0,0,0,0.52)' }} />
          {/* Gold border */}
          <View
            style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              borderWidth: 1, borderColor: 'rgba(212,162,76,0.18)', borderRadius: 24,
            }}
          />

          {/* TODAY'S SPECIAL — top left */}
          <View
            style={{
              position: 'absolute', top: 18, left: 18,
              paddingHorizontal: 14, paddingVertical: 7,
              borderRadius: 20, backgroundColor: 'rgba(212,162,76,0.15)',
              borderWidth: 1.5, borderColor: 'rgba(212,162,76,0.55)',
            }}
          >
            <Text style={{ color: '#D4A24C', fontSize: 10, fontWeight: '700', letterSpacing: 1.5, textTransform: 'uppercase' }}>
              Today's Special
            </Text>
          </View>

          {/* 20% OFF — circular badge top right */}
          <View
            style={{
              position: 'absolute', top: 16, right: 16,
              width: 62, height: 62, borderRadius: 31,
              backgroundColor: 'rgba(212,162,76,0.14)',
              borderWidth: 1.5, borderColor: 'rgba(212,162,76,0.6)',
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#D4A24C', fontSize: 16, fontWeight: '800', lineHeight: 18 }}>20%</Text>
            <Text style={{ color: '#D4A24C', fontSize: 10, fontWeight: '700' }}>OFF</Text>
          </View>

          {/* Bottom content */}
          <View style={{ position: 'absolute', bottom: 52, left: 20, right: 20 }}>
            <Text style={{ color: '#FFFFFF', fontSize: 32, fontWeight: '800', marginBottom: 4, letterSpacing: -0.5 }}>
              Hazelnut Latte
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, marginBottom: 12 }}>
              Rich hazelnut & creamy espresso blend
            </Text>
            <Text style={{ color: '#D4A24C', fontSize: 26, fontWeight: '800', marginBottom: 14 }}>₱155</Text>

            {/* Order Now button */}
            <TouchableOpacity
              style={{
                alignSelf: 'flex-start',
                height: 42, paddingLeft: 18, paddingRight: 8,
                borderRadius: 21, backgroundColor: '#D4A24C',
                flexDirection: 'row', alignItems: 'center', gap: 10,
              }}
              activeOpacity={0.85}
            >
              <Text style={{ color: '#080808', fontWeight: '700', fontSize: 14 }}>Order Now</Text>
              <View
                style={{
                  width: 28, height: 28, borderRadius: 14,
                  borderWidth: 1.5, borderColor: 'rgba(8,8,8,0.25)',
                  alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Feather name="arrow-right" size={14} color="#080808" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Pagination dots */}
          <View
            style={{
              position: 'absolute', bottom: 18, left: 0, right: 0,
              flexDirection: 'row', justifyContent: 'center', gap: 5,
            }}
          >
            <View style={{ width: 20, height: 5, borderRadius: 3, backgroundColor: '#D4A24C' }} />
            <View style={{ width: 5, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.35)' }} />
            <View style={{ width: 5, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.35)' }} />
          </View>
        </View>

        {/* ── Category icon tiles ──────────────── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 32 }}
          contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}
        >
          {CATEGORIES.map((cat, idx) => (
            <TouchableOpacity
              key={cat.label}
              style={{
                width: 72, height: 80, borderRadius: 18,
                backgroundColor: idx === 0 ? 'rgba(212,162,76,0.1)' : '#111111',
                borderWidth: 1,
                borderColor: idx === 0 ? 'rgba(212,162,76,0.55)' : '#2A1A0D',
                alignItems: 'center', justifyContent: 'center', gap: 6,
              }}
              activeOpacity={0.8}
            >
              <Feather
                name={cat.icon}
                size={22}
                color={idx === 0 ? '#D4A24C' : '#737373'}
              />
              <Text style={{ color: idx === 0 ? '#D4A24C' : '#737373', fontSize: 10, fontWeight: '600' }}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── Popular Picks ─────────────────────── */}
        <View
          style={{
            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
            paddingHorizontal: 24, marginBottom: 18,
          }}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: '700' }}>Popular Picks</Text>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={{ color: '#D4A24C', fontSize: 14, fontWeight: '500' }}>See all</Text>
            <Feather name="chevron-right" size={16} color="#D4A24C" />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 36 }}
          contentContainerStyle={{ paddingHorizontal: 24, gap: 16 }}
        >
          {POPULAR_ITEMS.map((item) => (
            <View
              key={item.id}
              style={{
                width: 172, backgroundColor: '#111111',
                borderRadius: 22, overflow: 'hidden',
                borderWidth: 1, borderColor: '#2A1A0D',
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{ width: 172, height: 150 }}
                resizeMode="cover"
              />
              <View style={{ padding: 14 }}>
                <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '700', marginBottom: 3 }} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={{ color: '#737373', fontSize: 12, marginBottom: 10 }} numberOfLines={1}>
                  {item.desc}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Feather name="star" size={12} color="#D4A24C" />
                    <Text style={{ color: '#A3A3A3', fontSize: 12 }}>{item.rating}</Text>
                  </View>
                  <Text style={{ color: '#D4A24C', fontWeight: '700', fontSize: 15 }}>{item.price}</Text>
                </View>
                <TouchableOpacity
                  style={{
                    height: 40, borderRadius: 14,
                    backgroundColor: 'rgba(212,162,76,0.09)',
                    borderWidth: 1, borderColor: 'rgba(212,162,76,0.24)',
                    flexDirection: 'row', alignItems: 'center',
                    justifyContent: 'space-between', paddingLeft: 14, paddingRight: 8,
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={{ color: '#D4A24C', fontSize: 13, fontWeight: '600' }}>Add to Cart</Text>
                  <View
                    style={{
                      width: 26, height: 26, borderRadius: 13,
                      backgroundColor: '#D4A24C',
                      alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <Feather name="plus" size={14} color="#080808" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* ── Quick Actions ─────────────────────── */}
        <View style={{ paddingHorizontal: 24 }}>
          <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: '700', marginBottom: 18 }}>Quick Actions</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <QuickAction icon="coffee" label="Order Now" />
            <QuickAction icon="clipboard" label="My Orders" />
            <QuickAction icon="gift" label="Rewards" />
            <QuickAction icon="map-pin" label="Stores" />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

function QuickAction({ icon, label }: { icon: any; label: string }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity
        style={{
          width: 68, height: 68, borderRadius: 22,
          backgroundColor: 'rgba(212,162,76,0.07)',
          borderWidth: 1, borderColor: 'rgba(212,162,76,0.18)',
          alignItems: 'center', justifyContent: 'center',
          marginBottom: 10,
        }}
        activeOpacity={0.75}
      >
        <Feather name={icon} size={26} color="#D4A24C" />
      </TouchableOpacity>
      <Text style={{ color: '#737373', fontSize: 11, textAlign: 'center', fontWeight: '500' }}>{label}</Text>
    </View>
  );
}
