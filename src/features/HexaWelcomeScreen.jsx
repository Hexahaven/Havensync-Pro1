import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions} from 'react-native';
import Video from 'react-native-video';

const {height} = Dimensions.get('window');

export default function HexaWelcomeScreen({navigation}) {
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
    <View style={styles.container}>
      <Video
        source={require('../assets/videos/welcome.mp4')}
        style={styles.backgroundVideo}
        resizeMode="cover"
        repeat
      />
      {showButton && (
        <Animated.View style={{...styles.buttonContainer, opacity: fadeAnim}}>
        <LinearGradient
          colors={['#a3ddf5', '#84c9e8']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate('HexaLoginScreen')}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>      
      )}
    </View>
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
    backgroundColor: '#84c9e8',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 6,
  
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundGradient: 'linear-gradient(to bottom, #a3ddf5, #84c9e8)', // for visual ref
  },
  buttonText: {
    color: '#424242',
    fontSize: 18,
    fontWeight: '700',
  },
});
