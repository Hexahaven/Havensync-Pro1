import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Switch, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function DeviceGrid() {
  const devices = useSelector(state => state.switches.activeDevices);
  const darkMode = useSelector(state => state.profile.darkMode);

  const renderItem = ({ item }) => (
    <View style={[styles.card, darkMode && styles.cardDark]}>
      <MaterialCommunityIcons name={item.icon || 'power-socket'} size={32} color={darkMode ? '#fff' : '#333'} />
      <Text style={[styles.deviceName, darkMode && styles.textDark]} numberOfLines={1}>
        {item.name || 'Unnamed'}
      </Text>
      <Switch value={item.isOn} disabled /> {/* Replace this with dispatch for toggle if needed */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.title, darkMode && styles.textDark]}>My Devices</Text>
      {devices.length === 0 ? (
        <Text style={[styles.noDevices, darkMode && styles.textDark]}>No devices added yet.</Text>
      ) : (
        <FlatList
          data={devices}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  textDark: {
    color: '#ffffff',
  },
  noDevices: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
  grid: {
    gap: 12,
  },
  card: {
    flex: 1,
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 130,
  },
  cardDark: {
    backgroundColor: '#1f1f1f',
  },
  deviceName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: '#333',
  },
});
