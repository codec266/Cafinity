import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TABS: { icon: any; label: string; badge?: number }[] = [
  { icon: 'home', label: 'Home' },
  { icon: 'coffee', label: 'Menu' },
  { icon: 'shopping-cart', label: 'Cart', badge: 3 },
  { icon: 'user', label: 'Profile' },
];

export function CustomTabBar({ state, navigation }: { state: any; navigation: any }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        position: 'absolute',
        bottom: Math.max(insets.bottom, 8) + 12,
        left: 28,
        right: 28,
        height: 76,
        backgroundColor: 'rgba(12,12,12,0.98)',
        borderRadius: 38,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.07)',
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.65,
        shadowRadius: 28,
        elevation: 28,
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
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 5 }}
          >
            {/* Icon wrapper — relative so badge can overlay */}
            <View style={{ position: 'relative' }}>
              <Feather
                name={tab.icon}
                size={22}
                color={isFocused ? '#D4A24C' : '#3A3A3A'}
              />
              {tab.badge !== undefined && (
                <View
                  style={{
                    position: 'absolute', top: -6, right: -10,
                    minWidth: 16, height: 16, borderRadius: 8,
                    backgroundColor: '#F59E0B',
                    borderWidth: 1.5, borderColor: 'rgba(12,12,12,0.98)',
                    alignItems: 'center', justifyContent: 'center',
                    paddingHorizontal: 3,
                  }}
                >
                  <Text style={{ color: '#080808', fontSize: 9, fontWeight: '800' }}>{tab.badge}</Text>
                </View>
              )}
            </View>

            <Text
              style={{
                fontSize: 10,
                fontWeight: isFocused ? '600' : '400',
                color: isFocused ? '#D4A24C' : '#3A3A3A',
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
