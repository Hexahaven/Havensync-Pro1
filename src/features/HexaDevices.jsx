import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Modal,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FAN_SPEEDS = ['Off', 'Low', 'Medium', 'High'];

const TimePickerModal = ({ visible, onClose, onSchedule }) => {
  const [time, setTime] = useState('');

  const handleSubmit = () => {
    const seconds = parseInt(time);
    if (!isNaN(seconds)) {
      onSchedule(seconds);
      setTime('');
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.label}>Enter timer in seconds:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={time}
            onChangeText={setTime}
            placeholder="E.g. 10"
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={handleSubmit} style={styles.setButton}>
              <Text style={styles.buttonText}>Set</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const DeviceCard = ({ device, onUpdate }) => {
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [localName, setLocalName] = useState(device.name || '');
  const glow = useSharedValue(device.connected ? 1 : 0);

  const animatedStyle = useAnimatedStyle(() => ({
    shadowOpacity: withTiming(glow.value, { duration: 500 }),
    shadowColor: device.connected ? 'green' : 'gray',
    shadowRadius: glow.value ? 8 : 0,
  }));

  const toggleSwitch = () => {
    onUpdate({ ...device, isOn: !device.isOn });
  };

  const handleSpeedChange = (value) => {
    onUpdate({ ...device, fanSpeed: value });
  };

  const handleSchedule = (seconds) => {
    // Replace this with actual timer logic
    console.log(`${device.name} scheduled for ${seconds} seconds`);
  };

  const handleEditSave = () => {
    onUpdate({ ...device, name: localName });
    setIsEditing(false);
  };

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <TouchableOpacity onLongPress={() => setIsEditing(true)} style={styles.topRow}>
        <Icon name={device.icon || 'power-socket'} size={28} color="#444" />
        <Text style={styles.status}>
          {device.connected ? 'Active' : 'Inactive'}
        </Text>
      </TouchableOpacity>

      {isEditing ? (
        <TextInput
          value={localName}
          onChangeText={setLocalName}
          style={styles.nameInput}
          onSubmitEditing={handleEditSave}
        />
      ) : (
        <Text style={styles.deviceName}>{device.name}</Text>
      )}

      <Switch value={device.isOn} onValueChange={toggleSwitch} />

      <Picker
        selectedValue={device.fanSpeed}
        onValueChange={handleSpeedChange}
        style={styles.picker}>
        {FAN_SPEEDS.map((speed) => (
          <Picker.Item label={speed} value={speed} key={speed} />
        ))}
      </Picker>

      <TouchableOpacity
        onPress={() => setShowTimerModal(true)}
        style={styles.timerButton}>
        <Text style={styles.buttonText}>Set Timer</Text>
      </TouchableOpacity>

      <TimePickerModal
        visible={showTimerModal}
        onClose={() => setShowTimerModal(false)}
        onSchedule={handleSchedule}
      />
    </Animated.View>
  );
};

const HexaDevices = () => {
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: 'Living Room Fan',
      icon: 'fan',
      isOn: false,
      fanSpeed: 'Off',
      connected: true,
    },
    {
      id: 2,
      name: 'Bedroom Light',
      icon: 'lightbulb',
      isOn: true,
      fanSpeed: 'Low',
      connected: false,
    },
    // Add 3 more if needed
  ]);

  const handleUpdateDevice = (updatedDevice) => {
    setDevices((prev) =>
      prev.map((d) => (d.id === updatedDevice.id ? updatedDevice : d))
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {devices.map((device) => (
        <DeviceCard
          key={device.id}
          device={device}
          onUpdate={handleUpdateDevice}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 8,
  },
  nameInput: {
    borderBottomWidth: 1,
    padding: 4,
  },
  status: {
    fontSize: 12,
    color: '#888',
  },
  picker: {
    height: 40,
    width: '100%',
    marginVertical: 8,
  },
  timerButton: {
    backgroundColor: '#3b82f6',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: '#fff',
    marginHorizontal: 30,
    borderRadius: 12,
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  setButton: {
    backgroundColor: '#10b981',
    padding: 10,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#ef4444',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
  },
});

export default HexaDevices;
