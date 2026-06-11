import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { supabase } from '../../lib/supabase';

// Simplified flat settings list
const SETTINGS_OPTIONS = [
  { icon: 'user', label: 'Edit Profile' },
  { icon: 'map-pin', label: 'Delivery Addresses' },
  { icon: 'credit-card', label: 'Payment Methods' },
  { icon: 'bell', label: 'Notifications' },
  { icon: 'shield', label: 'Privacy & Security' },
] as const;

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  async function fetchUserProfile() {
    setLoading(true);
    // 1. Get the currently logged-in user's secure Auth ID
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      // 2. Fetch their matching public profile data
      const { data } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
        
      setProfile(data);
    }
    setLoading(false);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.replace('/(auth)/login');
  }

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#080808', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#D4A24C" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#080808' }} edges={['top']}>
      <StatusBar style="light" />
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ 
          // 72 (tab bar height) + 16 (bottom margin) + insets.bottom
          paddingBottom: 72 + 16 + insets.bottom + 20 
        }}
      >

        {/* ── Header ── */}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingTop: 20, paddingBottom: 32 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#FFFFFF', fontSize: 32, fontWeight: '700', letterSpacing: -0.5, marginBottom: 4 }}>
              {profile?.first_name} {profile?.last_name}
            </Text>
            <Text style={{ color: '#737373', fontSize: 14 }}>
              {profile?.email}
            </Text>
          </View>
          <View
            style={{
              width: 54, height: 54, borderRadius: 27,
              backgroundColor: 'rgba(212,162,76,0.1)',
              borderWidth: 2, borderColor: '#D4A24C',
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Feather name="user" size={24} color="#D4A24C" />
          </View>
        </View>

        {/* ── Membership Card (Simplified) ── */}
        <View
          style={{
            marginHorizontal: 24, marginBottom: 24,
            padding: 20, borderRadius: 16,
            backgroundColor: '#111111',
            borderWidth: 2, borderColor: 'rgba(212,162,76,0.4)',
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
            <View>
              <Text style={{ color: '#D4A24C', fontSize: 10, fontWeight: '700', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>
                Status
              </Text>
              <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: '800' }}>
                {profile?.role || 'Customer'}
              </Text>
            </View>
            <Feather name="award" size={28} color="#D4A24C" />
          </View>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <View>
              <Text style={{ color: '#737373', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>
                Member Since
              </Text>
              <Text style={{ color: '#FFFFFF', fontSize: 13, fontFamily: 'monospace' }}>
                {new Date(profile?.created_at).getFullYear()}
              </Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ color: '#737373', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>
                Account ID
              </Text>
              {/* Slices the UUID so it isn't massive on the screen */}
              <Text style={{ color: '#FFFFFF', fontSize: 13, fontFamily: 'monospace' }}>
                {profile?.id?.slice(0, 8).toUpperCase()}
              </Text>
            </View>
          </View>
        </View>

        {/* ── Quick Stats ── */}
        <View style={{ paddingHorizontal: 24, flexDirection: 'row', gap: 12, marginBottom: 32 }}>
          <View style={{ flex: 1, backgroundColor: '#111111', padding: 16, borderRadius: 12, borderWidth: 2, borderColor: '#1E1208', alignItems: 'center' }}>
            <Feather name="shopping-bag" size={20} color="#D4A24C" style={{ marginBottom: 8 }} />
            <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '700' }}>0</Text>
            <Text style={{ color: '#737373', fontSize: 11, marginTop: 2 }}>Orders</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: '#111111', padding: 16, borderRadius: 12, borderWidth: 2, borderColor: '#1E1208', alignItems: 'center' }}>
            <Feather name="star" size={20} color="#D4A24C" style={{ marginBottom: 8 }} />
            <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '700' }}>0</Text>
            <Text style={{ color: '#737373', fontSize: 11, marginTop: 2 }}>Points</Text>
          </View>
        </View>

        {/* ── Settings List ── */}
        <View style={{ marginHorizontal: 24, marginBottom: 32 }}>
          <Text style={{ color: '#737373', fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12, marginLeft: 4 }}>
            Preferences
          </Text>
          <View style={{ backgroundColor: '#111111', borderRadius: 16, borderWidth: 2, borderColor: '#1E1208' }}>
            
            {/* Dark Mode Toggle */}
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#1E1208' }}>
              <Feather name="moon" size={18} color="#D4A24C" />
              <Text style={{ flex: 1, color: '#FFFFFF', fontSize: 14, marginLeft: 12 }}>Dark Mode</Text>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#2A2A2A', true: 'rgba(212,162,76,0.55)' }}
                thumbColor={darkMode ? '#D4A24C' : '#888888'}
                style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
              />
            </View>

            {/* Mapped Options */}
            {SETTINGS_OPTIONS.map((item, index) => (
              <TouchableOpacity
                key={item.label}
                style={{
                  flexDirection: 'row', alignItems: 'center',
                  paddingVertical: 16, paddingHorizontal: 16,
                  borderBottomWidth: index === SETTINGS_OPTIONS.length - 1 ? 0 : 1,
                  borderBottomColor: '#1E1208',
                }}
                activeOpacity={0.7}
              >
                <Feather name={item.icon as any} size={18} color="#D4A24C" />
                <Text style={{ flex: 1, color: '#FFFFFF', fontSize: 14, marginLeft: 12 }}>
                  {item.label}
                </Text>
                <Feather name="chevron-right" size={16} color="#4A4A4A" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── Sign Out ── */}
        <TouchableOpacity
          onPress={handleSignOut}
          style={{
            marginHorizontal: 24, height: 56, borderRadius: 12,
            borderWidth: 2, borderColor: '#331A1A',
            backgroundColor: '#1A0A0A',
            flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}
          activeOpacity={0.7}
        >
          <Feather name="log-out" size={16} color="#EF4444" />
          <Text style={{ color: '#EF4444', fontSize: 15, fontWeight: '700' }}>Sign Out</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}