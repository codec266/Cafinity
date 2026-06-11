import { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, Animated, Modal } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '../../lib/supabase';
import { useCartStore } from '../../store/cartStore';

export default function MenuScreen() {
  const insets = useSafeAreaInsets();
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // <-- Toast State -->
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const slideAnim = useRef(new Animated.Value(-100)).current; 
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // <-- Bottom Sheet Modal State -->
  const [activeItem, setActiveItem] = useState<any | null>(null);
  const [itemDetails, setItemDetails] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  
  // <-- User Selection State -->
  const [selectedVariant, setSelectedVariant] = useState<any | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, any>>({});

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
        id, name, description, image_url, category_id,
        product_variants (price)
      `)
      .eq('is_available', true)
      .eq('product_variants.is_default', true);

    if (catData) setCategories(catData);
    if (prodData) setProducts(prodData);
    setLoading(false);
  }

  // Triggered when clicking '+' on the menu list
  const handleOpenCustomizer = async (item: any) => {
    setActiveItem(item);
    setModalVisible(true);
    setDetailsLoading(true);
    setSelectedOptions({});

    // Fetch deep relationships: Variants & Linked Customization Groups -> Options
    const { data, error } = await supabase
      .from('products')
      .select(`
        id, name, description, image_url,
        product_variants ( id, name, price, is_default ),
        product_customization_link (
          customization_groups (
            id, name, selection_type,
            customization_options ( id, name, additional_price )
          )
        )
      `)
      .eq('id', item.id)
      .single();

    if (data) {
      setItemDetails(data);
      // Auto-select the default variant
      const defVariant = data.product_variants.find((v: any) => v.is_default) || data.product_variants[0];
      setSelectedVariant(defVariant);
    }
    setDetailsLoading(false);
  };

  const toggleOption = (groupId: string, option: any, selectionType: string) => {
    setSelectedOptions(prev => {
      const current = { ...prev };
      if (selectionType === 'single') {
        // Replace existing selection for this group
        current[groupId] = [option];
      } else {
        // Toggle in array for multiple selections
        const groupSelections = current[groupId] || [];
        const exists = groupSelections.find((o: any) => o.id === option.id);
        if (exists) {
          current[groupId] = groupSelections.filter((o: any) => o.id !== option.id);
        } else {
          current[groupId] = [...groupSelections, option];
        }
      }
      return current;
    });
  };

  const handleConfirmAddToCart = () => {
    if (!itemDetails || !selectedVariant) return;

    // Calculate final price including variant + all selected option add-ons
    let finalPrice = Number(selectedVariant.price);
    let customizationText = [selectedVariant.name];

    Object.values(selectedOptions).flat().forEach((opt: any) => {
      finalPrice += Number(opt.additional_price);
      customizationText.push(opt.name);
    });

    addToCart({
      id: itemDetails.id, // In a real app, you might want to generate a unique cart-item ID so different customizations don't stack
      name: itemDetails.name,
      desc: customizationText.join(', '),
      price: finalPrice,
      image: itemDetails.image_url
    });

    setModalVisible(false);
    showToast(`Added ${itemDetails.name} to cart`);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    Animated.spring(slideAnim, { toValue: 60, useNativeDriver: true, speed: 12, bounciness: 8 }).start();
    timeoutRef.current = setTimeout(() => {
      Animated.timing(slideAnim, { toValue: -100, duration: 300, useNativeDriver: true }).start(() => setToastMessage(null));
    }, 2000);
  };

  const displayedProducts = selectedCategoryId 
    ? products.filter(p => p.category_id === selectedCategoryId)
    : products;

  const currentCategoryName = selectedCategoryId 
    ? categories.find(c => c.id === selectedCategoryId)?.name 
    : 'All Menu';

  // Calculate live total for the button inside the modal
  let liveModalTotal = selectedVariant ? Number(selectedVariant.price) : 0;
  Object.values(selectedOptions).flat().forEach((opt: any) => {
    liveModalTotal += Number(opt.additional_price);
  });

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
      <Animated.View style={{ /* ... your existing toast styles ... */ position: 'absolute', top: 0, left: 24, right: 24, transform: [{ translateY: slideAnim }], zIndex: 100, backgroundColor: '#111111', borderWidth: 1, borderColor: '#D4A24C', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14, flexDirection: 'row', alignItems: 'center', gap: 12, shadowColor: '#D4A24C', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 12, elevation: 10 }}>
        <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(212,162,76,0.15)', alignItems: 'center', justifyContent: 'center' }}>
          <Feather name="check" size={14} color="#D4A24C" />
        </View>
        <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600', flex: 1 }} numberOfLines={1}>{toastMessage}</Text>
      </Animated.View>

      {/* ── Branch Selector Header ── */}
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#1E1208', backgroundColor: '#0A0A0A' }} activeOpacity={0.7}>
        <Feather name="box" size={18} color="#D4A24C" />
        <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700', marginLeft: 10, marginRight: 4 }}>Makati Main Branch</Text>
        <Feather name="chevron-right" size={16} color="#737373" />
      </TouchableOpacity>

      {/* ── Main Two-Column Layout ── */}
      <View style={{ flex: 1, flexDirection: 'row' }}>
        
        {/* LEFT SIDEBAR WRAPPER */}
        <View style={{ width: 85, backgroundColor: '#050505', borderRightWidth: 1, borderRightColor: '#1E1208' }}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 128 }}>
            <TouchableOpacity onPress={() => setSelectedCategoryId(null)} style={{ paddingVertical: 20, paddingHorizontal: 6, alignItems: 'center', justifyContent: 'center', borderLeftWidth: 3, borderLeftColor: selectedCategoryId === null ? '#D4A24C' : 'transparent', backgroundColor: selectedCategoryId === null ? '#111' : 'transparent' }}>
              <Text style={{ color: selectedCategoryId === null ? '#D4A24C' : '#737373', fontSize: 10, fontWeight: selectedCategoryId === null ? '800' : '600', textAlign: 'center', textTransform: 'uppercase', letterSpacing: 0.5 }}>All</Text>
            </TouchableOpacity>
            {categories.map((cat) => (
              <TouchableOpacity key={cat.id} onPress={() => setSelectedCategoryId(cat.id)} style={{ paddingVertical: 20, paddingHorizontal: 6, alignItems: 'center', justifyContent: 'center', borderLeftWidth: 3, borderLeftColor: selectedCategoryId === cat.id ? '#D4A24C' : 'transparent', backgroundColor: selectedCategoryId === cat.id ? '#111' : 'transparent' }}>
                <Text style={{ color: selectedCategoryId === cat.id ? '#D4A24C' : '#737373', fontSize: 10, fontWeight: selectedCategoryId === cat.id ? '800' : '600', textAlign: 'center', textTransform: 'uppercase', letterSpacing: 0.5 }}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* RIGHT AREA WRAPPER */}
        <View style={{ flex: 1, backgroundColor: '#080808' }}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 128 }}>
            <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 20, marginLeft: 4 }}>{currentCategoryName}</Text>
            {displayedProducts.map((item) => {
              const rawPrice = item.product_variants?.[0]?.price;
              const displayPrice = rawPrice ? Number(rawPrice).toFixed(2) : '0.00';

              return (
                <View key={item.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
                  <Image source={{ uri: item.image_url }} style={{ width: 72, height: 72, borderRadius: 36, backgroundColor: 'rgba(212,162,76,0.05)', marginRight: 14 }} resizeMode="cover" />
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '700', marginBottom: 6, paddingRight: 8 }} numberOfLines={2}>{item.name}</Text>
                    <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600' }}>₱ {displayPrice}</Text>
                  </View>
                  <TouchableOpacity 
                    style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#D4A24C', alignItems: 'center', justifyContent: 'center' }} 
                    activeOpacity={0.8}
                    // Trigger the Customization Modal instead of going straight to Cart
                    onPress={() => handleOpenCustomizer(item)}
                  >
                    <Feather name="plus" size={16} color="#1a0e00" />
                  </TouchableOpacity>
                </View>
              );
            })}
            {displayedProducts.length === 0 && (
              <Text style={{ color: '#737373', fontSize: 13, marginTop: 20, marginLeft: 4 }}>No items available in this category.</Text>
            )}
          </ScrollView>
        </View>
      </View>

      {/* ── Product Customization Bottom Sheet Modal ── */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        {/* Dark overlay background */}
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.6)' }}>
          {/* Bottom Sheet Container */}
          <View style={{ 
            backgroundColor: '#111111', 
            borderTopLeftRadius: 24, borderTopRightRadius: 24, 
            borderWidth: 1, borderColor: '#1E1208',
            maxHeight: '85%', minHeight: '50%'
          }}>
            
            {/* Header + Close Button */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 24, borderBottomWidth: 1, borderBottomColor: '#1E1208' }}>
              <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: '700' }}>Customize Options</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#1A1A1A', alignItems: 'center', justifyContent: 'center' }}>
                <Feather name="x" size={18} color="#737373" />
              </TouchableOpacity>
            </View>

            {detailsLoading ? (
              <View style={{ padding: 40, alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#D4A24C" />
              </View>
            ) : (
              <>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 24 }}>
                  
                  {/* Item Summary */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 32 }}>
                    <Image source={{ uri: itemDetails?.image_url }} style={{ width: 60, height: 60, borderRadius: 16, marginRight: 16 }} />
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '700', marginBottom: 4 }}>{itemDetails?.name}</Text>
                      <Text style={{ color: '#737373', fontSize: 12 }} numberOfLines={2}>{itemDetails?.description}</Text>
                    </View>
                  </View>

                  {/* 1. Variants Selection (e.g. Size: Regular / Large) */}
                  {itemDetails?.product_variants?.length > 0 && (
                    <View style={{ marginBottom: 32 }}>
                      <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700', marginBottom: 12 }}>Size / Variant</Text>
                      {itemDetails.product_variants.map((variant: any) => (
                        <TouchableOpacity
                          key={variant.id}
                          onPress={() => setSelectedVariant(variant)}
                          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' }}
                          activeOpacity={0.7}
                        >
                          <Text style={{ color: '#FFFFFF', fontSize: 15 }}>{variant.name}</Text>
                          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                            <Text style={{ color: '#D4A24C', fontSize: 14, fontWeight: '600' }}>₱{Number(variant.price).toFixed(2)}</Text>
                            <View style={{ width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: selectedVariant?.id === variant.id ? '#D4A24C' : '#333', alignItems: 'center', justifyContent: 'center' }}>
                              {selectedVariant?.id === variant.id && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#D4A24C' }} />}
                            </View>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}

                  {/* 2. Customization Groups (e.g. Milk Choice, Extra Shots) */}
                  {itemDetails?.product_customization_link?.map((link: any) => {
                    const group = link.customization_groups;
                    if (!group) return null;

                    return (
                      <View key={group.id} style={{ marginBottom: 32 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
                          <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700' }}>{group.name}</Text>
                          <Text style={{ color: '#737373', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1 }}>{group.selection_type === 'single' ? 'Pick 1' : 'Optional'}</Text>
                        </View>
                        
                        {group.customization_options?.map((option: any) => {
                          const isSelected = (selectedOptions[group.id] || []).some((o: any) => o.id === option.id);
                          const isCheckbox = group.selection_type !== 'single';

                          return (
                            <TouchableOpacity
                              key={option.id}
                              onPress={() => toggleOption(group.id, option, group.selection_type)}
                              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' }}
                              activeOpacity={0.7}
                            >
                              <Text style={{ color: '#FFFFFF', fontSize: 15 }}>{option.name}</Text>
                              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                                {Number(option.additional_price) > 0 && (
                                  <Text style={{ color: '#A3A3A3', fontSize: 13 }}>+ ₱{Number(option.additional_price).toFixed(2)}</Text>
                                )}
                                <View style={{ 
                                  width: 22, height: 22, 
                                  borderRadius: isCheckbox ? 6 : 11, // Square for multiple, circle for single
                                  borderWidth: 2, borderColor: isSelected ? '#D4A24C' : '#333', 
                                  backgroundColor: isSelected ? '#D4A24C' : 'transparent',
                                  alignItems: 'center', justifyContent: 'center' 
                                }}>
                                  {isSelected && <Feather name="check" size={12} color="#111" />}
                                </View>
                              </View>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    );
                  })}
                </ScrollView>

                {/* Confirm Button Footer */}
                <View style={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: Math.max(insets.bottom, 24), borderTopWidth: 1, borderTopColor: '#1E1208', backgroundColor: '#0A0A0A' }}>
                  <TouchableOpacity
                    onPress={handleConfirmAddToCart}
                    style={{ height: 56, borderRadius: 16, backgroundColor: '#D4A24C', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24 }}
                    activeOpacity={0.85}
                  >
                    <Text style={{ color: '#1a0e00', fontWeight: '800', fontSize: 16 }}>Add to Cart</Text>
                    <Text style={{ color: '#1a0e00', fontWeight: '800', fontSize: 16 }}>₱{liveModalTotal.toFixed(2)}</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}