import React, { useState, useCallback } from 'react';
import { ScrollView, View, Text, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import TopSection from '../components/TopSection';
import DeviceGrid from '../components/DeviceGrid';
import RecentActivity from '../components/RecentActivity';

export default function HexaDashboard() {
  const darkMode = useSelector(state => state.profile.darkMode);

  return (
    <LinearGradient
      colors={['#bedcea', '#ffffff']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-1">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 40 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
