import {ScrollView, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {GreetingSection} from '../components/GreetingSection';
import {WeatherSection} from '../components/WeatherSection';
import SwitchSection from '../components/SwitchSection';
import LinearGradient from 'react-native-linear-gradient';

export default function HexaDashboard() {
  return (
    <SafeAreaProvider>
      <LinearGradient
        colors={['#cde7f0', '#ffffff']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={{flex: 1}}>
        <SafeAreaView className="flex-1">
          <ScrollView
            className="flex-1 space-y-6 p-6"
            showsVerticalScrollIndicator={false}>
            <View className="shadow-2xl shadow-blue-200 bg-white/50 rounded-2xl p-4">
              <GreetingSection />
            </View>
            <View className="shadow-2xl shadow-blue-200 bg-white/60 rounded-2xl p-4">
              <WeatherSection />
            </View>
            <View className="shadow-2xl shadow-blue-200 bg-white/60 rounded-2xl p-4">
              <SwitchSection />
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
} 
