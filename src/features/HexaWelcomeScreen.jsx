import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions} from 'react-native';
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';

const {height, width} = Dimensions.get('window');

export default function HexaWelcomeScreen({navigation}) {
  const [showButton, setShowButton] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const shimmerAnim = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
      startShimmer();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const startShimmer = () => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ).start();
  };

  const shimmerTranslate = shimmerAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: [-width, width],
  });

  return (
    <View style={styles.container}>
      <Video
        source={require('../assets/videos/welcome.mp4')}
        style={styles.backgroundVideo}
        resizeMode="cover"
        repeat
      />
      
      {showButton && (
        <Animated.View style={[styles.buttonContainer, {opacity: fadeAnim}]}>
          <TouchableOpacity onPress={() => navigation.navigate('HexaLoginScreen')}>
            <LinearGradient
              colors={['#6ec1e4', '#3ba7cc']} // Gradient colors for the button
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              style={styles.button}>
              <Text style={styles.buttonText}>Enter Haven</Text>
              <Animated.View
                style={[
                  styles.shimmerOverlay,
                  {
                    transform: [{translateX: shimmerTranslate}],
                  },
                ]}>
                <LinearGradient
                  colors={['transparent', 'rgba(255,255,255,0.5)', 'transparent']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.shimmer}
                />
              </Animated.View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c4d3d2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },
 
  buttonContainer: {
    position: 'absolute',
    bottom: height * 0.12,
    alignSelf: 'center',
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 16,
    overflow: 'hidden',

    // Shadow & bevel
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 12,

    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  buttonText: {
    fontFamily: 'Horyzen Digital 24', // Example corrected name
    fontSize: 20,
    color: '#1e1e1e',
    fontStyle: 'normal',
    fontWeight: '800',
    textAlign: 'center',
    
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 1.5, height: 1.5 },
    textShadowRadius: 2,
  },
  shimmerOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  shimmer: {
    width: 100,
    height: '100%',
  },
});

console.log('Font applied:', styles.buttonText.fontFamily);
