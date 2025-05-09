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

  const [activeDropdown, setActiveDropdown] = useState(null);
  // Mock device data: In a real app, fetch from backend
  const [devices, setDevices] = useState([
    { id: '1', name: 'Smart Light', emails: ['user1@example.com'] },
    { id: '2', name: 'Thermostat', emails: ['user2@example.com', 'user3@example.com'] },
  ]);

  const toggleDropdown = (key) => {
    console.log('Toggling dropdown:', key, 'Current active:', activeDropdown);
    setActiveDropdown(activeDropdown === key ? null : key);
  };

  const handleToggleDarkMode = useCallback(() => {
    dispatch(toggleDarkMode());
  }, [dispatch]);

  const handleAboutPress = useCallback(() => {
    toggleDropdown('about');
  }, []);

  const handleFeedbackPress = useCallback(() => {
    const email = 'support@havensync.com';
    const subject = 'HavenSync Feedback';
    Linking.openURL(`mailto:${email}?subject=${encodeURIComponent(subject)}`).catch(() => {
      toggleDropdown('feedback');
    });
  }, []);

  const handleDevicesPress = useCallback(() => {
    toggleDropdown('devices');
  }, []);

  const handleIntegrationPress = useCallback((service) => {
    toggleDropdown(`integration-${service}`);
  }, []);

  const handleLogoutPress = useCallback(() => {
    toggleDropdown('logout');
  }, []);

  const confirmLogout = () => {
    dispatch(logoutUser());
    navigation.reset({
      index: 0,
      routes: [{ name: 'HexaLoginScreen' }],
    });
    setActiveDropdown(null);
  };

  const handleManageDeviceEmails = useCallback((deviceId) => {
    // Placeholder: Navigate to email management screen for the device
    // navigation.navigate('ManageDeviceEmailsScreen', { deviceId });
    toggleDropdown('devices');
  }, []);

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
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
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
          <View>
            <TouchableOpacity
              style={styles.optionRow}
              onPress={handleAboutPress}
              accessibilityLabel="About HavenSync"
              accessibilityRole="button"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
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
              <Icon
                name={activeDropdown === 'about' ? 'expand-less' : 'expand-more'}
                size={24}
                color={darkMode ? '#fff' : '#333'}
              />
            </TouchableOpacity>
            {activeDropdown === 'about' && (
              <View style={[styles.dropdownContent, darkMode && styles.darkDropdownContent]}>
                <Text style={[styles.dropdownText, darkMode && styles.textWhite]}>
                  HavenSync Home Automation App
                  {'\n'}Version 1.0.0
                  {'\n'}© 2024 HavenSync Inc.
                </Text>
              </View>
            )}
          </View>

          <View>
            <TouchableOpacity
              style={styles.optionRow}
              onPress={handleFeedbackPress}
              accessibilityLabel="Send Feedback"
              accessibilityRole="button"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
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
              <Icon
                name={activeDropdown === 'feedback' ? 'expand-less' : 'expand-more'}
                size={24}
                color={darkMode ? '#fff' : '#333'}
              />
            </TouchableOpacity>
            {activeDropdown === 'feedback' && (
              <View style={[styles.dropdownContent, darkMode && styles.darkDropdownContent]}>
                <Text style={[styles.dropdownText, darkMode && styles.textWhite]}>
                  Unable to open email client. Please contact us at support@havensync.com
                </Text>
              </View>
            )}
          </View>

          <View>
            <TouchableOpacity
              style={styles.optionRow}
              onPress={handleDevicesPress}
              accessibilityLabel="Manage Devices"
              accessibilityRole="button"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <View style={styles.optionContent}>
                {/* Image 'devices.gif' is missing, replacing with 'profile.gif' as placeholder */}
                <Image
                  source={require('../assets/gif/profile.gif')}
                  style={styles.devicesIcon}
                />
                <Text style={[styles.optionLabel, darkMode && styles.textWhite]}>
                  Manage Devices
                </Text>
              </View>
              <Icon
                name={activeDropdown === 'devices' ? 'expand-less' : 'expand-more'}
                size={24}
                color={darkMode ? '#fff' : '#333'}
              />
            </TouchableOpacity>
            {activeDropdown === 'devices' && (
              <View style={[styles.dropdownContent, darkMode && styles.darkDropdownContent]}>
                <Text style={[styles.dropdownText, darkMode && styles.textWhite]}>
                  Assign email IDs to manage devices:
                </Text>
                {devices.map((device) => (
                  <View key={device.id} style={styles.deviceRow}>
                    <View>
                      <Text style={[styles.dropdownText, darkMode && styles.textWhite]}>
                        {device.name}
                      </Text>
                      <Text style={[styles.emailText, darkMode && styles.textWhite]}>
                        Emails: {device.emails.length}/5 ({device.emails.join(', ') || 'None'})
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.manageEmailsButton}
                      onPress={() => handleManageDeviceEmails(device.id)}
                      accessibilityLabel={`Manage emails for ${device.name}`}
                      accessibilityRole="button"
                      disabled={device.emails.length >= 5}
                    >
                      <Text style={styles.buttonText}>
                        {device.emails.length >= 5 ? 'Max Reached' : 'Manage Emails'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>

          <View>
            <TouchableOpacity
              style={styles.optionRow}
              onPress={handleLogoutPress}
              accessibilityLabel="Logout"
              accessibilityRole="button"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
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
              <Icon
                name={activeDropdown === 'logout' ? 'expand-less' : 'expand-more'}
                size={24}
                color={darkMode ? '#fff' : '#333'}
              />
            </TouchableOpacity>
            {activeDropdown === 'logout' && (
              <View style={[styles.dropdownContent, darkMode && styles.darkDropdownContent]}>
                <Text style={[styles.dropdownText, darkMode && styles.textWhite]}>
                  Are you sure you want to logout?
                </Text>
                <View style={styles.dropdownButtonContainer}>
                  <TouchableOpacity
                    style={[styles.dropdownButton, styles.confirmButton]}
                    onPress={confirmLogout}
                  >
                    <Text style={styles.buttonText}>Confirm</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.dropdownButton, styles.cancelButton]}
                    onPress={() => toggleDropdown('logout')}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>

        <View style={[styles.section, darkMode && styles.darkSection]}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkSectionTitle]}>
            Integrations
          </Text>
          {[
            { name: 'Amazon Alexa', icon: 'alexa' },
            { name: 'Google Home', icon: 'home' },
          ].map((integration) => (
            <View key={integration.name}>
              <TouchableOpacity
                style={styles.optionRow}
                onPress={() => handleIntegrationPress(integration.name)}
                accessibilityLabel={`Configure ${integration.name}`}
                accessibilityRole="button"
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
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
                  name={activeDropdown === `integration-${integration.name}` ? 'expand-less' : 'expand-more'}
                  size={24}
                  color={darkMode ? '#fff' : '#333'}
                />
              </TouchableOpacity>
              {activeDropdown === `integration-${integration.name}` && (
                <View style={[styles.dropdownContent, darkMode && styles.darkDropdownContent]}>
                  <Text style={[styles.dropdownText, darkMode && styles.textWhite]}>
                    Configure your {integration.name} integration here.
                  </Text>
                </View>
              )}
            </View>
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
    zIndex: 1,
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
  devicesIcon: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  integrationIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  dropdownContent: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginTop: 0,
  },
  darkDropdownContent: {
    backgroundColor: '#2a2a2a',
    borderBottomColor: '#444',
  },
  dropdownText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  subHeader: {
    fontWeight: '600',
    marginTop: 8,
  },
  emailText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  dropdownButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  dropdownButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 0.45,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#e74c3c',
  },
  cancelButton: {
    backgroundColor: '#3498db',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  deviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  manageEmailsButton: {
    backgroundColor: '#3498db',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default HexaSettings;