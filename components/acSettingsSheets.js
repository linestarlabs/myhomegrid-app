import React, {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {BottomSheet} from '@rneui/themed';
import {RadialSlider} from 'react-native-radial-slider';
import {View, TouchableOpacity, Text, FlatList, StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes, screenWidth} from '../constants/styles';

const acOptionsList = [
  {
    id: '1',
    iconName: 'ac-unit',
    option: 'Coolest',
    isSelected: false,
  },
  {
    id: '2',
    iconName: 'nightlight-round',
    option: 'Slumber',
    isSelected: true,
  },
  {
    id: '3',
    iconName: 'remove-red-eye',
    option: 'Visible',
    isSelected: false,
  },
  {
    id: '4',
    iconName: 'timer',
    option: 'Timer',
    isSelected: false,
  },
];

export function acSettingsSheet({showAcSettings, setshowAcSettings}) {
  const [acTempValue, setacTempValue] = useState(20);
  const [acOn, setacOn] = useState(true);
  const [acOptions, setacOptions] = useState(acOptionsList);

  return (
    <BottomSheet
      isVisible={showAcSettings}
      onBackdropPress={() => {
        setshowAcSettings(false);
      }}
      scrollViewProps={{scrollEnabled: false}}>
      <View style={styles.sheetStyle}>
        {sheetHeader()}
        {coolingSlider()}
        {options()}
      </View>
    </BottomSheet>
  );

  function options() {
    const renderItem = ({item}) => (
      <View
        style={{
          width: screenWidth / 5.5,
          alignItems: 'center',
          marginHorizontal: Sizes.fixPadding,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            changeAcOptions({id: item.id});
          }}
          style={{
            backgroundColor: item.isSelected
              ? Colors.primaryColor
              : Colors.whiteColor,
            borderColor: item.isSelected
              ? Colors.primaryColor
              : Colors.lightGrayColor,
            ...styles.acOptionIconWrapStyle,
          }}>
          <MaterialIcons
            name={item.iconName}
            color={item.isSelected ? Colors.whiteColor : Colors.lightGrayColor}
            size={screenWidth / 14.0}
          />
        </TouchableOpacity>
        <Text style={{...Fonts.blackColor14Light}}>{item.option}</Text>
      </View>
    );
    return (
      <FlatList
        data={acOptions}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: Sizes.fixPadding}}
      />
    );
  }

  function coolingSlider() {
    return (
      <View
        style={{
          marginVertical: Sizes.fixPadding * 3.0,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <RadialSlider
          variant={'radial-circle-slider'}
          value={acTempValue}
          min={0}
          max={40}
          onChange={setacTempValue}
          thumbRadius={12}
          thumbColor={Colors.primaryColor}
          thumbBorderColor={Colors.whiteColor}
          sliderWidth={15}
          lineSpace={15}
          lineColor={Colors.primaryColor}
          sliderTrackColor={Colors.extraLightGrayColor}
          linearGradient={[
            {offset: '0%', color: Colors.primaryColor},
            {offset: '100%', color: Colors.primaryColor},
          ]}
          isHideCenterContent
        />
        <View style={{position: 'absolute'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{...Fonts.primaryColor35Bold}}>{acTempValue}</Text>
            <Text style={{...Fonts.grayColor16Regular}}>°c</Text>
          </View>
          <Text style={{...Fonts.grayColor14Light}}>Cooling...</Text>
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
          Air Conditioner
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setacOn(!acOn);
          }}
          style={{
            backgroundColor: acOn ? Colors.primaryColor : Colors.lightGrayColor,
            alignItems: acOn ? 'flex-end' : 'flex-start',
            ...styles.switchStyle,
          }}>
          <View style={styles.switchSelectedIndicatorStyle} />
        </TouchableOpacity>
      </View>
    );
  }

  function changeAcOptions({id}) {
    const copyOptions = acOptions;
    const newOptions = copyOptions.map(item => {
      if (item.id == id) {
        return {...item, isSelected: !item.isSelected};
      } else {
        return item;
      }
    });
    setacOptions(newOptions);
  }
}

const styles = StyleSheet.create({
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
