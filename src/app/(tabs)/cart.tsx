import { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

type CartItem = { id: number; name: string; desc: string; price: number; qty: number; image: string };

const INITIAL_CART: CartItem[] = [
  {
    id: 1, name: 'Caramel Macchiato', desc: 'Vanilla, caramel, espresso & milk',
    price: 165, qty: 2,
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510bd9d4?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 2, name: 'Iced Spanish Latte', desc: 'Espresso with sweet milk',
    price: 155, qty: 1,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 3, name: 'Croissant', desc: 'Buttery, flaky and freshly baked',
    price: 95, qty: 2,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=400&auto=format&fit=crop',
  },
];

const SUGGESTIONS = [
  {
    id: 1, name: 'Chocolate Muffin', price: '₱85',
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 2, name: 'Matcha Latte', price: '₱155',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 3, name: 'Blueberry Cheesecake', price: '₱135',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=200&auto=format&fit=crop',
  },
];

export default function CartScreen() {
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const [promoCode, setPromoCode] = useState('');

  const updateQty = (id: number, delta: number) => {
    setCart(prev =>
      prev.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item)
    );
  };

  const removeItem = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const delivery = 49;
  const tax = 35;
  const total = subtotal + delivery + tax;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#080808' }} edges={['top']}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 148 }}>

        {/* ── Header ── */}
        <View
          style={{
            flexDirection: 'row', alignItems: 'center',
            paddingHorizontal: 24, paddingTop: 16, paddingBottom: 24,
          }}
        >
          <TouchableOpacity
            style={{
              width: 42, height: 42, borderRadius: 21,
              backgroundColor: '#111111',
              borderWidth: 1, borderColor: 'rgba(212,162,76,0.25)',
              alignItems: 'center', justifyContent: 'center', marginRight: 14,
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
              My Cart
            </Text>
            <Text style={{ color: '#737373', fontSize: 13, marginTop: 2 }}>
              Review your order before checkout
            </Text>
          </View>
          <View
            style={{
              width: 44, height: 44, borderRadius: 22,
              borderWidth: 2, borderColor: 'rgba(212,162,76,0.5)', overflow: 'hidden',
            }}
          >
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' }}
              style={{ width: 44, height: 44 }}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* ── Cart items ── */}
        <View style={{ paddingHorizontal: 24, gap: 14, marginBottom: 24 }}>
          {cart.map(item => (
            <View
              key={item.id}
              style={{
                flexDirection: 'row', height: 128,
                backgroundColor: '#111111', borderRadius: 20, overflow: 'hidden',
                borderWidth: 1, borderColor: '#1E1208',
              }}
            >
              <Image source={{ uri: item.image }} style={{ width: 108, height: 128 }} resizeMode="cover" />
              <View style={{ flex: 1, paddingHorizontal: 14, paddingVertical: 12, justifyContent: 'space-between' }}>

                {/* Name + trash */}
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                  <Text
                    style={{ flex: 1, color: '#FFFFFF', fontSize: 16, fontWeight: '700', lineHeight: 21 }}
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>
                  <TouchableOpacity
                    onPress={() => removeItem(item.id)}
                    style={{
                      width: 28, height: 28, borderRadius: 9,
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      alignItems: 'center', justifyContent: 'center', marginLeft: 8,
                    }}
                    activeOpacity={0.7}
                  >
                    <Feather name="trash-2" size={14} color="#737373" />
                  </TouchableOpacity>
                </View>

                {/* Description */}
                <Text style={{ color: '#737373', fontSize: 12, lineHeight: 17 }} numberOfLines={2}>
                  {item.desc}
                </Text>

                {/* Price + qty */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ color: '#D4A24C', fontSize: 18, fontWeight: '700' }}>₱{item.price}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <TouchableOpacity
                      onPress={() => updateQty(item.id, -1)}
                      style={{
                        width: 30, height: 30, borderRadius: 15,
                        borderWidth: 1.5, borderColor: 'rgba(212,162,76,0.5)',
                        alignItems: 'center', justifyContent: 'center',
                      }}
                      activeOpacity={0.75}
                    >
                      <Feather name="minus" size={13} color="#D4A24C" />
                    </TouchableOpacity>
                    <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600', minWidth: 18, textAlign: 'center' }}>
                      {item.qty}
                    </Text>
                    <TouchableOpacity
                      onPress={() => updateQty(item.id, 1)}
                      style={{
                        width: 30, height: 30, borderRadius: 15,
                        borderWidth: 1.5, borderColor: '#D4A24C',
                        alignItems: 'center', justifyContent: 'center',
                      }}
                      activeOpacity={0.75}
                    >
                      <Feather name="plus" size={13} color="#D4A24C" />
                    </TouchableOpacity>
                  </View>
                </View>

              </View>
            </View>
          ))}
        </View>

        {/* ── Promo + Delivery ── */}
        <View style={{ paddingHorizontal: 24, flexDirection: 'row', gap: 12, marginBottom: 20 }}>

          {/* Promo Code */}
          <View
            style={{
              flex: 1, backgroundColor: '#111111',
              borderRadius: 20, borderWidth: 1, borderColor: '#1E1208', padding: 14,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 14 }}>
              <Feather name="tag" size={14} color="#D4A24C" />
              <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600' }}>Promo Code</Text>
            </View>
            <View
              style={{
                height: 42, backgroundColor: '#0D0D0D', borderRadius: 12,
                borderWidth: 1, borderColor: 'rgba(212,162,76,0.15)',
                paddingHorizontal: 12, justifyContent: 'center', marginBottom: 12,
              }}
            >
              <TextInput
                placeholder="Enter Promo Code"
                placeholderTextColor="#4A4A4A"
                value={promoCode}
                onChangeText={setPromoCode}
                style={{ color: '#FFFFFF', fontSize: 13 }}
              />
            </View>
            <TouchableOpacity
              style={{
                height: 44, backgroundColor: '#D4A24C',
                borderRadius: 12, alignItems: 'center', justifyContent: 'center',
              }}
              activeOpacity={0.85}
            >
              <Text style={{ color: '#1a0e00', fontWeight: '700', fontSize: 14 }}>Apply</Text>
            </TouchableOpacity>
          </View>

          {/* Delivery Info */}
          <View
            style={{
              flex: 1.1, backgroundColor: '#111111',
              borderRadius: 20, borderWidth: 1, borderColor: '#1E1208', padding: 14,
            }}
          >
            {/* Address */}
            <View style={{ marginBottom: 12 }}>
              <View
                style={{
                  flexDirection: 'row', alignItems: 'center',
                  justifyContent: 'space-between', marginBottom: 7,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, flex: 1, marginRight: 6 }}>
                  <Feather name="map-pin" size={13} color="#D4A24C" />
                  <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '600' }} numberOfLines={1}>
                    Delivery Address
                  </Text>
                </View>
                <TouchableOpacity activeOpacity={0.7}>
                  <Feather name="edit-2" size={13} color="#737373" />
                </TouchableOpacity>
              </View>
              <Text style={{ color: '#A3A3A3', fontSize: 12, lineHeight: 18, paddingLeft: 18 }}>
                123 Coffee Street{'\n'}Makati City
              </Text>
            </View>

            {/* Divider */}
            <View style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.05)', marginBottom: 12 }} />

            {/* Delivery Method */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 9 }}>
              <Feather name="truck" size={13} color="#D4A24C" />
              <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '600' }}>Delivery Method</Text>
            </View>
            <View
              style={{
                paddingHorizontal: 10, paddingVertical: 9,
                borderRadius: 12, borderWidth: 1.5, borderColor: '#D4A24C',
                backgroundColor: 'rgba(212,162,76,0.06)',
                flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
              }}
            >
              <View style={{ flex: 1, marginRight: 8 }}>
                <Text style={{ color: '#D4A24C', fontSize: 12, fontWeight: '600' }} numberOfLines={1}>
                  Express Delivery
                </Text>
                <Text style={{ color: '#737373', fontSize: 10, marginTop: 1 }}>20-30 mins</Text>
              </View>
              <View
                style={{
                  width: 22, height: 22, borderRadius: 11,
                  backgroundColor: '#D4A24C', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Feather name="check" size={12} color="#1a0e00" />
              </View>
            </View>
          </View>

        </View>

        {/* ── You May Also Like + Order Summary ── */}
        <View style={{ paddingHorizontal: 24, flexDirection: 'row', gap: 12, marginBottom: 24 }}>

          {/* You May Also Like */}
          <View
            style={{
              flex: 1.35, backgroundColor: '#111111',
              borderRadius: 20, borderWidth: 1, borderColor: '#1E1208', padding: 14,
            }}
          >
            <View
              style={{
                flexDirection: 'row', alignItems: 'center',
                justifyContent: 'space-between', marginBottom: 12,
              }}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '700' }}>You May Also Like</Text>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }} activeOpacity={0.7}>
                <Text style={{ color: '#D4A24C', fontSize: 10 }}>See all</Text>
                <Feather name="chevron-right" size={11} color="#D4A24C" />
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', gap: 8 }}>
              {SUGGESTIONS.map(s => (
                <View key={s.id} style={{ flex: 1, alignItems: 'center' }}>
                  <View
                    style={{
                      width: '100%', aspectRatio: 1,
                      borderRadius: 12, overflow: 'hidden', marginBottom: 6,
                    }}
                  >
                    <Image source={{ uri: s.image }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                    <TouchableOpacity
                      style={{
                        position: 'absolute', bottom: 4, right: 4,
                        width: 20, height: 20, borderRadius: 10,
                        backgroundColor: '#D4A24C',
                        alignItems: 'center', justifyContent: 'center',
                      }}
                      activeOpacity={0.8}
                    >
                      <Feather name="plus" size={10} color="#1a0e00" />
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      color: '#FFFFFF', fontSize: 9, fontWeight: '600',
                      textAlign: 'center', lineHeight: 13, marginBottom: 2,
                    }}
                    numberOfLines={2}
                  >
                    {s.name}
                  </Text>
                  <Text style={{ color: '#D4A24C', fontSize: 10, fontWeight: '700' }}>{s.price}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Order Summary */}
          <View
            style={{
              flex: 1, backgroundColor: '#111111',
              borderRadius: 20, borderWidth: 1, borderColor: '#1E1208', padding: 14,
            }}
          >
            <View
              style={{
                flexDirection: 'row', alignItems: 'center',
                justifyContent: 'space-between', marginBottom: 14,
              }}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: '700' }}>Order Summary</Text>
              <Feather name="file-text" size={14} color="#737373" />
            </View>

            <View style={{ gap: 9 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: '#737373', fontSize: 11 }}>Subtotal</Text>
                <Text style={{ color: '#FFFFFF', fontSize: 11, fontWeight: '500' }}>₱{subtotal}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: '#737373', fontSize: 11 }}>Delivery Fee</Text>
                <Text style={{ color: '#FFFFFF', fontSize: 11, fontWeight: '500' }}>₱{delivery}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: '#737373', fontSize: 11 }}>Tax</Text>
                <Text style={{ color: '#FFFFFF', fontSize: 11, fontWeight: '500' }}>₱{tax}</Text>
              </View>
            </View>

            <View style={{ height: 1, backgroundColor: 'rgba(212,162,76,0.25)', marginVertical: 12 }} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '700' }}>Total</Text>
              <Text style={{ color: '#D4A24C', fontSize: 22, fontWeight: '800', lineHeight: 24 }}>₱{total}</Text>
            </View>
          </View>

        </View>

        {/* ── Checkout CTA ── */}
        <View
          style={{
            marginHorizontal: 24,
            height: 76,
            flexDirection: 'row', alignItems: 'center',
            paddingLeft: 20, paddingRight: 10,
            backgroundColor: '#111111',
            borderRadius: 24,
            borderWidth: 1, borderColor: 'rgba(212,162,76,0.15)',
            shadowColor: '#000', shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.45, shadowRadius: 20, elevation: 16,
          }}
        >
          <View style={{ marginRight: 16 }}>
            <Text style={{ color: '#737373', fontSize: 12, marginBottom: 3 }}>Total</Text>
            <Text style={{ color: '#D4A24C', fontSize: 22, fontWeight: '800', lineHeight: 24 }}>₱{total}</Text>
          </View>
          <TouchableOpacity
            style={{
              flex: 1, height: 56, borderRadius: 18,
              backgroundColor: '#D4A24C',
              flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
              shadowColor: '#D4A24C', shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.4, shadowRadius: 14, elevation: 10,
            }}
            activeOpacity={0.85}
          >
            <Text style={{ color: '#1a0e00', fontWeight: '800', fontSize: 15 }}>Proceed to Checkout</Text>
            <Feather name="arrow-right" size={18} color="#1a0e00" />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}