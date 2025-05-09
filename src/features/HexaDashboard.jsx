import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faPlus, faBell, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
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
          <FontAwesomeIcon icon={faBars} size={22} color={darkMode ? '#fff' : '#000'} />
        </TouchableOpacity>
        <Text style={[styles.greeting, darkMode && styles.greetingDark]}>
          Hello, {userName}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('HexaEditProfile')}>
          <FontAwesomeIcon icon={faUser} size={22} color={darkMode ? '#fff' : '#000'} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <TopSection />
      </View>

      <View style={[styles.bottomNav, darkMode && styles.bottomNavDark]}>
        <TouchableOpacity>
          <FontAwesomeIcon icon={faHome} size={22} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('HexaDeviceRadar')}
        >
          <FontAwesomeIcon icon={faPlus} size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesomeIcon icon={faBell} size={22} color="#555" />
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
});
