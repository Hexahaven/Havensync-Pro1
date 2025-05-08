// src/features/HexaDashboard.jsx

import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import TopSection from '../components/TopSection';
import DeviceGrid from '../components/DeviceGrid';
import RecentActivity from '../components/RecentActivity';

export default function HexaDashboard() {
  const darkMode = useSelector(state => state.profile.darkMode);

  return (
    <SafeAreaView style={[styles.safeArea, darkMode && styles.darkBackground]}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <TopSection username={useSelector(state => state.profile.name)} />
        <DeviceGrid />
        <RecentActivity />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  darkBackground: {
    backgroundColor: '#121212',
  },
  scrollContainer: {
    padding: 16,
  },
});
