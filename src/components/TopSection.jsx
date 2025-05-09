import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,
  ActivityIndicator,
  Button,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faThermometerHalf, faTint } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useSelector } from 'react-redux';

const getWeatherGif = (main, isNight) => {
  const gifs = {
    Clear: isNight ? 'sunny' : 'sunny',
    Rain: 'rain',
    Thunderstorm: 'storm',
    Drizzle: 'rain',
    Clouds: 'cloudy',
    Snow: 'cloudy',
    Wind: 'wind',
  };

  const selected = gifs[main] || 'cloudy';
  return require(`../assets/weather/${selected}.gif`);
};

export default function TopSection() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const darkMode = useSelector(state => state.profile.darkMode);

  useEffect(() => {
    requestLocationPermission();
  }, []);

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
        setLoading(false);
      }
    } catch (err) {
      console.warn(err);
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        fetchWeatherData(latitude, longitude);
      },
      error => {
        console.error(error);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000 },
    );
  };

  const fetchWeatherData = async (lat, lon) => {
    try {
      const API_KEY = '60d3edac42903c48e11867d5b0e797f8';
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      setWeatherData(res.data);
    } catch (err) {
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!permissionGranted) {
    return (
      <View style={[styles.container, darkMode && styles.dark]}>
        <Button title="Allow Location Permission" onPress={requestLocationPermission} />
      </View>
    );
  }

  if (loading || !weatherData) {
    return (
      <View style={[styles.container, darkMode && styles.dark]}>
        <ActivityIndicator size="small" color={darkMode ? '#fff' : '#333'} />
        <Text style={[styles.text, darkMode && styles.textDark]}>
          Fetching weather...
        </Text>
      </View>
    );
  }

  const mainCondition = weatherData.weather[0].main;
  const currentHour = new Date().getHours();
  const isNight = currentHour < 6 || currentHour >= 18;
  const gifSource = getWeatherGif(mainCondition, isNight);

  return (
    <View style={[styles.container, darkMode && styles.dark]}>
      <View style={styles.left}>
        <View style={styles.row}>
          <FontAwesomeIcon icon={faThermometerHalf} size={18} color="#ff8625" />
          <Text style={[styles.text, darkMode && styles.textDark]}>
            {weatherData.main.temp}°C
          </Text>
        </View>
        <View style={styles.row}>
          <FontAwesomeIcon icon={faTint} size={18} color="#4db8ff" />
          <Text style={[styles.text, darkMode && styles.textDark]}>
            {weatherData.main.humidity}%
          </Text>
        </View>
      </View>
      <Image
        source={gifSource}
        style={styles.weatherGif}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    marginBottom: 16,
  },
  dark: {
    backgroundColor: '#1e1e1e',
  },
  left: {
    flexDirection: 'column',
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    marginLeft: 4,
    color: '#333',
  },
  textDark: {
    color: '#fff',
  },
  weatherGif: {
    width: 60,
    height: 60,
  },
});
