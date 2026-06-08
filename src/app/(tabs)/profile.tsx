import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#080808' }} edges={['top']}>
      <StatusBar style="light" />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 80 }}>
        <View
          style={{
            width: 72, height: 72, borderRadius: 22,
            backgroundColor: 'rgba(212,162,76,0.08)',
            borderWidth: 1, borderColor: 'rgba(212,162,76,0.22)',
            alignItems: 'center', justifyContent: 'center',
            marginBottom: 16,
          }}
        >
          <Feather name="user" size={30} color="#D4A24C" />
        </View>
        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '600', marginBottom: 6 }}>Profile</Text>
        <Text style={{ color: '#4A4A4A', fontSize: 14 }}>Coming soon</Text>
      </View>
    </SafeAreaView>
  );
}
