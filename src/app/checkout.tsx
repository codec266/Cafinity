import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { supabase } from '../lib/supabase'; // Adjust path if needed
import { useCartStore } from '../store/cartStore'; // Adjust path if needed

export default function CheckoutScreen() {
  const [paymentMethod, setPaymentMethod] = useState<'GCash' | 'Cash'>('GCash');
  const [loading, setLoading] = useState(false);

  // Grab the global cart state
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const delivery = 49;
  const tax = 35;
  const total = subtotal + delivery + tax;

  async function handlePlaceOrder() {
    if (cart.length === 0) return;
    setLoading(true);

    try {
      // 1. Get the current secure user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("You must be logged in to order.");

      // 2. Generate a random readable Order Number (e.g., CAF-8F2A)
      const orderNumber = `CAF-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

      // 3. Insert the main Order record
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          order_number: orderNumber,
          subtotal,
          total_amount: total,
          payment_method: paymentMethod,
          payment_status: paymentMethod === 'GCash' ? 'paid' : 'pending',
          status: 'pending', 
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // 4. Resolve Variant IDs and Insert Order Items
      // The schema requires product_variant_id, so we fetch the default variant for each cart item
      const itemInserts = await Promise.all(cart.map(async (item) => {
        const { data: variant } = await supabase
          .from('product_variants')
          .select('id')
          .eq('product_id', item.id)
          .eq('is_default', true)
          .single();

        return {
          order_id: order.id,
          product_variant_id: variant?.id,
          quantity: item.qty,
          unit_price: item.price,
          subtotal: item.price * item.qty
        };
      }));

      const { error: itemsError } = await supabase.from('order_items').insert(itemInserts);
      if (itemsError) throw itemsError;

      // 5. Success! Clear cart and redirect
      clearCart();
      router.replace({
        pathname: '/order-status', 
        params: { orderId: order.id }
      });
      
    } catch (error: any) {
      Alert.alert("Checkout Failed", error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#080808' }} edges={['top']}>
      <StatusBar style="light" />
      
      {/* ── Header ── */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingTop: 16, paddingBottom: 24 }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: '#111111', borderWidth: 1, borderColor: 'rgba(212,162,76,0.25)', alignItems: 'center', justifyContent: 'center', marginRight: 14 }}
          activeOpacity={0.8}
          disabled={loading}
        >
          <Feather name="chevron-left" size={22} color="#D4A24C" />
        </TouchableOpacity>
        <Text style={{ color: '#FFFFFF', fontSize: 28, fontWeight: '700', letterSpacing: -0.5 }}>Checkout</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}>
        
        {/* ── Amount Display ── */}
        <View style={{ alignItems: 'center', marginBottom: 40, marginTop: 10 }}>
          <Text style={{ color: '#737373', fontSize: 14, marginBottom: 8 }}>Total Amount</Text>
          <Text style={{ color: '#D4A24C', fontSize: 48, fontWeight: '800', letterSpacing: -1 }}>₱{total}</Text>
        </View>

        {/* ── Payment Methods ── */}
        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '700', marginBottom: 16 }}>Payment Method</Text>
        
        <View style={{ gap: 12, marginBottom: 40 }}>
          {/* GCash Option */}
          <TouchableOpacity
            onPress={() => setPaymentMethod('GCash')}
            style={{
              flexDirection: 'row', alignItems: 'center', padding: 18,
              backgroundColor: '#111111', borderRadius: 16,
              borderWidth: 2, borderColor: paymentMethod === 'GCash' ? '#3B82F6' : '#1E1208',
            }}
            activeOpacity={0.8}
          >
            <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(59,130,246,0.1)', alignItems: 'center', justifyContent: 'center', marginRight: 14 }}>
              <Feather name="smartphone" size={20} color="#3B82F6" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700' }}>GCash</Text>
              <Text style={{ color: '#737373', fontSize: 12, marginTop: 2 }}>Pay instantly via e-wallet</Text>
            </View>
            <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: paymentMethod === 'GCash' ? '#3B82F6' : '#333', alignItems: 'center', justifyContent: 'center' }}>
              {paymentMethod === 'GCash' && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#3B82F6' }} />}
            </View>
          </TouchableOpacity>

          {/* Cash Option */}
          <TouchableOpacity
            onPress={() => setPaymentMethod('Cash')}
            style={{
              flexDirection: 'row', alignItems: 'center', padding: 18,
              backgroundColor: '#111111', borderRadius: 16,
              borderWidth: 2, borderColor: paymentMethod === 'Cash' ? '#D4A24C' : '#1E1208',
            }}
            activeOpacity={0.8}
          >
            <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(212,162,76,0.1)', alignItems: 'center', justifyContent: 'center', marginRight: 14 }}>
              <Feather name="dollar-sign" size={20} color="#D4A24C" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700' }}>Cash</Text>
              <Text style={{ color: '#737373', fontSize: 12, marginTop: 2 }}>Pay upon receiving</Text>
            </View>
            <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: paymentMethod === 'Cash' ? '#D4A24C' : '#333', alignItems: 'center', justifyContent: 'center' }}>
              {paymentMethod === 'Cash' && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#D4A24C' }} />}
            </View>
          </TouchableOpacity>
        </View>

        {/* ── Place Order Button ── */}
        <TouchableOpacity
          onPress={handlePlaceOrder}
          disabled={loading}
          style={{
            height: 60, borderRadius: 16,
            backgroundColor: paymentMethod === 'GCash' ? '#3B82F6' : '#D4A24C',
            flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
            opacity: loading ? 0.7 : 1
          }}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Text style={{ color: paymentMethod === 'GCash' ? '#FFFFFF' : '#1a0e00', fontWeight: '800', fontSize: 16 }}>
                {paymentMethod === 'GCash' ? 'Pay with GCash' : 'Place Order'}
              </Text>
              <Feather name="check-circle" size={18} color={paymentMethod === 'GCash' ? '#FFFFFF' : '#1a0e00'} />
            </>
          )}
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}