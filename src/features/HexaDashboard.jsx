import React, { useState, useCallback } from 'react';
import { ScrollView, View, Text, RefreshControl, StyleSheet, Image } from 'react-native';
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
      colors={['#c4d3d2', '#c4d3d2']} // Updated background color
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
<<<<<<< HEAD
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/images/logo.png')} // Path to the logo
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Header / Greeting */}
          <View style={styles.section}>
            <GreetingSection />
          </View>

          {/* Weather + Status */}
          <View style={styles.section}>
            <WeatherSection />
          </View>

          {/* Switches (Smart Controls) */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Smart Controls</Text>
            <SwitchSection />
          </View>
=======
>>>>>>> 3ab14b8dde56c58b8cede02da9748f3bce5fe0c8
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
<<<<<<< HEAD

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  logo: {
    width: 150, // Adjust the width of the logo
    height: 150, // Adjust the height of the logo
  },
  section: {
    marginHorizontal: 16,
    marginVertical: 12,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Premium card-like background
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6, // Shadow for Android
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
});
=======
>>>>>>> 3ab14b8dde56c58b8cede02da9748f3bce5fe0c8
