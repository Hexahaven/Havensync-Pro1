import React from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import TopSection from '../components/TopSection';
import DeviceGrid from '../components/DeviceGrid';
import RecentActivity from '../components/RecentActivity';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faPlug, faBell, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

export default function HexaDashboard() {
  const darkMode = useSelector(state => state.profile.darkMode);
  const userName = useSelector(state => state.profile.name) || 'User';
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.dark]}>
      {/* Modern Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <Text style={[styles.menuIcon, darkMode && styles.menuIconDark]}>≡</Text>
        </TouchableOpacity>

        <View style={styles.greetingContainer}>
          <Text style={[styles.greetingText, darkMode && styles.greetingTextDark]}>
            Hi {userName}
          </Text>
          <Text style={[styles.subGreeting, darkMode && styles.subGreetingDark]}>
            Welcome to your smart home
          </Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <View style={styles.profileImageWrapper}>
            <Image
              source={require('../assets/profile.gif')} // Replace with URI or other logic as needed
              style={styles.profileImage}
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* Main Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scroll}>
        <TopSection />
        <DeviceGrid />
        <RecentActivity />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={[styles.bottomNav, darkMode && styles.bottomNavDark]}>
        <TouchableOpacity>
          <FontAwesomeIcon icon={faHome} size={20} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesomeIcon icon={faPlug} size={20} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('HexaDeviceRadar')}
        >
          <FontAwesomeIcon icon={faPlus} size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesomeIcon icon={faBell} size={20} color="#555" />
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

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  menuIcon: {
    fontSize: 30,
    color: '#333',
  },
  menuIconDark: {
    color: '#fff',
  },
  greetingContainer: {
    flex: 10,
    marginHorizontal: 20,
  },
  greetingText: {
    fontSize: 25,
    fontWeight: '700',
    color: '#111',
  },
  greetingTextDark: {
    color: '#fff',
  },
  subGreeting: {
    fontSize: 14,
    color: '#666',
  },
  subGreetingDark: {
    color: '#aaa',
  },
  profileImageWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  scroll: {
    padding: 40,
    paddingBottom: 100,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
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
});
