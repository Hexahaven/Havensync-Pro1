import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const ResetPassword = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.subtitle}>Enter your new password below</Text>

      {/* Password Input */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="New Password"
          placeholderTextColor="#aaa"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(prev => !prev)}
        >
          <Icon name={showPassword ? 'eye-off' : 'eye'} size={22} color="#888" />
        </TouchableOpacity>
      </View>

      {/* Confirm Password Input */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#aaa"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowConfirmPassword(prev => !prev)}
        >
          <Icon name={showConfirmPassword ? 'eye-off' : 'eye'} size={22} color="#888" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => {
          // Add logic for resetting the password here (e.g., API call)
          alert('Password reset successfully!');
          navigation.navigate('HexaLoginScreen'); // Use the correct route name
        }}
        style={styles.buttonContainer}
      >
        <LinearGradient
  colors={['#00C9FF', '#92FE9D']} // Updated to match Login screen
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={styles.button}
>

          <Text style={styles.buttonText}>Reset Password</Text>
        </LinearGradient>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c4d3d2', // Background color
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
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
  inputWrapper: {
    marginBottom: 20,
    position: 'relative',
    borderBottomWidth: 1.2,
    borderColor: '#ccc',
    backgroundColor: '#fff', // Added white background
    borderRadius: 8, // Optional: Add rounded corners for better appearance
    paddingHorizontal: 8, // Optional: Add padding inside the input wrapper
  },
  input: {
    height: 50,
    fontSize: 16,
    paddingHorizontal: 16,
    color: '#333',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 14,
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
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 19,
    fontFamily: 'HoryzenDigital-24', // Updated font
    textShadowColor: 'rgba(0, 0, 0, 0.3)', // Text shadow for 3D effect
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
