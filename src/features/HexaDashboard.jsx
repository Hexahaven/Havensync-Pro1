import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import TopSection from '../components/TopSection';

export default function HexaDashboard() {
  const userName = useSelector(state => state.profile.name) || 'User';
  const darkMode = useSelector(state => state.profile.darkMode);
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.dark]}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={openDrawer}>
          <Text style={[styles.icon, darkMode && styles.iconDark]}>☰</Text>
        </TouchableOpacity>
        <Text style={[styles.greeting, darkMode && styles.greetingDark]}>
          Hello, {userName}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('HexaEditProfile')}>
          {/* Replace FontAwesomeIcon with Image for profile */}
          <Image
            source={require('../assets/profile.gif')}
            style={[styles.profileIcon, darkMode && styles.profileIconDark]}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <TopSection />
      </View>

      <View style={[styles.bottomNav, darkMode && styles.bottomNavDark]}>
        <TouchableOpacity>
          <Text style={styles.icon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('HexaDeviceRadar')}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.icon}>🔔</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  dark: {
    backgroundColor: '#121212',
  },
  content: {
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  greetingDark: {
    color: '#fff',
  },
  profileIcon: {
    width: 30,
    height: 30,
    borderRadius: 15, // to make the image circular
  },
  profileIconDark: {
    borderColor: '#fff',
    borderWidth: 2, // Optional, to give it a border in dark mode
  },
  icon: {
    fontSize: 22,
    color: '#333',
  },
  iconDark: {
    color: '#fff',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  bottomNavDark: {
    backgroundColor: '#1a1a1a',
    borderTopColor: '#444',
  },
  addButton: {
    width: 52,
    height: 52,
    backgroundColor: '#84c9e8',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
  },
  addButtonText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
});
