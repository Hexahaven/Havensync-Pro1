import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HexaLoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [loginStatus, setLoginStatus] = useState(null); // 'success' | 'failed' | null

  const [emailAnim] = useState(new Animated.Value(email ? 1 : 0));
  const [passAnim] = useState(new Animated.Value(password ? 1 : 0));

  const messageOpacity = useRef(new Animated.Value(0)).current;
  const messageTranslateY = useRef(new Animated.Value(20)).current; // Slide-in effect
  const messageScale = useRef(new Animated.Value(0.9)).current;

  const showLoginMessage = (type) => {
    setLoginStatus(type);
    Animated.parallel([
      Animated.timing(messageOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(messageTranslateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.spring(messageScale, {
        toValue: 1,
        useNativeDriver: true,
        friction: 5,
      }),
    ]).start();
  };

  const handleFocus = (input) => {
    setFocusedInput(input);
    Animated.timing(input === 'email' ? emailAnim : passAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
      easing: Easing.inOut(Easing.ease),
    }).start();
  };

  const handleBlur = (input) => {
    setFocusedInput(null);
    if ((input === 'email' && !email) || (input === 'password' && !password)) {
      Animated.timing(input === 'email' ? emailAnim : passAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
        easing: Easing.inOut(Easing.ease),
      }).start();
    }
  };

  const getInputStyle = (input) =>
    focusedInput === input ? styles.focusedInput : styles.defaultInput;

  const handleLogin = () => {
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validPassword = password.length >= 6;

    if (!validEmail || !validPassword) {
      showLoginMessage('failed');
      return;
    }

    showLoginMessage('success');
    setTimeout(() => navigation.navigate('HexaDashboard'), 1000);
  };

  return (
    <LinearGradient colors={['#c4d3d2', '#c4d3d2']} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>

        {/* Email Field */}
        <View style={[styles.inputWrapper, getInputStyle('email')]}>
          <Animated.Text
            style={[
              styles.floatingLabel,
              {
                top: emailAnim.interpolate({ inputRange: [0, 1], outputRange: [14, -10] }),
                fontSize: emailAnim.interpolate({ inputRange: [0, 1], outputRange: [16, 12] }),
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
            placeholder=""
          />
        </View>

        {/* Password Field */}
        <View style={[styles.inputWrapper, getInputStyle('password')]}>
          <Animated.Text
            style={[
              styles.floatingLabel,
              {
                top: passAnim.interpolate({ inputRange: [0, 1], outputRange: [14, -10] }),
                fontSize: passAnim.interpolate({ inputRange: [0, 1], outputRange: [16, 12] }),
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
            placeholder=""
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword((prev) => !prev)}>
            <Icon name={showPassword ? 'eye-off' : 'eye'} size={22} color="#888" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordRequest')}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Login Message */}
        <Animated.View
          style={[
            styles.loginMessage,
            {
              opacity: messageOpacity,
              transform: [
                { translateY: messageTranslateY },
                { scale: messageScale },
              ],
            },
          ]}>
          <Text
            style={[
              styles.loginText,
              {
                color: loginStatus === 'success' ? '#00bfae' : '#e74c3c',
                textShadowColor: loginStatus === 'success' ? '#00bfae' : '#e74c3c',
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 6,
              },
            ]}>
            {loginStatus === 'success' ? 'Login Success!' : 'Login Failed'}
          </Text>
        </Animated.View>

        <Text style={styles.switchText}>
          Don't have an account?{' '}
          <Text onPress={() => navigation.navigate('HexaSignUpScreen')} style={{ fontWeight: '700' }}>
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
  },
  focusedInput: {
    borderWidth: 1.5,
    borderColor: '#00bfae',
    shadowColor: '#00bfae',
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
    transition: 'top 0.2s ease, font-size 0.2s ease',
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  loginMessage: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1.5,
    marginBottom: 20,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
    transform: [{ perspective: 1000 }, { rotateY: '5deg' }],
    transition: 'transform 0.3s ease',
  },
  switchText: {
    textAlign: 'center',
    color: '#333',
    marginTop: 10,
  },
});
