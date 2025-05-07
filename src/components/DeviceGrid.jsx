import React from 'react';
import { View, Text, StyleSheet, FlatList, Switch } from 'react-native';
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
      <Switch value={item.isOn} disabled />
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
    paddingHorizontal: 16,
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
    marginTop: 40,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    width: '48%',
    alignItems: 'center',
  },
  cardDark: {
    backgroundColor: '#1e1e1e',
  },
  deviceName: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
});
