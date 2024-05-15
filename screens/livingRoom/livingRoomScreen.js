import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, Fonts, screenWidth, Sizes} from '../../constants/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {acSettingsSheet} from '../../components/acSettingsSheets';
import {tvSettingsSheet} from '../../components/tvSettingSheet';
import {lightSettingsSheet} from '../../components/lightSettingSheet';
import {speakerSettingsSheet} from '../../components/speakerSettingSheet';
import MyStatusBar from '../../components/myStatusBar';

const appliancesList = [
  {
    id: '1',
    icon: require('../../assets/images/icons/light.png'),
    deviceName: 'Smart Light',
    consumes: '10 kWh',
    isActive: true,
  },
  {
    id: '2',
    icon: require('../../assets/images/icons/smart_tv.png'),
    deviceName: 'Smart TV',
    consumes: '20 kWh',
    isActive: true,
  },
  {
    id: '3',
    icon: require('../../assets/images/icons/ac.png'),
    deviceName: 'Air Conditioner',
    consumes: '10 kWh',
    isActive: true,
  },
  {
    id: '4',
    icon: require('../../assets/images/icons/fan.png'),
    deviceName: 'Fan',
    consumes: '20 kWh',
    isActive: false,
  },
  {
    id: '5',
    icon: require('../../assets/images/icons/speaker.png'),
    deviceName: 'Speaker',
    consumes: '6 kWh',
    isActive: false,
  },
];

const LivingRoomScreen = ({navigation}) => {
  const [appliances, setappliances] = useState(appliancesList);
  const [showAcSettings, setshowAcSettings] = useState(false);
  const [showTvSettings, setshowTvSettings] = useState(false);
  const [showLightSettings, setshowLightSettings] = useState(false);
  const [showSpeakerSettings, setshowSpeakerSettings] = useState(false);

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        {appliancesInfo()}
      </View>
      {acSettingsSheet({showAcSettings, setshowAcSettings})}
      {tvSettingsSheet({showTvSettings, setshowTvSettings})}
      {lightSettingsSheet({showLightSettings, setshowLightSettings})}
      {speakerSettingsSheet({showSpeakerSettings, setshowSpeakerSettings})}
    </View>
  );

  function updateAppliance({id}) {
    const copyAppliances = appliances;
    const newAppliances = copyAppliances.map(item => {
      if (item.id == id) {
        return {...item, isActive: !item.isActive};
      } else {
        return item;
      }
    });
    setappliances(newAppliances);
  }

  function appliancesInfo() {
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
            : item.deviceName == 'Speaker'
            ? setshowSpeakerSettings(true)
            : null;
        }}
        style={styles.runningAppliancesInfoWrapStyle}>
        {item.isActive ? (
          <View style={styles.deviceActiveIndicatorStyle} />
        ) : null}
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
          numberOfLines={1}
          style={{
            marginTop: Sizes.fixPadding - 5.0,
            ...Fonts.grayColor14Light,
          }}>
          Consumes {item.consumes}
        </Text>
        <Feather
          name="power"
          size={20}
          color={item.isActive ? Colors.redColor : Colors.grayColor}
          style={{marginTop: Sizes.fixPadding + 5.0}}
          onPress={() => {
            updateAppliance({id: item.id});
          }}
        />
      </TouchableOpacity>
    );
    return (
      <FlatList
        data={appliances}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: Sizes.fixPadding}}
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
          Living Room
        </Text>
      </View>
    );
  }
};

export default LivingRoomScreen;

const styles = StyleSheet.create({
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
    flex: 1,
    marginHorizontal: Sizes.fixPadding,
    padding: Sizes.fixPadding + 5.0,
    marginBottom: Sizes.fixPadding * 2.0,
    maxWidth: screenWidth / 2.4,
  },
});
