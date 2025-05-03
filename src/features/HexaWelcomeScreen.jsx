import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, StatusBar} from 'react-native';
import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/native';

export default function HexaWelcomeScreen() {
  const navigation = useNavigation();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    navigation.navigate('HexaLoginScreen');
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Video
        source={require('../assets/videos/welcome.mp4')}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        repeat={false}
        paused={false}
      />
      {showButton && (
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#2575fc',
    fontSize: 18,
    fontWeight: '600',
  },
});
