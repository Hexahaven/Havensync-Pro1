import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode } from '../redux/slices/profileSlice';
import { logoutUser } from '../redux/slices/authSlice';
import { useNavigation } from '@react-navigation/native';

export default function HexaSettings() {
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.profile.darkMode);
  const navigation = useNavigation();

  const themed = {
    bg: darkMode ? '#1c1c1e' : '#f5f7fb',
    card: darkMode ? '#2c2c2e' : '#ffffff',
    text: darkMode ? '#ffffff' : '#1e1e1e',
    subText: darkMode ? '#bbb' : '#777',
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigation.reset({
      index: 0,
      routes: [{ name: 'HexaLoginScreen' }],
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themed.bg }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Profile Section */}
        <View style={[styles.profileCard, { backgroundColor: themed.card }]}>
          <Image
            source={require('../assets/images/default_avatar.png')}
            style={styles.avatar}
          />
          <View style={styles.profileText}>
            <Text style={[styles.nickname, { color: themed.text }]}>
              Tap to Set Nickname
            </Text>
          </View>
        </View>

        {/* Third-Party Services */}
        <View style={[styles.sectionCard, { backgroundColor: themed.card }]}>
          <Text style={[styles.sectionTitle, { color: themed.text }]}>
            Third-Party Services
          </Text>
          <View style={styles.serviceIcons}>
            {[
              { name: 'Alexa', icon: require('../assets/images/alexa.png') },
              { name: 'Google', icon: require('../assets/images/google.png') },
              { name: 'SmartThings', icon: require('../assets/images/st.png') },
              { name: 'IFTTT', icon: require('../assets/images/ifttt.png') },
            ].map(service => (
              <TouchableOpacity key={service.name} style={styles.iconButton}>
                <Image source={service.icon} style={styles.serviceIcon} />
                <Text style={[styles.serviceLabel, { color: themed.subText }]}>
                  {service.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Settings Options */}
        <View style={[styles.sectionCard, { backgroundColor: themed.card }]}>
          {[
            'Home Management',
            'Message Center',
            'Help Center',
            'Android Auto',
            'Google Home Devices',
          ].map(item => (
            <TouchableOpacity key={item} style={styles.row}>
              <Text style={[styles.rowLabel, { color: themed.text }]}>{item}</Text>
              <Text style={[styles.arrow, { color: themed.subText }]}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Appearance */}
        <View style={[styles.sectionCard, { backgroundColor: themed.card }]}>
          <TouchableOpacity style={styles.row}>
            <Text style={[styles.rowLabel, { color: themed.text }]}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={() => dispatch(toggleDarkMode())}
              trackColor={{ false: '#aaa', true: '#4caf50' }}
              thumbColor={darkMode ? '#fff' : '#ccc'}
            />
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    padding: 16,
    paddingBottom: 40,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
    marginBottom: 20,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#ddd',
    marginRight: 14,
  },
  profileText: {
    flex: 1,
  },
  nickname: {
    fontSize: 16,
    fontWeight: '600',
  },
  sectionCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 14,
  },
  serviceIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconButton: {
    alignItems: 'center',
    flex: 1,
  },
  serviceIcon: {
    width: 36,
    height: 36,
    marginBottom: 6,
  },
  serviceLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  rowLabel: {
    fontSize: 16,
  },
  arrow: {
    fontSize: 18,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutText: {
    fontSize: 16,
    color: '#e74c3c',
    fontWeight: '600',
  },
});
