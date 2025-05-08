// src/components/TopSection.jsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faThermometerHalf, faTint, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';

export default function TopSection({ username = 'Guest' }) {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editableName, setEditableName] = useState(username);

  useEffect(() => {
    const requestPermissionAndFetch = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'App needs location to show weather info.',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            pos => {
              const { latitude, longitude } = pos.coords;
              setLocation({ latitude, longitude });
              fetchWeatherData(latitude, longitude);
            },
            error => console.error(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
          );
        }
      } catch (error) {
        console.warn(error);
      }
    };

    requestPermissionAndFetch();
  }, []);

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

  const handleSave = () => {
    setIsEditing(false);
    // Optional: persist the username to backend/local storage
  };

  return (
    <LinearGradient
      colors={['#6ec1e4', '#3ba7cc']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
      }}
    >
      <View className="mb-4 flex-row justify-between items-center">
        <View>
          <Text className="text-white text-lg font-medium">Welcome back,</Text>
          {isEditing ? (
            <TextInput
              className="text-white text-xl font-bold border-b border-white w-40"
              value={editableName}
              onChangeText={setEditableName}
              autoFocus
            />
          ) : (
            <Text className="text-white text-xl font-bold">{editableName}</Text>
          )}
        </View>
        <TouchableOpacity onPress={isEditing ? handleSave : () => setIsEditing(true)}>
          <FontAwesomeIcon
            icon={isEditing ? faCheck : faEdit}
            size={20}
            color="white"
          />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : weatherData ? (
        <View className="flex-row justify-around mt-3">
          <View className="items-center">
            <FontAwesomeIcon icon={faThermometerHalf} size={24} color="white" />
            <Text className="text-white mt-1">
              {weatherData.main.temp}°C
            </Text>
          </View>
          <View className="items-center">
            <FontAwesomeIcon icon={faTint} size={24} color="white" />
            <Text className="text-white mt-1">
              {weatherData.main.humidity}%
            </Text>
          </View>
        </View>
      ) : (
        <Text className="text-white mt-2">Unable to fetch weather.</Text>
      )}
    </LinearGradient>
  );
}
