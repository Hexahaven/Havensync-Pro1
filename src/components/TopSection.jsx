import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,
  ActivityIndicator,
  Button,
  TouchableOpacity,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faThermometerHalf, faTint } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const weatherGifs = {
  sunny: require('../assets/weather/sunny.gif'),
  rain: require('../assets/weather/rain.gif'),
  storm: require('../assets/weather/storm.gif'),
  cloudy: require('../assets/weather/cloudy.gif'),
  wind: require('../assets/weather/wind.gif'),
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
  };

  const selected = gifs[main] || 'cloudy';
  return weatherGifs[selected];
};

export default function TopSection() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const darkMode = useSelector(state => state.profile.darkMode);
  const profile = useSelector(state => state.profile);
  const navigation = useNavigation();

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

  const mainCondition = weatherData?.weather?.[0]?.main;
  const currentHour = new Date().getHours();
  const isNight = currentHour < 6 || currentHour >= 18;
  const gifSource = getWeatherGif(mainCondition, isNight);

  return (
    <View style={styles.wrapper}>
      {/* Greeting Row */}
      <TouchableOpacity
        style={styles.greetingRow}
        onPress={() => navigation.navigate('HexaEditProfile')}>
        <Image
          source={{ uri: profile.avatar }}
          style={styles.avatar}
        />
        <View>
          <Text style={[styles.hello, darkMode && styles.textDark]}>Hello,</Text>
          <Text style={[styles.name, darkMode && styles.textDark]}>
            {profile.name || 'Guest'} 👋
          </Text>
        </View>
      </TouchableOpacity>

      {/* Weather Card */}
      <View style={[styles.container, darkMode && styles.dark]}>
        {(!permissionGranted || loading || !weatherData) ? (
          <View style={styles.loadingBlock}>
            {loading ? (
              <>
                <ActivityIndicator size="small" color={darkMode ? '#fff' : '#333'} />
                <Text style={[styles.text, darkMode && styles.textDark]}>
                  Fetching weather...
                </Text>
              </>
            ) : (
              <Button title="Allow Location Permission" onPress={requestLocationPermission} />
            )}
          </View>
        ) : (
          <>
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
            <Image source={gifSource} style={styles.weatherGif} resizeMode="contain" />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  hello: {
    fontSize: 14,
    color: '#666',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
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
  loadingBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
