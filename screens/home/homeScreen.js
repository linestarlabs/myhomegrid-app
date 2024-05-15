import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  BackHandler,
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
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {acSettingsSheet} from '../../components/acSettingsSheets';
import {tvSettingsSheet} from '../../components/tvSettingSheet';
import {lightSettingsSheet} from '../../components/lightSettingSheet';
import {useFocusEffect} from '@react-navigation/native';

const runningAppliancesList = [
  {
    id: '1',
    icon: require('../../assets/images/icons/light.png'),
    deviceName: 'Smart Light',
    consumes: '10 kWh',
  },
  {
    id: '2',
    icon: require('../../assets/images/icons/smart_tv.png'),
    deviceName: 'Smart TV',
    consumes: '20 kWh',
  },
  {
    id: '3',
    icon: require('../../assets/images/icons/ac.png'),
    deviceName: 'Air Conditioner',
    consumes: '10 kWh',
  },
  {
    id: '4',
    icon: require('../../assets/images/icons/fan.png'),
    deviceName: 'Fan',
    consumes: '20 kWh',
  },
];

const roomsList = [
  {
    id: '1',
    roomImage: require('../../assets/images/rooms/room1.png'),
    roomType: 'Living Room',
    devices: 12,
  },
  {
    id: '2',
    roomImage: require('../../assets/images/rooms/room2.png'),
    roomType: 'Kitchen',
    devices: 5,
  },
  {
    id: '3',
    roomImage: require('../../assets/images/rooms/room3.png'),
    roomType: 'Kids Room',
    devices: 8,
  },
  {
    id: '4',
    roomImage: require('../../assets/images/rooms/room4.png'),
    roomType: 'Bathroom',
    devices: 4,
  },
  {
    id: '5',
    roomImage: require('../../assets/images/rooms/room5.png'),
    roomType: 'Bed Room',
    devices: 9,
  },
];

const HomeScreen = ({navigation}) => {
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
  const [showAcSettings, setshowAcSettings] = useState(false);
  const [showTvSettings, setshowTvSettings] = useState(false);
  const [showLightSettings, setshowLightSettings] = useState(false);

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <View style={{flex: 1}}>
        {profileInfo()}
        <FlatList
          ListHeaderComponent={
            <>
              {todayInfo()}
              {runningAppliancesInfo()}
              {banner()}
              {roomsInfo()}
            </>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
      {acSettingsSheet({showAcSettings, setshowAcSettings})}
      {tvSettingsSheet({showTvSettings, setshowTvSettings})}
      {lightSettingsSheet({showLightSettings, setshowLightSettings})}
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

  function roomsInfo() {
    const renderItem = ({item}) => (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.push('LivingRoom');
        }}
        style={styles.roomsInfoWrapStyle}>
        <Image source={item.roomImage} style={styles.roomImageStyle} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: Sizes.fixPadding + 5.0,
          }}>
          <View style={{flex: 1}}>
            <Text style={{...Fonts.blackColor16Medium}}>{item.roomType}</Text>
            <Text
              style={{
                marginTop: Sizes.fixPadding - 7.0,
                ...Fonts.grayColor14Light,
              }}>
              {item.devices} Devices
            </Text>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            color={Colors.grayColor}
            size={26}
            style={{marginRight: -Sizes.fixPadding}}
          />
        </View>
      </TouchableOpacity>
    );
    return (
      <View>
        <Text
          style={{
            marginBottom: Sizes.fixPadding * 2.0,
            marginHorizontal: Sizes.fixPadding * 2.0,
            ...Fonts.blackColor18Bold,
          }}>
          Rooms
        </Text>
        <FlatList
          data={roomsList}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          scrollEnabled={false}
        />
      </View>
    );
  }

  function banner() {
    return (
      <View style={styles.bannerWrapStyle}>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <View style={styles.bannerTimeIconWrapStyle}>
            <MaterialCommunityIcons
              name="clock-time-three"
              size={20}
              color={Colors.primaryColor}
            />
          </View>
          <View
            style={{
              flex: 1,
              marginLeft: Sizes.fixPadding + 5.0,
              marginRight: Sizes.fixPadding - 5.0,
            }}>
            <Text numberOfLines={1} style={{...Fonts.blackColor16Regular}}>
              Make life easier with automation
            </Text>
            <Text
              numberOfLines={1}
              style={{
                marginTop: Sizes.fixPadding - 7.0,
                ...Fonts.grayColor14Light,
              }}>
              Set schedule for you devices
            </Text>
          </View>
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color={Colors.grayColor}
          style={{marginRight: -Sizes.fixPadding}}
        />
      </View>
    );
  }

  function runningAppliancesInfo() {
    const renderItem = ({item}) => (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          item.deviceName == 'Smart TV'
            ? setshowTvSettings(true)
            : item.deviceName == 'Air Conditioner'
            ? setshowAcSettings(true)
            : item.deviceName == 'Smart Light'
            ? setshowLightSettings(true)
            : null;
        }}
        style={styles.runningAppliancesInfoWrapStyle}>
        <View style={styles.deviceActiveIndicatorStyle} />
        <Image
          source={item.icon}
          style={{width: 40.0, height: 40.0, resizeMode: 'contain'}}
        />
        <Text
          numberOfLines={1}
          style={{
            marginTop: Sizes.fixPadding + 5.0,
            ...Fonts.blackColor16Medium,
          }}>
          {item.deviceName}
        </Text>
        <Text
          style={{
            marginTop: Sizes.fixPadding - 5.0,
            ...Fonts.grayColor14Light,
          }}>
          Consumes {item.consumes}
        </Text>
        <Feather
          name="power"
          size={20}
          color={Colors.redColor}
          style={{marginTop: Sizes.fixPadding + 5.0}}
        />
      </TouchableOpacity>
    );
    return (
      <View>
        <Text
          style={{margin: Sizes.fixPadding * 2.0, ...Fonts.blackColor18Bold}}>
          Running Appliances
        </Text>
        <FlatList
          data={runningAppliancesList}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingLeft: Sizes.fixPadding * 2.0}}
        />
      </View>
    );
  }

  function todayInfo() {
    return (
      <View style={styles.todayInfoWrapStyle}>
        <View style={{flex: 1}}>
          <Text style={{...Fonts.grayColor14Regular}}>Sadai, 15 May 2020</Text>
          <View
            style={{marginTop: Sizes.fixPadding + 5.0, flexDirection: 'row'}}>
            <Feather name="cloud-rain" size={35} color={Colors.primaryColor} />
            <View style={{flex: 1, marginLeft: Sizes.fixPadding}}>
              <Text numberOfLines={1} style={{...Fonts.blackColor20Medium}}>
                Rainy Day
              </Text>
              <View
                style={{
                  marginTop: Sizes.fixPadding - 7.0,
                  flexDirection: 'row',
                }}>
                <Text style={{...Fonts.primaryColor26SemiBold}}>25</Text>
                <Text style={{...Fonts.primaryColor14Regular}}>°c</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{flex: 0.8}}>
          <View>
            <Text style={{...Fonts.primaryColor16SemiBold}}>49%</Text>
            <Text numberOfLines={1} style={{...Fonts.grayColor14Light}}>
              Indoor Humidity
            </Text>
          </View>
          <View style={{marginTop: Sizes.fixPadding + 5.0}}>
            <Text style={{...Fonts.primaryColor16SemiBold}}>41%</Text>
            <Text numberOfLines={1} style={{...Fonts.grayColor14Light}}>
              Outdoor Humidity
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function profileInfo() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          margin: Sizes.fixPadding * 2.0,
        }}>
        <View style={{flex: 1}}>
          <Text numberOfLines={1} style={{...Fonts.blackColor20Bold}}>
            Hi, Samantha!
          </Text>
          <Text
            numberOfLines={1}
            style={{
              marginTop: Sizes.fixPadding - 7.0,
              ...Fonts.blackColor14Light,
            }}>
            Welcome home
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Profile')}
          style={styles.userImageWrapStyle}>
          <Image
            source={require('../../assets/images/users/user1.png')}
            style={styles.userImageStyle}
          />
        </TouchableOpacity>
      </View>
    );
  }
};

export default HomeScreen;

const styles = StyleSheet.create({
  userImageWrapStyle: {
    width: 50.0,
    height: 50.0,
    borderRadius: 25.0,
    backgroundColor: Colors.whiteColor,
    padding: Sizes.fixPadding - 8.0,
    alignItems: 'center',
    justifyContent: 'center',
    ...commonStyles.blackShadow,
    elevation: 3.0,
  },
  userImageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 25.0,
  },
  todayInfoWrapStyle: {
    backgroundColor: Colors.extraLightPrimaryColor,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding + 10.0,
    borderRadius: Sizes.fixPadding - 5.0,
    flexDirection: 'row',
  },
  deviceActiveIndicatorStyle: {
    backgroundColor: Colors.greenColor,
    width: 8.0,
    height: 8.0,
    borderRadius: 4.0,
    position: 'absolute',
    right: 15.0,
    top: 15.0,
  },
  runningAppliancesInfoWrapStyle: {
    borderColor: Colors.extraLightGrayColor,
    borderWidth: 1.5,
    borderRadius: Sizes.fixPadding - 5.0,
    width: 165.0,
    marginRight: Sizes.fixPadding * 2.0,
    padding: Sizes.fixPadding + 5.0,
  },
  bannerWrapStyle: {
    backgroundColor: Colors.extraLightPrimaryColor,
    padding: Sizes.fixPadding + 5.0,
    borderRadius: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding * 3.0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerTimeIconWrapStyle: {
    backgroundColor: Colors.whiteColor,
    width: 34.0,
    height: 34.0,
    borderRadius: Sizes.fixPadding - 1.0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roomsInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.0,
    ...commonStyles.blackShadow,
  },
  roomImageStyle: {
    width: '100%',
    height: screenWidth / 2.8,
    borderTopLeftRadius: Sizes.fixPadding - 5.0,
    borderTopRightRadius: Sizes.fixPadding - 5.0,
  },
  acOptionIconWrapStyle: {
    width: screenWidth / 6.5,
    height: screenWidth / 6.5,
    borderRadius: screenWidth / 6.5 / 2.0,
    borderWidth: 1.0,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Sizes.fixPadding,
  },
  sheetStyle: {
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: Sizes.fixPadding * 2.0,
    borderTopRightRadius: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding * 2.0,
  },
  switchStyle: {
    width: 38.0,
    borderRadius: Sizes.fixPadding * 2.0,
    justifyContent: 'center',
  },
  switchSelectedIndicatorStyle: {
    margin: Sizes.fixPadding - 8.0,
    width: 17.0,
    height: 17.0,
    backgroundColor: Colors.whiteColor,
    borderRadius: 8.5,
  },
});
