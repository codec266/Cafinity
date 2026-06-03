import { View, Text, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#0a0a0a]" edges={['top']}>
      <StatusBar style="light" />
      <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View className="mb-6">
          <Text className="text-neutral-400 text-sm font-medium mb-1">Good Morning,</Text>
          <View className="flex-row items-center">
            <Text className="text-white text-3xl font-semibold tracking-wide mr-2">
              Brew Inspiration
            </Text>
            <Feather name="coffee" size={24} color="#f59e0b" />
          </View>
          <Text className="text-neutral-500 text-sm mt-2">
            What would you like to order today?
          </Text>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-[#171717] rounded-full px-4 py-3 mb-8 border border-neutral-800">
          <Feather name="search" size={20} color="#737373" />
          <TextInput 
            placeholder="Search your drink..."
            placeholderTextColor="#737373"
            className="flex-1 text-white ml-3 text-base h-full"
          />
          <TouchableOpacity className="bg-[#262626] p-2 rounded-full">
            <Feather name="sliders" size={16} color="#d4d4d4" />
          </TouchableOpacity>
        </View>

        {/* Popular Picks Header */}
        <View className="flex-row justify-between items-end mb-4">
          <Text className="text-white text-lg font-medium">Popular Picks</Text>
          <TouchableOpacity>
            <Text className="text-amber-600/80 text-sm font-medium">See all</Text>
          </TouchableOpacity>
        </View>

        {/* Popular Item Card */}
        <View className="bg-[#171717] rounded-3xl p-4 flex-row items-center mb-8 border border-neutral-800">
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=200&auto=format&fit=crop' }}
            className="w-24 h-24 rounded-2xl bg-neutral-800"
          />
          <View className="ml-4 flex-1">
            <View className="flex-row justify-between items-start">
              <Text className="text-white text-lg font-medium w-3/4">Caramel Macchiato</Text>
              <View className="flex-row items-center">
                <Feather name="star" size={12} color="#f59e0b" />
                <Text className="text-neutral-300 text-xs ml-1">4.8</Text>
              </View>
            </View>
            <View className="flex-row items-center mt-1 mb-3">
              <Feather name="map-pin" size={10} color="#f59e0b" />
              <Text className="text-neutral-400 text-xs ml-1">0.6</Text>
            </View>
            <Text className="text-amber-500 font-semibold text-lg">₱165</Text>
          </View>
        </View>

        {/* Quick Actions Grid */}
        <View className="flex-row justify-between mb-8">
          <ActionIcon icon="shopping-bag" label="Order Now" />
          <ActionIcon icon="clipboard" label="My Orders" />
          <ActionIcon icon="award" label="Rewards" />
          <ActionIcon icon="map" label="Stores" />
        </View>

        {/* Today's Special Card */}
        <View className="bg-[#1c140d] rounded-3xl p-5 mb-8 border border-[#382618] overflow-hidden relative">
          <Text className="text-white text-base font-medium mb-1 z-10">Today's Special</Text>
          <Text className="text-white text-2xl font-semibold mb-4 w-1/2 z-10">Hazelnut Latte</Text>
          
          <View className="bg-amber-900/40 px-3 py-1 rounded-md self-start z-10 border border-amber-800/50">
            <Text className="text-amber-500 text-xs font-bold">20% OFF</Text>
          </View>

          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1550461716-bf91600d81d6?q=80&w=400&auto=format&fit=crop' }}
            className="absolute right-[-20px] bottom-[-20px] w-48 h-48 opacity-80"
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// Reusable component for the 4 action buttons
function ActionIcon({ icon, label }: { icon: any, label: string }) {
  return (
    <View className="items-center">
      <TouchableOpacity className="w-14 h-14 bg-[#171717] rounded-2xl items-center justify-center border border-neutral-800 mb-2 active:bg-neutral-800">
        <Feather name={icon} size={22} color="#f59e0b" />
      </TouchableOpacity>
      <Text className="text-neutral-400 text-xs">{label}</Text>
    </View>
  );
}