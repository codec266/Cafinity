import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function LoginScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#0a0a0a]">
      <StatusBar style="light" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 px-6 pt-4"
      >
        {/* Back Button */}
        <TouchableOpacity 
          onPress={() => router.back()}
          className="w-10 h-10 bg-[#171717] rounded-full items-center justify-center border border-neutral-800 mb-8"
        >
          <Feather name="chevron-left" size={24} color="#f59e0b" />
        </TouchableOpacity>

        <View className="mb-10">
          <Text className="text-white text-3xl font-semibold mb-2">Welcome Back</Text>
          <Text className="text-neutral-500 text-base">Sign in to manage your daily brews.</Text>
        </View>

        {/* Form Fields */}
        <View className="space-y-4 mb-8">
          <View className="bg-[#171717] rounded-xl px-4 py-4 border border-neutral-800 flex-row items-center mb-4">
            <Feather name="mail" size={20} color="#737373" />
            <TextInput 
              placeholder="Email"
              placeholderTextColor="#737373"
              keyboardType="email-address"
              autoCapitalize="none"
              className="flex-1 text-white ml-3 text-base"
            />
          </View>

          <View className="bg-[#171717] rounded-xl px-4 py-4 border border-neutral-800 flex-row items-center mb-2">
            <Feather name="lock" size={20} color="#737373" />
            <TextInput 
              placeholder="Password"
              placeholderTextColor="#737373"
              secureTextEntry
              className="flex-1 text-white ml-3 text-base"
            />
            <TouchableOpacity>
              <Feather name="eye-off" size={20} color="#737373" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity className="self-end">
            <Text className="text-amber-500 font-medium">Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity 
          className="bg-[#A66C41] w-full py-4 rounded-xl items-center active:bg-[#8A5832] mt-auto mb-8"
          onPress={() => router.replace('/(tabs)')} // Mocks a successful login
        >
          <Text className="text-white font-semibold text-lg tracking-wide">
            Log In
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}