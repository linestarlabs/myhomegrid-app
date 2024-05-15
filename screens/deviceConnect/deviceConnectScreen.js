import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors, Fonts, Sizes, commonStyles, screenWidth} from '../../constants/styles';
import MyStatusBar from '../../components/myStatusBar';

const DeviceConnectScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        {deviceInfo()}
      </View>
      {cancelAndConnectButton()}
    </View>
  );

  function cancelAndConnectButton() {
    return (
      <View style={styles.cancelAndConnectButtonWrapStyle}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.pop();
          }}
          style={styles.cancelButtonStyle}>
          <Text style={{...Fonts.primaryColor18Medium}}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.push('DeviceAddedSuccessfully');
          }}
          style={styles.connectDevicebuttonStyle}>
          <Text numberOfLines={1} style={{...Fonts.whiteColor18Medium}}>
            Connect Device
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function deviceInfo() {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: Sizes.fixPadding,
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
          <Text
            style={{
              backgroundColor: Colors.whiteColor,
              marginTop: Sizes.fixPadding - 2.0,
              ...Fonts.blackColor14Regular,
            }}>
            MI Secure Cam
          </Text>
        </View>
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

  function header() {
    return (
      <View style={{margin: Sizes.fixPadding * 2.0}}>
        <Text numberOfLines={1} style={{...Fonts.blackColor20Bold}}>
          Device Found
        </Text>
        <Text
          style={{
            marginTop: Sizes.fixPadding - 5.0,
            ...Fonts.grayColor14Regular,
          }}>
          Total 6 active devices
        </Text>
      </View>
    );
  }
};

export default DeviceConnectScreen;

const styles = StyleSheet.create({
  searchingDeviceCircleStyle: {
    borderColor: Colors.extraLightGrayColor,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectDevicebuttonStyle: {
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Sizes.fixPadding + 9.0,
    borderRadius: Sizes.fixPadding - 5.0,
    flex: 1,   
    marginLeft: Sizes.fixPadding + 5.0,
    ...commonStyles.buttonShadow,
  },
  cancelButtonStyle: {
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding * 2.5,
    paddingVertical: Sizes.fixPadding + 9.0,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2.0,
    borderRadius: Sizes.fixPadding - 5.0,
    borderColor: Colors.extraLightGrayColor,
    borderWidth: 1.0,
  },
  cancelAndConnectButtonWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 3.0,
  },
});
