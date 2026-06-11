import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCartStore } from '../store/cartStore'; // Ensure this path matches your folder structure

export function CustomTabBar({ state, navigation }: { state: any; navigation: any }) {
  const insets = useSafeAreaInsets();

  // 1. Hook into the global cart store
  const cart = useCartStore((state) => state.cart);

  // 2. Calculate the total quantity of all items combined
  const cartItemCount = cart.reduce((total, item) => total + item.qty, 0);

  // 3. Define TABS inside the component so it can react to the state
  const TABS: { icon: any; label: string; badge?: number }[] = [
    { icon: 'home', label: 'Home' },
    { icon: 'coffee', label: 'Menu' },
    { 
      icon: 'shopping-cart', 
      label: 'Cart', 
      // Only attach a badge number if the cart isn't empty
      badge: cartItemCount > 0 ? cartItemCount : undefined 
    },
    { icon: 'user', label: 'Profile' },
  ];

  return (
    <View
      style={{
        position: 'absolute',
        bottom: Math.max(insets.bottom, 8) + 16,
        left: 24,
        right: 24,
        height: 72,
        backgroundColor: 'rgba(10,10,10,0.97)',
        borderRadius: 36,
        borderWidth: 1,
        borderColor: 'rgba(212,162,76,0.18)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 16 },
        shadowOpacity: 0.7,
        shadowRadius: 32,
        elevation: 32,
      }}
    >
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;
        const tab = TABS[index];

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => {
              if (!isFocused) navigation.navigate(route.name);
            }}
            activeOpacity={0.7}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            {/* Active pill background */}
            {isFocused && (
              <View
                style={{
                  position: 'absolute',
                  width: 64, height: 52,
                  borderRadius: 26,
                  backgroundColor: 'rgba(212,162,76,0.12)',
                  borderWidth: 1,
                  borderColor: 'rgba(212,162,76,0.22)',
                }}
              />
            )}

            {/* Icon + badge */}
            <View style={{ position: 'relative', marginBottom: 4 }}>
              <Feather
                name={tab.icon}
                size={22}
                color={isFocused ? '#D4A24C' : '#525252'}
              />
              {tab.badge !== undefined && (
                <View
                  style={{
                    position: 'absolute', top: -6, right: -10,
                    minWidth: 16, height: 16, borderRadius: 8,
                    backgroundColor: '#F59E0B',
                    borderWidth: 1.5, borderColor: 'rgba(10,10,10,0.97)',
                    alignItems: 'center', justifyContent: 'center',
                    paddingHorizontal: 3,
                  }}
                >
                  <Text style={{ color: '#1a0e00', fontSize: 9, fontWeight: '800' }}>
                    {tab.badge}
                  </Text>
                </View>
              )}
            </View>

            <Text
              style={{
                fontSize: 10,
                fontWeight: isFocused ? '700' : '400',
                color: isFocused ? '#D4A24C' : '#525252',
                letterSpacing: isFocused ? 0.2 : 0,
              }}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}