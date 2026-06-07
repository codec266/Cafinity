import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function CartScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
      <StatusBar style="light" />
      <View className="flex-1 items-center justify-center px-6">
        <View
          className="w-20 h-20 rounded-3xl items-center justify-center mb-5"
          style={{
            backgroundColor: 'rgba(212,168,83,0.1)',
            borderWidth: 1,
            borderColor: 'rgba(212,168,83,0.25)',
          }}
        >
          <Feather name="shopping-bag" size={32} color="#D4A853" />
        </View>
        <Text className="text-white text-xl font-semibold mb-2">Cart</Text>
        <Text className="text-neutral-600 text-sm text-center">Coming soon</Text>
      </View>
    </SafeAreaView>
  );
}
