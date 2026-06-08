import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function RegisterScreen() {
  const [focused, setFocused] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const border = (f: string) =>
    focused === f ? 'rgba(212,162,76,0.55)' : 'rgba(212,162,76,0.14)';
  const icon = (f: string) =>
    focused === f ? '#D4A24C' : 'rgba(212,162,76,0.55)';

  return (
    <View style={{ flex: 1, backgroundColor: '#080808' }}>
      <StatusBar style="light" />

      {/* Full-screen background */}
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200&auto=format&fit=crop' }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        resizeMode="cover"
      />
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(4,4,4,0.65)' }} />

      <SafeAreaView style={{ flex: 1 }}>
        {/* Back button — absolute */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            position: 'absolute', top: 12, left: 24, zIndex: 20,
            width: 44, height: 44, borderRadius: 22,
            backgroundColor: 'rgba(17,17,17,0.85)',
            borderWidth: 1, borderColor: 'rgba(212,162,76,0.2)',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Feather name="chevron-left" size={22} color="#D4A24C" />
        </TouchableOpacity>

        {/* Register has more content — full page scroll */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* Branding — fixed height ~28% of screen to ensure proportional layout */}
          <View
            style={{
              height: Math.max(SCREEN_HEIGHT * 0.28, 200),
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 44,
            }}
          >
            <View
              style={{
                width: 68, height: 68, borderRadius: 34,
                backgroundColor: 'rgba(212,162,76,0.08)',
                borderWidth: 1.5, borderColor: 'rgba(212,162,76,0.38)',
                alignItems: 'center', justifyContent: 'center',
                marginBottom: 12,
                shadowColor: '#D4A24C', shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.3, shadowRadius: 16, elevation: 8,
              }}
            >
              <Feather name="coffee" size={30} color="#D4A24C" />
            </View>

            <Text style={{ color: '#D4A24C', fontSize: 32, fontWeight: '200', letterSpacing: 11, marginBottom: 8 }}>
              CAFINITY
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', width: 150, marginBottom: 8 }}>
              <View style={{ flex: 1, height: 0.5, backgroundColor: 'rgba(212,162,76,0.5)' }} />
              <Text style={{ color: '#D4A24C', fontSize: 10, marginHorizontal: 8 }}>✦</Text>
              <View style={{ flex: 1, height: 0.5, backgroundColor: 'rgba(212,162,76,0.5)' }} />
            </View>

            <Text style={{ color: 'rgba(212,162,76,0.55)', fontSize: 9, fontWeight: '600', letterSpacing: 3, textTransform: 'uppercase' }}>
              Brew Better. Manage Smarter.
            </Text>
          </View>

          {/* Card zone */}
          <View style={{ paddingHorizontal: 24, paddingBottom: 8 }}>
            <View style={{ marginTop: 36 }}>

              {/* Card body — rendered first */}
              <View
                style={{
                  backgroundColor: 'rgba(14,14,14,0.97)',
                  borderRadius: 28,
                  borderWidth: 1, borderColor: 'rgba(212,162,76,0.12)',
                  paddingTop: 52, paddingHorizontal: 22, paddingBottom: 24,
                }}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 26, fontWeight: '700', textAlign: 'center', marginBottom: 6 }}>
                  Create Your Account
                </Text>
                <Text style={{ color: '#737373', fontSize: 14, textAlign: 'center', marginBottom: 12, lineHeight: 20 }}>
                  Join Cafinity and brew better.
                </Text>

                {/* Ornament divider */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                  <View style={{ flex: 1, height: 0.5, backgroundColor: 'rgba(212,162,76,0.35)' }} />
                  <Text style={{ color: '#D4A24C', fontSize: 10, marginHorizontal: 10 }}>✦</Text>
                  <View style={{ flex: 1, height: 0.5, backgroundColor: 'rgba(212,162,76,0.35)' }} />
                </View>

                {/* First + Last name */}
                <View style={{ flexDirection: 'row', gap: 10, marginBottom: 12 }}>
                  <View
                    style={{
                      flex: 1, height: 56, flexDirection: 'row', alignItems: 'center',
                      backgroundColor: '#171717', borderRadius: 16,
                      borderWidth: 1, borderColor: border('first'), paddingHorizontal: 14,
                    }}
                  >
                    <Feather name="user" size={16} color={icon('first')} style={{ marginRight: 10 }} />
                    <TextInput
                      placeholder="First Name"
                      placeholderTextColor="#4A4A4A"
                      onFocus={() => setFocused('first')}
                      onBlur={() => setFocused(null)}
                      style={{ flex: 1, color: '#FFFFFF', fontSize: 14 }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1, height: 56, flexDirection: 'row', alignItems: 'center',
                      backgroundColor: '#171717', borderRadius: 16,
                      borderWidth: 1, borderColor: border('last'), paddingHorizontal: 14,
                    }}
                  >
                    <Feather name="user" size={16} color={icon('last')} style={{ marginRight: 10 }} />
                    <TextInput
                      placeholder="Last Name"
                      placeholderTextColor="#4A4A4A"
                      onFocus={() => setFocused('last')}
                      onBlur={() => setFocused(null)}
                      style={{ flex: 1, color: '#FFFFFF', fontSize: 14 }}
                    />
                  </View>
                </View>

                {/* Email */}
                <View
                  style={{
                    height: 56, flexDirection: 'row', alignItems: 'center',
                    backgroundColor: '#171717', borderRadius: 16,
                    borderWidth: 1, borderColor: border('email'),
                    paddingHorizontal: 16, marginBottom: 12,
                  }}
                >
                  <Feather name="mail" size={18} color={icon('email')} style={{ marginRight: 14 }} />
                  <TextInput
                    placeholder="Email Address"
                    placeholderTextColor="#4A4A4A"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    style={{ flex: 1, color: '#FFFFFF', fontSize: 15 }}
                  />
                </View>

                {/* Password */}
                <View
                  style={{
                    height: 56, flexDirection: 'row', alignItems: 'center',
                    backgroundColor: '#171717', borderRadius: 16,
                    borderWidth: 1, borderColor: border('password'),
                    paddingHorizontal: 16, marginBottom: 12,
                  }}
                >
                  <Feather name="lock" size={18} color={icon('password')} style={{ marginRight: 14 }} />
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="#4A4A4A"
                    secureTextEntry={!showPassword}
                    onFocus={() => setFocused('password')}
                    onBlur={() => setFocused(null)}
                    style={{ flex: 1, color: '#FFFFFF', fontSize: 15 }}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(v => !v)}>
                    <Feather name={showPassword ? 'eye' : 'eye-off'} size={18} color="#4A4A4A" />
                  </TouchableOpacity>
                </View>

                {/* Confirm password */}
                <View
                  style={{
                    height: 56, flexDirection: 'row', alignItems: 'center',
                    backgroundColor: '#171717', borderRadius: 16,
                    borderWidth: 1, borderColor: border('confirm'),
                    paddingHorizontal: 16, marginBottom: 18,
                  }}
                >
                  <Feather name="lock" size={18} color={icon('confirm')} style={{ marginRight: 14 }} />
                  <TextInput
                    placeholder="Confirm Password"
                    placeholderTextColor="#4A4A4A"
                    secureTextEntry={!showConfirm}
                    onFocus={() => setFocused('confirm')}
                    onBlur={() => setFocused(null)}
                    style={{ flex: 1, color: '#FFFFFF', fontSize: 15 }}
                  />
                  <TouchableOpacity onPress={() => setShowConfirm(v => !v)}>
                    <Feather name={showConfirm ? 'eye' : 'eye-off'} size={18} color="#4A4A4A" />
                  </TouchableOpacity>
                </View>

                {/* Terms */}
                <TouchableOpacity
                  onPress={() => setAgreed(!agreed)}
                  activeOpacity={0.8}
                  style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 20 }}
                >
                  <View
                    style={{
                      width: 22, height: 22, borderRadius: 6,
                      borderWidth: 1.5,
                      borderColor: agreed ? '#D4A24C' : 'rgba(212,162,76,0.4)',
                      backgroundColor: agreed ? 'rgba(212,162,76,0.1)' : 'transparent',
                      alignItems: 'center', justifyContent: 'center',
                      marginTop: 1,
                    }}
                  >
                    {agreed && <Feather name="check" size={13} color="#D4A24C" />}
                  </View>
                  <Text style={{ flex: 1, color: '#737373', fontSize: 13, lineHeight: 20 }}>
                    {'I agree to the '}
                    <Text style={{ color: '#D4A24C' }}>Terms of Service</Text>
                    {' and '}
                    <Text style={{ color: '#D4A24C' }}>Privacy Policy</Text>
                  </Text>
                </TouchableOpacity>

                {/* Sign Up button */}
                <TouchableOpacity
                  style={{
                    height: 58, backgroundColor: '#D4A24C', borderRadius: 16,
                    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 22,
                    marginBottom: 18,
                    shadowColor: '#D4A24C', shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.35, shadowRadius: 14, elevation: 10,
                  }}
                  activeOpacity={0.85}
                  onPress={() => router.replace('/(tabs)')}
                >
                  <Text style={{ flex: 1, color: '#080808', fontWeight: '700', fontSize: 16 }}>Sign Up</Text>
                  <Feather name="arrow-right" size={20} color="#080808" />
                </TouchableOpacity>

                {/* or sign up with */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
                  <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(212,162,76,0.28)' }} />
                  <Text style={{ color: '#737373', fontSize: 12, marginHorizontal: 14 }}>or sign up with</Text>
                  <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(212,162,76,0.28)' }} />
                </View>

                {/* Social — side by side */}
                <View style={{ flexDirection: 'row', gap: 12, marginBottom: 20 }}>
                  <TouchableOpacity
                    style={{
                      flex: 1, height: 52, backgroundColor: '#171717', borderRadius: 14,
                      borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
                      flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
                    }}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="logo-google" size={18} color="#DB4437" />
                    <Text style={{ color: '#A3A3A3', fontSize: 12, fontWeight: '500' }}>Continue with Google</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flex: 1, height: 52, backgroundColor: '#171717', borderRadius: 14,
                      borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
                      flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
                    }}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="logo-apple" size={18} color="#FFFFFF" />
                    <Text style={{ color: '#A3A3A3', fontSize: 12, fontWeight: '500' }}>Continue with Apple</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => router.back()}>
                  <Text style={{ color: '#737373', fontSize: 14 }}>
                    {'Already have an account? '}
                    <Text style={{ color: '#D4A24C', fontWeight: '600' }}>Log In</Text>
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Badge — rendered AFTER card, draws on top */}
              <View style={{ position: 'absolute', top: -36, left: 0, right: 0, alignItems: 'center' }}>
                <View
                  style={{
                    width: 72, height: 72, borderRadius: 36,
                    backgroundColor: '#111111',
                    borderWidth: 2, borderColor: '#D4A24C',
                    alignItems: 'center', justifyContent: 'center',
                    shadowColor: '#D4A24C', shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.35, shadowRadius: 12, elevation: 12,
                  }}
                >
                  <Feather name="coffee" size={30} color="#D4A24C" />
                </View>
              </View>

            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
