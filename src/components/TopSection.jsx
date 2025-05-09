import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,
  ActivityIndicator,
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
  const darkMode = useSelector(state => state.profile.darkMode);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          pos => {
            const { latitude, longitude } = pos.coords;
            fetchWeatherData(latitude, longitude);
          },
          err => console.warn(err),
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000 }
        );
      }
    } catch (err) {
      console.warn(err);
    }
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
