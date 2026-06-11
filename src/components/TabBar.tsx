import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCartStore } from '../store/cartStore'; 

export function CustomTabBar({ state, navigation }: { state: any; navigation: any }) {
  const insets = useSafeAreaInsets();

  const cart = useCartStore((state) => state.cart);
  const cartItemCount = cart.reduce((total, item) => total + item.qty, 0);

  const TABS: { icon: any; label: string; badge?: number }[] = [
    { icon: 'home', label: 'Home' },
    { icon: 'coffee', label: 'Menu' },
    { 
      icon: 'shopping-cart', 
      label: 'Cart', 
      badge: cartItemCount > 0 ? cartItemCount : undefined 
    },
    { icon: 'user', label: 'Profile' },
  ];

  return (
    <View
      style={{
        backgroundColor: '#0A0A0A', 
        borderTopWidth: 1,
        borderTopColor: '#1E1208', 
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        // Increased padding to make the tab bar comfortably taller
        paddingTop: 18, 
        paddingBottom: Math.max(insets.bottom + 8, 24), 
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
            {/* Icon + badge */}
            <View style={{ position: 'relative', marginBottom: 6 }}>
              <Feather
                name={tab.icon}
                size={24} // Slightly bumped icon size to match the taller bar
                color={isFocused ? '#D4A24C' : '#525252'}
              />
              {tab.badge !== undefined && (
                <View
                  style={{
                    position: 'absolute', top: -6, right: -12,
                    minWidth: 16, height: 16, borderRadius: 8,
                    backgroundColor: '#F59E0B',
                    borderWidth: 1.5, borderColor: '#0A0A0A',
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
                fontWeight: isFocused ? '700' : '500',
                color: isFocused ? '#D4A24C' : '#525252',
                letterSpacing: isFocused ? 0.3 : 0,
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