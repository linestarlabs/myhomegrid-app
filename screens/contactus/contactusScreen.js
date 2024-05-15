import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
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
import MyStatusBar from '../../components/myStatusBar';

const ContactusScreen = ({navigation}) => {
  const [fullName, setfullName] = useState('');
  const [email, setemail] = useState('');
  const [message, setmessage] = useState('');

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: Sizes.fixPadding * 2.0}}>
          {contactImage()}
          {fullNameInfo()}
          {emailInfo()}
          {messageInfo()}
        </ScrollView>
      </View>
      {sendButton()}
    </View>
  );

  function sendButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.pop();
        }}
        style={styles.buttonStyle}>
        <Text style={{...Fonts.whiteColor18Medium}}>Send</Text>
      </TouchableOpacity>
    );
  }

  function messageInfo() {
    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.blackColor14Regular}}>Message</Text>
        <View
          style={{
            ...styles.infoWrapStyle,
            borderColor: message ? Colors.primaryColor : Colors.lightGrayColor,
          }}>
          <TextInput
            placeholder="Enter your message..."
            placeholderTextColor={Colors.grayColor}
            value={message}
            onChangeText={value => setmessage(value)}
            style={{
              ...Fonts.blackColor14Light,
              padding: 0,
              height: Platform.OS == 'ios' ? 80.0 : null,
            }}
            cursorColor={Colors.primaryColor}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
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

  function contactImage() {
    return (
      <Image
        source={require('../../assets/images/contactus.png')}
        style={styles.contactImageStyle}
      />
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
          Contact us
        </Text>
      </View>
    );
  }
};

export default ContactusScreen;

const styles = StyleSheet.create({
  contactImageStyle: {
    height: screenWidth / 2.5,
    width: screenWidth - 40,
    resizeMode: 'contain',
    marginBottom: Sizes.fixPadding * 3.0,
    marginTop: Sizes.fixPadding + 5.0,
    alignSelf: 'center',
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
