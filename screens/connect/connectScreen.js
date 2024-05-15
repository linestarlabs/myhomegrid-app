import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  Colors,
  commonStyles,
  Fonts,
  screenWidth,
  Sizes,
} from '../../constants/styles';
import * as Animatable from 'react-native-animatable';

const ConnectScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      {header()}
      {devicesInfo()}
      {connectButton()}
    </View>
  );

  function connectButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.push('DeviceConnect');
        }}
        style={styles.buttonStyle}>
        <Text style={{...Fonts.whiteColor18Medium}}>Connect</Text>
      </TouchableOpacity>
    );
  }

  function devicesInfo() {
    return (
      <View style={styles.devicesInfoWrapStyle}>
        {allCircles()}
        <View style={styles.deviceWrapStyle}>
          <Image
            source={require('../../assets/images/icons/device.png')}
            style={{
              width: screenWidth / 9.0,
              height: screenWidth / 9.0,
              resizeMode: 'contain',
            }}
          />
          <Text
            style={{
              marginTop: Sizes.fixPadding - 5.0,
              ...Fonts.blackColor14Regular,
            }}>
            Mi cam
          </Text>
        </View>
      </View>
    );
  }

  function allCircles() {
    const DeviceSearchSort = ({width, children}) => {
      return (
        <Animatable.View
          animation="pulse"
          iterationCount="infinite"
          style={{
            width: width,
            height: width,
            borderRadius: width / 2.0,
            ...styles.searchingDeviceCircleStyle,
          }}>
          {children}
        </Animatable.View>
      );
    };
    return (
      <DeviceSearchSort width={screenWidth * 1.4}>
        <DeviceSearchSort width={screenWidth * 1.2}>
          <DeviceSearchSort width={screenWidth}>
            <DeviceSearchSort width={screenWidth / 1.2}>
              <DeviceSearchSort width={screenWidth / 1.5}>
                <DeviceSearchSort width={screenWidth / 2.0}>
                  <DeviceSearchSort width={screenWidth / 3.0}>
                    <DeviceSearchSort width={screenWidth / 5.0}>
                      <DeviceSearchSort width={screenWidth / 10.0}>
                        <View style={styles.centerCirceStyle} />
                      </DeviceSearchSort>
                    </DeviceSearchSort>
                  </DeviceSearchSort>
                </DeviceSearchSort>
              </DeviceSearchSort>
            </DeviceSearchSort>
          </DeviceSearchSort>
        </DeviceSearchSort>
      </DeviceSearchSort>
    );
  }

  function header() {
    return (
      <Text style={{margin: Sizes.fixPadding * 2.0, ...Fonts.blackColor20Bold}}>
        Search Near by Devices...
      </Text>
    );
  }
};

export default ConnectScreen;

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
    ...commonStyles.buttonShadow,
  },
  centerCirceStyle: {
    width: screenWidth / 30.0,
    height: screenWidth / 30.0,
    borderRadius: screenWidth / 30.0 / 2.0,
    backgroundColor: Colors.primaryColor,
  },
  devicesInfoWrapStyle: {
    overflow: 'hidden',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  exitWrapStyle: {
    backgroundColor: Colors.blackColor,
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    borderRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
