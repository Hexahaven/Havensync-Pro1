import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HexaDashboard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.weatherCard}>
        <View style={styles.weatherHeader}>
          <Ionicons name="partly-sunny-outline" size={28} color="#ffb300" />
          <Text style={styles.tempText}>26°C</Text>
        </View>
        <Text style={styles.weatherSub}>Humidity: 68%</Text>
        <Text style={styles.weatherSub}>Sunny, clear sky</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherCard: {
    backgroundColor: '#fff',
    borderRadius: 28,
    padding: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  weatherHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tempText: {
    fontSize: 28,
    fontWeight: '600',
    marginLeft: 10,
  },
  weatherSub: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
});

export default HexaDashboard;
