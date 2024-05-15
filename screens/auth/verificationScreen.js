import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import React, { useState,  useEffect } from 'react';
import { Colors, Fonts, Sizes, commonStyles } from '../../constants/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Overlay } from '@rneui/themed';
import { OtpInput } from 'react-native-otp-entry';
import MyStatusBar from '../../components/myStatusBar';

const VerificationScreen = ({ navigation }) => {
  const [time, setTime] = useState(52);

  var intervalID;

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      clearInterval(intervalID);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    intervalID = setInterval(() => {
      setTime((time) => {
        if (time > 0) {
          return time - 1;
        }
        clearInterval(intervalID);
        return time;
      });
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  const [isLoading, setisLoading] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {backArrow()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}>
          {verificationInfo()}
          {otpFields()}
          {resendInfo()}
          {continueButton()}
        </ScrollView>
      </View>
      {loadingDialog()}
    </View>
  );

  function loadingDialog() {
    return (
      <Overlay isVisible={isLoading} overlayStyle={styles.dialogStyle}>
        <ActivityIndicator
          size={40}
          color={Colors.primaryColor}
          style={{
            transform: [{ scale: Platform.OS == 'ios' ? 1.8 : 1 }],
            alignSelf: 'center',
          }}
        />
        <Text
          style={{
            marginTop: Sizes.fixPadding + 5.0,
            textAlign: 'center',
            ...Fonts.grayColor14Regular,
          }}>
          Please wait...
        </Text>
      </Overlay>
    );
  }

  function continueButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setisLoading(true);
          setTimeout(() => {
            setisLoading(false);
            navigation.push('BottomTabBar');
          }, 2000);
        }}
        style={styles.buttonStyle}>
        <Text style={{ ...Fonts.whiteColor18Medium }}>Continue</Text>
      </TouchableOpacity>
    );
  }

  function resendInfo() {
    return (
      <Text style={{ textAlign: 'center', ...Fonts.grayColor14Regular }}>
        Resend code in: { }
        <Text style={{ ...Fonts.primaryColor14Regular }}>
          00:{time.toString().length == 1 ? `0${time}` : time}
        </Text>
      </Text>
    );
  }

  function otpFields() {
    return (
      <OtpInput
        numberOfDigits={4}
        focusColor={Colors.primaryColor}
        onTextChange={text => {
          if (text.length == 4) {
            setisLoading(true);
            setTimeout(() => {
              setisLoading(false);
              navigation.push('BottomTabBar');
            }, 2000);
          }
        }}
        theme={{
          containerStyle: {
            margin: Sizes.fixPadding * 3.0,
          },
          inputsContainerStyle: {
            justifyContent: 'space-between',
          },
          pinCodeContainerStyle: { ...styles.otpFieldWrapper },
          pinCodeTextStyle: { ...Fonts.blackColor18Bold },
        }}
      />
    );
  }

  function verificationInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <Text style={{ textAlign: 'center', ...Fonts.blackColor18Medium }}>
          Verify Phone
        </Text>
        <Text
          style={{
            marginTop: Sizes.fixPadding - 5.0,
            textAlign: 'center',
            ...Fonts.blackColor14Regular,
          }}>
          Enter verification code to continue
        </Text>
        <Text
          style={{
            marginTop: Sizes.fixPadding * 3.0,
            textAlign: 'center',
            ...Fonts.blackColor14Regular,
          }}>
          Code is sent to +(444) 987-1478
        </Text>
      </View>
    );
  }

  function backArrow() {
    return (
      <MaterialCommunityIcons
        name="keyboard-backspace"
        size={28}
        color={Colors.blackColor}
        onPress={() => {
          navigation.pop();
        }}
        style={{ margin: Sizes.fixPadding * 2.0, alignSelf: 'flex-start' }}
      />
    );
  }
};

export default VerificationScreen;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Sizes.fixPadding + 9.0,
    borderRadius: Sizes.fixPadding - 5.0,
    marginVertical: Sizes.fixPadding * 3.0,
    marginHorizontal: Sizes.fixPadding * 5.0,
    ...commonStyles.buttonShadow,
  },
  dialogStyle: {
    width: '80%',
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingBottom: Sizes.fixPadding * 3.5,
    paddingTop: Sizes.fixPadding * 3.0,
    elevation: 3.0,
  },
  otpFieldWrapper: {
    margin: 10.0,
    width: 50.0,
    minHeight: 50.0,
    borderRadius: Sizes.fixPadding - 5.0,
    borderWidth: 1.5,
  },
});
