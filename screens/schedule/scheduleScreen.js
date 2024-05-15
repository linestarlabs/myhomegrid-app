import {StyleSheet, Text, View, FlatList, BackHandler, Platform} from 'react-native';
import React,{useState,useCallback} from 'react';
import {Colors, Fonts, Sizes, commonStyles} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';

const schedulesList = [
  {
    id: '1',
    deviceName: 'Smart Lamp - Balcony',
    onTime: '11:00 pm',
    offTime: '07:00 am',
  },
  {
    id: '2',
    deviceName: 'Air Conditioner - Living Room',
    onTime: '11:00 pm',
    offTime: '07:00 am',
  },
];

const ScheduleScreen = ({navigation}) => {

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
      {header()}
      {schedulesInfo()}
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

  function schedulesInfo() {
    const renderItem = ({item}) => (
      <View style={styles.scheduleInfoWrapStyle}>
        <View style={styles.scheduleHeaderStyle}>
          <Text
            numberOfLines={1}
            style={{flex: 1, ...Fonts.blackColor16Regular}}>
            {item.deviceName}
          </Text>
          <Text
            onPress={() => {
              navigation.push('EditSchedule');
            }}
            style={{...Fonts.primaryColor16Medium}}>
            Edit
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginTop: Sizes.fixPadding + 5.0,
            marginBottom: Sizes.fixPadding * 2.0,
          }}>
          <Text style={{flex: 1, ...Fonts.grayColor12Light}}>
            Repeat Every Day
          </Text>
          <View
            style={{
              marginTop: Sizes.fixPadding + 5.0,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{marginRight: Sizes.fixPadding * 4.0}}>
              <Text style={{...Fonts.grayColor14Regular}}>ON</Text>
              <Text
                style={{
                  marginTop: Sizes.fixPadding - 5.0,
                  ...Fonts.blackColor18Medium,
                }}>
                {item.onTime}
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={{...Fonts.grayColor14Regular}}>OFF</Text>
              <Text
                style={{
                  flex: 1,
                  marginTop: Sizes.fixPadding - 5.0,
                  ...Fonts.blackColor18Medium,
                }}>
                {item.offTime}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
    return (
      <FlatList
        data={schedulesList}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
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
        <Text style={{flex: 1, ...Fonts.blackColor20Bold}}>Schedule</Text>
        <MaterialIcons
          name="add"
          size={28}
          color={Colors.blackColor}
          onPress={() => {
            navigation.push('AddSchedule');
          }}
        />
      </View>
    );
  }
};

export default ScheduleScreen;

const styles = StyleSheet.create({
  scheduleHeaderStyle: {
    backgroundColor: Colors.extraLightGrayColor,
    borderTopLeftRadius: Sizes.fixPadding - 5.0,
    borderTopRightRadius: Sizes.fixPadding - 5.0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 7.0,
  },
  scheduleInfoWrapStyle: {
    borderRadius: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.0,
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.extraLightGrayColor,
    borderWidth: 1.5,
  },
});
