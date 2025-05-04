import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function HexaLoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.container}>
      <View style={styles.glassCard}>
        <Text style={styles.title}>Welcome Back</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ddd"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ddd"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HexaDashboard')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.switchText}>
          Don't have an account?{' '}
          <Text onPress={() => navigation.navigate('HexaSignUpScreen')} style={{fontWeight: '700'}}>Sign Up</Text>
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  glassCard: {
    width: '85%',
    padding: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.3,
    shadowRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  title: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: '700',
  },
  input: {
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingHorizontal: 15,
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  buttonText: {
    color: '#2a5298',
    fontSize: 18,
    fontWeight: '700',
  },
  switchText: {
    textAlign: 'center',
    color: '#eee',
    marginTop: 10,
  },
});
