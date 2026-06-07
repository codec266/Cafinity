import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function LoginScreen() {
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const border = (f: boolean) => f ? 'rgba(212,162,76,0.55)' : 'rgba(255,255,255,0.07)';
  const iconColor = (f: boolean) => f ? '#D4A24C' : '#4A4A4A';

  return (
    <View style={{ flex: 1, backgroundColor: '#080808' }}>
      <StatusBar style="light" />

      {/* Full-screen background */}
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop' }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        resizeMode="cover"
      />
      {/* Base overlay */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(4,4,4,0.62)' }} />
      {/* Bottom dark for card readability */}
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '65%', backgroundColor: 'rgba(4,4,4,0.55)' }} />

      <SafeAreaView style={{ flex: 1 }}>
        {/* Back button */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            marginLeft: 24, marginTop: 8,
            width: 44, height: 44, borderRadius: 22,
            backgroundColor: 'rgba(17,17,17,0.85)',
            borderWidth: 1, borderColor: 'rgba(212,162,76,0.2)',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Feather name="chevron-left" size={22} color="#D4A24C" />
        </TouchableOpacity>

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 40 }}
          >
            {/* Branding */}
            <View style={{ alignItems: 'center', paddingTop: 32, paddingBottom: 36 }}>
              <View
                style={{
                  width: 72, height: 72, borderRadius: 36,
                  backgroundColor: 'rgba(212,162,76,0.08)',
                  borderWidth: 1.5, borderColor: 'rgba(212,162,76,0.38)',
                  alignItems: 'center', justifyContent: 'center',
                  marginBottom: 14,
                  shadowColor: '#D4A24C', shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.3, shadowRadius: 18, elevation: 8,
                }}
              >
                <Feather name="coffee" size={32} color="#D4A24C" />
              </View>
              <Text style={{ color: '#D4A24C', fontSize: 36, fontWeight: '200', letterSpacing: 12, marginBottom: 10 }}>
                CAFINITY
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', width: 160, marginBottom: 10 }}>
                <View style={{ flex: 1, height: 0.5, backgroundColor: 'rgba(212,162,76,0.4)' }} />
                <Text style={{ color: '#D4A24C', fontSize: 10, marginHorizontal: 8 }}>✦</Text>
                <View style={{ flex: 1, height: 0.5, backgroundColor: 'rgba(212,162,76,0.4)' }} />
              </View>
              <Text style={{ color: 'rgba(212,162,76,0.55)', fontSize: 9, fontWeight: '600', letterSpacing: 3, textTransform: 'uppercase' }}>
                Brew Better. Manage Smarter.
              </Text>
            </View>

            {/* Floating badge + card */}
            <View style={{ alignItems: 'center', paddingHorizontal: 24 }}>
              {/* Floating icon badge */}
              <View
                style={{
                  width: 72, height: 72, borderRadius: 36,
                  backgroundColor: '#111111',
                  borderWidth: 2, borderColor: '#D4A24C',
                  alignItems: 'center', justifyContent: 'center',
                  zIndex: 2, marginBottom: -36,
                  shadowColor: '#D4A24C', shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3, shadowRadius: 12, elevation: 8,
                }}
              >
                <Feather name="coffee" size={30} color="#D4A24C" />
              </View>

              {/* Card */}
              <View
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(14,14,14,0.97)',
                  borderRadius: 28,
                  borderWidth: 1, borderColor: 'rgba(212,162,76,0.12)',
                  paddingTop: 54, paddingHorizontal: 24, paddingBottom: 28,
                }}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 26, fontWeight: '700', textAlign: 'center', marginBottom: 6 }}>
                  Welcome Back
                </Text>
                <Text style={{ color: '#737373', fontSize: 14, textAlign: 'center', marginBottom: 28, lineHeight: 20 }}>
                  Sign in to manage your daily brews.
                </Text>

                {/* Email */}
                <View
                  style={{
                    height: 60, flexDirection: 'row', alignItems: 'center',
                    backgroundColor: '#171717', borderRadius: 16,
                    borderWidth: 1, borderColor: border(emailFocused),
                    paddingHorizontal: 18, marginBottom: 12,
                  }}
                >
                  <Feather name="mail" size={18} color={iconColor(emailFocused)} style={{ marginRight: 14 }} />
                  <TextInput
                    placeholder="Email Address"
                    placeholderTextColor="#4A4A4A"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    style={{ flex: 1, color: '#FFFFFF', fontSize: 15 }}
                  />
                </View>

                {/* Password */}
                <View
                  style={{
                    height: 60, flexDirection: 'row', alignItems: 'center',
                    backgroundColor: '#171717', borderRadius: 16,
                    borderWidth: 1, borderColor: border(passwordFocused),
                    paddingHorizontal: 18, marginBottom: 10,
                  }}
                >
                  <Feather name="lock" size={18} color={iconColor(passwordFocused)} style={{ marginRight: 14 }} />
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="#4A4A4A"
                    secureTextEntry={!showPassword}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    style={{ flex: 1, color: '#FFFFFF', fontSize: 15 }}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(v => !v)} style={{ paddingLeft: 8 }}>
                    <Feather name={showPassword ? 'eye' : 'eye-off'} size={18} color="#4A4A4A" />
                  </TouchableOpacity>
                </View>

                {/* Forgot password */}
                <TouchableOpacity style={{ alignSelf: 'flex-end', paddingVertical: 6, marginBottom: 24 }}>
                  <Text style={{ color: '#D4A24C', fontSize: 13, fontWeight: '500' }}>Forgot Password?</Text>
                </TouchableOpacity>

                {/* Log In button */}
                <TouchableOpacity
                  style={{
                    height: 58, backgroundColor: '#D4A24C', borderRadius: 16,
                    alignItems: 'center', justifyContent: 'center', marginBottom: 24,
                    shadowColor: '#D4A24C', shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.35, shadowRadius: 16, elevation: 10,
                  }}
                  activeOpacity={0.85}
                  onPress={() => router.replace('/(tabs)')}
                >
                  <Text style={{ color: '#080808', fontWeight: '700', fontSize: 16, letterSpacing: 0.3 }}>Log In</Text>
                </TouchableOpacity>

                {/* OR divider */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                  <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(212,162,76,0.15)' }} />
                  <Text style={{ color: '#4A4A4A', fontSize: 12, marginHorizontal: 16 }}>or continue with</Text>
                  <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(212,162,76,0.15)' }} />
                </View>

                {/* Social buttons — side by side */}
                <View style={{ flexDirection: 'row', gap: 12, marginBottom: 24 }}>
                  <TouchableOpacity
                    style={{
                      flex: 1, height: 52,
                      backgroundColor: '#171717', borderRadius: 14,
                      borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
                      flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
                    }}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="logo-google" size={18} color="#DB4437" />
                    <Text style={{ color: '#A3A3A3', fontSize: 13, fontWeight: '500' }}>Google</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flex: 1, height: 52,
                      backgroundColor: '#171717', borderRadius: 14,
                      borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
                      flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
                    }}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="logo-apple" size={18} color="#FFFFFF" />
                    <Text style={{ color: '#A3A3A3', fontSize: 13, fontWeight: '500' }}>Apple</Text>
                  </TouchableOpacity>
                </View>

                {/* Register link */}
                <TouchableOpacity
                  style={{ alignItems: 'center' }}
                  activeOpacity={0.7}
                  onPress={() => router.push('/(auth)/register')}
                >
                  <Text style={{ color: '#737373', fontSize: 14 }}>
                    {"Don't have an account? "}
                    <Text style={{ color: '#D4A24C', fontWeight: '600' }}>Sign Up</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
