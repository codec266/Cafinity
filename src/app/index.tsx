import { router } from 'expo-router';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';

function OrnamentDivider() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flex: 1, height: 0.5, backgroundColor: 'rgba(212,162,76,0.45)' }} />
      <Text style={{ color: '#D4A24C', fontSize: 11, marginHorizontal: 10 }}>✦</Text>
      <View style={{ flex: 1, height: 0.5, backgroundColor: 'rgba(212,162,76,0.45)' }} />
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
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '45%', backgroundColor: 'rgba(8,8,8,0.68)' }} />
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '18%', backgroundColor: 'rgba(8,8,8,0.85)' }} />
      {/* Bottom vignette */}
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%', backgroundColor: 'rgba(8,8,8,0.80)' }} />
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '32%', backgroundColor: 'rgba(8,8,8,0.96)' }} />

      <SafeAreaView style={{ flex: 1 }}>

        {/* Branding */}
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 16 }}>
          <View
            style={{
              width: 80, height: 80, borderRadius: 40,
              backgroundColor: 'rgba(212,162,76,0.08)',
              borderWidth: 1.5, borderColor: 'rgba(212,162,76,0.38)',
              alignItems: 'center', justifyContent: 'center',
              marginBottom: 18,
              shadowColor: '#D4A24C',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.38,
              shadowRadius: 20,
              elevation: 10,
            }}
          >
            <Feather name="coffee" size={36} color="#D4A24C" />
          </View>

          <Text style={{ color: '#D4A24C', fontSize: 46, fontWeight: '200', letterSpacing: 14, marginBottom: 14 }}>
            CAFINITY
          </Text>

          <OrnamentDivider />

          <Text style={{ color: 'rgba(212,162,76,0.6)', fontSize: 10, fontWeight: '600', letterSpacing: 3.5, textTransform: 'uppercase', marginTop: 14 }}>
            Brew Better. Manage Smarter.
          </Text>
        </View>

        {/* Bottom sheet */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 36 }}>
          <View
            style={{
              backgroundColor: 'rgba(10,10,10,0.97)',
              borderRadius: 32,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.07)',
              paddingHorizontal: 24,
              paddingTop: 14,
              paddingBottom: 28,
            }}
          >
            {/* Drag handle */}
            <View style={{ alignItems: 'center', marginBottom: 22 }}>
              <View style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.2)' }} />
            </View>

            <Text style={{ color: '#FFFFFF', fontSize: 26, fontWeight: '700', textAlign: 'center', marginBottom: 14 }}>
              Welcome to Cafinity
            </Text>

            <OrnamentDivider />

            <Text style={{ color: '#737373', fontSize: 13, textAlign: 'center', lineHeight: 20, marginTop: 14, marginBottom: 26 }}>
              Your all-in-one platform to manage{'\n'}your café and elevate every experience.
            </Text>

            {/* Log In */}
            <TouchableOpacity
              style={{
                height: 58, backgroundColor: '#D4A24C', borderRadius: 18,
                flexDirection: 'row', alignItems: 'center', paddingHorizontal: 22,
                marginBottom: 12,
                shadowColor: '#D4A24C', shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.35, shadowRadius: 14, elevation: 10,
              }}
              activeOpacity={0.85}
              onPress={() => router.push('/(auth)/login')}
            >
              <Feather name="coffee" size={20} color="#080808" />
              <Text style={{ flex: 1, textAlign: 'center', color: '#080808', fontWeight: '700', fontSize: 16 }}>Log In</Text>
              <Feather name="arrow-right" size={20} color="#080808" />
            </TouchableOpacity>

            {/* Sign Up */}
            <TouchableOpacity
              style={{
                height: 58, borderRadius: 18,
                flexDirection: 'row', alignItems: 'center', paddingHorizontal: 22,
                marginBottom: 22,
                borderWidth: 1.5, borderColor: 'rgba(212,162,76,0.55)',
              }}
              activeOpacity={0.85}
              onPress={() => router.push('/(auth)/register')}
            >
              <Feather name="user-plus" size={20} color="#D4A24C" />
              <Text style={{ flex: 1, textAlign: 'center', color: '#D4A24C', fontWeight: '600', fontSize: 16 }}>Sign Up</Text>
              <Feather name="arrow-right" size={20} color="#D4A24C" />
            </TouchableOpacity>

            {/* or divider */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 18 }}>
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
              <Text style={{ color: '#525252', fontSize: 14 }}>Continue as Guest</Text>
              <Feather name="chevron-right" size={15} color="#525252" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
