import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  BackHandler,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {
  Colors,
  commonStyles,
  Fonts,
  screenWidth,
  Sizes,
} from '../../constants/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFocusEffect} from '@react-navigation/native';

const ProfileScreen = ({navigation}) => {
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
      <View style={{flex: 1}}>
        {header()}
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}>
          {profileInfo()}
          {profileOptions()}
          {logoutButton()}
        </ScrollView>
      </View>
      {exitInfo()}
    </View>
  );

  function exitInfo() {
    return backClickCount == 1 ? (
      <View style={{...commonStyles.exitWrapStyle}}>
        <Text style={{...Fonts.whiteColor13Regular}}>
          Press back once again to exit
        </Text>
      </View>
    ) : null;
  }

  function logoutButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.push('Signin');
        }}
        style={styles.buttonStyle}>
        <Text style={{...Fonts.whiteColor18Medium}}>Logout</Text>
      </TouchableOpacity>
    );
  }

  function profileOptions() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding * 3.5,
          marginBottom: Sizes.fixPadding + 5,
        }}>
        {profileOptionSort({
          option: 'Account Setting',
          onPress: () => {
            navigation.push('EditProfile');
          },
        })}
        {profileOptionSort({
          option: 'Notifications',
          onPress: () => {
            navigation.navigate('Notifications');
          },
        })}
        {profileOptionSort({option: 'Settings', onPress: () => {}})}
        {profileOptionSort({
          option: 'Contact us',
          onPress: () => {
            navigation.push('Contactus');
          },
        })}
        {profileOptionSort({
          option: 'Terms & Conditions',
          onPress: () => {
            navigation.push('TermsAndCondition');
          },
        })}
      </View>
    );
  }

  function profileOptionSort({option, onPress}) {
    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPress}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{flex: 1, ...Fonts.blackColor16Regular}}>{option}</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={26}
            color={Colors.grayColor}
            style={{marginRight: -(Sizes.fixPadding - 5.0)}}
          />
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: Colors.extraLightGrayColor,
            height: 1.0,
            marginVertical: Sizes.fixPadding * 2.0,
          }}
        />
      </View>
    );
  }

  function profileInfo() {
    return (
      <View style={{alignItems: 'center'}}>
        <View style={styles.profilePicWrapStyle}>
          <Image
            source={require('../../assets/images/users/user1.png')}
            style={styles.profileImageStyle}
          />
        </View>
        <Text style={{...Fonts.blackColor18Regular}}>Samantha Smith</Text>
        <Text
          style={{
            marginTop: Sizes.fixPadding - 7.0,
            ...Fonts.grayColor14Light,
          }}>
          samanthasmith@gmail.com
        </Text>
      </View>
    );
  }

  function header() {
    return (
      <Text style={{margin: Sizes.fixPadding * 2.0, ...Fonts.blackColor20Bold}}>
        Profile
      </Text>
    );
  }
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profilePicWrapStyle: {
    width: screenWidth / 4.5,
    height: screenWidth / 4.5,
    borderRadius: screenWidth / 4.5 / 2.0,
    marginBottom: Sizes.fixPadding + 5.0,
    marginTop: Sizes.fixPadding - 5.0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.whiteColor,
    padding: Sizes.fixPadding - 8.0,
    ...commonStyles.blackShadow,
    elevation: 3.0,
  },
  profileImageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: screenWidth / 4.5 / 2.0,
  },
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Sizes.fixPadding + 9.0,
    borderRadius: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding * 2.0,
    marginHorizontal: Sizes.fixPadding * 5.0,
    ...commonStyles.buttonShadow,
  },
});
