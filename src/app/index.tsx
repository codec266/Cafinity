import { router } from 'expo-router';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';

export default function WelcomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#0a0a0a]">
      <StatusBar style="light" />

        {/* top section */}
      <View className="items-center mt-16 z-10">
        <Feather name="coffee" size={48} color="#f59e0b" style={{ marginBottom: 16 }} />
        <Text className="text-amber-500 text-3xl font-light tracking-[0.25em] mb-2 ml-2">
          CAFINITY
        </Text>
        <Text className="text-amber-600/80 text-xs font-bold tracking-widest uppercase">
          Brew Better, Manage Smarter
        </Text>
      </View>

      {/* Middle Section: Hero Image */}
      <View className="flex-1 justify-center items-center w-full absolute top-0 bottom-0">
        {/* Note: Replace this URI with your local asset later: require('../../assets/your-coffee-image.png') */}
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1550461716-bf91600d81d6?q=80&w=800&auto=format&fit=crop' }}
          className="w-[120%] h-[60%] opacity-50"
          resizeMode="cover"
        />  
        {/* Gradient overlay to blend the image into the background seamlessly */}
        <View className="absolute inset-0 bg-black/40" />
      </View>

      {/* Bottom Section: Action Buttons */}
        <View className="px-6 pb-12 w-full mt-auto z-10">
          <TouchableOpacity 
            className="bg-[#A66C41] w-full py-4 rounded-xl items-center mb-4 active:bg-[#8A5832]"
            onPress={() => router.push('/(auth)/login')} // <-- Added
          >
            <Text className="text-white font-semibold text-lg tracking-wide">
              Log In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="border border-[#A66C41] bg-black/50 w-full py-4 rounded-xl items-center mb-8 active:bg-neutral-900"
            onPress={() => router.push('/(auth)/register')} // <-- Added
          >
            <Text className="text-white font-semibold text-lg tracking-wide">
              Sign Up
            </Text>
          </TouchableOpacity>

        <TouchableOpacity 
            className="items-center active:opacity-70 pb-4"
            onPress={() => router.replace('/(tabs)')}
        >
            <Text className="text-neutral-400 font-medium">
                Continue as Guest
            </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}