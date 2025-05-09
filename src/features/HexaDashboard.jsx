import React from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useSelector } from 'react-redux';
import TopSection from '../components/TopSection';
import DeviceGrid from '../components/DeviceGrid';
import RecentActivity from '../components/RecentActivity';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faPlug, faBell, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

export default function HexaDashboard() {
  const darkMode = useSelector(state => state.profile.darkMode);
  const userName = useSelector(state => state.profile.name) || 'User';
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.dark]}>
      {/* Header with Greeting and Profile Icon */}
      <View style={styles.headerRow}>
        <Text style={[styles.greetingText, darkMode && styles.greetingDark]}>
          Hello, {userName}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <FontAwesomeIcon icon={faUser} size={24} color={darkMode ? '#fff' : '#000'} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Remove greeting from TopSection if duplicated */}
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  greetingDark: {
    color: '#fff',
  },
  scroll: {
    padding: 16,
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
