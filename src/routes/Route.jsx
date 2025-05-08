import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TouchableOpacity, Text, StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import LinearGradient from 'react-native-linear-gradient';
import * as Components from '../imports/imports';
import Animated, {SlideInUp} from 'react-native-reanimated';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

const CustomBackButton = React.memo(() => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      }}
      className="py-1">
      <FontAwesomeIcon icon={faChevronLeft} size={22} color="#fff" />
    </TouchableOpacity>
  );
});

const CustomHeader = ({title, showBackButton}) => {
  const mainToggleTimer = useSelector(state => state.switches.mainToggleTimer);

  const formatTime = seconds => {
    if (typeof seconds !== 'number' || isNaN(seconds) || seconds < 0) {
      return '00:00:00';
    }
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const safeTitle = typeof title === 'string' ? title : '';

  return (
    <>
      <StatusBar backgroundColor="#84c3e0" barStyle="light-content" />
      <LinearGradient
        colors={['#84c3e0', '#bedcea']}
        style={{borderBottomLeftRadius: 50, borderBottomRightRadius: 50}}
        className="h-[70px] flex-row items-start px-5 pb-10 pt-4">
        {showBackButton && <CustomBackButton />}
        <Animated.View entering={SlideInUp.delay(150)} className="flex-1">
          <Text className="text-white text-xl font-bold text-center">
            {safeTitle}
          </Text>
          {mainToggleTimer > 0 && (
            <Animated.View entering={SlideInUp.delay(150)} className="ml-2">
              <Text className="text-white text-lg font-semibold text-center">
                {formatTime(mainToggleTimer)}
              </Text>
            </Animated.View>
          )}
        </Animated.View>
      </LinearGradient>
    </>
  );
};

export default function Routes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
          height: 70,
        },
        headerTitleAlign: 'center',
        animation: 'slide_from_right',
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}>

      <Stack.Screen
        name="HexaWelcomeScreen"
        component={Components.HexaWelcomeScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="HexaLoginScreen"
        component={Components.HexaLoginScreen}
        options={{
          headerShown: false, // Disable the header for this screen
        }}
      />

      <Stack.Screen
        name="HexaSignUpScreen"
        component={Components.HexaSignUpScreen}
        options={{
          header: () => <CustomHeader title="Sign Up" showBackButton={true} />,
        }}
      />

      <Stack.Screen
        name="ForgotPasswordRequest"
        component={Components.ForgotPasswordRequest}
        options={{
          headerShown: false, // Disable the header
        }}
      />

      <Stack.Screen
        name="OTPVerification"
        component={Components.OTPVerification}
        options={{
          header: () => (
            <CustomHeader title="Verify OTP" showBackButton={true} />
          ),
        }}
      />

      <Stack.Screen
        name="ResetPassword"
        component={Components.ResetPassword}
        options={{
          header: () => (
            <CustomHeader title="Reset Password" showBackButton={true} />
          ),
        }}
      />
      <Stack.Screen
  name="HexaDashboard"
  component={Components.HexaDashboard}
  options={{
    header: () => <CustomHeader title="Dashboard" showBackButton={false} />,
  }}
/>
<Stack.Screen
  name="HexaDeviceRadar"
  component={Components.HexaDeviceRadar}
  options={{
    header: () => <CustomHeader title="Add Devices" showBackButton={true} />,
  }}
/>
    </Stack.Navigator>
  );
}
