import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

  export default function HexaSignUpScreen({ navigation }){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };

  const handleSignUp = () => {
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      alert('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Proceed to dashboard or your signup API call
    navigation.navigate('HexaDashboard');
  };

  return (
    <LinearGradient colors={['#c4d3d2', '#c4d3d2']} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Create Account</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#aaa"
          autoCapitalize="words"
          value={name}
          onChangeText={setName}
          returnKeyType="next"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          returnKeyType="next"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            returnKeyType="next"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'eye' : 'eye-off'}
              size={22}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm Password"
            placeholderTextColor="#aaa"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            returnKeyType="done"
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Icon
              name={showConfirmPassword ? 'eye' : 'eye-off'}
              size={22}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.buttonContainer} onPress={handleSignUp}>
          <LinearGradient
  colors={['#00C9FF', '#92FE9D']} // Updated to match Login screen
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={styles.button}
>

            <Text style={styles.buttonText}>Sign Up</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.switchText}>
          Already have an account?{' '}
          <Text
            onPress={() => navigation.navigate('HexaLoginScreen')}
            style={{ fontWeight: '700', color: '#007BFF' }}
          >
            Login
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
    alignItems: 'center',
  },
  card: {
    width: '85%',
    padding: 28,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 8, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
    transform: [{ perspective: 800 }],
  },
  title: {
    fontSize: 25,
    fontFamily: 'HoryzenDigital-24', // Updated font
    marginBottom: 32,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  passwordInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    borderRadius: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 80,
    shadowRadius: 6,
  },
 button: {
  paddingVertical: 10, // Increase the vertical padding
  paddingHorizontal: 10, // Horizontal padding
  borderRadius: 30, // Rounded corners for the button
  alignItems: 'center',
  justifyContent: 'center',
  // For iOS shadow
  shadowColor: '#000',
  shadowOffset: { width: 5, height: 10 }, // Shadow position
  shadowOpacity: 0.25, // Shadow intensity
  shadowRadius: 8, // Shadow spread
  // For Android elevation
  elevation: 3, // Elevation to give depth effect
},

  buttonText: {
  color: '#fff',
  fontSize: 20,
  fontWeight: '700',
  textShadowColor: 'rgba(0, 0, 0, 0.3)',  // Shadow color
  textShadowOffset: { width: 1, height: 2 }, // Shadow position
  textShadowRadius: 5,                     // Shadow blur radius
  textStrokeWidth: 5,                      // Stroke width (simulated effect)
  textStrokeColor: '#000',              // Stroke color
},

  switchText: {
    textAlign: 'center',
    color: '#333',
    marginTop: 10,
  },
});
