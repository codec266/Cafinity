import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RegisterScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#0a0a0a]">
      <StatusBar style="light" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
          {/* Back Button */}
          <TouchableOpacity 
            onPress={() => router.back()}
            className="w-10 h-10 bg-[#171717] rounded-full items-center justify-center border border-neutral-800 mb-8 mt-2"
          >
            <Feather name="chevron-left" size={24} color="#f59e0b" />
          </TouchableOpacity>

          <View className="mb-10">
            <Text className="text-white text-3xl font-semibold mb-2">Create Account</Text>
            <Text className="text-neutral-500 text-base">Join Cafinity and brew better.</Text>
          </View>

          {/* Form Fields */}
          <View className="space-y-4 mb-10">
            <View className="flex-row justify-between mb-4">
              <View className="bg-[#171717] rounded-xl px-4 py-4 border border-neutral-800 flex-row items-center flex-1 mr-2">
                <Feather name="user" size={20} color="#737373" />
                <TextInput 
                  placeholder="First Name"
                  placeholderTextColor="#737373"
                  className="flex-1 text-white ml-3 text-base"
                />
              </View>
              <View className="bg-[#171717] rounded-xl px-4 py-4 border border-neutral-800 flex-row items-center flex-1 ml-2">
                <TextInput 
                  placeholder="Last Name"
                  placeholderTextColor="#737373"
                  className="flex-1 text-white text-base"
                />
              </View>
            </View>

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

            <View className="bg-[#171717] rounded-xl px-4 py-4 border border-neutral-800 flex-row items-center mb-4">
              <Feather name="lock" size={20} color="#737373" />
              <TextInput 
                placeholder="Password"
                placeholderTextColor="#737373"
                secureTextEntry
                className="flex-1 text-white ml-3 text-base"
              />
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity 
            className="bg-[#A66C41] w-full py-4 rounded-xl items-center active:bg-[#8A5832] mb-8"
            onPress={() => router.replace('/(tabs)')} // Mocks successful registration
          >
            <Text className="text-white font-semibold text-lg tracking-wide">
              Sign Up
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}