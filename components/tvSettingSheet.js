import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BottomSheet, Slider} from '@rneui/themed';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {
  Colors,
  Fonts,
  Sizes,
  commonStyles,
  screenWidth,
} from '../constants/styles';

const tvChannelsList = [
  {
    id: '1',
    channel: require('../assets/images/channel/netflix.png'),
  },
  {
    id: '2',
    channel: require('../assets/images/channel/youtube.png'),
  },
  {
    id: '3',
    channel: require('../assets/images/channel/hbo.png'),
  },
  {
    id: '4',
    channel: require('../assets/images/channel/apple_tv.png'),
  },
  {
    id: '5',
    channel: require('../assets/images/channel/sony_max.png'),
  },
  {
    id: '6',
    channel: require('../assets/images/channel/mtv.png'),
  },
  {
    id: '7',
    channel: require('../assets/images/channel/colors.png'),
  },
  {
    id: '8',
    channel: require('../assets/images/channel/discovery.png'),
  },
];

export function tvSettingsSheet({showTvSettings, setshowTvSettings}) {
  const [tvOn, settvOn] = useState(true);
  const [volume, setvolume] = useState(40);
  const [selectedChannelIndex, setselectedChannelIndex] = useState(0);

  return (
    <BottomSheet
      isVisible={showTvSettings}
      onBackdropPress={() => {
        setshowTvSettings(false);
      }}
      scrollViewProps={{scrollEnabled: false}}>
      <View style={styles.sheetStyle}>
        {sheetHeader()}
        {tvRemote()}
        {volumeInfo()}
        {channelsInfo()}
      </View>
    </BottomSheet>
  );

  function channelsInfo() {
    const renderItem = ({item, index}) => (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          setselectedChannelIndex(index);
        }}
        style={{
          ...styles.tvChannelWrapStyle,
          borderColor:
            selectedChannelIndex == index
              ? Colors.primaryColor
              : Colors.lightGrayColor,
          backgroundColor:
            selectedChannelIndex == index
              ? Colors.primaryColor
              : Colors.whiteColor,
        }}>
        <Image
          source={item.channel}
          style={{
            width: screenWidth / 15.0,
            height: screenWidth / 15.0,
            resizeMode: 'contain',
          }}
        />
      </TouchableOpacity>
    );
    return (
      <View style={{marginTop: Sizes.fixPadding * 4.0}}>
        <FlatList
          data={tvChannelsList}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: Sizes.fixPadding}}
        />
      </View>
    );
  }

  function volumeInfo() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}>
        <Feather name="volume-1" color={Colors.grayColor} size={26} />
        <View style={{flex: 1, marginHorizontal: Sizes.fixPadding * 2.0}}>
          <Slider
            value={volume}
            onValueChange={value => setvolume(value)}
            maximumValue={100}
            minimumValue={0}
            step={1}
            allowTouchTrack
            trackStyle={{height: 4}}
            thumbStyle={styles.sliderThumbStyle}
            minimumTrackTintColor={Colors.primaryColor}
            maximumTrackTintColor={Colors.lightGrayColor}
          />
        </View>
        <Feather name="volume-2" color={Colors.grayColor} size={26} />
      </View>
    );
  }

  function tvRemote() {
    return (
      <View style={styles.tvRemoteWrapStyle}>
        <Ionicons
          name="caret-up"
          color={Colors.whiteColor}
          size={screenWidth / 16.0}
          onPress={() => {}}
        />
        <View style={styles.remoteOkAndSkipButtonsWrapStyle}>
          <Ionicons
            name="play-back"
            color={Colors.whiteColor}
            size={screenWidth / 16.0}
            onPress={() => {}}
          />
          <View style={styles.remoteOkButtonStyle}>
            <Text style={{...Fonts.primaryColor30Bold}}>OK</Text>
          </View>
          <Ionicons
            name="play-forward"
            color={Colors.whiteColor}
            size={screenWidth / 16.0}
            onPress={() => {}}
          />
        </View>
        <Ionicons
          name="caret-down"
          color={Colors.whiteColor}
          size={screenWidth / 16.0}
          onPress={() => {}}
        />
      </View>
    );
  }

  function sheetHeader() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={{...Fonts.blackColor18SemiBold, flex: 1}}>Smart TV</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            settvOn(!tvOn);
          }}
          style={{
            backgroundColor: tvOn ? Colors.primaryColor : Colors.lightGrayColor,
            alignItems: tvOn ? 'flex-end' : 'flex-start',
            ...styles.switchStyle,
          }}>
          <View style={styles.switchSelectedIndicatorStyle} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tvChannelWrapStyle: {
    width: screenWidth / 6.5,
    height: screenWidth / 6.5,
    borderRadius: screenWidth / 6.5 / 2.0,
    borderWidth: 1.0,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding,
  },
  remoteOkButtonStyle: {
    width: screenWidth / 3.5,
    height: screenWidth / 3.5,
    borderRadius: screenWidth / 3.5 / 2.0,
    backgroundColor: Colors.whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Sizes.fixPadding - 3.0,
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
  remoteOkAndSkipButtonsWrapStyle: {
    marginVertical: Sizes.fixPadding - 3.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tvRemoteWrapStyle: {
    backgroundColor: Colors.primaryColor,
    width: screenWidth / 2.05,
    height: screenWidth / 2.05,
    borderRadius: screenWidth / 2.05 / 2.0,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Sizes.fixPadding * 3.0,
  },
  sliderThumbStyle: {
    height: 24,
    width: 24,
    backgroundColor: Colors.whiteColor,
    ...commonStyles.blackShadow,
  },
});
