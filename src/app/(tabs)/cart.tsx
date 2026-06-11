import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useCartStore } from '../../store/cartStore';

export default function CartScreen() {
  const cart = useCartStore((state) => state.cart);
  const updateQty = useCartStore((state) => state.updateQty);
  const removeItem = useCartStore((state) => state.removeItem);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const delivery = cart.length > 0 ? 49 : 0;
  const tax = cart.length > 0 ? 35 : 0;
  const total = subtotal + delivery + tax;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#080808' }} edges={['top']}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>

        {/* ── Header ── */}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingTop: 16, paddingBottom: 24 }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              width: 42, height: 42, borderRadius: 21, backgroundColor: '#111111',
              borderWidth: 1, borderColor: 'rgba(212,162,76,0.25)',
              alignItems: 'center', justifyContent: 'center', marginRight: 14,
            }}
            activeOpacity={0.8}
          >
            <Feather name="chevron-left" size={22} color="#D4A24C" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#FFFFFF', fontSize: 34, fontWeight: '700', letterSpacing: -0.5 }}>
              My Cart
            </Text>
          </View>
        </View>

        {/* ── Cart Items ── */}
        <View style={{ paddingHorizontal: 24, gap: 14, marginBottom: 32 }}>
          {cart.length === 0 ? (
            <Text style={{ color: '#737373', textAlign: 'center', marginTop: 40, fontSize: 16 }}>
              Your cart is empty.
            </Text>
          ) : (
            cart.map(item => (
              <View
                key={item.id}
                style={{
                  flexDirection: 'row', height: 110, backgroundColor: '#111111',
                  borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: '#1E1208'
                }}
              >
                <Image source={{ uri: item.image }} style={{ width: 100, height: '100%' }} resizeMode="cover" />
                <View style={{ flex: 1, paddingHorizontal: 14, paddingVertical: 14, justifyContent: 'space-between' }}>
                  
                  {/* Title & Delete */}
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                    <Text style={{ flex: 1, color: '#FFFFFF', fontSize: 16, fontWeight: '700' }} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <TouchableOpacity onPress={() => removeItem(item.id)} style={{ padding: 4 }} activeOpacity={0.7}>
                      <Feather name="trash-2" size={16} color="#737373" />
                    </TouchableOpacity>
                  </View>

                  {/* Controls & Price */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ color: '#D4A24C', fontSize: 18, fontWeight: '700' }}>₱{item.price}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                      <TouchableOpacity
                        onPress={() => updateQty(item.id, -1)}
                        style={{ width: 28, height: 28, borderRadius: 14, borderWidth: 1.5, borderColor: 'rgba(212,162,76,0.5)', alignItems: 'center', justifyContent: 'center' }}
                        activeOpacity={0.7}
                      >
                        <Feather name="minus" size={14} color="#D4A24C" />
                      </TouchableOpacity>
                      <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600', minWidth: 20, textAlign: 'center' }}>
                        {item.qty}
                      </Text>
                      <TouchableOpacity
                        onPress={() => updateQty(item.id, 1)}
                        style={{ width: 28, height: 28, borderRadius: 14, borderWidth: 1.5, borderColor: '#D4A24C', alignItems: 'center', justifyContent: 'center' }}
                        activeOpacity={0.7}
                      >
                        <Feather name="plus" size={14} color="#D4A24C" />
                      </TouchableOpacity>
                    </View>
                  </View>

                </View>
              </View>
            ))
          )}
        </View>

        {/* ── Minimal Checkout Card ── */}
        {cart.length > 0 && (
          <View style={{ paddingHorizontal: 24 }}>
            <View style={{ backgroundColor: '#111111', borderRadius: 24, padding: 20, borderWidth: 1, borderColor: 'rgba(212,162,76,0.15)' }}>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text style={{ color: '#737373', fontSize: 14 }}>Subtotal</Text>
                <Text style={{ color: '#FFFFFF', fontSize: 14 }}>₱{subtotal}</Text>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
                <Text style={{ color: '#737373', fontSize: 14 }}>Taxes & Fees</Text>
                <Text style={{ color: '#FFFFFF', fontSize: 14 }}>₱{delivery + tax}</Text>
              </View>
              
              <View style={{ height: 1, backgroundColor: '#1E1208', marginBottom: 16 }} />
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
                <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700' }}>Total</Text>
                <Text style={{ color: '#D4A24C', fontSize: 26, fontWeight: '800' }}>₱{total}</Text>
              </View>

              <TouchableOpacity
                style={{
                  height: 56, borderRadius: 16, backgroundColor: '#D4A24C',
                  flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
                  shadowColor: '#D4A24C', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 8
                }}
                activeOpacity={0.85}
              >
                <Text style={{ color: '#1a0e00', fontWeight: '800', fontSize: 16 }}>Proceed to Checkout</Text>
                <Feather name="arrow-right" size={18} color="#1a0e00" />
              </TouchableOpacity>
              
            </View>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}