import { Alert } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert('Hold up', 'Please enter both email and password.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert('Login Failed', error.message);
    } else {
      router.replace('/(tabs)');
    }
    setLoading(false);
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#080808' }}>
      <StatusBar style="light" />

      {/* Background */}
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop' }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        resizeMode="cover"
      />
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(4,4,4,0.65)' }} />

      <SafeAreaView style={{ flex: 1 }}>

        {/* Back button */}
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

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          {/* Branding */}
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 40 }}>
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
              <Text style={{ fontSize: 9, color: '#D4A24C', marginBottom: 2 }}>✦</Text>
              <Feather name="coffee" size={30} color="#D4A24C" />
            </View>

            <Text style={{ color: '#D4A24C', fontSize: 36, fontWeight: '200', letterSpacing: 12, marginBottom: 10, marginRight: -12 }}>
              CAFINITY
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', width: 160, marginBottom: 10 }}>
              <View style={{ flex: 1, height: 0.5, backgroundColor: 'rgba(212,162,76,0.5)' }} />
              <Text style={{ color: '#D4A24C', fontSize: 10, marginHorizontal: 8 }}>✦</Text>
              <View style={{ flex: 1, height: 0.5, backgroundColor: 'rgba(212,162,76,0.5)' }} />
            </View>

            <Text style={{ color: 'rgba(212,162,76,0.55)', fontSize: 9, fontWeight: '600', letterSpacing: 3, textTransform: 'uppercase' }}>
              Brew Better. Manage Smarter.
            </Text>
          </View>

          {/* Card zone */}
          <View style={{ paddingHorizontal: 24, paddingBottom: 28 }}>
            <View style={{ marginTop: 36 }}>

              {/* Card */}
              <View
                style={{
                  backgroundColor: 'rgba(14,14,14,0.97)',
                  borderRadius: 28,
                  borderWidth: 1, borderColor: 'rgba(212,162,76,0.12)',
                  paddingTop: 56, paddingHorizontal: 24, paddingBottom: 28,
                }}
              >
                <Text style={{
                  color: '#FFFFFF', fontSize: 28, fontWeight: '700',
                  textAlign: 'center', marginBottom: 6, letterSpacing: -0.3,
                }}>
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
                    borderWidth: 1,
                    borderColor: emailFocused ? 'rgba(212,162,76,0.55)' : 'rgba(212,162,76,0.14)',
                    paddingHorizontal: 18, marginBottom: 12,
                  }}
                >
                  <Feather name="mail" size={18} color={emailFocused ? '#D4A24C' : 'rgba(212,162,76,0.5)'} style={{ marginRight: 14 }} />
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
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
                    borderWidth: 1,
                    borderColor: passwordFocused ? 'rgba(212,162,76,0.55)' : 'rgba(212,162,76,0.14)',
                    paddingHorizontal: 18, marginBottom: 8,
                  }}
                >
                  <Feather name="lock" size={18} color={passwordFocused ? '#D4A24C' : 'rgba(212,162,76,0.5)'} style={{ marginRight: 14 }} />
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="#4A4A4A"
                    secureTextEntry={!showPassword}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    style={{ flex: 1, color: '#FFFFFF', fontSize: 15 }}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(v => !v)} style={{ paddingLeft: 8 }}>
                    <Feather name={showPassword ? 'eye' : 'eye-off'} size={18} color="#4A4A4A" />
                  </TouchableOpacity>
                </View>

                {/* Forgot password */}
                <TouchableOpacity style={{ alignSelf: 'flex-end', paddingVertical: 8, marginBottom: 20 }}>
                  <Text style={{ color: '#D4A24C', fontSize: 13, fontWeight: '500' }}>Forgot Password?</Text>
                </TouchableOpacity>

                {/* Log In */}
                <TouchableOpacity
                  style={{
                    height: 58, backgroundColor: '#D4A24C', borderRadius: 16,
                    alignItems: 'center', justifyContent: 'center', marginBottom: 22,
                    shadowColor: '#D4A24C', shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.4, shadowRadius: 16, elevation: 10,
                  }}
                  activeOpacity={0.85}
                  onPress={handleLogin}
                  disabled={loading}
                >
                  <Text style={{ color: '#1a0e00', fontWeight: '800', fontSize: 16 }}>Log In</Text>
                </TouchableOpacity>

                {/* OR divider */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                  <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.07)' }} />
                  <Text style={{ color: '#737373', fontSize: 12, marginHorizontal: 14 }}>or continue with</Text>
                  <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.07)' }} />
                </View>

                {/* Social buttons */}
                <View style={{ flexDirection: 'row', gap: 12, marginBottom: 22 }}>
                  <TouchableOpacity
                    style={{
                      flex: 1, height: 54, backgroundColor: '#171717', borderRadius: 14,
                      borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
                      flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
                    }}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="logo-google" size={18} color="#DB4437" />
                    <Text style={{ color: '#A3A3A3', fontSize: 13, fontWeight: '500' }}>Google</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flex: 1, height: 54, backgroundColor: '#171717', borderRadius: 14,
                      borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
                      flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
                    }}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="logo-apple" size={18} color="#FFFFFF" />
                    <Text style={{ color: '#A3A3A3', fontSize: 13, fontWeight: '500' }}>Apple</Text>
                  </TouchableOpacity>
                </View>

                {/* Sign up link */}
                <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => router.push('/(auth)/register')}>
                  <Text style={{ color: '#737373', fontSize: 14 }}>
                    {"Don't have an account? "}
                    <Text style={{ color: '#D4A24C', fontWeight: '600' }}>Sign Up</Text>
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Floating badge — on top of card */}
              <View style={{ position: 'absolute', top: -36, left: 0, right: 0, alignItems: 'center' }}>
                <View
                  style={{
                    width: 72, height: 72, borderRadius: 36,
                    backgroundColor: '#111111',
                    borderWidth: 2, borderColor: '#D4A24C',
                    alignItems: 'center', justifyContent: 'center',
                    shadowColor: '#D4A24C', shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.4, shadowRadius: 14, elevation: 14,
                  }}
                >
                  <Text style={{ fontSize: 9, color: '#D4A24C', marginBottom: 2 }}>✦</Text>
                  <Feather name="coffee" size={28} color="#D4A24C" />
                </View>
              </View>

            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}