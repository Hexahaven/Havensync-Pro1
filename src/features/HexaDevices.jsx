import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const FAN_SPEEDS = {
  Off: 0,
  Low: 1,
  Medium: 2,
  High: 3,
};

// Simple Timer Modal Implementation
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
          <View style={{flexDirection: 'row', gap: 10}}>
            <Button title="Set Timer" onPress={handleSubmit} />
            <Button title="Cancel" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const HexaDevices = () => {
  const [selectedFan, setSelectedFan] = useState(0);
  const [fanSpeeds, setFanSpeeds] = useState(Array(5).fill(FAN_SPEEDS.Off));
  const [timers, setTimers] = useState(Array(5).fill(0));
  const [modalVisible, setModalVisible] = useState(false);
  const fanRotations = Array(5)
    .fill()
    .map(() => useSharedValue(0));

  const animatedFanStyles = fanRotations.map(rotation =>
    useAnimatedStyle(() => ({
      transform: [{rotate: `${rotation.value}deg`}],
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setFanSpeeds(currentSpeeds => {
        return currentSpeeds.map((speed, index) => {
          if (timers[index] > 0) {
            setTimers(currentTimers => {
              const newTimers = [...currentTimers];
              newTimers[index] -= 1;
              return newTimers;
            });
            return speed;
          } else if (timers[index] === 0 && speed !== FAN_SPEEDS.Off) {
            const newSpeeds = [...currentSpeeds];
            newSpeeds[index] = FAN_SPEEDS.Off;
            return newSpeeds[index];
          }
          return speed;
        });
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timers]);

  useEffect(() => {
    fanSpeeds.forEach((speed, index) => {
      const rotationSpeed = speed * 5;
      if (rotationSpeed === 0) {
        fanRotations[index].value = withTiming(0, {duration: 500});
      } else {
        const interval = setInterval(() => {
          fanRotations[index].value = withTiming(
            fanRotations[index].value + rotationSpeed,
            {duration: 100}
          );
        }, 100);
        return () => clearInterval(interval);
      }
    });
  }, [fanSpeeds]);

  const setFanSpeed = speed => {
    const newSpeeds = [...fanSpeeds];
    newSpeeds[selectedFan] = speed;
    setFanSpeeds(newSpeeds);
  };

  const setTimer = seconds => {
    const newTimers = [...timers];
    newTimers[selectedFan] = seconds;
    setTimers(newTimers);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Fan Control Panel</Text>

      {/* Fan Rotation Display */}
      <Animated.View style={[styles.fanVisual, animatedFanStyles[selectedFan]]}>
        <Text style={styles.fanLabel}>Fan {selectedFan + 1}</Text>
      </Animated.View>

      <Picker
        selectedValue={selectedFan}
        onValueChange={itemValue => setSelectedFan(itemValue)}
        style={styles.picker}>
        {[...Array(5).keys()].map(i => (
          <Picker.Item key={i} label={`Fan ${i + 1}`} value={i} />
        ))}
      </Picker>

      <Text style={styles.label}>
        Speed: {Object.keys(FAN_SPEEDS)[fanSpeeds[selectedFan]]}
      </Text>
      <Text style={styles.label}>
        Timer: {timers[selectedFan]} seconds
      </Text>

      <View style={styles.buttonRow}>
        {Object.keys(FAN_SPEEDS).map(speed => (
          <Button
            key={speed}
            title={speed}
            onPress={() => setFanSpeed(FAN_SPEEDS[speed])}
          />
        ))}
      </View>

      <Button title="Set Timer" onPress={() => setModalVisible(true)} />

      <TimePickerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSchedule={time => setTimer(time)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  picker: {
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  fanVisual: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'center',
  },
  fanLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 4,
    padding: 10,
    marginBottom: 16,
  },
});

export default HexaDevices;
