import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HexaLoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = email =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = password =>
    password.length >= 6;

  const handleLogin = () => {
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert(
        'Invalid Password',
        'Password must be at least 6 characters long.'
      );
      return;
    }
    // Navigate to dashboard if valid
    navigation.navigate('HexaDashboard');
  };

  return (
    <LinearGradient colors={['#c4d3d2', '#c4d3d2']} style={styles.container}>
      <View style={styles.glassCard}>
        <Text style={styles.title}>Welcome Back</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ddd"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#ddd"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(prev => !prev)}
            style={styles.eyeIcon}>
            <Icon
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#ccc"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordRequest')}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.switchText}>
          Don't have an account?{' '}
          <Text
            onPress={() => navigation.navigate('HexaSignUpScreen')}
            style={{ fontWeight: '700' }}>
            Sign Up
          </Text>
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  glassCard: {
    width: '85%',
    padding: 30,
    backgroundColor: 'rgba(255,255,255,0.8)',  // Adjusted to provide opacity
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,  // Increased opacity for a stronger shadow
    shadowRadius: 15,   // Slightly reduced radius for sharper shadows
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  title: {
    fontSize: 28,
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: '700',
  },
  input: {
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 12,
    paddingHorizontal: 15,
    color: '#333',
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',  // Slight transparency for depth
    borderRadius: 12,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    color: '#333',
  },
  eyeIcon: {
    paddingHorizontal: 15,
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
  switchText: {
    textAlign: 'center',
    color: '#333',
    marginTop: 10,
  },
});
