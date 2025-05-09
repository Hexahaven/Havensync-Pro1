import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const OTPVerification = ({ navigation }) => {
  const [otp, setOtp] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>Enter the OTP sent to your email</Text>
      <TextInput
        style={styles.input}
        placeholder="6-digit OTP"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
      />
      <TouchableOpacity
      
        onPress={() => navigation.navigate('ResetPassword')}
        style={styles.buttonContainer}
      >
        <LinearGradient
  colors={['#00C9FF', '#92FE9D']} // Updated to match Login screen
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={styles.button}
>

          <Text style={styles.buttonText}>Verify</Text>
        </LinearGradient>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default OTPVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c4d3d2', // Updated background color
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 25,
    fontFamily: 'HoryzenDigital-24', // Updated font
    color: '#222',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
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
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'HoryzenDigital-24', // Updated font
    textShadowColor: 'rgba(0, 0, 0, 0.3)', // Text shadow for 3D effect
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
