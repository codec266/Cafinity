import './global.css';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [beans, setBeans] = useState(0);

  return (
    <View className="flex-1 items-center justify-center bg-stone-100 px-6">
      <View className="bg-white p-8 rounded-3xl border border-stone-200 items-center w-full max-w-sm">
        <Text className="text-3xl font-extrabold text-amber-900 mb-2">
          Tomoro Coffee
        </Text>
        <Text className="text-base text-stone-500 text-center mb-8 font-medium">
          NativeWind v4 is fully operational.
        </Text>

        <View className="bg-amber-100 px-8 py-5 rounded-2xl mb-8 w-full items-center">
          <Text className="text-5xl font-black text-amber-800">
            {beans}
          </Text>
          <Text className="text-xs text-amber-700 uppercase tracking-widest font-bold mt-2">
            Coffee Beans Ground
          </Text>
        </View>

        <TouchableOpacity 
          onPress={() => setBeans(beans + 1)}
          className="bg-amber-600 w-full py-4 rounded-xl active:bg-amber-800"
        >
          <Text className="text-white text-center font-bold text-lg tracking-wide">
            Brew Coffee
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="dark" />
    </View>
  );
}