import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, SafeAreaView} from 'react-native';
import Video from 'react-native-video';

const {height} = Dimensions.get('window');

export default function HexaWelcomeScreenWrappedExample({navigation}) {
  const [showButton, setShowButton] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Video
        source={require('../assets/videos/welcome.mp4')}
        style={styles.backgroundVideo}
        resizeMode="cover"
        repeat
      />
      {showButton && (
        <Animated.View style={{...styles.buttonContainer, opacity: fadeAnim}}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HexaLoginScreen')}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: height * 0.12, // slightly above the bottom
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#ffffffee',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  buttonText: {
    color: '#2575fc',
    fontSize: 18,
    fontWeight: '700',
  },
});
