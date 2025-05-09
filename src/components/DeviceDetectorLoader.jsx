import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';


export default function DeviceRadar() {
  const rotate = useSharedValue(0);
  




  // Rotate animation for the radar
  rotate.value = withRepeat(
    withTiming(360, { duration: 3000, easing: Easing.linear }),
    -1,
    false
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Device</Text>
      <Text style={styles.subtitle}>Searching Device...</Text>

      {/* Radar Container */}
      <View style={styles.radarContainer}>
        <Animated.View style={[styles.radarCircle, animatedStyle]}>
          <Icon name="bluetooth" size={40} color="#ff8625" />
        </Animated.View>

        {/* Device Detector Loader */}
        <DeviceDetectorLoader />

        {/* Detected Devices */}
        <View style={[styles.device, { top: 50, left: 100 }]}>
          <Icon name="bulb" size={24} color="#fff" />
          <Text style={styles.deviceText}>Lamp 32-12k</Text>
        </View>
        <View style={[styles.device, { top: 150, right: 80 }]}>
          <Icon name="tv" size={24} color="#fff" />
          <Text style={styles.deviceText}>PS8</Text>
        </View>
        <View style={[styles.device, { bottom: 50, left: 120 }]}>
          <Icon name="desktop" size={24} color="#fff" />
          <Text style={styles.deviceText}>TV Samsung</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e2f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 20,
  },
  radarContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#2a2a3d',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  radarCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#84c3e0',
    position: 'absolute',
  },
  device: {
    position: 'absolute',
    alignItems: 'center',
  },
  deviceText: {
    color: '#fff',
    marginTop: 5,
  },
});
