import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faPlus,
  faBell,
  faUser,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import TopSection from '../components/TopSection';
import { updateDevice } from '../redux/slices/switchSlice';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HexaDashboard() {
  const userName = useSelector(state => state.profile.name) || 'User';
  const darkMode = useSelector(state => state.profile.darkMode);
  const devices = useSelector(state => state.switches.activeDevices);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('home');

  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const togglePower = (device) => {
    dispatch(
      updateDevice({
        id: device.id,
        switches: device.switches.map((s, i) => (i === 0 ? !s : s)),
      })
    );
  };

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.dark]}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={toggleDrawer}>
          <FontAwesomeIcon icon={faBars} size={22} color={darkMode ? '#fff' : '#000'} />
        </TouchableOpacity>
        <Text style={[styles.greeting, darkMode && styles.greetingDark]}>
          Hello, {userName}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('HexaEditProfile')}>
          <FontAwesomeIcon icon={faUser} size={22} color={darkMode ? '#fff' : '#000'} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        <TopSection />

        {/* Connected Devices Section */}
        {devices.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, darkMode && styles.textWhite]}>
              Active Devices
            </Text>
            <View style={styles.deviceGrid}>
              {devices.map(device => {
                const isOn = device.switches[0];
                return (
                  <TouchableOpacity
                    key={device.id}
                    style={[styles.card, isOn && styles.cardActive]}
                    onPress={() => togglePower(device)}
                  >
                    <MaterialCommunityIcons
                      name={device.icon || 'power-socket'}
                      size={30}
                      color={isOn ? '#fff' : '#333'}
                    />
                    <Text style={[styles.name, isOn && styles.textWhite]}>
                      {device.name}
                    </Text>
                    <Switch
                      value={isOn}
                      disabled
                      trackColor={{ false: '#999', true: '#fff' }}
                      thumbColor={isOn ? '#4caf50' : '#ccc'}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}
      </ScrollView>

      {/* 3D Styled Bottom Nav */}
      <View style={[styles.bottomNavContainer]}>
        <View style={[styles.bottomNav, darkMode && styles.bottomNavDark]}>
          <TouchableOpacity onPress={() => setActiveTab('home')}>
            <FontAwesomeIcon
              icon={faHome}
              size={22}
              color={activeTab === 'home' ? '#4caf50' : darkMode ? '#aaa' : '#555'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('HexaDeviceRadar')}
          >
            <FontAwesomeIcon icon={faPlus} size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setActiveTab('notifications')}>
            <FontAwesomeIcon
              icon={faBell}
              size={22}
              color={activeTab === 'notifications' ? '#4caf50' : darkMode ? '#aaa' : '#555'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fb' },
  dark: { backgroundColor: '#121212' },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 30,
    alignItems: 'center',
  },
  greeting: { fontSize: 20, fontWeight: '600', color: '#333' },
  greetingDark: { color: '#fff' },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 10,
    color: '#333',
  },
  textWhite: { color: '#fff' },
  deviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    width: '48%',
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    elevation: 3,
    alignItems: 'center',
  },
  cardActive: {
    backgroundColor: '#84c9e8',
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 8,
    color: '#333',
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    height: 80,
  },
  bottomNav: {
    width: '90%',
    height: 65,
    backgroundColor: '#fff',
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 10,
    paddingHorizontal: 20,
  },
  bottomNavDark: {
    backgroundColor: '#1f1f1f',
  },
  addButton: {
    backgroundColor: '#4caf50',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    marginBottom: 40,
  },
});
