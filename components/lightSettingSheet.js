import {BottomSheet, Slider} from '@rneui/themed';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Colors, Fonts, Sizes, commonStyles} from '../constants/styles';
import ColorPicker from 'react-native-wheel-color-picker';

export function lightSettingsSheet({showLightSettings, setshowLightSettings}) {
  const [lightOn, setlightOn] = useState(true);
  const [brightness, setbrightness] = useState(50);
  const [color, setColor] = useState(Colors.primaryColor);

  return (
    <BottomSheet
      isVisible={showLightSettings}
      onBackdropPress={() => {
        setshowLightSettings(false);
      }}
      scrollViewProps={{scrollEnabled: false}}>
      <View style={styles.sheetStyle}>
        {sheetHeader()}
        {colorPickerInfo()}
        {brightnessInfo()}
      </View>
    </BottomSheet>
  );

  function colorPickerInfo() {
    return (
      <View style={{marginVertical: Sizes.fixPadding * 3.0}}>
        <View
          style={{
            marginBottom: Sizes.fixPadding,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ColorPicker
            color={color}
            thumbSize={20}
            swatches={false}
            sliderHidden
            shadeWheelThumb
            onColorChange={color => setColor(color)}
          />
          <View style={styles.brightnessInfoWrapStyle}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{...Fonts.primaryColor30Bold}}>{brightness}</Text>
              <Text style={{...Fonts.primaryColor14Regular}}>lm</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View style={{width: 20.0, height: 20.0, backgroundColor: color}} />
          <Text
            style={{
              marginLeft: Sizes.fixPadding,
              textDecorationLine: 'underline',
              ...Fonts.grayColor14Regular,
            }}>
            Set as Default
          </Text>
        </View>
      </View>
    );
  }

  function brightnessInfo() {
    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.blackColor15Regular}}>Brightness</Text>
        <View
          style={{
            marginTop: Sizes.fixPadding,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{...Fonts.grayColor14Regular}}>0%</Text>
          <View style={{flex: 1, marginHorizontal: Sizes.fixPadding}}>
            <Slider
              value={brightness}
              onValueChange={value => setbrightness(value)}
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
          <Text style={{...Fonts.grayColor14Regular}}>100%</Text>
        </View>
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
        <Text style={{...Fonts.blackColor18SemiBold, flex: 1}}>
          Smart Light
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setlightOn(!lightOn);
          }}
          style={{
            backgroundColor: lightOn
              ? Colors.primaryColor
              : Colors.lightGrayColor,
            alignItems: lightOn ? 'flex-end' : 'flex-start',
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
  brightnessInfoWrapStyle: {
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: 'white',
    width: 100.0,
    height: 100.0,
    padding: Sizes.fixPadding * 2.0,
    borderRadius: 50.0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  sliderThumbStyle: {
    height: 24,
    width: 24,
    backgroundColor: Colors.whiteColor,
    ...commonStyles.blackShadow,
  },
});
