import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

export default function GreetingSection() {
  const navigation = useNavigation();
  const profile = useSelector(state => state.profile) || { name: 'Guest', avatar: '' };

  // Debugging logs
  console.log('Profile:', profile);
  console.log('Navigation:', navigation);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good Morning';
    if (hour >= 12 && hour < 17) return 'Good Noon';
    if (hour >= 17 && hour < 20) return 'Good Evening';
    return 'Good Night';
  };

  console.log('Greeting:', getGreeting()); // Debugging greeting

  const handleEditProfile = () => {
    navigation.navigate('HexaEditProfile', { title: 'Edit Profile' });
  };

  const handleOpenSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <>
      <View style={styles.header}>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={handleOpenSettings}>
            <FontAwesomeIcon icon={faCog} size={22} color="#555" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleEditProfile}>
            <Image
              source={{ uri: profile.avatar || 'https://via.placeholder.com/48' }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>
          {getGreeting()},
        </Text>
        <Text style={styles.nameText}>
          {typeof profile.name === 'string' ? profile.name : 'Guest'}
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    margin: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#ccc',
    marginLeft: 12,
  },
  greetingContainer: {
    marginHorizontal: 16,
    marginTop: 0,
    marginBottom: 32,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  nameText: {
    fontSize: 20,
    color: '#ff8625',
  },
});
