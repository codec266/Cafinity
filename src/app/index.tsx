import { router } from 'expo-router';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';

function OrnamentDivider() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
      <View style={{ flex: 1, height: 0.5, backgroundColor: 'rgba(212,162,76,0.4)' }} />
      <Text style={{ color: '#D4A24C', fontSize: 10, marginHorizontal: 10 }}>✦</Text>
      <View style={{ flex: 1, height: 0.5, backgroundColor: 'rgba(212,162,76,0.4)' }} />
    </View>
  );
}

export default function WelcomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#080808' }}>
      <StatusBar style="light" />

      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop' }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        resizeMode="cover"
      />

      {/* Top vignette */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '40%', backgroundColor: 'rgba(8,8,8,0.55)' }} />
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '12%', backgroundColor: 'rgba(8,8,8,0.75)' }} />

      {/* Bottom vignette */}
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '52%', backgroundColor: 'rgba(8,8,8,0.82)' }} />
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', backgroundColor: 'rgba(8,8,8,0.95)' }} />

      <SafeAreaView style={{ flex: 1 }}>

        {/* Branding block */}
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 8 }}>

          {/* Logo icon */}
          <View
            style={{
              width: 80, height: 80, borderRadius: 40,
              backgroundColor: 'rgba(212,162,76,0.08)',
              borderWidth: 1.5, borderColor: 'rgba(212,162,76,0.4)',
              alignItems: 'center', justifyContent: 'center',
              marginBottom: 20,
              shadowColor: '#D4A24C',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.4,
              shadowRadius: 20,
              elevation: 10,
            }}
          >
            <Text style={{ fontSize: 10, color: '#D4A24C', marginBottom: 2 }}>✦</Text>
            <Feather name="coffee" size={32} color="#D4A24C" />
          </View>

          {/* Wordmark */}
          <Text
            style={{
              color: '#D4A24C',
              fontSize: 44,
              fontWeight: '300',
              letterSpacing: 16,
              marginBottom: 16,
              marginRight: -16,
            }}
          >
            CAFINITY
          </Text>

          {/* Decorative divider */}
          <View style={{ flexDirection: 'row', alignItems: 'center', width: 200, marginBottom: 14 }}>
            <View style={{ flex: 1, height: 0.5, backgroundColor: 'rgba(212,162,76,0.5)' }} />
            <View style={{
              width: 4, height: 4, borderRadius: 2,
              backgroundColor: '#D4A24C',
              marginHorizontal: 8,
            }} />
            <View style={{ flex: 1, height: 0.5, backgroundColor: 'rgba(212,162,76,0.5)' }} />
          </View>

          {/* Tagline */}
          <Text
            style={{
              color: 'rgba(212,162,76,0.65)',
              fontSize: 10,
              fontWeight: '600',
              letterSpacing: 3.5,
              textTransform: 'uppercase',
            }}
          >
            Brew Better. Manage Smarter.
          </Text>
        </View>

        {/* Bottom sheet */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 36 }}>
          <View
            style={{
              backgroundColor: 'rgba(8,8,8,0.96)',
              borderRadius: 32,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.07)',
              paddingHorizontal: 24,
              paddingTop: 12,
              paddingBottom: 32,
            }}
          >
            {/* Drag handle */}
            <View style={{ alignItems: 'center', marginBottom: 24 }}>
              <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.18)' }} />
            </View>

            {/* Title */}
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 28,
                fontWeight: '700',
                textAlign: 'center',
                marginBottom: 12,
                letterSpacing: -0.3,
              }}
            >
              Welcome to Cafinity
            </Text>

            <View style={{ marginBottom: 16 }}>
              <OrnamentDivider />
            </View>

            {/* Subtitle */}
            <Text
              style={{
                color: '#737373',
                fontSize: 14,
                textAlign: 'center',
                lineHeight: 21,
                marginBottom: 28,
              }}
            >
              Your all-in-one platform to manage{'\n'}your café and elevate every experience.
            </Text>

            {/* Log In */}
            <TouchableOpacity
              style={{
                height: 58,
                backgroundColor: '#D4A24C',
                borderRadius: 18,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 22,
                marginBottom: 12,
                shadowColor: '#D4A24C',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.4,
                shadowRadius: 16,
                elevation: 12,
              }}
              activeOpacity={0.85}
              onPress={() => router.push('/(auth)/login')}
            >
              <Feather name="coffee" size={20} color="#1a0e00" />
              <Text style={{ flex: 1, textAlign: 'center', color: '#1a0e00', fontWeight: '800', fontSize: 16 }}>
                Log In
              </Text>
              <Feather name="arrow-right" size={20} color="#1a0e00" />
            </TouchableOpacity>

            {/* Sign Up */}
            <TouchableOpacity
              style={{
                height: 58,
                borderRadius: 18,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 22,
                marginBottom: 24,
                borderWidth: 1.5,
                borderColor: 'rgba(212,162,76,0.5)',
              }}
              activeOpacity={0.85}
              onPress={() => router.push('/(auth)/register')}
            >
              <Feather name="user-plus" size={20} color="#D4A24C" />
              <Text style={{ flex: 1, textAlign: 'center', color: '#D4A24C', fontWeight: '700', fontSize: 16 }}>
                Sign Up
              </Text>
              <Feather name="arrow-right" size={20} color="#D4A24C" />
            </TouchableOpacity>

            {/* or divider */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
              <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.06)' }} />
              <Text style={{ color: '#4A4A4A', fontSize: 12, marginHorizontal: 16 }}>or</Text>
              <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.06)' }} />
            </View>

            {/* Continue as Guest */}
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              activeOpacity={0.6}
              onPress={() => router.replace('/(tabs)')}
            >
              <Feather name="user" size={16} color="#525252" />
              <Text style={{ color: '#525252', fontSize: 14, fontWeight: '500' }}>Continue as Guest</Text>
              <Feather name="chevron-right" size={15} color="#525252" />
            </TouchableOpacity>
          </View>
        </View>

      </SafeAreaView>
    </View>
  );
}