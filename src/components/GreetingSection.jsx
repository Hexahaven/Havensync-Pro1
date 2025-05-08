import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function GreetingSection() {
  const userName = 'Sarah Angelita'; // Replace with dynamic user data if available
  const avatarUri = 'https://via.placeholder.com/48'; // Replace with user's avatar URL

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* Avatar */}
        <Image source={{uri: avatarUri}} style={styles.avatar} />

        {/* Greeting Text */}
        <View style={styles.textContainer}>
          <Text style={styles.greetingText}>Good Morning</Text>
          <Text style={styles.nameText}>{userName}</Text>
        </View>

        {/* Notification Icon */}
        <TouchableOpacity style={styles.notificationButton}>
          <Icon name="notifications-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  greetingText: {
    fontSize: 14,
    color: '#888',
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationButton: {
    padding: 5,
  },
});
