import {Text, View, ScrollView} from 'react-native';
import React from 'react';
import {Colors, Fonts, Sizes} from '../../constants/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MyStatusBar from '../../components/myStatusBar';

const termsOfUseList = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim etiam non enim mauris consequat sem.',
  'Pellentesque sed interdum amet ligula. Tristique inte-rdum a sodales sagittis, suspendisse elementum. Donec molestie quam neque varius aliquet sapien or etiam. Ut quis et eu viverra in ut diam.',
  'Vulputate non nunc dui tristique adipiscing. Gravidadolor quam congue feugiat lorem. Odio ipsum,blandit gravida metus.',
];

const companyPoliciesList = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim etiam non enim mauris consequat sem.',
  'Pellentesque sed interdum amet ligula. Tristique inte-rdum a sodales sagittis, suspendisse elementum. Donec molestie quam neque varius aliquet sapien or etiam. Ut quis et eu viverra in ut diam.',
  'Vulputate non nunc dui tristique adipiscing. Gravidadolor quam congue feugiat lorem. Odio ipsum,blandit gravida metus.',
];

const TermsAndConditionScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {termsOfUseInfo()}
          {companyPolicyInfo()}
        </ScrollView>
      </View>
    </View>
  );

  function companyPolicyInfo() {
    return (
      <View style={{margin: Sizes.fixPadding * 2.0}}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding,
            ...Fonts.blackColor18SemiBold,
          }}>
          Company Policy
        </Text>
        {companyPoliciesList.map((item, index) => (
          <Text
            key={`${index}`}
            style={{
              lineHeight: 20.0,
              ...Fonts.grayColor14Light,
              marginBottom: Sizes.fixPadding,
            }}>
            {item}
          </Text>
        ))}
      </View>
    );
  }

  function termsOfUseInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginTop: Sizes.fixPadding + 5.0,
        }}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding,
            ...Fonts.blackColor18SemiBold,
          }}>
          Terms of Use
        </Text>
        {termsOfUseList.map((item, index) => (
          <Text
            key={`${index}`}
            style={{
              lineHeight: 20.0,
              ...Fonts.grayColor14Light,
              marginBottom: Sizes.fixPadding,
            }}>
            {item}
          </Text>
        ))}
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
          Terms & Conditions
        </Text>
      </View>
    );
  }
};

export default TermsAndConditionScreen;
