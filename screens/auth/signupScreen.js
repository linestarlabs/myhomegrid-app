import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  Colors,
  commonStyles,
  Fonts,
  screenWidth,
  Sizes,
} from '../../constants/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MyStatusBar from '../../components/myStatusBar';

const SignupScreen = ({navigation}) => {
  const [fullName, setfullName] = useState('');
  const [password, setpassword] = useState('');
  const [agreeOrNot, setagreeOrNot] = useState(true);
  const [email, setemail] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {backArrow()}
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}>
          {signupInfo()}
          {fullNameInfo()}
          {emailInfo()}
          {phoneNumberInfo()}
          {passwordInfo()}
          {agreeWithTermsAndConditionInfo()}
          {signupButton()}
          {orSigninWithOptionsInfo()}
        </ScrollView>
      </View>
      {alreadyAccountInfo()}
    </View>
  );

  function backArrow() {
    return (
      <MaterialCommunityIcons
        name="keyboard-backspace"
        size={28}
        color={Colors.blackColor}
        onPress={() => {
          navigation.pop();
        }}
        style={{margin: Sizes.fixPadding * 2.0, alignSelf: 'flex-start'}}
      />
    );
  }

  function alreadyAccountInfo() {
    return (
      <Text
        style={{
          textAlign: 'center',
          margin: Sizes.fixPadding * 2.0,
          ...Fonts.blackColor14Regular,
        }}>
        Already have an account? {}
        <Text
          onPress={() => {
            navigation.push('Signin');
          }}
          style={{...Fonts.primaryColor14Regular}}>
          Sign in
        </Text>
      </Text>
    );
  }

  function orSigninWithOptionsInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginTop: Sizes.fixPadding + 5.0,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              flex: 1,
              height: 1.0,
              backgroundColor: Colors.lightGrayColor,
            }}
          />
          <Text
            style={{
              marginHorizontal: Sizes.fixPadding,
              ...Fonts.grayColor14Light,
            }}>
            Or connect with social
          </Text>
          <View
            style={{
              flex: 1,
              height: 1.0,
              backgroundColor: Colors.lightGrayColor,
            }}
          />
        </View>
        <View style={styles.socialMediaOptionsWrapStyle}>
          {socialMediaOptionShort({color: '#FF3D00', iconName: 'google'})}
          {socialMediaOptionShort({color: '#4267B2', iconName: 'facebook'})}
          {socialMediaOptionShort({color: '#00ACEE', iconName: 'twitter'})}
        </View>
      </View>
    );
  }

  function socialMediaOptionShort({color, iconName}) {
    return (
      <View
        style={{backgroundColor: color, ...styles.socialMediaIconWrapStyle}}>
        <FontAwesome
          name={iconName}
          size={screenWidth / 15.5}
          color={Colors.whiteColor}
        />
      </View>
    );
  }

  function signupButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.push('Verification');
        }}
        style={styles.buttonStyle}>
        <Text style={{...Fonts.whiteColor18Medium}}>Sign up</Text>
      </TouchableOpacity>
    );
  }

  function agreeWithTermsAndConditionInfo() {
    return (
      <View style={styles.rememberAndForgetPasswordInfoWrapStyle}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setagreeOrNot(!agreeOrNot);
          }}
          style={{
            backgroundColor: agreeOrNot
              ? Colors.primaryColor
              : Colors.whiteColor,
            borderColor: agreeOrNot
              ? Colors.primaryColor
              : Colors.lightGrayColor,
            ...styles.checkBoxStyle,
          }}>
          {agreeOrNot ? (
            <MaterialCommunityIcons
              name="check"
              size={14}
              color={Colors.whiteColor}
            />
          ) : null}
        </TouchableOpacity>
        <Text
          style={{
            lineHeight: 18.0,
            marginLeft: Sizes.fixPadding,
            flex: 1,
            ...Fonts.blackColor14Light,
          }}>
          By creating account you agree to our {}
          <Text style={{...Fonts.primaryColor14Light}}>terms & conditions</Text>
          {} and {}
          <Text style={{...Fonts.primaryColor14Light}}>company policy.</Text>
        </Text>
      </View>
    );
  }

  function passwordInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginTop: Sizes.fixPadding * 2.0,
        }}>
        <Text style={{...Fonts.blackColor14Regular}}>Password</Text>
        <View
          style={{
            ...styles.infoWrapStyle,
            borderColor: password ? Colors.primaryColor : Colors.lightGrayColor,
          }}>
          <TextInput
            placeholder="Enter your password..."
            placeholderTextColor={Colors.grayColor}
            value={password}
            onChangeText={value => setpassword(value)}
            style={{...Fonts.blackColor14Light, height: 18.0, padding: 0}}
            cursorColor={Colors.primaryColor}
            secureTextEntry
          />
        </View>
      </View>
    );
  }

  function phoneNumberInfo() {
    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.blackColor14Regular}}>Phone Number</Text>
        <View
          style={{
            ...styles.infoWrapStyle,
            borderColor: phoneNumber
              ? Colors.primaryColor
              : Colors.lightGrayColor,
          }}>
          <TextInput
            placeholder="Enter your phone number..."
            placeholderTextColor={Colors.grayColor}
            value={phoneNumber}
            onChangeText={value => setphoneNumber(value)}
            style={{...Fonts.blackColor14Light, height: 18.0, padding: 0}}
            cursorColor={Colors.primaryColor}
            keyboardType="phone-pad"
          />
        </View>
      </View>
    );
  }

  function emailInfo() {
    return (
      <View style={{margin: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.blackColor14Regular}}>Email Address</Text>
        <View
          style={{
            ...styles.infoWrapStyle,
            borderColor: email ? Colors.primaryColor : Colors.lightGrayColor,
          }}>
          <TextInput
            placeholder="Enter your email address..."
            placeholderTextColor={Colors.grayColor}
            value={email}
            onChangeText={value => setemail(value)}
            style={{...Fonts.blackColor14Light, height: 18.0, padding: 0}}
            cursorColor={Colors.primaryColor}
            keyboardType="email-address"
          />
        </View>
      </View>
    );
  }

  function fullNameInfo() {
    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.blackColor14Regular}}>Full Name</Text>
        <View
          style={{
            ...styles.infoWrapStyle,
            borderColor: fullName ? Colors.primaryColor : Colors.lightGrayColor,
          }}>
          <TextInput
            placeholder="Enter full name..."
            placeholderTextColor={Colors.grayColor}
            value={fullName}
            onChangeText={value => setfullName(value)}
            style={{...Fonts.blackColor14Light, height: 18.0, padding: 0}}
            cursorColor={Colors.primaryColor}
          />
        </View>
      </View>
    );
  }

  function signupInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding * 3.0,
        }}>
        <Text style={{textAlign: 'center', ...Fonts.blackColor18Medium}}>
          Sign Up!
        </Text>
        <Text
          style={{
            marginTop: Sizes.fixPadding - 5.0,
            textAlign: 'center',
            ...Fonts.blackColor14Regular,
          }}>
          Sign up using your personal details
        </Text>
      </View>
    );
  }
};

export default SignupScreen;

const styles = StyleSheet.create({
  infoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderWidth: 1.5,
    borderRadius: Sizes.fixPadding - 5.0,
    padding: Sizes.fixPadding + 5.0,
    marginTop: Sizes.fixPadding,
  },
  checkBoxStyle: {
    width: 17.0,
    height: 17.0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Sizes.fixPadding - 8.0,
    borderWidth: 1.0,
  },
  rememberAndForgetPasswordInfoWrapStyle: {
    marginTop: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Sizes.fixPadding - 5.0,
  },
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
  socialMediaOptionsWrapStyle: {
    marginVertical: Sizes.fixPadding * 2.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialMediaIconWrapStyle: {
    width: screenWidth / 7.5,
    height: screenWidth / 7.5,
    borderRadius: screenWidth / 7.5 / 2.0,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Sizes.fixPadding + 5.0,
  },
});
