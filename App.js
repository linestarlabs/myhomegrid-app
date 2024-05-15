import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import BottomTabBarScreen from './components/bottomTabBarScreen';
import AddScheduleScreen from './screens/addSchedule/addScheduleScreen';
import SigninScreen from './screens/auth/signinScreen';
import SignupScreen from './screens/auth/signupScreen';
import VerificationScreen from './screens/auth/verificationScreen';
import ContactusScreen from './screens/contactus/contactusScreen';
import DeviceAddedSuccessfullyScreen from './screens/deviceAddedSuccessfully/deviceAddedSuccessfullyScreen';
import DeviceConnectScreen from './screens/deviceConnect/deviceConnectScreen';
import EditProfileScreen from './screens/editProfile/editProfileScreen';
import EditScheduleScreen from './screens/editSchedule/editScheduleScreen';
import LivingRoomScreen from './screens/livingRoom/livingRoomScreen';
import OnboardingScreen from './screens/onboarding/onboardingScreen';
import TermsAndConditionScreen from './screens/termsAndCondition/termsAndConditionScreen';
import SplashScreen from './screens/splashScreen';
import { LogBox } from 'react-native'
import * as ExpoSplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import React, { useCallback } from 'react'

ExpoSplashScreen.preventAutoHideAsync();

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

function MyApp() {
  const [fontsLoaded] = useFonts({
    PulpDisplay_Light: require("./assets/fonts/PulpDisplay-Light.ttf"),
    PulpDisplay_Regular: require("./assets/fonts/PulpDisplay-Regular.ttf"),
    PulpDisplay_Medium: require("./assets/fonts/PulpDisplay-Medium.ttf"),
    PulpDisplay_SemiBold: require("./assets/fonts/PulpDisplay-SemiBold.ttf"),
    PulpDisplay_Bold: require("./assets/fonts/PulpDisplay-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await ExpoSplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  onLayoutRootView();

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} options={{ ...TransitionPresets.DefaultTransition }} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Signin" component={SigninScreen} options={{ ...TransitionPresets.DefaultTransition }} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Verification" component={VerificationScreen} />
          <Stack.Screen name="BottomTabBar" component={BottomTabBarScreen} options={{ ...TransitionPresets.DefaultTransition }} />
          <Stack.Screen name="LivingRoom" component={LivingRoomScreen} />
          <Stack.Screen name="AddSchedule" component={AddScheduleScreen} />
          <Stack.Screen name="EditSchedule" component={EditScheduleScreen} />
          <Stack.Screen name="DeviceConnect" component={DeviceConnectScreen} />
          <Stack.Screen name="DeviceAddedSuccessfully" component={DeviceAddedSuccessfullyScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="Contactus" component={ContactusScreen} />
          <Stack.Screen name="TermsAndCondition" component={TermsAndConditionScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default MyApp;