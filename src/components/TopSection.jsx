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
};

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
  return weatherGifs[selected];
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

  const fetchWeatherByLocation = async () => {
    try {
      const API_KEY = '60d3edac42903c48e11867d5b0e797f8';
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
      );
      setWeatherData(res.data);
      setIsModalVisible(false); // Close the modal
    } catch (err) {
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const currentHour = new Date().getHours();
  const isNight = currentHour < 6 || currentHour >= 18;

  const containerStyle = [styles.container, darkMode && styles.dark];
  const textStyle = [styles.text, darkMode && styles.textDark];

  if (!permissionGranted) {
    return (
      <View style={containerStyle}>
        <TouchableOpacity onPress={requestLocationPermission}>
          <Text style={textStyle}>Tap to enable location permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (loading || !weatherData) {
    return (
      <View style={containerStyle}>
        <ActivityIndicator size="small" color={darkMode ? '#fff' : '#333'} />
        <Text style={textStyle}>Fetching weather...</Text>
      </View>
    );
  }

  const gifSource = getWeatherGif(weatherData.weather[0].main, isNight);

  return (
    <View style={containerStyle}>
      <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.weatherContainer}>
        <Image source={gifSource} style={styles.weatherGif} resizeMode="contain" />
        <View style={styles.weatherInfo}>
          <View style={styles.row}>
            <FontAwesomeIcon icon={faThermometerHalf} size={16} color="#ff8625" />
            <Text style={textStyle}>{weatherData.main.temp}°C</Text>
          </View>
          <View style={styles.row}>
            <FontAwesomeIcon icon={faTint} size={16} color="#4db8ff" />
            <Text style={textStyle}>{weatherData.main.humidity}%</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Modal for entering location */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter Location</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter city name"
              value={location}
              onChangeText={setLocation}
            />
            <Button title="Get Weather" onPress={fetchWeatherByLocation} />
            <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 40,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 10,
    marginBottom: 50,
  },
  dark: {
    backgroundColor: '#1c1c1e',
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherGif: {
    width: 100,
    height: 100,
    marginRight: 30,
  },
  weatherInfo: {
    justifyContent: 'center',
    gap: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  text: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  textDark: {
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    paddingLeft: 10,
    marginBottom: 10,
  },
});
