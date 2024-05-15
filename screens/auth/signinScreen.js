import {
  BackHandler,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import {
  Colors,
  commonStyles,
  Fonts,
  screenWidth,
  Sizes,
} from '../../constants/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useFocusEffect} from '@react-navigation/native';
import MyStatusBar from '../../components/myStatusBar';

const SigninScreen = ({navigation}) => {
  const backAction = () => {
    if (Platform.OS === 'ios') {
      navigation.addListener('beforeRemove', e => {
        e.preventDefault();
      });
    } else {
      backClickCount == 1 ? BackHandler.exitApp() : _spring();
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

  function _spring() {
    setBackClickCount(1);
    setTimeout(() => {
      setBackClickCount(0);
    }, 1000);
  }

  const [backClickCount, setBackClickCount] = useState(0);
  const [usernameOrEmail, setusernameOrEmail] = useState('');
  const [password, setpassword] = useState('');
  const [rememberPassword, setrememberPassword] = useState(true);

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}>
          {welcomeInfo()}
          {userNameOrEmailInfo()}
          {passwordInfo()}
          {rememberAndForgetPasswordInfo()}
          {signinButton()}
          {orSigninWithOptionsInfo()}
        </ScrollView>
      </View>
      {dontAccountInfo()}
      {exitInfo()}
    </View>
  );

  function exitInfo() {
    return backClickCount == 1 ? (
      <View style={styles.exitWrapStyle}>
        <Text style={{...Fonts.whiteColor13Regular}}>
          Press back once again to exit
        </Text>
      </View>
    ) : null;
  }

  function dontAccountInfo() {
    return (
      <Text
        style={{
          textAlign: 'center',
          margin: Sizes.fixPadding * 2.0,
          ...Fonts.blackColor14Regular,
        }}>
        Don’t have an account? {}
        <Text
          onPress={() => {
            navigation.push('Signup');
          }}
          style={{...Fonts.primaryColor14Regular}}>
          Sign up
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

  function signinButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.push('Signup');
        }}
        style={styles.buttonStyle}>
        <Text style={{...Fonts.whiteColor18Medium}}>Sign in</Text>
      </TouchableOpacity>
    );
  }

  function rememberAndForgetPasswordInfo() {
    return (
      <View style={styles.rememberAndForgetPasswordInfoWrapStyle}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setrememberPassword(!rememberPassword);
            }}
            style={{
              backgroundColor: rememberPassword
                ? Colors.primaryColor
                : Colors.whiteColor,
              borderColor: rememberPassword
                ? Colors.primaryColor
                : Colors.lightGrayColor,
              ...styles.checkBoxStyle,
            }}>
            {rememberPassword ? (
              <MaterialCommunityIcons
                name="check"
                size={14}
                color={Colors.whiteColor}
              />
            ) : null}
          </TouchableOpacity>
          <Text
            numberOfLines={1}
            style={{
              marginLeft: Sizes.fixPadding,
              flex: 1,
              ...Fonts.blackColor14Light,
            }}>
            Remember me
          </Text>
        </View>
        <Text
          style={{
            ...Fonts.primaryColor14Light,
            textDecorationLine: 'underline',
          }}>
          Forget password?
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

  function userNameOrEmailInfo() {
    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.blackColor14Regular}}>Username or Email</Text>
        <View
          style={{
            ...styles.infoWrapStyle,
            borderColor: usernameOrEmail
              ? Colors.primaryColor
              : Colors.lightGrayColor,
          }}>
          <TextInput
            placeholder="Enter username or email address..."
            placeholderTextColor={Colors.grayColor}
            value={usernameOrEmail}
            onChangeText={value => setusernameOrEmail(value)}
            style={{...Fonts.blackColor14Light, height: 18.0, padding: 0}}
            cursorColor={Colors.primaryColor}
            keyboardType="email-address"
          />
        </View>
      </View>
    );
  }

  function welcomeInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginVertical: Sizes.fixPadding * 3.0,
        }}>
        <Text style={{textAlign: 'center', ...Fonts.blackColor18Medium}}>
          Welcome Back!
        </Text>
        <Text
          style={{
            marginTop: Sizes.fixPadding - 5.0,
            textAlign: 'center',
            ...Fonts.blackColor14Regular,
          }}>
          Please Sign in to Continue
        </Text>
      </View>
    );
  }
};

export default SigninScreen;

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
  exitWrapStyle: {
    backgroundColor: Colors.blackColor,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    borderRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
