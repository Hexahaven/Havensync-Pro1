import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faThermometerHalf, faTint } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useSelector } from 'react-redux';

const weatherGifs = {
  sunny: require('../assets/weather/sunny.gif'),
  rain: require('../assets/weather/rain.gif'),
  storm: require('../assets/weather/storm.gif'),
  cloudy: require('../assets/weather/cloudy.gif'),
  wind: require('../assets/weather/wind.gif'),
  night: require('../assets/weather/night.gif'),
};

const getWeatherGif = (main, isNight) => {
  const gifs = {
    Clear: 'sunny',
    Rain: 'rain',
    Thunderstorm: 'storm',
    Drizzle: 'rain',
    Clouds: 'cloudy',
    Snow: 'cloudy',
    Wind: 'wind',
    Night: 'night',
  };
  return weatherGifs[gifs[main] || 'cloudy'];
};

export default function TopSection() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [location, setLocation] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
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
          message: 'We need location to show weather info.',
          buttonPositive: 'OK',
        }
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
      pos => {
        const { latitude, longitude } = pos.coords;
        fetchWeatherData(latitude, longitude);
      },
      error => {
        console.error(error);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000 }
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

  const fetchWeatherByLocation = async () => {
    try {
      const API_KEY = '60d3edac42903c48e11867d5b0e797f8';
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
      );
      setWeatherData(res.data);
      setIsModalVisible(false);
    } catch (err) {
      console.error('Manual location error:', err);
    } finally {
      setLoading(false);
    }
  };

  const isNight = new Date().getHours() < 6 || new Date().getHours() >= 18;

  if (!permissionGranted) {
    return (
      <View style={[styles.container, darkMode && styles.dark]}>
        <TouchableOpacity onPress={requestLocationPermission}>
          <Text style={styles.text}>Tap to enable location permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (loading || !weatherData) {
    return (
      <View style={[styles.container, darkMode && styles.dark]}>
        <ActivityIndicator size="small" color={darkMode ? '#fff' : '#000'} />
        <Text style={styles.text}>Loading weather...</Text>
      </View>
    );
  }

  const gifSource = getWeatherGif(weatherData.weather[0].main, isNight);

  return (
    <View style={[styles.container, darkMode && styles.dark]}>
      <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.card}>
        <View style={styles.left}>
          <View style={styles.row}>
            <FontAwesomeIcon icon={faThermometerHalf} color="#ff8625" size={18} />
            <Text style={[styles.text, darkMode && styles.textDark]}>
              {weatherData.main.temp}°C
            </Text>
          </View>
          <View style={styles.row}>
            <FontAwesomeIcon icon={faTint} color="#4db8ff" size={18} />
            <Text style={[styles.text, darkMode && styles.textDark]}>
              {weatherData.main.humidity}%
            </Text>
          </View>
        </View>
        <Image source={gifSource} style={styles.gif} resizeMode="contain" />
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Enter City Name</Text>
            <TextInput
              placeholder="e.g. Chennai"
              style={styles.input}
              value={location}
              onChangeText={setLocation}
            />
            <Button title="Fetch Weather" onPress={fetchWeatherByLocation} />
            <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    justifyContent: 'space-between',
  },
  dark: {
    backgroundColor: '#1a1a1a',
  },
  left: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  textDark: {
    color: '#fff',
  },
  gif: {
    width: 80,
    height: 80,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
});
