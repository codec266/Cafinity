import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { supabase } from '../lib/supabase';

// Maps your DB ENUM values to clean display steps
const STATUS_STEPS = [
  { key: 'pending', label: 'Order Placed', desc: 'Waiting for cafe confirmation' },
  { key: 'preparing', label: 'Brewing', desc: 'Your barista is preparing your order' },
  { key: 'ready', label: 'Ready', desc: 'Your order is ready for pickup/delivery' },
];

export default function OrderStatusScreen() {
  // Grab the orderId passed via navigation parameters
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    // 1. Fetch initial order state
    fetchOrderDetails();

    // 2. Subscribe to live updates for this specific order ID
    const orderChannel = supabase
      .channel(`live-order-${orderId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `id=eq.${orderId}`,
        },
        (payload) => {
          // Instantly overwrites state when database updates
          setOrder(payload.new);
        }
      )
      .subscribe();

    // Clean up websocket connection when leaving the screen
    return () => {
      supabase.removeChannel(orderChannel);
    };
  }, [orderId]);

  async function fetchOrderDetails() {
    setLoading(true);
    const { data } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (data) setOrder(data);
    setLoading(false);
  }

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#080808', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#D4A24C" />
      </View>
    );
  }

  // Determine current active milestone index
  const currentStepIndex = STATUS_STEPS.findIndex(step => step.key === order?.status);
  const isFinalState = order?.status === 'completed' || order?.status === 'cancelled';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#080808' }} edges={['top']}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

        {/* ── Header ── */}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingTop: 16, paddingBottom: 24 }}>
          <TouchableOpacity
            onPress={() => router.replace('/(tabs)')}
            style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: '#111111', borderWidth: 1, borderColor: 'rgba(212,162,76,0.25)', alignItems: 'center', justifyContent: 'center', marginRight: 14 }}
            activeOpacity={0.8}
          >
            <Feather name="home" size={22} color="#D4A24C" />
          </TouchableOpacity>
          <View>
            <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: '700', letterSpacing: -0.5 }}>Track Order</Text>
            <Text style={{ color: '#737373', fontSize: 13, marginTop: 2, fontFamily: 'monospace' }}>{order?.order_number}</Text>
          </View>
        </View>

        {/* ── Live Progress Roadmap ── */}
        <View style={{ marginHorizontal: 24, backgroundColor: '#111111', borderRadius: 24, padding: 24, borderWidth: 1, borderColor: '#1E1208', marginBottom: 24 }}>
          {isFinalState ? (
            <View style={{ alignItems: 'center', paddingVertical: 20, gap: 12 }}>
              <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: order?.status === 'completed' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: order?.status === 'completed' ? '#22C55E' : '#EF4444' }}>
                <Feather name={order?.status === 'completed' ? 'check' : 'x'} size={28} color={order?.status === 'completed' ? '#22C55E' : '#EF4444'} />
              </View>
              <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: '700' }}>
                Order {order?.status === 'completed' ? 'Completed' : 'Cancelled'}
              </Text>
              <Text style={{ color: '#737373', fontSize: 14, textAlign: 'center' }}>
                {order?.status === 'completed' ? 'Thank you for brewing with us!' : 'This transaction was cancelled.'}
              </Text>
            </View>
          ) : (
            STATUS_STEPS.map((step, index) => {
              const isPast = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;
              
              return (
                <View key={step.key} style={{ flexDirection: 'row', minHeight: 70 }}>
                  {/* Visual Timeline Bar Indicators */}
                  <View style={{ alignItems: 'center', marginRight: 16 }}>
                    <View 
                      style={{ 
                        width: 24, height: 24, borderRadius: 12, 
                        backgroundColor: isPast || isCurrent ? '#D4A24C' : '#222',
                        alignItems: 'center', justifyContent: 'center',
                        borderWidth: isCurrent ? 4 : 0, borderColor: '#111'
                      }}
                    >
                      {isPast && <Feather name="check" size={12} color="#080808" />}
                    </View>
                    {index < STATUS_STEPS.length - 1 && (
                      <View style={{ width: 2, flex: 1, backgroundColor: isPast ? '#D4A24C' : '#222', marginVertical: 4 }} />
                    )}
                  </View>

                  {/* Text Details */}
                  <View style={{ flex: 1, paddingBottom: index < STATUS_STEPS.length - 1 ? 24 : 0 }}>
                    <Text style={{ color: isPast || isCurrent ? '#FFFFFF' : '#444', fontSize: 16, fontWeight: '700' }}>
                      {step.label}
                    </Text>
                    <Text style={{ color: isCurrent ? '#D4A24C' : '#737373', fontSize: 12, marginTop: 4 }}>
                      {step.desc}
                    </Text>
                  </View>
                </View>
              );
            })
          )}
        </View>

        {/* ── Summary Details ── */}
        <View style={{ marginHorizontal: 24, backgroundColor: '#111111', borderRadius: 24, padding: 20, borderWidth: 1, borderColor: '#1E1208' }}>
          <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700', marginBottom: 16 }}>Transaction Breakdown</Text>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <Text style={{ color: '#737373', fontSize: 14 }}>Method</Text>
            <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600' }}>{order?.payment_method}</Text>
          </View>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
            <Text style={{ color: '#737373', fontSize: 14 }}>Payment</Text>
            <View style={{ paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, backgroundColor: order?.payment_status === 'paid' ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)' }}>
              <Text style={{ color: order?.payment_status === 'paid' ? '#22C55E' : '#F59E0B', fontSize: 11, fontWeight: '700', textTransform: 'uppercase' }}>
                {order?.payment_status}
              </Text>
            </View>
          </View>

          <View style={{ height: 1, backgroundColor: '#1E1208', marginBottom: 16 }} />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '700' }}>Total Paid</Text>
            <Text style={{ color: '#D4A24C', fontSize: 22, fontWeight: '800' }}>₱{order?.total_amount}</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}