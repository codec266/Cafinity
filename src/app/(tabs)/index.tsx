import { View, Text, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const CATEGORIES = ['All', 'Coffee', 'Non-Coffee', 'Food'];

const POPULAR_ITEMS = [
  {
    id: 1,
    name: 'Caramel Macchiato',
    price: '₱165',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Iced Spanish Latte',
    price: '₱155',
    rating: '4.7',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Matcha Latte',
    price: '₱145',
    rating: '4.6',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=400&auto=format&fit=crop',
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
      <StatusBar style="light" />
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >

        {/* ── Header ────────────────────────────── */}
        <View className="flex-row items-center justify-between px-5 pt-5 pb-6">
          <View>
            <Text className="text-neutral-500 text-sm font-medium mb-0.5">Good Morning,</Text>
            <View className="flex-row items-center gap-2">
              <Text className="text-white text-2xl font-semibold">Brew Inspiration</Text>
              <Feather name="coffee" size={20} color="#D4A853" />
            </View>
          </View>
          <TouchableOpacity
            className="w-10 h-10 rounded-full items-center justify-center"
            style={{
              backgroundColor: 'rgba(255,255,255,0.06)',
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.1)',
            }}
          >
            <Feather name="bell" size={18} color="#D4A853" />
          </TouchableOpacity>
        </View>

        {/* ── Search bar ────────────────────────── */}
        <View
          className="mx-5 flex-row items-center rounded-2xl px-4 py-[14px] mb-6"
          style={{
            backgroundColor: 'rgba(255,255,255,0.05)',
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.08)',
          }}
        >
          <Feather name="search" size={17} color="#6B7280" />
          <TextInput
            placeholder="Search your drink..."
            placeholderTextColor="#4B5563"
            className="flex-1 text-white text-sm ml-3"
          />
          <TouchableOpacity
            className="w-8 h-8 rounded-xl items-center justify-center"
            style={{
              backgroundColor: 'rgba(212,168,83,0.15)',
              borderWidth: 1,
              borderColor: 'rgba(212,168,83,0.3)',
            }}
          >
            <Feather name="sliders" size={13} color="#D4A853" />
          </TouchableOpacity>
        </View>

        {/* ── Featured promo banner ─────────────── */}
        <View
          className="mx-5 mb-6 rounded-3xl overflow-hidden"
          style={{ height: 158 }}
        >
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?q=80&w=800&auto=format&fit=crop' }}
            className="absolute w-full h-full"
            resizeMode="cover"
          />
          {/* Overlay */}
          <View className="absolute inset-0 bg-black/55" />

          {/* Card content — sits on top of the image */}
          <View
            className="absolute inset-0 p-5 justify-between"
            style={{
              borderWidth: 1,
              borderColor: 'rgba(212,168,83,0.2)',
              borderRadius: 24,
            }}
          >
            <View>
              <View
                className="self-start px-3 py-[5px] rounded-full mb-2"
                style={{
                  backgroundColor: 'rgba(212,168,83,0.2)',
                  borderWidth: 1,
                  borderColor: 'rgba(212,168,83,0.4)',
                }}
              >
                <Text
                  className="text-[#D4A853] text-[9px] font-bold uppercase"
                  style={{ letterSpacing: 1.5 }}
                >
                  Today's Special
                </Text>
              </View>
              <Text className="text-white text-xl font-semibold">Hazelnut Latte</Text>
              <Text className="text-neutral-400 text-xs mt-1">Rich hazelnut & creamy espresso</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-[#D4A853] text-xl font-semibold">₱155</Text>
              <View
                className="px-3 py-1 rounded-full"
                style={{
                  backgroundColor: 'rgba(212,168,83,0.22)',
                  borderWidth: 1,
                  borderColor: 'rgba(212,168,83,0.5)',
                }}
              >
                <Text className="text-[#D4A853] text-xs font-bold">20% OFF</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ── Category pills ────────────────────── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-6"
          contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
        >
          {CATEGORIES.map((cat, idx) => (
            <TouchableOpacity
              key={cat}
              className="px-5 py-[9px] rounded-full"
              style={
                idx === 0
                  ? { backgroundColor: '#D4A853' }
                  : {
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      borderWidth: 1,
                      borderColor: 'rgba(255,255,255,0.1)',
                    }
              }
              activeOpacity={0.8}
            >
              <Text
                className="text-sm font-medium"
                style={{ color: idx === 0 ? '#0A0A0A' : '#9CA3AF' }}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── Popular Picks ─────────────────────── */}
        <View className="flex-row items-center justify-between px-5 mb-4">
          <Text className="text-white text-base font-semibold">Popular Picks</Text>
          <TouchableOpacity>
            <Text className="text-[#D4A853] text-xs font-medium">See all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-7"
          contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
        >
          {POPULAR_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="rounded-2xl overflow-hidden"
              style={{
                width: 148,
                backgroundColor: 'rgba(255,255,255,0.04)',
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.08)',
              }}
              activeOpacity={0.85}
            >
              <Image
                source={{ uri: item.image }}
                style={{ width: 148, height: 112 }}
                resizeMode="cover"
              />
              <View className="p-3">
                <Text className="text-white text-sm font-medium mb-1" numberOfLines={1}>
                  {item.name}
                </Text>
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-[#D4A853] text-sm font-semibold">{item.price}</Text>
                  <View className="flex-row items-center" style={{ gap: 3 }}>
                    <Feather name="star" size={10} color="#D4A853" />
                    <Text className="text-neutral-400 text-[10px]">{item.rating}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  className="py-[7px] rounded-xl items-center"
                  style={{
                    backgroundColor: 'rgba(212,168,83,0.13)',
                    borderWidth: 1,
                    borderColor: 'rgba(212,168,83,0.3)',
                  }}
                >
                  <Text className="text-[#D4A853] text-[11px] font-semibold">Add to Order</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── Quick Actions ─────────────────────── */}
        <View className="px-5">
          <Text className="text-white text-base font-semibold mb-4">Quick Actions</Text>
          <View className="flex-row justify-between">
            <QuickAction icon="shopping-bag" label="Order Now" />
            <QuickAction icon="clipboard" label="My Orders" />
            <QuickAction icon="award" label="Rewards" />
            <QuickAction icon="map-pin" label="Stores" />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

function QuickAction({ icon, label }: { icon: any; label: string }) {
  return (
    <View className="items-center">
      <TouchableOpacity
        className="w-[58px] h-[58px] rounded-2xl items-center justify-center mb-2"
        style={{
          backgroundColor: 'rgba(212,168,83,0.08)',
          borderWidth: 1,
          borderColor: 'rgba(212,168,83,0.22)',
        }}
        activeOpacity={0.75}
      >
        <Feather name={icon} size={22} color="#D4A853" />
      </TouchableOpacity>
      <Text className="text-neutral-500 text-[10px] text-center">{label}</Text>
    </View>
  );
}
