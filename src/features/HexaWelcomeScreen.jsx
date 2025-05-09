import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';

const {height, width} = Dimensions.get('window');

export default function HexaWelcomeScreen({navigation}) {
  // State for the entry interface
  const [showEntry, setShowEntry] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
 
  // Animation values 
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const hexPatternOpacity = useRef(new Animated.Value(0)).current;
  const rippleScale = useRef(new Animated.Value(0.1)).current;
  const rippleOpacity = useRef(new Animated.Value(0)).current;
  
  // Check for vibration permission on Android (not needed on iOS)
  useEffect(() => {
    const checkVibrationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            'android.permission.VIBRATE',
            {
              title: 'Vibration Permission',
              message: 'Haven needs vibration permission for haptic feedback.',
              buttonPositive: 'Allow',
              buttonNegative: 'Deny',
            },
          );
          
          setPermissionGranted(granted === PermissionsAndroid.RESULTS.GRANTED);
        } catch (err) {
          console.warn(err);
          // Default to true if permission check fails
          setPermissionGranted(true);
        }
      } else {
        // iOS doesn't need explicit permission for vibration
        setPermissionGranted(true);
      }
    };
    
    checkVibrationPermission();
  }, []);

  useEffect(() => {
    // Show the entry mechanism after video plays for a bit
    const timer = setTimeout(() => {
      setShowEntry(true);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(hexPatternOpacity, {
          toValue: 0.4,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]).start();
      
      // Start the pulse animation
      startPulseAnimation();
      
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // Create the pulse effect for the hexagon
  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
    
    // Create subtle glow pulsing
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 0.5,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.3,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  // Single tap to enter
  const handleTap = () => {
    // Trigger ripple effect
    rippleScale.setValue(0.1);
    rippleOpacity.setValue(0.8);
    
    Animated.parallel([
      // Scale up the button
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.9,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
      // Fade out the whole screen
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800,
        delay: 300,
        useNativeDriver: true,
      }),
      // Ripple effect
      Animated.sequence([
        Animated.timing(rippleScale, {
          toValue: 3,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(rippleOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      // Navigate after animation completes
      navigation.navigate('HexaLoginScreen');
    });
  };

  return (
    <View style={styles.container}>
      <Video
        source={require('../assets/videos/welcome.mp4')}
        style={styles.backgroundVideo}
        resizeMode="cover"
        repeat
      />
      
      {/* Hexagon Pattern Overlay */}
      <Animated.View style={[styles.hexPattern, { opacity: hexPatternOpacity }]} />
      
      {showEntry && (
        <Animated.View 
          style={[
            styles.entryContainer, 
            { opacity: fadeAnim }
          ]}
        >
          {/* Ripple effect on touch */}
          <Animated.View
            style={[
              styles.rippleEffect,
              {
                opacity: rippleOpacity,
                transform: [
                  { scale: rippleScale }
                ]
              }
            ]}
          />
          
          {/* Glow effect */}
          <Animated.View
            style={[
              styles.glowEffect,
              { opacity: glowAnim }
            ]}
          />
          
          {/* Hexagon button */}
          <TouchableWithoutFeedback onPress={handleTap}>
            <Animated.View
              style={[
                styles.hexagonContainer,
                {
                  transform: [
                    { scale: pulseAnim }
                  ]
                }
              ]}
            >
              <View style={styles.hexagonMain}>
                <LinearGradient
                  colors={['#3ba7cc', '#2294b8', '#1a7a9c']}
                  style={styles.hexagonGradient}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                >
                  <View style={styles.hexagonInner}>
                    <Text style={styles.hexagonText}>ENTER</Text>
                    <Text style={styles.hexagonTextSmall}>HAVEN</Text>
                  </View>
                </LinearGradient>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
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
  hexPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent overlay
  },
  entryContainer: {
    position: 'absolute',
    bottom: height * 0.12, // Positioned same as original button
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Hexagon styling
  hexagonContainer: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hexagonMain: {
    width: 100,
    height: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 15,
  },
  hexagonGradient: {
    width: '85%',
    height: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22, // For more hexagonal feel
    transform: [{ rotate: '30deg' }],
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  hexagonInner: {
    width: '85%',
    height: '85%',
    backgroundColor: 'rgba(20, 20, 20, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18, // For more hexagonal feel
    transform: [{ rotate: '-30deg' }],
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  hexagonText: {
    fontFamily: 'Horyzen Digital 24',
    fontSize: 15,
    color: '#6ec1e4',
    fontWeight: '700',
    letterSpacing: 2,
    textShadowColor: 'rgba(110, 193, 228, 0.7)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  hexagonTextSmall: {
    fontFamily: 'Horyzen Digital 24',
    fontSize: 11,
    color: '#6ec1e4',
    fontWeight: '600',
    letterSpacing: 4,
    marginTop: 2,
    opacity: 0.8,
  },
  // Glow and ripple effects
  glowEffect: {
    position: 'absolute',
    width: 170,
    height: 170,
    borderRadius: 90,
    backgroundColor: 'transparent',
    shadowColor: '#6ec1e4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 50,
    shadowRadius: 30,
    elevation: 5,
  },
  rippleEffect: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: 'rgba(110, 193, 228, 0.6)',
  },
});

console.log('Font applied:', styles.hexagonText.fontFamily);