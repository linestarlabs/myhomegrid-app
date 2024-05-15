import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
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
import {BottomSheet} from '@rneui/themed';
import MyStatusBar from '../../components/myStatusBar';

const EditProfileScreen = ({navigation}) => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [fullName, setfullName] = useState('Samantha Smith');
  const [email, setemail] = useState('samanthasmith@gmail.com');
  const [phoneNumber, setphoneNumber] = useState('+(444) 987-7894');
  const [password, setpassword] = useState('123456789');

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: Sizes.fixPadding}}>
          {profilePicInfo()}
          {fullNameInfo()}
          {emailInfo()}
          {phoneNumberInfo()}
          {passwordInfo()}
        </ScrollView>
      </View>
      {updateButton()}
      {changeProfilePicOptionsSheet()}
    </View>
  );

  function updateButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.pop();
        }}
        style={styles.buttonStyle}>
        <Text style={{...Fonts.whiteColor18Medium}}>Update</Text>
      </TouchableOpacity>
    );
  }

  function passwordInfo() {
    return (
      <View style={{margin: Sizes.fixPadding * 2.0}}>
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
      <View
        style={{
          marginTop: Sizes.fixPadding * 3.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}>
        <Text style={{...Fonts.blackColor14Regular}}>Full Name</Text>
        <View
          style={{
            ...styles.infoWrapStyle,
            borderColor: fullName ? Colors.primaryColor : Colors.lightGrayColor,
          }}>
          <TextInput
            placeholder="Enter your full name..."
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

  function changeProfilePicOptionsSheet() {
    return (
      <BottomSheet
        isVisible={showBottomSheet}
        containerStyle={{backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)'}}
        onBackdropPress={() => {
          setShowBottomSheet(false);
        }}
        scrollViewProps={{scrollEnabled: false}}>
        <View style={styles.bottomSheetStyle}>
          <Text style={{...Fonts.blackColor18SemiBold}}>Choose Option</Text>
          <View
            style={{marginTop: Sizes.fixPadding * 2.5, flexDirection: 'row'}}>
            {changeProfilePicOptionsSort({
              bgColor: Colors.lightGreenColor,
              icon: 'camera',
              option: 'Camera',
            })}
            <View style={{marginHorizontal: Sizes.fixPadding * 3.0}}>
              {changeProfilePicOptionsSort({
                bgColor: Colors.blueColor,
                icon: 'image',
                option: 'Gallery',
              })}
            </View>
            {changeProfilePicOptionsSort({
              bgColor: Colors.lightRedColor,
              icon: 'delete',
              option: 'Remove photo',
            })}
          </View>
        </View>
      </BottomSheet>
    );
  }

  function changeProfilePicOptionsSort({bgColor, icon, option}) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setShowBottomSheet(false);
        }}>
        <View
          style={{
            ...styles.changeProfilePicOptionsIconWrapStyle,
            backgroundColor: bgColor,
          }}>
          <MaterialCommunityIcons
            name={icon}
            size={24}
            color={Colors.whiteColor}
          />
        </View>
        <Text style={styles.profileOptionTextStyle}>{option}</Text>
      </TouchableOpacity>
    );
  }

  function profilePicInfo() {
    return (
      <View style={{alignSelf: 'center', marginTop: Sizes.fixPadding + 5.0}}>
        <View style={styles.profileImageWrapStyle}>
          <Image
            source={require('../../assets/images/users/user1.png')}
            style={styles.profileImageStyle}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setShowBottomSheet(true);
          }}
          style={styles.profilePicEditIconWrapStyle}>
          <MaterialCommunityIcons
            name="camera"
            size={screenWidth / 20.5}
            color={Colors.whiteColor}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function header() {
    return (
      <View
        style={{
          margin: Sizes.fixPadding * 2.0,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <MaterialCommunityIcons
          name="keyboard-backspace"
          size={28}
          color={Colors.blackColor}
          onPress={() => {
            navigation.pop();
          }}
        />
        <Text
          numberOfLines={1}
          style={{
            marginLeft: Sizes.fixPadding + 5.0,
            flex: 1,
            ...Fonts.blackColor20Bold,
          }}>
          Edit Profile
        </Text>
      </View>
    );
  }
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  profileImageWrapStyle: {
    width: screenWidth / 3.8,
    height: screenWidth / 3.8,
    borderRadius: screenWidth / 3.8 / 2.0,
    padding: Sizes.fixPadding - 8.0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.whiteColor,
    ...commonStyles.blackShadow,
    elevation: 3.0,
  },
  profileImageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: screenWidth / 3.8 / 2.0,
  },
  profilePicEditIconWrapStyle: {
    backgroundColor: Colors.primaryColor,
    width: screenWidth / 11.5,
    height: screenWidth / 11.5,
    borderRadius: screenWidth / 11.5 / 2.0,
    position: 'absolute',
    bottom: -5.0,
    right: 5.0,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4.0,
  },
  changeProfilePicOptionsIconWrapStyle: {
    width: 50.0,
    height: 50.0,
    borderRadius: 25.0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSheetStyle: {
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: Sizes.fixPadding + 5.0,
    borderTopRightRadius: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding * 2.5,
  },
  profileOptionTextStyle: {
    textAlign: 'center',
    maxWidth: screenWidth / 4.5,
    marginTop: Sizes.fixPadding - 5.0,
    ...Fonts.grayColor14Light,
  },
  infoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderWidth: 1.5,
    borderRadius: Sizes.fixPadding - 5.0,
    padding: Sizes.fixPadding + 5.0,
    marginTop: Sizes.fixPadding,
  },
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Sizes.fixPadding + 9.0,
    borderRadius: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding * 3.0,
    marginHorizontal: Sizes.fixPadding * 5.0,
    ...commonStyles.buttonShadow,
  },
});
