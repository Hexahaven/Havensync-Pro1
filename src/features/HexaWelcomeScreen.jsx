import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated as RNAnimated,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const {height} = Dimensions.get('window');

export default function HexaWelcomeScreen({navigation}) {
  const [showButton, setShowButton] = useState(false);
  const fadeAnim = useRef(new RNAnimated.Value(0)).current;
  const scale = useSharedValue(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
      RNAnimated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();

      // Start pulse animation
      scale.value = withRepeat(
        withTiming(1.05, {duration: 1000}),
        -1,
        true
      );
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
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
        <RNAnimated.View style={{...styles.buttonContainer, opacity: fadeAnim}}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('HexaLoginScreen')}>
            <Animated.View style={[styles.buttonWrapper, animatedStyle]}>
              <LinearGradient
                colors={['#2575fc', '#6a11cb']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.gradientButton}>
                <Text style={styles.buttonText}>Continue</Text>
              </LinearGradient>
            </Animated.View>
          </TouchableWithoutFeedback>
        </RNAnimated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  buttonWrapper: {
    borderRadius: 30,
  },
  gradientButton: {
    paddingVertical: 16,
    paddingHorizontal: 36,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
