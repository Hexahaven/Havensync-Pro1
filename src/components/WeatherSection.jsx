import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faThermometerHalf, faTint } from '@fortawesome/free-solid-svg-icons';
import { PermissionsAndroid } from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  containerCentered: {
    justifyContent: 'center',
  },
  containerSpaced: {
    justifyContent: 'space-between',
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#A1C2F1',
    borderRadius: 16,
    padding: 24,
    width: '100%',
  },
  loadingItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingCircle: {
    backgroundColor: '#6499E9',
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  loadingBar: {
    backgroundColor: '#6499E9',
    width: 80,
    height: 24,
    borderRadius: 6,
  },
  weatherItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherTextContainer: {
    marginLeft: 8,
  },
  labelText: {
    fontSize: 12,
    color: '#0F172A',
  },
  valueText: {
    fontSize: 18,
    color: '#1F2937',
    fontWeight: '600',
  },
  divider: {
    borderRightWidth: 2,
    borderColor: '#D1D5DB',
  },
  errorText: {
    fontSize: 18,
    color: '#1F2937',
    fontWeight: '600',
  },
});

export function WeatherSection() {
  const [location, setLocation] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location to provide weather updates.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setPermissionGranted(true);
        getCurrentLocation();
      } else {
        setPermissionGranted(false);
        setError('Location permission denied');
        setLoading(false);
      }
    } catch (err) {
      console.warn(err);
      setError('Error requesting location permission');
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        fetchWeatherData(latitude, longitude);
      },
      error => {
        console.error(error);
        setError('Error getting location');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  };

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const API_KEY = '60d3edac42903c48e11867d5b0e797f8';
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`,
      );
      setWeatherData(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching weather data');
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      requestLocationPermission();
    }, 1000);
  }, []);

  return (
    <View
      style={[
        styles.container,
        permissionGranted ? styles.containerSpaced : styles.containerCentered,
      ]}
    >
      {!permissionGranted ? (
        <>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <Button title="Allow Permission" onPress={requestLocationPermission} />
        </>
      ) : loading ? (
        <View style={styles.loadingContainer}>
          <View style={styles.loadingItemContainer}>
            <View style={styles.loadingCircle} />
            <View style={styles.loadingBar} />
          </View>
          <View style={styles.loadingItemContainer}>
            <View style={styles.loadingCircle} />
            <View style={styles.loadingBar} />
          </View>
        </View>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : weatherData ? (
        <>
          <View style={styles.weatherItemContainer}>
            <FontAwesomeIcon icon={faThermometerHalf} size={25} color="#ff8625" />
            <View style={styles.weatherTextContainer}>
              <Text style={styles.labelText}>Temperature</Text>
              <Text style={styles.valueText}>{weatherData.main.temp}°C</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.weatherItemContainer}>
            <FontAwesomeIcon icon={faTint} size={25} color="#84c3e0" />
            <View style={styles.weatherTextContainer}>
              <Text style={styles.labelText}>Humidity</Text>
              <Text style={styles.valueText}>{weatherData.main.humidity}%</Text>
            </View>
          </View>
        </>
      ) : null}
    </View>
  );
}