import React, { useState, useCallback } from 'react';
import { ScrollView, View, Text, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import TopSection from '../components/TopSection';

<TopSection username="Alex" />


export default function HexaDashboard() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate fetching data or any async operation
    setTimeout(() => {
      setRefreshing(false);
      // Add any data reload logic here if needed
    }, 2000);
  }, []);

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
