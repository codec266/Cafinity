import { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, ActivityIndicator, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '../../lib/supabase';
import { useCartStore } from '../../store/cartStore';

export default function MenuScreen() {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // <-- Toast State & Animation Values -->
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const slideAnim = useRef(new Animated.Value(-100)).current; 
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    fetchMenuData();
  }, []);

  async function fetchMenuData() {
    setLoading(true);

    const { data: catData } = await supabase
      .from('product_categories')
      .select('*')
      .order('display_order', { ascending: true });

    const { data: prodData } = await supabase
      .from('products')
      .select(`
        *,
        product_variants (price)
      `)
      .eq('is_available', true)
      .eq('product_variants.is_default', true);

    if (catData) setCategories(catData);
    if (prodData) setProducts(prodData);
    
    setLoading(false);
  }

  // <-- The Toast Trigger Function -->
  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      desc: item.description || '',
      price: item.product_variants?.[0]?.price || 0,
      image: item.image_url
    });

    setToastMessage(`Added ${item.name} to cart`);
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    Animated.spring(slideAnim, {
      toValue: 60,
      useNativeDriver: true,
      speed: 12,
      bounciness: 8,
    }).start();

    timeoutRef.current = setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setToastMessage(null));
    }, 2000);
  };

  const displayedProducts = selectedCategoryId 
    ? products.filter(p => p.category_id === selectedCategoryId)
    : products;

  const featuredProduct = products.find(p => p.is_featured);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#080808', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#D4A24C" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#080808' }} edges={['top']}>
      <StatusBar style="light" />

      {/* ── Floating Animated Toast ── */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 24,
          right: 24,
          transform: [{ translateY: slideAnim }],
          zIndex: 100,
          backgroundColor: '#111111',
          borderWidth: 1,
          borderColor: '#D4A24C',
          borderRadius: 16,
          paddingHorizontal: 16,
          paddingVertical: 14,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          shadowColor: '#D4A24C',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 12,
          elevation: 10,
        }}
      >
        <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(212,162,76,0.15)', alignItems: 'center', justifyContent: 'center' }}>
          <Feather name="check" size={14} color="#D4A24C" />
        </View>
        <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600', flex: 1 }} numberOfLines={1}>
          {toastMessage}
        </Text>
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 128 }}>

        {/* ── Header (Decluttered) ── */}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingTop: 16, paddingBottom: 20 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#FFFFFF', fontSize: 34, fontWeight: '700', letterSpacing: -0.5, lineHeight: 38 }}>Menu</Text>
            <Text style={{ color: '#737373', fontSize: 13, marginTop: 2 }}>Discover handcrafted drinks and pastries</Text>
          </View>
          <View style={{ width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: 'rgba(212,162,76,0.5)', overflow: 'hidden' }}>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' }} style={{ width: 44, height: 44 }} resizeMode="cover" />
          </View>
        </View>

        {/* ── Search bar ── */}
        <View style={{ height: 52, flexDirection: 'row', alignItems: 'center', marginHorizontal: 24, marginBottom: 20, backgroundColor: '#111111', borderRadius: 26, borderWidth: 1, borderColor: '#1E1208', paddingLeft: 18, paddingRight: 8 }}>
          <Feather name="search" size={18} color="#4A4A4A" style={{ marginRight: 12 }} />
          <TextInput placeholder="Search coffee, tea, pastries..." placeholderTextColor="#4A4A4A" style={{ flex: 1, color: '#FFFFFF', fontSize: 15 }} />
          <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 14, backgroundColor: '#D4A24C', alignItems: 'center', justifyContent: 'center' }} activeOpacity={0.85}>
            <Feather name="sliders" size={16} color="#080808" />
          </TouchableOpacity>
        </View>

        {/* ── Category pills ── */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 24 }} contentContainerStyle={{ paddingHorizontal: 24, gap: 10 }}>
          <TouchableOpacity
            onPress={() => setSelectedCategoryId(null)}
            style={{ paddingHorizontal: 20, paddingVertical: 10, borderRadius: 26, backgroundColor: selectedCategoryId === null ? '#D4A24C' : '#111111', borderWidth: 1, borderColor: selectedCategoryId === null ? '#D4A24C' : '#1E1208' }}
            activeOpacity={0.8}
          >
            <Text style={{ fontSize: 14, fontWeight: '600', color: selectedCategoryId === null ? '#080808' : '#737373' }}>All</Text>
          </TouchableOpacity>

          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              onPress={() => setSelectedCategoryId(cat.id)}
              style={{ paddingHorizontal: 20, paddingVertical: 10, borderRadius: 26, backgroundColor: selectedCategoryId === cat.id ? '#D4A24C' : '#111111', borderWidth: 1, borderColor: selectedCategoryId === cat.id ? '#D4A24C' : '#1E1208' }}
              activeOpacity={0.8}
            >
              <Text style={{ fontSize: 14, fontWeight: '600', color: selectedCategoryId === cat.id ? '#080808' : '#737373' }}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── Featured card ── */}
        {featuredProduct && selectedCategoryId === null && (
          <View style={{ marginHorizontal: 24, marginBottom: 28, backgroundColor: '#111111', borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(212,162,76,0.15)', height: 248, flexDirection: 'row' }}>
            <View style={{ flex: 1, padding: 20, justifyContent: 'space-between' }}>
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 14, backgroundColor: 'rgba(212,162,76,0.1)', borderWidth: 1, borderColor: 'rgba(212,162,76,0.35)', marginBottom: 10 }}>
                  <Feather name="star" size={9} color="#D4A24C" />
                  <Text style={{ color: '#D4A24C', fontSize: 9, fontWeight: '700', letterSpacing: 1.5, textTransform: 'uppercase' }}>Featured</Text>
                </View>
                <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: '800', letterSpacing: -0.3, lineHeight: 26, marginBottom: 8 }} numberOfLines={2}>{featuredProduct.name}</Text>
                <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, lineHeight: 16, marginBottom: 10 }} numberOfLines={2}>{featuredProduct.description}</Text>
                <Text style={{ color: '#D4A24C', fontSize: 24, fontWeight: '800' }}>₱{featuredProduct.product_variants[0]?.price}</Text>
              </View>
              <TouchableOpacity 
                style={{ height: 38, paddingLeft: 14, paddingRight: 8, borderRadius: 19, backgroundColor: '#D4A24C', flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start' }} 
                activeOpacity={0.85}
                onPress={() => handleAddToCart(featuredProduct)}
              >
                <Text style={{ color: '#1a0e00', fontWeight: '700', fontSize: 13 }}>Add to Cart</Text>
                <View style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 1.5, borderColor: 'rgba(8,8,8,0.25)', alignItems: 'center', justifyContent: 'center' }}><Feather name="plus" size={12} color="#1a0e00" /></View>
              </TouchableOpacity>
            </View>
            <Image source={{ uri: featuredProduct.image_url }} style={{ width: 148, height: 248 }} resizeMode="cover" />
          </View>
        )}

        {/* ── Product grid ── */}
        <View style={{ paddingHorizontal: 24, flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          {displayedProducts.map((item) => (
            <View key={item.id} style={{ width: '47.5%', height: 120, backgroundColor: '#111111', borderRadius: 18, overflow: 'hidden', borderWidth: 1, borderColor: '#1E1208', flexDirection: 'row' }}>
              <Image source={{ uri: item.image_url }} style={{ width: 90, height: 120 }} resizeMode="cover" />
              <View style={{ flex: 1, padding: 10, justifyContent: 'space-between' }}>
                <View>
                  <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: '700', marginBottom: 3, lineHeight: 17 }} numberOfLines={1}>{item.name}</Text>
                  <Text style={{ color: '#737373', fontSize: 10, lineHeight: 14 }} numberOfLines={2}>{item.description}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ color: '#D4A24C', fontSize: 13, fontWeight: '700' }}>₱{item.product_variants[0]?.price}</Text>
                  <TouchableOpacity 
                    style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#D4A24C', alignItems: 'center', justifyContent: 'center' }} 
                    activeOpacity={0.8}
                    onPress={() => handleAddToCart(item)}
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