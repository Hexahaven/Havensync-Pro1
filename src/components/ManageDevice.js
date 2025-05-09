import React, { useState, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ManageDeviceEmailsScreen = () => {
  const darkMode = useSelector(state => state.profile.darkMode);
  const navigation = useNavigation();

  // Mock device data: In a real app, fetch from backend
  const [devices, setDevices] = useState([
    { id: '1', name: 'Smart Light', emails: ['user1@example.com'] },
    { id: '2', name: 'Thermostat', emails: ['user2@example.com', 'user3@example.com'] },
  ]);
  const [newEmail, setNewEmail] = useState('');
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleAddEmail = useCallback((deviceId) => {
    if (!newEmail) {
      setError('Please enter an email address.');
      return;
    }
    if (!validateEmail(newEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    setDevices((prevDevices) =>
      prevDevices.map((device) => {
        if (device.id === deviceId) {
          if (device.emails.length >= 5) {
            setError('Maximum 5 emails allowed per device.');
            return device;
          }
          if (device.emails.includes(newEmail)) {
            setError('This email is already assigned to the device.');
            return device;
          }
          return { ...device, emails: [...device.emails, newEmail] };
        }
        return device;
      })
    );
    setNewEmail('');
    setError('');
  }, [newEmail]);

  const handleRemoveEmail = useCallback((deviceId, emailToRemove) => {
    setDevices((prevDevices) =>
      prevDevices.map((device) => {
        if (device.id === deviceId) {
          return {
            ...device,
            emails: device.emails.filter((email) => email !== emailToRemove),
          };
        }
        return device;
      })
    );
    setError('');
  }, []);

  const toggleEmailInput = useCallback((deviceId) => {
    setSelectedDeviceId(selectedDeviceId === deviceId ? null : deviceId);
    setNewEmail('');
    setError('');
  }, [selectedDeviceId]);

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        accessibilityLabel="Manage Devices Scroll View"
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            accessibilityLabel="Go Back"
            accessibilityRole="button"
          >
            <Icon
              name="arrow-back"
              size={24}
              color={darkMode ? '#fff' : '#333'}
            />
          </TouchableOpacity>
          <Text style={[styles.title, darkMode && styles.textWhite]}>
            Manage Devices
          </Text>
        </View>

        <View style={[styles.section, darkMode && styles.darkSection]}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkSectionTitle]}>
            Assign Email IDs to Devices
          </Text>
          {devices.map((device) => (
            <View key={device.id} style={styles.deviceContainer}>
              <View style={styles.deviceHeader}>
                <View style={styles.deviceInfo}>
                  <Image
                    source={require('../assets/gif/profile.gif')}
                    style={styles.deviceIcon}
                  />
                  <Text style={[styles.deviceName, darkMode && styles.textWhite]}>
                    {device.name}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => toggleEmailInput(device.id)}
                  accessibilityLabel={`Toggle email input for ${device.name}`}
                  accessibilityRole="button"
                >
                  <Icon
                    name={selectedDeviceId === device.id ? 'expand-less' : 'expand-more'}
                    size={24}
                    color={darkMode ? '#fff' : '#333'}
                  />
                </TouchableOpacity>
              </View>

              {selectedDeviceId === device.id && (
                <View style={styles.emailInputContainer}>
                  <TextInput
                    style={[styles.emailInput, darkMode && styles.darkEmailInput]}
                    value={newEmail}
                    onChangeText={setNewEmail}
                    placeholder="Enter email address"
                    placeholderTextColor={darkMode ? '#888' : '#999'}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    style={[
                      styles.addButton,
                      device.emails.length >= 5 && styles.disabledButton,
                    ]}
                    onPress={() => handleAddEmail(device.id)}
                    disabled={device.emails.length >= 5}
                    accessibilityLabel={`Add email to ${device.name}`}
                    accessibilityRole="button"
                  >
                    <Text style={styles.buttonText}>
                      {device.emails.length >= 5 ? 'Max Reached' : 'Add Email'}
                    </Text>
                  </TouchableOpacity>
                  {error && selectedDeviceId === device.id && (
                    <Text style={styles.errorText}>{error}</Text>
                  )}
                </View>
              )}

              <View style={styles.emailList}>
                <Text style={[styles.emailCount, darkMode && styles.textWhite]}>
                  Emails: {device.emails.length}/5
                </Text>
                {device.emails.length > 0 ? (
                  device.emails.map((email) => (
                    <View key={email} style={styles.emailRow}>
                      <Text style={[styles.emailText, darkMode && styles.textWhite]}>
                        {email}
                      </Text>
                      <TouchableOpacity
                        onPress={() => handleRemoveEmail(device.id, email)}
                        accessibilityLabel={`Remove ${email} from ${device.name}`}
                        accessibilityRole="button"
                      >
                        <Icon
                          name="close"
                          size={20}
                          color={darkMode ? '#fff' : '#333'}
                        />
                      </TouchableOpacity>
                    </View>
                  ))
                ) : (
                  <Text style={[styles.noEmailsText, darkMode && styles.textWhite]}>
                    No emails assigned
                  </Text>
                )}
              </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginLeft: 16,
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
  deviceContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  deviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceIcon: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  emailInputContainer: {
    marginTop: 12,
  },
  emailInput: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom : 8,
  },
  darkEmailInput: {
    backgroundColor: '#2a2a2a',
    color: '#fff',
    borderColor: '#444',
  },
  addButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 14,
    marginTop: 4,
  },
  emailList: {
    marginTop: 12,
  },
  emailCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  emailText: {
    fontSize: 14,
    color: '#333',
  },
  noEmailsText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  textWhite: {
    color: '#fff',
  },
});

export default ManageDeviceEmailsScreen;