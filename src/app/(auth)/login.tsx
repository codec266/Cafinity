import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function LoginScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]">
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 px-5 pt-4"
      >
        {/* Back button */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full items-center justify-center mb-8"
          style={{
            backgroundColor: 'rgba(255,255,255,0.06)',
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.1)',
          }}
        >
          <Feather name="chevron-left" size={22} color="#D4A853" />
        </TouchableOpacity>

        {/* Icon */}
        <View
          className="w-14 h-14 rounded-2xl items-center justify-center mb-6"
          style={{
            backgroundColor: 'rgba(212,168,83,0.12)',
            borderWidth: 1,
            borderColor: 'rgba(212,168,83,0.3)',
          }}
        >
          <Feather name="coffee" size={24} color="#D4A853" />
        </View>

        <Text className="text-white text-[30px] font-semibold mb-1">Welcome Back</Text>
        <Text className="text-neutral-500 text-sm mb-9">Sign in to manage your daily brews.</Text>

        {/* ── Form card ─────────────────────────── */}
        <View
          className="rounded-2xl p-5 mb-4"
          style={{
            backgroundColor: 'rgba(255,255,255,0.04)',
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.08)',
          }}
        >
          {/* Email */}
          <View
            className="flex-row items-center rounded-xl px-4 py-[15px] mb-3"
            style={{
              backgroundColor: 'rgba(255,255,255,0.04)',
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.08)',
            }}
          >
            <Feather name="mail" size={17} color="#D4A853" style={{ marginRight: 12 }} />
            <TextInput
              placeholder="Email address"
              placeholderTextColor="#4B5563"
              keyboardType="email-address"
              autoCapitalize="none"
              className="flex-1 text-white text-sm"
            />
          </View>

          {/* Password */}
          <View
            className="flex-row items-center rounded-xl px-4 py-[15px] mb-3"
            style={{
              backgroundColor: 'rgba(255,255,255,0.04)',
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.08)',
            }}
          >
            <Feather name="lock" size={17} color="#D4A853" style={{ marginRight: 12 }} />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#4B5563"
              secureTextEntry
              className="flex-1 text-white text-sm"
            />
            <TouchableOpacity>
              <Feather name="eye-off" size={17} color="#4B5563" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity className="self-end py-1">
            <Text className="text-[#D4A853] text-xs font-medium">Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Submit */}
        <TouchableOpacity
          className="w-full py-[17px] rounded-2xl items-center mt-auto mb-8"
          style={{ backgroundColor: '#D4A853' }}
          activeOpacity={0.82}
          onPress={() => router.replace('/(tabs)')}
        >
          <Text
            className="text-[#0A0A0A] font-bold text-base"
            style={{ letterSpacing: 0.3 }}
          >
            Log In
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
