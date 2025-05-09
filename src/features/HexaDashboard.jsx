import React from 'react';
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

  const openDrawer = () => {
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

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        <TopSection />

        {/* Device Section (small tiles) */}
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
                    activeOpacity={0.8}
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

      {/* Bottom Navigation */}
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 6,
    color: '#333',
  },
  textWhite: {
    color: '#fff',
  },
  deviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    width: '47%',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    alignItems: 'center',
  },
  cardActive: {
    backgroundColor: '#84c9e8',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    color: '#333',
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
