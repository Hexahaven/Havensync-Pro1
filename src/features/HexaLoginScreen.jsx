import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HexaLoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [loginStatus, setLoginStatus] = useState(null); // 'success', 'failed', or null
  const [isLoading, setIsLoading] = useState(false);

  const [emailAnim] = useState(new Animated.Value(email ? 1 : 0));
  const [passAnim] = useState(new Animated.Value(password ? 1 : 0));
  const buttonColorAnim = useRef(new Animated.Value(0)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;

  // Reset login status when component mounts or unmounts
  useEffect(() => {
    return () => {
      setLoginStatus(null);
      setIsLoading(false);
    };
  }, []);

  // Effect to handle the success/failure case timeout
  useEffect(() => {
    let timer;
    if (loginStatus === 'failed' || loginStatus === 'success') {
      // For success, use a shorter timeout before resetting (since we navigate away)
      const timeoutDuration = loginStatus === 'success' ? 1000 : 2000;
      
      timer = setTimeout(() => {
        // Reset button animation
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
    // Instead of showing an alert for invalid email, treat as login failed
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.trim() === '') {
      setIsLoading(true);
      
      // Show failure state immediately
      setLoginStatus('failed');
      
      // Animate button color and scale for failure
      Animated.parallel([
        Animated.timing(buttonColorAnim, {
          toValue: 2, // 2 for failure
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

    // For valid email/password, simulate API call with delay
    setTimeout(() => {
      // For testing purposes, use timestamp to determine success/failure
      const testNumber = Date.now() % 10;
      const isSuccess = testNumber % 2 === 0;
      
      // Set login status based on success/failure
      setLoginStatus(isSuccess ? 'success' : 'failed');
      
      // Animate button color and scale
      Animated.parallel([
        Animated.timing(buttonColorAnim, {
          toValue: isSuccess ? 1 : 2, // 1 for success, 2 for failure
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

      // If success, navigate to dashboard after a short delay
      if (isSuccess) {
        setTimeout(() => {
          navigation.navigate('HexaDashboard');
        }, 1000);
      }
    }, 1000);
  };

  // Dynamic button background color based on status
  const buttonBackgroundColor = buttonColorAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['#2a5298', '#34c759', '#ff3b30'], // Default, Success, Failure
  });

  const getButtonText = () => {
    if (isLoading && !loginStatus) return 'Logging in...';
    if (loginStatus === 'success') return 'Success!';
    if (loginStatus === 'failed') return 'Failed!';
    return 'Login';
  };

  return (
    <LinearGradient colors={['#c4d3d2', '#c4d3d2']} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>

        {/* Email Input */}
        <View style={[styles.inputWrapper, getInputStyle('email')]}>
          <Animated.Text
            style={[styles.floatingLabel, {
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
            }]}>
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

        {/* Password Input */}
        <View style={[styles.inputWrapper, getInputStyle('password')]}>
          <Animated.Text
            style={[styles.floatingLabel, {
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
            }]}>
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

        <Animated.View
          style={{
            transform: [{ scale: buttonScaleAnim }],
          }}>
          <TouchableOpacity
            disabled={isLoading}
            onPress={handleLogin}
            style={{ overflow: 'hidden', borderRadius: 16 }}>
            <Animated.View
              style={[
                styles.button,
                { backgroundColor: buttonBackgroundColor }
              ]}>
              <Text style={styles.buttonText}>{getButtonText()}</Text>
              {isLoading && !loginStatus && (
                <View style={styles.loadingIndicator} />
              )}
              {loginStatus === 'success' && (
                <Icon name="checkmark-circle" size={20} color="#fff" style={styles.buttonIcon} />
              )}
              {loginStatus === 'failed' && (
                <Icon name="close-circle" size={20} color="#fff" style={styles.buttonIcon} />
              )}
            </Animated.View>
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
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    width: '85%',
    padding: 28,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
  },
  title: {
    fontSize: 28,
    color: '#333',
    marginBottom: 30,
    fontWeight: '700',
    textAlign: 'center',
  },
  inputWrapper: {
    height: 50,
    marginBottom: 25,
    borderRadius: 14,
    paddingHorizontal: 15,
    justifyContent: 'center',
    backgroundColor: '#ffffffdd',
    position: 'relative',
  },
  defaultInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: 'transparent',
  },
  focusedInput: {
    borderWidth: 1.5,
    borderColor: '#00e6e6',
    shadowColor: '#00e6e6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  textInput: {
    height: '100%',
    fontSize: 16,
    color: '#222',
    paddingTop: 10,
  },
  floatingLabel: {
    position: 'absolute',
    left: 15,
    color: '#555',
    backgroundColor: 'transparent',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 14,
  },
  forgotPasswordText: {
    color: '#007BFF',
    textAlign: 'right',
    marginBottom: 20,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#2a5298',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  buttonIcon: {
    marginLeft: 8,
  },
  loadingIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
    borderTopColor: 'transparent',
    marginLeft: 8,
    transform: [{ rotate: '45deg' }],
  },
  switchText: {
    textAlign: 'center',
    color: '#333',
    marginTop: 10,
  },
  disabledText: {
    color: '#999',
  },
});
