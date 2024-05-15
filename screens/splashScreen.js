import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  BackHandler,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import {Colors, Fonts, screenWidth, Sizes} from '../constants/styles';
import {useFocusEffect} from '@react-navigation/native';
import MyStatusBar from '../components/myStatusBar';

const SplashScreen = ({navigation}) => {
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

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <ImageBackground
        source={require('../assets/images/splash_bg.png')}
        style={{flex: 1}}>
        <View style={styles.screenOverlayStyle}>
          {appLogo()}
          {getStartedButton()}
        </View>
      </ImageBackground>
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

  function getStartedButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.push('Onboarding');
        }}
        style={styles.buttonStyle}>
        <Text style={{...Fonts.whiteColor18Medium}}>Get Started</Text>
      </TouchableOpacity>
    );
  }

  function appLogo() {
    return (
      <Image
        source={require('../assets/images/app_logo.png')}
        style={{
          width: screenWidth / 2.0,
          height: screenWidth / 2.0,
          resizeMode: 'contain',
        }}
      />
    );
  }
};

export default SplashScreen;

const styles = StyleSheet.create({
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
  screenOverlayStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Sizes.fixPadding + 9.0,
    borderRadius: Sizes.fixPadding - 5.0,
    elevation: 1.0,
    borderColor: Colors.lightPrimaryColor,
    borderWidth: 1.0,
    shadowColor: Colors.primaryColor,
    position: 'absolute',
    bottom: 30.0,
    left: 50.0,
    right: 50.0,
  },
});