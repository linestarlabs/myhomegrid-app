import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useCallback } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import HomeScreen from '../screens/home/homeScreen';
import ProfileScreen from '../screens/profile/profileScreen';
import { Colors, Sizes, commonStyles } from '../constants/styles';
import ScheduleScreen from '../screens/schedule/scheduleScreen';
import ConnectScreen from '../screens/connect/connectScreen';
import NotificationScreen from '../screens/notification/notificationScreen';
import MyStatusBar from './myStatusBar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const BottomTabBarScreen = ({ navigation }) => {
  const backAction = () => {
    if (Platform.OS === 'ios') {
      navigation.addListener('beforeRemove', e => {
        e.preventDefault();
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      navigation.addListener('gestureEnd', backAction);
      return () => {
        navigation.removeListener('gestureEnd', backAction);
      };
    }, [backAction]),
  );

  return (
    <View style={{ backgroundColor: Colors.whiteColor, flex: 1 }}>
      <MyStatusBar />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: Colors.primaryColor,
          tabBarInactiveTintColor: Colors.lightGrayColor,
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.bottomTabBarStyle,
          tabBarItemStyle: { height: 60.0 }
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name={'home-variant'}
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Schedule"
          component={ScheduleScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name={'clock-time-three'}
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Connect"
          component={ConnectScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? null : (
                <View style={styles.connectTabStyle}>
                  <MaterialCommunityIcons
                    name="plus"
                    color={Colors.whiteColor}
                    size={30}
                  />
                </View>
              ),
            tabBarStyle: { display: 'none' },
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="bell-badge"
                color={color}
                size={23}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={25} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  connectTabStyle: {
    width: 50.0,
    height: 50.0,
    borderRadius: 25.0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryColor,
    bottom: 25.0,
    shadowColor: Colors.primaryColor,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius:10,
    shadowOpacity: 0.22,
    elevation: 10.0,
  },
  bottomTabBarStyle: {
    backgroundColor: Colors.whiteColor,
    height: 60.0,
    borderColor: Colors.lightGrayColor,
    borderWidth: Platform.OS == 'ios' ? 0 : 0.5,
    ...commonStyles.blackShadow,
    elevation: 4.0,
    borderTopLeftRadius: Sizes.fixPadding * 2.0,
    borderTopRightRadius: Sizes.fixPadding * 2.0,
  },
});

export default BottomTabBarScreen;
