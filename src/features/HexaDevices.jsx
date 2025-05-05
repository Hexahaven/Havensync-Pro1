import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
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

const App = () => {
  const [selectedFan, setSelectedFan] = useState(0);
  const [fanSpeeds, setFanSpeeds] = useState(Array(5).fill(FAN_SPEEDS.Off));
  const [timers, setTimers] = useState(Array(5).fill(0));
  const fanRotations = Array(5)
    .fill()
    .map(() => useSharedValue(0));
  const animatedFanStyles = fanRotations.map(rotation =>
    useAnimatedStyle(() => ({
      transform: [{rotate: `${rotation.value}deg`}],
    })),
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
            {duration: 100},
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

  const formatTime = seconds => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fan Control Panel</Text>
      <Picker
        selectedValue={selectedFan}
        onValueChange={itemValue => setSelectedFan(itemValue)}
        style={styles.picker}>
        {[...Array(5).keys()].map(i => (
          <Picker.Item key={i} label={`Fan ${i + 1}`} value={i} />
        ))}
      </Picker>
      <Text style={styles.label}>Speed: {Object.keys(FAN_SPEEDS)[fanSpeeds[selectedFan]]}</Text>
      <View style={styles.buttonRow}>
        {Object.keys(FAN_SPEEDS).map(speed => (
          <Button key={speed} title={speed} onPress={() => setFanSpeed(FAN_SPEEDS[speed])} />
        ))}
      </View>
      <Text style={styles.label}>Timer: {formatTime(timers[selectedFan])}</Text>
      <View style={styles.buttonRow}>
        <Button title="30s" onPress={() => setTimer(30)} />
        <Button title="1 min" onPress={() => setTimer(60)} />
        <Button title="5 min" onPress={() => setTimer(300)} />
        <Button title="Clear" onPress={() => setTimer(0)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#f0f0f0'},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 10},
  picker: {height: 50, width: 150},
  label: {fontSize: 18, marginVertical: 10},
  buttonRow: {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10},
});

export default App;
