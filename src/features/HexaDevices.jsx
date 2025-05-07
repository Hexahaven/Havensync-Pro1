import React, {useState} from 'react';
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
import {Picker} from '@react-native-picker/picker';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FAN_SPEEDS = ['Off', 'Low', 'Medium', 'High'];

const TimePickerModal = ({visible, onClose, onSchedule}) => {
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

const DeviceCard = ({device, onUpdate}) => {
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [localName, setLocalName] = useState(device.name);

  const fanRotation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${fanRotation.value}deg`}],
  }));

  const handleSpeedChange = value => {
    const index = FAN_SPEEDS.indexOf(value);
    fanRotation.value = withTiming(index * 180, {duration: 500});
    onUpdate({...device, fanSpeed: value});
  };

  const togglePower = () => {
    onUpdate({...device, isOn: !device.isOn});
  };

  const scheduleTimer = seconds => {
    onUpdate({...device, timer: seconds});
  };

  const toggleConnection = () => {
    onUpdate({...device, isConnected: !device.isConnected});
  };

  const saveEdit = () => {
    onUpdate({...device, name: localName});
    setIsEditing(false);
  };

  return (
    <View
      style={[
        styles.deviceCard,
        {backgroundColor: device.isConnected ? '#e0f7fa' : '#f8d7da'},
      ]}>
      <TouchableOpacity onLongPress={toggleConnection}>
        <Animated.View style={[styles.iconContainer, animatedStyle]}>
          <Icon
            name={device.icon || 'fan'}
            size={40}
            color={device.isConnected ? '#00796b' : '#aaa'}
          />
        </Animated.View>
      </TouchableOpacity>

      {isEditing ? (
        <TextInput
          style={styles.nameInput}
          value={localName}
          onChangeText={setLocalName}
          onBlur={saveEdit}
          onSubmitEditing={saveEdit}
        />
      ) : (
        <TouchableOpacity onPress={() => setIsEditing(true)}>
          <Text style={styles.deviceName}>{device.name}</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.statusText}>
        Status:{' '}
        <Text style={{fontWeight: 'bold'}}>
          {device.isConnected ? 'Active' : 'Inactive'}
        </Text>
      </Text>

      <View style={styles.controlsRow}>
        <Text>Power</Text>
        <Switch
          value={device.isOn}
          onValueChange={togglePower}
          thumbColor={device.isConnected ? '#4caf50' : '#ccc'}
          trackColor={{false: '#ddd', true: '#a5d6a7'}}
        />
      </View>

      <View style={styles.pickerRow}>
        <Text>Speed</Text>
        <Picker
          selectedValue={device.fanSpeed}
          style={styles.picker}
          onValueChange={handleSpeedChange}>
          {FAN_SPEEDS.map(speed => (
            <Picker.Item key={speed} label={speed} value={speed} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity
        style={styles.scheduleButton}
        onPress={() => setShowTimerModal(true)}>
        <Text style={styles.scheduleText}>
          Schedule Timer ({device.timer || 'None'}s)
        </Text>
      </TouchableOpacity>

      <TimePickerModal
        visible={showTimerModal}
        onClose={() => setShowTimerModal(false)}
        onSchedule={scheduleTimer}
      />
    </View>
  );
};

const HexaDevices = () => {
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: 'Living Room Fan',
      icon: 'fan',
      isConnected: true,
      isOn: false,
      fanSpeed: 'Off',
      timer: 0,
    },
    {
      id: 2,
      name: 'Bedroom Light',
      icon: 'lightbulb-on',
      isConnected: false,
      isOn: false,
      fanSpeed: 'Off',
      timer: 0,
    },
    {
      id: 3,
      name: 'Hall Fan',
      icon: 'fan',
      isConnected: true,
      isOn: true,
      fanSpeed: 'Medium',
      timer: 20,
    },
    {
      id: 4,
      name: 'Kitchen Switch',
      icon: 'light-switch',
      isConnected: true,
      isOn: false,
      fanSpeed: 'Off',
      timer: 0,
    },
    {
      id: 5,
      name: 'Bathroom Light',
      icon: 'lightbulb-on-outline',
      isConnected: false,
      isOn: false,
      fanSpeed: 'Off',
      timer: 0,
    },
  ]);

  const updateDevice = updatedDevice => {
    setDevices(prev =>
      prev.map(dev => (dev.id === updatedDevice.id ? updatedDevice : dev)),
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Devices</Text>
      {devices.map(device => (
        <DeviceCard
          key={device.id}
          device={device}
          onUpdate={updateDevice}
        />
      ))}
    </ScrollView>
  );
};

export default HexaDevices;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 50,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  deviceCard: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 16,
    elevation: 3,
  },
  iconContainer: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  deviceName: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  statusText: {
    textAlign: 'center',
    marginBottom: 10,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  pickerRow: {
    marginBottom: 10,
  },
  picker: {
    width: '100%',
  },
  scheduleButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  scheduleText: {
    color: '#007aff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    width: '80%',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  setButton: {
    backgroundColor: '#007aff',
    padding: 10,
    borderRadius: 12,
  },
  cancelButton: {
    backgroundColor: '#aaa',
    padding: 10,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
  },
  nameInput: {
    fontSize: 18,
    borderBottomColor: '#999',
    borderBottomWidth: 1,
    marginBottom: 8,
    textAlign: 'center',
  },
});
