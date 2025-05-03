import {View, Text, TouchableOpacity} from 'react-native';
import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/native';
import React from 'react';

export function GreetingSection() {
  const navigation = useNavigation();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good Morning';
    if (hour >= 12 && hour < 17) return 'Good Noon';
    if (hour >= 17 && hour < 20) return 'Good Evening';
    return 'Good Night';
  };

  const handleEditProfile = () => {
    navigation.navigate('HexaEditProfile', {title: 'Edit Profile'});
  };

  return (
    <>
      <View className="m-3 flex-row justify-between items-center">
        <Video
          source={require('../assets/videos/welcome.mp4')}
          className="w-1/3 h-24"
          resizeMode="contain"
          repeat
          muted
        />

        <TouchableOpacity onPress={handleEditProfile}>
          {/* Using a placeholder view instead of the missing image */}
          <View 
            className="w-12 h-12 rounded-full border-2 border-gray-300 bg-gray-400 flex items-center justify-center"
          >
            <Text className="text-white font-bold">User</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className="m-4 mt-0 mb-8">
        <Text className="text-3xl font-extrabold text-gray-800 font-mono">
          {getGreeting()},
        </Text>
        <Text className="text-2xl text-[#ff8625]">Evan</Text>
      </View>
    </>
  );
}