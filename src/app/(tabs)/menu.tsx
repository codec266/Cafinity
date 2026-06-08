import { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const CATEGORIES = ['All', 'Coffee', 'Non-Coffee', 'Tea', 'Pastries', 'Sandwiches'];

const MENU_ITEMS = [
  {
    id: 1,
    name: 'Espresso',
    desc: 'Bold and rich single shot.',
    price: '₱120',
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Cappuccino',
    desc: 'Equal parts espresso, milk & foam.',
    price: '₱150',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Latte',
    desc: 'Smooth espresso with steamed milk.',
    price: '₱145',
    image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Caramel Macchiato',
    desc: 'Vanilla, caramel, espresso & milk.',
    price: '₱165',
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510bd9d4?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'Matcha Latte',
    desc: 'Premium matcha with steamed milk.',
    price: '₱155',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 6,
    name: 'Iced Spanish Latte',
    desc: 'Espresso with sweet milk.',
    price: '₱155',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 7,
    name: 'Croissant',
    desc: 'Buttery, flaky and freshly baked.',
    price: '₱95',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 8,
    name: 'Blueberry Cheesecake',
    desc: 'Creamy cheesecake with blueberry topping.',
    price: '₱135',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=400&auto=format&fit=crop',
  },
];

export default function MenuScreen() {
  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#080808' }} edges={['top']}>
      <StatusBar style="light" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 128 }}
      >

        {/* ── Header ── */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 24,
            paddingTop: 16,
            paddingBottom: 20,
          }}
        >
          <TouchableOpacity
            style={{
              width: 42, height: 42, borderRadius: 21,
              backgroundColor: '#111111',
              borderWidth: 1, borderColor: 'rgba(212,162,76,0.25)',
              alignItems: 'center', justifyContent: 'center',
              marginRight: 14,
            }}
            activeOpacity={0.8}
          >
            <Feather name="chevron-left" size={22} color="#D4A24C" />
          </TouchableOpacity>

          <View style={{ flex: 1 }}>
            <Text style={{
              color: '#FFFFFF', fontSize: 34, fontWeight: '700',
              letterSpacing: -0.5, lineHeight: 38,
            }}>
              Menu
            </Text>
            <Text style={{ color: '#737373', fontSize: 13, marginTop: 2 }}>
              Discover handcrafted drinks and pastries
            </Text>
          </View>

          <View
            style={{
              width: 44, height: 44, borderRadius: 22,
              borderWidth: 2, borderColor: 'rgba(212,162,76,0.5)',
              overflow: 'hidden',
            }}
          >
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' }}
              style={{ width: 44, height: 44 }}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* ── Search bar ── */}
        <View
          style={{
            height: 52, flexDirection: 'row', alignItems: 'center',
            marginHorizontal: 24, marginBottom: 20,
            backgroundColor: '#111111', borderRadius: 26,
            borderWidth: 1, borderColor: '#1E1208', paddingLeft: 18, paddingRight: 8,
          }}
        >
          <Feather name="search" size={18} color="#4A4A4A" style={{ marginRight: 12 }} />
          <TextInput
            placeholder="Search coffee, tea, pastries..."
            placeholderTextColor="#4A4A4A"
            style={{ flex: 1, color: '#FFFFFF', fontSize: 15 }}
          />
          <TouchableOpacity
            style={{
              width: 40, height: 40, borderRadius: 14,
              backgroundColor: '#D4A24C',
              alignItems: 'center', justifyContent: 'center',
            }}
            activeOpacity={0.85}
          >
            <Feather name="sliders" size={16} color="#080808" />
          </TouchableOpacity>
        </View>

        {/* ── Category pills ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 24 }}
          contentContainerStyle={{ paddingHorizontal: 24, gap: 10 }}
        >
          {CATEGORIES.map((cat, idx) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setSelectedCategory(idx)}
              style={{
                paddingHorizontal: 20, paddingVertical: 10,
                borderRadius: 26,
                backgroundColor: selectedCategory === idx ? '#D4A24C' : '#111111',
                borderWidth: 1,
                borderColor: selectedCategory === idx ? '#D4A24C' : '#1E1208',
              }}
              activeOpacity={0.8}
            >
              <Text
                style={{
                  fontSize: 14, fontWeight: '600',
                  color: selectedCategory === idx ? '#080808' : '#737373',
                }}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── Featured card ── */}
        <View
          style={{
            marginHorizontal: 24, marginBottom: 28,
            backgroundColor: '#111111',
            borderRadius: 24, overflow: 'hidden',
            borderWidth: 1, borderColor: 'rgba(212,162,76,0.15)',
            height: 248,
            flexDirection: 'row',
          }}
        >
          {/* Left — text */}
          <View style={{ flex: 1, padding: 20, justifyContent: 'space-between' }}>
            <View>
              {/* FEATURED badge */}
              <View
                style={{
                  flexDirection: 'row', alignItems: 'center', gap: 5,
                  alignSelf: 'flex-start',
                  paddingHorizontal: 10, paddingVertical: 5,
                  borderRadius: 14,
                  backgroundColor: 'rgba(212,162,76,0.1)',
                  borderWidth: 1, borderColor: 'rgba(212,162,76,0.35)',
                  marginBottom: 10,
                }}
              >
                <Feather name="star" size={9} color="#D4A24C" />
                <Text style={{
                  color: '#D4A24C', fontSize: 9, fontWeight: '700',
                  letterSpacing: 1.5, textTransform: 'uppercase',
                }}>
                  Featured
                </Text>
              </View>

              <Text style={{
                color: '#FFFFFF', fontSize: 20, fontWeight: '800',
                letterSpacing: -0.3, lineHeight: 26, marginBottom: 8,
              }}>
                {'Signature\nCaramel Macchiato'}
              </Text>

              <Text style={{
                color: 'rgba(255,255,255,0.5)', fontSize: 11,
                lineHeight: 16, marginBottom: 10,
              }} numberOfLines={2}>
                Smooth espresso, creamy milk, and rich caramel drizzle.
              </Text>

              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 8 }}>
                <Feather name="star" size={11} color="#D4A24C" />
                <Text style={{ color: '#D4A24C', fontSize: 12, fontWeight: '600' }}>4.8</Text>
                <Text style={{ color: '#737373', fontSize: 12 }}>(2.3K)</Text>
              </View>

              <Text style={{ color: '#D4A24C', fontSize: 24, fontWeight: '800' }}>₱165</Text>
            </View>

            {/* Add to Cart */}
            <TouchableOpacity
              style={{
                height: 38, paddingLeft: 14, paddingRight: 8,
                borderRadius: 19, backgroundColor: '#D4A24C',
                flexDirection: 'row', alignItems: 'center', gap: 8,
                alignSelf: 'flex-start',
              }}
              activeOpacity={0.85}
            >
              <Text style={{ color: '#1a0e00', fontWeight: '700', fontSize: 13 }}>Add to Cart</Text>
              <View
                style={{
                  width: 24, height: 24, borderRadius: 12,
                  borderWidth: 1.5, borderColor: 'rgba(8,8,8,0.25)',
                  alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Feather name="plus" size={12} color="#1a0e00" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Right — image */}
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=600&auto=format&fit=crop' }}
            style={{ width: 148, height: 248 }}
            resizeMode="cover"
          />

          {/* Pagination dots */}
          <View
            style={{
              position: 'absolute', bottom: 14,
              left: 0, right: 148,
              flexDirection: 'row', justifyContent: 'center', gap: 5,
            }}
          >
            <View style={{ width: 18, height: 4, borderRadius: 2, backgroundColor: '#D4A24C' }} />
            <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.3)' }} />
            <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.3)' }} />
            <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.3)' }} />
          </View>
        </View>

        {/* ── Product grid ── */}
        <View
          style={{
            paddingHorizontal: 24,
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          {MENU_ITEMS.map((item) => (
            <View
              key={item.id}
              style={{
                width: '47.5%',
                height: 120,
                backgroundColor: '#111111',
                borderRadius: 18, overflow: 'hidden',
                borderWidth: 1, borderColor: '#1E1208',
                flexDirection: 'row',
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{ width: 90, height: 120 }}
                resizeMode="cover"
              />
              <View style={{ flex: 1, padding: 10, justifyContent: 'space-between' }}>
                <View>
                  <Text
                    style={{
                      color: '#FFFFFF', fontSize: 13, fontWeight: '700',
                      marginBottom: 3, lineHeight: 17,
                    }}
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{ color: '#737373', fontSize: 10, lineHeight: 14 }}
                    numberOfLines={2}
                  >
                    {item.desc}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ color: '#D4A24C', fontSize: 13, fontWeight: '700' }}>{item.price}</Text>
                  <TouchableOpacity
                    style={{
                      width: 28, height: 28, borderRadius: 14,
                      backgroundColor: '#D4A24C',
                      alignItems: 'center', justifyContent: 'center',
                    }}
                    activeOpacity={0.8}
                  >
                    <Feather name="plus" size={14} color="#1a0e00" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}