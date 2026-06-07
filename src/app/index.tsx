import { router } from 'expo-router';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';

export default function WelcomeScreen() {
  return (
    <View className="flex-1 bg-[#0A0A0A]">
      <StatusBar style="light" />

      {/* Full-screen hero image */}
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop' }}
        className="absolute w-full h-full"
        resizeMode="cover"
      />

      {/* Overlay: base dark tint */}
      <View className="absolute inset-0 bg-black/40" />
      {/* Overlay: bottom-heavy fade so buttons are readable */}
      <View
        className="absolute bottom-0 left-0 right-0"
        style={{ height: '62%', backgroundColor: 'rgba(10,10,10,0.93)' }}
      />

      <SafeAreaView className="flex-1">
        {/* ── Branding ─────────────────────────── */}
        <View className="items-center mt-16">
          <View
            className="w-20 h-20 rounded-full items-center justify-center mb-5"
            style={{
              backgroundColor: 'rgba(212,168,83,0.13)',
              borderWidth: 1.5,
              borderColor: 'rgba(212,168,83,0.45)',
            }}
          >
            <Feather name="coffee" size={34} color="#D4A853" />
          </View>

          <Text
            className="text-[#D4A853] text-[34px] font-light mb-2"
            style={{ letterSpacing: 10 }}
          >
            CAFINITY
          </Text>
          <Text
            className="text-[#D4A853]/60 text-[10px] font-semibold uppercase"
            style={{ letterSpacing: 4 }}
          >
            Brew Better, Manage Smarter
          </Text>
        </View>

        {/* ── Action card ───────────────────────── */}
        <View className="mt-auto px-5 pb-10">
          <View
            className="rounded-[28px] p-6"
            style={{
              backgroundColor: 'rgba(255,255,255,0.04)',
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.09)',
            }}
          >
            {/* Log In */}
            <TouchableOpacity
              className="w-full py-[17px] rounded-2xl items-center mb-3"
              style={{ backgroundColor: '#D4A853' }}
              activeOpacity={0.82}
              onPress={() => router.push('/(auth)/login')}
            >
              <Text
                className="text-[#0A0A0A] font-bold text-base"
                style={{ letterSpacing: 0.5 }}
              >
                Log In
              </Text>
            </TouchableOpacity>

            {/* Sign Up */}
            <TouchableOpacity
              className="w-full py-[17px] rounded-2xl items-center mb-6"
              style={{
                borderWidth: 1,
                borderColor: 'rgba(212,168,83,0.55)',
              }}
              activeOpacity={0.82}
              onPress={() => router.push('/(auth)/register')}
            >
              <Text
                className="text-[#D4A853] font-semibold text-base"
                style={{ letterSpacing: 0.5 }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>

            {/* Guest */}
            <TouchableOpacity
              className="items-center"
              activeOpacity={0.6}
              onPress={() => router.replace('/(tabs)')}
            >
              <Text className="text-neutral-500 text-sm">Continue as Guest</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
