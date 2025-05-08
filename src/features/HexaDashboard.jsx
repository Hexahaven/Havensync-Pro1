import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import TopSection from '../components/TopSection';
import DeviceGrid from '../components/DeviceGrid';
import RecentActivity from '../components/RecentActivity';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faBell, faPlus, faPlug } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

export default function HexaDashboard() {
  const profile = useSelector(state => state.profile);
  const darkMode = useSelector(state => state.profile.darkMode);
  const navigation = useNavigation();

  return (
    <SafeAreaProvider>
      <LinearGradient
        colors={darkMode ? ['#333', '#121212'] : ['#bedcea', '#ffffff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}>
        <SafeAreaView style={[styles.container, darkMode && styles.darkBackground]}>
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            {/* Top Section */}
            <View style={styles.topRow}>
              <Image
                source={{ uri: profile.avatar }}
                style={styles.avatar}
              />
              <View style={styles.greetingBlock}>
                <Text style={styles.greetingText}>Good Morning,</Text>
                <Text style={styles.usernameText}>{profile.name || 'Guest'}</Text>
              </View>
            </View>

            {/* Weather and Greeting */}
            <TopSection username={profile.name || 'Guest'} />

            {/* Devices */}
            <DeviceGrid />

            {/* Recent Activity */}
            <RecentActivity />
          </ScrollView>

          {/* Bottom Nav Bar */}
          <View style={styles.bottomNav}>
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
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  darkBackground: {
    backgroundColor: 'transparent',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#d1d1d1',
  },
  greetingBlock: {
    flexDirection: 'column',
  },
  greetingText: {
    fontSize: 16,
    color: '#888',
  },
  usernameText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70, // Fixed typo "aspetti" from earlier conflict
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  }, // The error occurs here
});