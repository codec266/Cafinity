import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TABS: { icon: any; label: string }[] = [
  { icon: 'home', label: 'Home' },
  { icon: 'grid', label: 'Menu' },
  { icon: 'shopping-bag', label: 'Cart' },
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
            <Feather
              name={tab.icon}
              size={22}
              color={isFocused ? '#D4A24C' : '#3A3A3A'}
            />
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
