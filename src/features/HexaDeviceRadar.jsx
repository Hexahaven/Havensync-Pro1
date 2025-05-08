import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faWifi, faPlug } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addDevice } from '../redux/slices/switchSlice'; // ✅ Ensure path is correct

const { width } = Dimensions.get('window');
const RADIUS = width * 0.6;

const mockDevices = [
  { id: '1', name: 'Living Room Switch' },
  { id: '2', name: 'Bedroom Fan' },
  { id: '3', name: 'Balcony Light' },
];

export default function HexaDeviceRadar() {
  const [foundDevices, setFoundDevices] = useState([]);
  const [scanning, setScanning] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const pulseAnim = new Animated.Value(0);

  useEffect(() => {
    animatePulse();
    const timer = setTimeout(() => {
      setFoundDevices(mockDevices);
      setScanning(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const animatePulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          easing: Easing.out(Easing.circle),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1200,
          easing: Easing.in(Easing.circle),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const pulseStyle = {
    transform: [
      {
        scale: pulseAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 2],
        }),
      },
    ],
    opacity: pulseAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 0],
    }),
  };

  const handleConnect = (device) => {
    dispatch(
      addDevice({
        name: device.name,
        icon: 'fan', // Change this based on device type if needed
        isOn: false,
        isConnected: true,
        switches: [false, false, false], // for 3-channel switch
      })
    );
    navigation.navigate('HexaDashboard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scanning for Devices...</Text>
      <View style={styles.radarContainer}>
        <Animated.View style={[styles.radarPulse, pulseStyle]} />
        <View style={styles.radarCore}>
          <FontAwesomeIcon icon={faWifi} size={40} color="white" />
        </View>
      </View>

      {!scanning && (
        <FlatList
          data={foundDevices}
          keyExtractor={(item) => item.id}
          style={{ marginTop: 30, width: '100%' }}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.deviceItem}
              onPress={() => handleConnect(item)}
            >
              <FontAwesomeIcon icon={faPlug} size={20} color="#333" />
              <Text style={styles.deviceName}>{item.name}</Text>
              <Text style={styles.connectText}>Tap to connect</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#84c9e8',
    alignItems: 'center',
    paddingTop: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  radarContainer: {
    width: RADIUS,
    height: RADIUS,
    borderRadius: RADIUS / 2,
    backgroundColor: '#74bcd9',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  radarPulse: {
    position: 'absolute',
    width: RADIUS,
    height: RADIUS,
    borderRadius: RADIUS / 2,
    backgroundColor: '#a3ddf5',
  },
  radarCore: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#5fa9ce',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  deviceItem: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
    color: '#333',
  },
  connectText: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
});
