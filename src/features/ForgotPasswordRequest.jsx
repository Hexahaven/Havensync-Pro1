import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ForgotPasswordRequest = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <LinearGradient colors={['#c4d3d2', '#e0e7e9']} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Reclaim Entry</Text>
        <Text style={styles.subtitle}>Enter your registered email to receive an OTP</Text>
        <View style={[styles.inputWrapper, isFocused && styles.focusedInput]}>
          <TextInput
            placeholder="Email Address"
            placeholderTextColor="#aaa"
            style={styles.textInput}
            value={email}
            onChangeText={setEmail}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('OTPVerification')}
        >
          <LinearGradient
  colors={['#00C9FF', '#92FE9D']} // Updated to match Login screen
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={styles.button}
>

            <Text style={styles.buttonText}>Send OTP</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default ForgotPasswordRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '85%',
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 8, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  title: {
    fontSize: 22,
    fontFamily: 'HoryzenDigital-24', // Updated font
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    color: '#555',
    marginBottom: 32,
    fontSize: 14,
    textAlign: 'center',
  },
  inputWrapper: {
    marginBottom: 24,
    borderBottomWidth: 1.2,
    borderColor: '#ccc',
    position: 'relative',
  },
  focusedInput: {
    borderColor: '#007BFF', // Highlighted border color when focused
  },
  textInput: {
    height: 40,
    fontSize: 16,
    fontFamily: 'Kiona-Regular', // Match the font style from the login page
    paddingVertical: 4,
    color: '#333',
  },
  buttonContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 8 }, // Shadow offset for depth
    shadowOpacity: 0.4, // Shadow opacity
    shadowRadius: 10, // Shadow blur radius
    elevation: 10, // Elevation for Android
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
  shadowOpacity: 30, // Shadow intensity
  shadowRadius: 8, // Shadow spread
  // For Android elevation
  elevation: 3, // Elevation to give depth effect
},
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
