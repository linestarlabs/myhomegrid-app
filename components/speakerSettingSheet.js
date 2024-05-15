import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, commonStyles, Fonts, screenWidth, Sizes} from '../constants/styles';
import {Slider, BottomSheet} from '@rneui/themed';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RadialSlider} from 'react-native-radial-slider';

export function speakerSettingsSheet({
  showSpeakerSettings,
  setshowSpeakerSettings,
}) {
  const [speakerOn, setspeakerOn] = useState(true);
  const [volume, setvolume] = useState(40);
  const [musicPlay, setMusicPlay] = useState(true);
  const [progressValue, setprogressValue] = useState(40);

  return (
    <BottomSheet
      isVisible={showSpeakerSettings}
      onBackdropPress={() => {
        setshowSpeakerSettings(false);
      }}
      scrollViewProps={{scrollEnabled: false}}>
      <View style={styles.sheetStyle}>
        {sheetHeader()}
        {musicPlayerInfo()}
        {volumeInfo()}
        {songInfo()}
      </View>
    </BottomSheet>
  );

  function songInfo() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding * 3.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
          alignItems: 'center',
        }}>
        <View
          style={{
            marginBottom: Sizes.fixPadding,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Ionicons name="caret-back" size={28} color={Colors.primaryColor} />
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: Sizes.fixPadding * 3.0,
            }}>
            <Image
              source={require('../assets/images/singer/singer1.png')}
              style={{
                width: screenWidth / 7.0,
                height: screenWidth / 7.0,
                borderRadius: screenWidth / 7.0 / 2.0,
              }}
            />
            <Ionicons
              name={musicPlay ? 'pause' : 'play'}
              size={20}
              color={Colors.whiteColor}
              style={{position: 'absolute'}}
              onPress={() => {
                setMusicPlay(!musicPlay);
              }}
            />
          </View>
          <Ionicons
            name="caret-forward"
            size={28}
            color={Colors.primaryColor}
          />
        </View>
      </View>
    );
  }

  function musicPlayerInfo() {
    return (
      <View style={styles.musicPlayerInfoWrapStyle}>
        <RadialSlider
          variant={'radial-circle-slider'}
          value={progressValue}
          min={0}
          max={100}
          onChange={setprogressValue}
          thumbRadius={7}
          thumbColor={Colors.primaryColor}
          thumbBorderColor={Colors.whiteColor}
          sliderWidth={7}
          lineColor={Colors.primaryColor}
          sliderTrackColor={Colors.extraLightGrayColor}
          linearGradient={[
            {offset: '0%', color: Colors.primaryColor},
            {offset: '100%', color: Colors.primaryColor},
          ]}
          isHideCenterContent
          isHideLines
        />
        <View style={{position: 'absolute'}}>
          <ImageBackground
            source={require('../assets/images/singer/singer1.png')}
            style={styles.singerImageStyle}
            resizeMode="stretch">
            <Text
              style={{
                width: screenWidth / 3.7,
                textAlign: 'center',
                margin: Sizes.fixPadding * 2.0,
              }}>
              <Text style={{...Fonts.whiteColor14Regular}}>02:30 / {}</Text>
              <Text style={{...Fonts.primaryColor14Regular}}>04:08</Text>
            </Text>
          </ImageBackground>
        </View>
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

  function sheetHeader() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={{...Fonts.blackColor18SemiBold, flex: 1}}>Speaker</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setspeakerOn(!speakerOn);
          }}
          style={{
            backgroundColor: speakerOn
              ? Colors.primaryColor
              : Colors.lightGrayColor,
            alignItems: speakerOn ? 'flex-end' : 'flex-start',
            ...styles.switchStyle,
          }}>
          <View style={styles.switchSelectedIndicatorStyle} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  singerImageStyle: {
    width: screenWidth / 2.4,
    height: screenWidth / 2.4,
    borderRadius: screenWidth / 2.4 / 2.0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  musicPlayerInfoWrapStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding * 3.0,
  },
  sliderThumbStyle: {
    height: 24,
    width: 24,
    backgroundColor: Colors.whiteColor,
    ...commonStyles.blackShadow,
  },
});
