import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HexaLoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [loginStatus, setLoginStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [emailAnim] = useState(new Animated.Value(email ? 1 : 0));
  const [passAnim] = useState(new Animated.Value(password ? 1 : 0));
  const buttonColorAnim = useRef(new Animated.Value(0)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;

  const buttonBackgroundColor = buttonColorAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['#6ec1e4', '#34c759', '#ff3b30'],
  });

  useEffect(() => {
    return () => {
      setLoginStatus(null);
      setIsLoading(false);
    };
  }, []);

  useEffect(() => {
    let timer;
    if (loginStatus === 'failed' || loginStatus === 'success') {
      const timeoutDuration = loginStatus === 'success' ? 1000 : 2000;
      timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(buttonColorAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(buttonScaleAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setLoginStatus(null);
          setIsLoading(false);
        });
      }, timeoutDuration);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [loginStatus, buttonColorAnim, buttonScaleAnim]);

  const handleFocus = input => {
    setFocusedInput(input);
    Animated.timing(input === 'email' ? emailAnim : passAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = input => {
    setFocusedInput(null);
    if ((input === 'email' && !email) || (input === 'password' && !password)) {
      Animated.timing(input === 'email' ? emailAnim : passAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const getInputStyle = input =>
    focusedInput === input ? styles.focusedInput : styles.defaultInput;

  const handleLogin = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.trim() === '') {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      setLoginStatus('failed');
      Animated.parallel([
        Animated.timing(buttonColorAnim, {
          toValue: 2,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.sequence([
          Animated.timing(buttonScaleAnim, {
            toValue: 0.95,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(buttonScaleAnim, {
            toValue: 1.05,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(buttonScaleAnim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const isSuccess = Date.now() % 2 === 0;
      setLoginStatus(isSuccess ? 'success' : 'failed');
      Animated.parallel([
        Animated.timing(buttonColorAnim, {
          toValue: isSuccess ? 1 : 2,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.sequence([
          Animated.timing(buttonScaleAnim, {
            toValue: 0.95,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(buttonScaleAnim, {
            toValue: 1.05,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(buttonScaleAnim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
      if (isSuccess) {
        setTimeout(() => {
          navigation.navigate('HexaDashboard');
        }, 1000);
      }
    }, 1000);
  };

  const getButtonText = () => {
    if (isLoading && !loginStatus) return 'Syncing...';
    if (loginStatus === 'success') return 'Welcome!';
    if (loginStatus === 'failed') return 'Retry';
    return 'Login';
  };

  return (
    <LinearGradient colors={['#c4d3d2', '#c4d3d2']} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Ready To Sync</Text>

        <View style={[styles.inputWrapper, getInputStyle('email')]}>
          <Animated.Text
            style={[
              styles.floatingLabel,
              {
                opacity: emailAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0],
                }),
                top: emailAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [14, -10],
                }),
                fontSize: emailAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [16, 12],
                }),
              },
            ]}>
            Email
          </Animated.Text>
          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={setEmail}
            onFocus={() => handleFocus('email')}
            onBlur={() => handleBlur('email')}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!isLoading}
          />
        </View>

        <View style={[styles.inputWrapper, getInputStyle('password')]}>
          <Animated.Text
            style={[
              styles.floatingLabel,
              {
                opacity: passAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0],
                }),
                top: passAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [14, -10],
                }),
                fontSize: passAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [16, 12],
                }),
              },
            ]}>
            Password
          </Animated.Text>
          <TextInput
            style={styles.textInput}
            value={password}
            onChangeText={setPassword}
            onFocus={() => handleFocus('password')}
            onBlur={() => handleBlur('password')}
            secureTextEntry={!showPassword}
            editable={!isLoading}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(prev => !prev)}
            disabled={isLoading}>
            <Icon name={showPassword ? 'eye-off' : 'eye'} size={22} color="#888" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordRequest')}
          disabled={isLoading}>
          <Text style={[styles.forgotPasswordText, isLoading && styles.disabledText]}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <Animated.View style={{ transform: [{ scale: buttonScaleAnim }] }}>
          <TouchableOpacity
            disabled={isLoading}
            onPress={handleLogin}
            style={{ overflow: 'hidden', borderRadius: 20 }}
          >
            <LinearGradient
              colors={['#00C9FF', '#92FE9D']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientButton}
            >
              <Text style={styles.buttonText}>{getButtonText()}</Text>
              {loginStatus === 'success' && (
                <Icon name="checkmark-circle" size={20} color="#fff" style={styles.buttonIcon} />
              )}
              {loginStatus === 'failed' && (
                <Icon name="close-circle" size={20} color="#fff" style={styles.buttonIcon} />
              )}
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        <Text style={[styles.switchText, isLoading && styles.disabledText]}>
          Don't have an account?{' '}
          <Text
            onPress={() => !isLoading && navigation.navigate('HexaSignUpScreen')}
            style={{ fontWeight: '700', color: isLoading ? '#999' : '#007BFF' }}>
            Sign Up
          </Text>
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  card: {
    width: '85%',
    padding: 28,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    elevation: 12,
  },
  title: {
    fontSize: 25,
    fontFamily: 'HoryzenDigital-24',
    marginBottom: 32,
    textAlign: 'center',
    color: '#333',
  },
  inputWrapper: {
    marginBottom: 24,
    borderBottomWidth: 1.2,
    borderColor: '#ccc',
    position: 'relative',
  },
  defaultInput: { borderColor: '#ccc' },
  focusedInput: { borderColor: '#007BFF' },
  textInput: {
    height: 40,
    fontSize: 16,
    fontFamily: 'Kiona-Regular',
    paddingVertical: 4,
    color: '#333',
  },
  floatingLabel: {
    position: 'absolute',
    left: 0,
    color: '#666',
    fontFamily: 'Kiona-Regular',
  },
  eyeIcon: {
    position: 'absolute',
    right: 0,
    top: 10,
  },
  forgotPasswordText: {
    alignSelf: 'flex-end',
    color: '#007BFF',
    marginBottom: 28,
    fontFamily: 'Kiona-Regular',
    fontSize: 14,
  },
  disabledText: {
    color: '#999',
    fontFamily: 'Kiona-Regular',
  },
  gradientButton: {
  paddingVertical: 10, // Increase the vertical padding
  paddingHorizontal: 10, // Horizontal padding
  borderRadius: 30, // Rounded corners for the button
  alignItems: 'center',
  justifyContent: 'center',
  // For iOS shadow
  shadowColor: '#000',
  shadowOffset: { width: 5, height: 10 }, // Shadow position
  shadowOpacity: 30, // Shadow intensity
  shadowRadius: 8, // Shadow spread
  // For Android elevation
  elevation: 3, // Elevation to give depth effect
},
  buttonText: {
    fontSize: 18,
    fontFamily: 'Kiona-Regular',
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  buttonIcon: {
    marginLeft: 8,
  },
  switchText: {
    marginTop: 24,
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    fontFamily: 'Kiona-Regular',
  },
});
