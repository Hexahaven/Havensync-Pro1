import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Modal, Image, Animated, Easing } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import Feather from 'react-native-vector-icons/Feather';
// Note: If you need LinearGradient, you'll need to install react-native-linear-gradient
// import LinearGradient from 'react-native-linear-gradient';

const sampleDevices = [
  { id: '1', name: 'Living Room', isOn: false, image: require('../assets/icons/nodevice.png') },
  { id: '2', name: 'Bedroom', isOn: true, image: require('../assets/icons/nodevice.png') },
  { id: '3', name: 'Kitchen', isOn: false, image: require('../assets/icons/nodevice.png') },
];

export default function HexaDevices() {
  const [devices, setDevices] = useState(sampleDevices);
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const toggleDevice = (id) => {
    const updated = devices.map(device => {
      if (device.id === id) {
        return { ...device, isOn: !device.isOn };
      }
      return device;
    });
    setDevices(updated);
  };

  const handleEdit = (id, currentName) => {
    setEditingId(id);
    setEditedName(currentName);
  };

  const saveEdit = (id) => {
    const updated = devices.map(device => {
      if (device.id === id) {
        return { ...device, name: editedName };
      }
      return device;
    });
    setDevices(updated);
    setEditingId(null);
    setEditedName('');
  };

  const openModal = (device) => {
    setSelectedDevice(device);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => {
    const glowAnim = new Animated.Value(0);

    const animateGlow = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, { toValue: 1, duration: 800, useNativeDriver: false, easing: Easing.inOut(Easing.ease) }),
          Animated.timing(glowAnim, { toValue: 0, duration: 800, useNativeDriver: false, easing: Easing.inOut(Easing.ease) }),
        ])
      ).start();
    };

    if (item.isOn) animateGlow();

    const glowStyle = item.isOn
      ? {
          shadowColor: '#00f7ff',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.9,
          shadowRadius: 10,
          backgroundColor: '#1f2d3a',
          borderColor: '#00f7ff',
        }
      : {
          backgroundColor: '#1c1c1c',
          borderColor: '#333',
        };

    return (
      <Animated.View style={[styles.deviceCard, glowStyle]}>
        <Image source={item.image} style={styles.deviceIcon} />
        {editingId === item.id ? (
          <TextInput
            value={editedName}
            onChangeText={setEditedName}
            onSubmitEditing={() => saveEdit(item.id)}
            style={styles.editInput}
          />
        ) : (
          <Text style={styles.deviceName}>{item.name}</Text>
        )}
        <TouchableOpacity onPress={() => handleEdit(item.id, item.name)} style={styles.editIcon}>
          <Feather name="edit-2" size={18} color="#bbb" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleDevice(item.id)}
          style={[styles.toggleButton, item.isOn ? styles.toggleOn : styles.toggleOff]}
        >
          <Text style={styles.toggleText}>{item.isOn ? 'ON' : 'OFF'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openModal(item)} style={styles.timerButton}>
          <MaterialIcons name="timer" size={22} color="#ccc" />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={devices}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
      />

      {/* Timer/Delay Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Set Timer / Delay</Text>
            <Text style={styles.modalSubtitle}>Device: {selectedDevice?.name}</Text>
            {/* Timer/Delay Settings go here */}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalClose}>
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 16,
  },
  list: {
    justifyContent: 'space-between',
  },
  deviceCard: {
    flex: 1,
    margin: 8,
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    position: 'relative',
  },
  deviceIcon: {
    width: 48,
    height: 48,
    marginBottom: 10,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f1f5f9',
  },
  editInput: {
    fontSize: 16,
    color: '#fff',
    borderBottomWidth: 1,
    borderColor: '#888',
    width: 100,
    textAlign: 'center',
  },
  editIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  toggleButton: {
    marginTop: 14,
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  toggleOn: {
    backgroundColor: '#00f7ff',
  },
  toggleOff: {
    backgroundColor: '#374151',
  },
  toggleText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  timerButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: '#0009',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 16,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  modalSubtitle: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 20,
  },
  modalClose: {
    backgroundColor: '#0ea5e9',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalCloseText: {
    color: '#fff',
    fontWeight: '600',
  },
});