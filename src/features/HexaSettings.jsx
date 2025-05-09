import React, { useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  Linking,
  Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode } from '../redux/slices/profileSlice';
import { logoutUser } from '../redux/slices/authSlice';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  Platform,
  Linking,
  Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode } from '../redux/slices/profileSlice';
import { logoutUser } from '../redux/slices/authSlice';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HexaSettings = () => {
  const darkMode = useSelector(state => state.profile.darkMode);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownContent, setDropdownContent] = useState('');

  const showDropdown = (content) => {
    setDropdownContent(content);
    setDropdownVisible(true);
  };

  const hideDropdown = () => {
    setDropdownVisible(false);
    setDropdownContent('');
  };

  const handleToggleDarkMode = useCallback(() => {
    dispatch(toggleDarkMode());
  }, [dispatch]);

  const handleAboutPress = useCallback(() => {
    showDropdown('HavenSync Home Automation App\nVersion 1.0.0\n© 2024 HavenSync Inc.');
  }, []);

  const handleFeedbackPress = useCallback(() => {
    const email = 'support@havensync.com';
    const subject = 'HavenSync Feedback';

    Linking.openURL(`mailto:${email}?subject=${encodeURIComponent(subject)}`).catch(() => {
      showDropdown('Unable to open email client. Please contact us at support@havensync.com');
    });
  }, []);

  const handleIntegrationPress = useCallback((service) => {
    showDropdown(`Configure your ${service} integration here.`);
  }, []);

  const handleLogoutPress = useCallback(() => {
    showDropdown('Are you sure you want to logout? Confirm in the dropdown.');
  }, []);

  const confirmLogout = () => {
    dispatch(logoutUser());
    navigation.reset({
      index: 0,
      routes: [{ name: 'HexaLoginScreen' }],
    });
    hideDropdown();
  };


  return (
    <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        accessibilityLabel="Settings Scroll View"
      >
        <Text style={[styles.title, darkMode && styles.textWhite]}>Settings</Text>

        <View style={[styles.section, darkMode && styles.darkSection]}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkSectionTitle]}>
            Appearance
          </Text>
          <TouchableOpacity
            style={styles.optionRow}
            onPress={handleToggleDarkMode}
            accessibilityLabel="Toggle Dark Mode"
            accessibilityRole="switch"
          >
            <View style={styles.optionContent}>
              <Image
                source={require('../assets/gif/nightmode.gif')}
                style={styles.darkModeIcon}
              />
              <Text style={[styles.optionLabel, darkMode && styles.textWhite]}>
                Dark Mode
              </Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={handleToggleDarkMode}
              trackColor={{ false: '#999', true: '#4caf50' }}
              thumbColor={darkMode ? '#fff' : '#ccc'}
              ios_backgroundColor="#999"
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.section, darkMode && styles.darkSection]}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkSectionTitle]}>
            General
          </Text>
          <TouchableOpacity
            style={styles.optionRow}
            onPress={handleAboutPress}
            accessibilityLabel="About HavenSync"
            accessibilityRole="button"
          >
            <View style={styles.optionContent}>
              <Image
                source={require('../assets/gif/information.gif')}
                style={styles.aboutIcon}
              />
              <Text style={[styles.optionLabel, darkMode && styles.textWhite]}>
                About
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionRow}
            onPress={handleFeedbackPress}
            accessibilityLabel="Send Feedback"
            accessibilityRole="button"
          >
            <View style={styles.optionContent}>
              <Image
                source={require('../assets/gif/feedback.gif')}
                style={styles.feedbackIcon}
              />
              <Text style={[styles.optionLabel, darkMode && styles.textWhite]}>
                Feedback
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionRow}
            onPress={handleLogoutPress}
            accessibilityLabel="Logout"
            accessibilityRole="button"
          >
            <View style={styles.optionContent}>
              <Image
                source={require('../assets/gif/logout.gif')}
                style={styles.logoutIcon}
              />
              <Text style={[styles.optionLabel, darkMode && styles.textWhite]}>
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={[styles.section, darkMode && styles.darkSection]}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkSectionTitle]}>
            Integrations
          </Text>
          {[
            { name: 'Amazon Alexa', icon: 'alexa' },
            { name: 'Google Home', icon: 'home' },
          ].map((integration) => (
            <TouchableOpacity
              key={integration.name}
              style={styles.optionRow}
              onPress={() => handleIntegrationPress(integration.name)}
              accessibilityLabel={`Configure ${integration.name}`}
              accessibilityRole="button"
            >
              <View style={styles.optionContent}>
                {integration.name === 'Amazon Alexa' ? (
                  <Image
                    source={require('../assets/images/alexa.png')}
                    style={styles.integrationIcon}
                  />
                ) : integration.name === 'Google Home' ? (
                  <Image
                    source={require('../assets/images/google.png')}
                    style={styles.integrationIcon}
                  />
                ) : (
                  <Icon
                    name={integration.icon}
                    size={24}
                    color={darkMode ? '#fff' : '#333'}
                    style={styles.optionIcon}
                  />
                )}
                <Text style={[styles.optionLabel, darkMode && styles.textWhite]}>
                  {integration.name}
                </Text>
              </View>
              <Icon
                name="chevron-right"
                size={24}
                color={darkMode ? '#fff' : '#333'}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  darkSection: {
    backgroundColor: '#1e1e1e',
    borderColor: '#333',
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    padding: 16,
  },
  darkSectionTitle: {
    color: '#fff',
    backgroundColor: '#1e1e1e',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    marginRight: 12,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  textWhite: {
    color: '#fff',
  },
  logoutIcon: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  feedbackIcon: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  aboutIcon: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  darkModeIcon: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  integrationIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
});

export default HexaSettings;