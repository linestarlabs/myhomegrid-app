import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  Image,
  Platform,
} from 'react-native';
import React, {useCallback} from 'react';
import {Colors, Fonts, screenWidth, Sizes} from '../../constants/styles';
import {useFocusEffect} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';

const DeviceAddedSuccessfullyScreen = ({navigation}) => {
  const backAction = () => {
    if (Platform.OS === 'ios') {
      navigation.addListener('beforeRemove', e => {
        e.preventDefault();
      });
    } else {
      navigation.push('BottomTabBar');
      return true;
    }
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', backAction);
      navigation.addListener('gestureEnd', backAction);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backAction);
        navigation.removeListener('gestureEnd', backAction);
      };
    }, [backAction]),
  );

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {devicesInfo()}
        {connectButton()}
      </View>
    </View>
  );

  function connectButton() {
    return (
      <Text
        onPress={() => {
          navigation.push('BottomTabBar');
        }}
        style={{
          textAlign: 'center',
          margin: Sizes.fixPadding * 2.0,
          ...Fonts.primaryColor18Medium,
        }}>
        Back to Home
      </Text>
    );
  }

  function devicesInfo() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View
          style={{
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {allCircles()}
          <View style={{position: 'absolute', justifyContent: 'center'}}>
            <Image
              source={require('../../assets/images/icons/device.png')}
              style={{
                width: screenWidth / 3.5,
                height: screenWidth / 3.5,
                resizeMode: 'contain',
              }}
            />
            <MaterialIcons
              name="done"
              size={screenWidth / 9.5}
              color={Colors.primaryColor}
              style={{right: 0.0, position: 'absolute', bottom: 0.0}}
            />
          </View>
        </View>
        <Text
          style={{
            marginTop: Sizes.fixPadding * 2.8,
            ...Fonts.grayColor16Light,
          }}>
          Device Added Successfully
        </Text>
      </View>
    );
  }

  function allCircles() {
    const DeviceSearchSort = ({width, children}) => {
      return (
        <View
          style={{
            width: width,
            height: width,
            borderRadius: width / 2.0,
            ...styles.searchingDeviceCircleStyle,
          }}>
          {children}
        </View>
      );
    };
    return (
      <DeviceSearchSort width={screenWidth * 1.2}>
        <DeviceSearchSort width={screenWidth}>
          <DeviceSearchSort width={screenWidth / 1.2}>
            <DeviceSearchSort width={screenWidth / 1.5}>
              <DeviceSearchSort width={screenWidth / 2.0}>
                <DeviceSearchSort width={screenWidth / 3.0}>
                  <DeviceSearchSort width={screenWidth / 5.0}>
                    <DeviceSearchSort
                      width={screenWidth / 10.0}></DeviceSearchSort>
                  </DeviceSearchSort>
                </DeviceSearchSort>
              </DeviceSearchSort>
            </DeviceSearchSort>
          </DeviceSearchSort>
        </DeviceSearchSort>
      </DeviceSearchSort>
    );
  }
};

export default DeviceAddedSuccessfullyScreen;

const styles = StyleSheet.create({
  searchingDeviceCircleStyle: {
    borderColor: Colors.extraLightGrayColor,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deviceWrapStyle: {
    borderRadius: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    elevation: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Sizes.fixPadding,
    position: 'absolute',
    right: 50.0,
    top: screenWidth / 2.8,
  },
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Sizes.fixPadding + 9.0,
    borderRadius: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding * 3.0,
    marginHorizontal: Sizes.fixPadding * 5.0,
    marginTop: Sizes.fixPadding * 2.0,
    elevation: 1.0,
    borderColor: Colors.lightPrimaryColor,
    borderWidth: 1.0,
    shadowColor: Colors.primaryColor,
  },
  centerCirceStyle: {
    width: screenWidth / 30.0,
    height: screenWidth / 30.0,
    borderRadius: screenWidth / 30.0 / 2.0,
    backgroundColor: Colors.primaryColor,
  },
});
