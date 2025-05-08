import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

export default function HexaDashboard() {
  const navigation = useNavigation();
  const user = useSelector(state => state.profile);

  return (
    <View style={styles.container}>
      {/* Top Greeting and Profile */}
      <View style={styles.topRow}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View style={styles.greeting}>
          <Text style={styles.hello}>Hello, {user.name}</Text>
          <Text style={styles.devices}>12 devices on</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <FontAwesomeIcon icon={faBell} size={20} color="#555" />
        </TouchableOpacity>
      </View>

      {/* Weather */}
      <LinearGradient colors={['#72c6ef', '#004e92']} style={styles.weatherCard}>
        <Text style={styles.weatherTitle}>Little Rain</Text>
        <Text style={styles.weatherDesc}>Lowering temp below 18°C cut cost by 58%</Text>
        <Text style={styles.weatherTemp}>18°C</Text>
      </LinearGradient>

      {/* Room Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tabActive}>
          <Text style={styles.tabTextActive}>Living Room</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabInactive}>
          <Text style={styles.tabText}>Kitchen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabInactive}>
          <Text style={styles.tabText}>Bedroom</Text>
        </TouchableOpacity>
      </View>

      {/* Devices */}
      <ScrollView contentContainerStyle={styles.deviceGrid}>
        {/* Add Device Card */}
        <TouchableOpacity style={styles.addCard} onPress={() => navigation.navigate('DeviceRadar')}>
          <Icon name="add-circle" size={40} color="#007aff" />
          <Text style={styles.addText}>Add Device</Text>
        </TouchableOpacity>

        {/* Example Devices (static until backend or state added) */}
        <View style={[styles.deviceCard, { backgroundColor: '#fff' }]}>
          <Icon name="bulb" size={24} color="#333" />
          <Text style={styles.deviceName}>Smart Lamp</Text>
          <Text style={styles.deviceCount}>3 devices</Text>
          <Text style={styles.wifi}>Wi-Fi</Text>
        </View>

        <View style={[styles.deviceCard, { backgroundColor: '#f1f1f1' }]}>
          <Icon name="tv" size={24} color="#333" />
          <Text style={styles.deviceName}>Smart TV</Text>
          <Text style={styles.deviceCount}>2 devices</Text>
          <Text style={styles.wifi}>Wi-Fi</Text>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Icon name="home-outline" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="grid-outline" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('DeviceRadar')}>
          <Icon name="add-circle" size={48} color="#007aff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="notifications-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
