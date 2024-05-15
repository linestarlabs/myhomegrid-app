import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, Fonts, Sizes, commonStyles} from '../../constants/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {BottomSheet} from '@rneui/themed';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import MyStatusBar from '../../components/myStatusBar';

const hoursList = [...range(1, 12)];

const minutesList = [...range(0, 59)];

function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
}

const daysList = [
  {
    id: '1',
    day: 'Mon',
    selected: true,
  },
  {
    id: '2',
    day: 'Tue',
    selected: true,
  },
  {
    id: '3',
    day: 'Wed',
    selected: false,
  },
  {
    id: '4',
    day: 'Thu',
    selected: false,
  },
  {
    id: '5',
    day: 'Fri',
    selected: false,
  },
  {
    id: '6',
    day: 'Sat',
    selected: false,
  },
  {
    id: '7',
    day: 'Sun',
    selected: false,
  },
];

const EditScheduleScreen = ({navigation}) => {
  const [deviceName, setdeviceName] = useState('Smart Lamp');
  const [showSheet, setshowSheet] = useState(false);
  const [days, setdays] = useState(daysList);
  const [selectedHour, setselectedHour] = useState(hoursList[3]);
  const [selectedMinute, setselectedMinute] = useState(minutesList[3]);
  const [selectedAmPm, setselectedAmPm] = useState('pm');
  const [openSheetFor, setopenSheetFor] = useState('');
  const [onTime, setonTime] = useState('Mon, Tue • 11:00 am');
  const [offTime, setoffTime] = useState('Mon, Tue • 01:00 pm');

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: Sizes.fixPadding * 2.0}}>
          {deviceNameInfo()}
          {onInfo()}
          {offInfo()}
        </ScrollView>
      </View>
      {updateButton()}
      {dateTimeSheet()}
    </View>
  );

  function dateTimeSheet() {
    return (
      <BottomSheet
        onBackdropPress={() => {
          setshowSheet(false);
        }}
        isVisible={showSheet}>
        <View style={styles.sheetStyle}>
          {daysInfo()}
          {timesInfo()}
        </View>
      </BottomSheet>
    );
  }

  function timesInfo() {
    return (
      <View style={{marginTop: Sizes.fixPadding * 2.0}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: Sizes.fixPadding,
          }}>
          <Text style={{flex: 1, ...Fonts.blackColor18SemiBold}}>
            Select Time
          </Text>
          <Text
            onPress={() => {
              const selectedDaysArray = days.filter(
                item => item.selected == true,
              );
              const selectedDays = selectedDaysArray
                .map(item => item.day)
                .join(', ');
              const selectedTimeDisplay = `${
                selectedHour.toString().length == 1
                  ? `0${selectedHour}`
                  : selectedHour
              }:${
                selectedMinute.toString().length == 1
                  ? `0${selectedMinute}`
                  : selectedMinute
              } ${selectedAmPm}`;
              openSheetFor == 'On'
                ? setonTime(`${selectedDays} • ${selectedTimeDisplay}`)
                : setoffTime(`${selectedDays} • ${selectedTimeDisplay}`);
              setshowSheet(false);
            }}
            style={{...Fonts.primaryColor16SemiBold}}>
            Done
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {hourPicker()}
          <Text
            style={{
              ...Fonts.blackColor20Bold,
              marginHorizontal: Sizes.fixPadding * 2.0,
            }}>
            :
          </Text>
          {minutePicker()}
          <Text
            style={{
              ...Fonts.blackColor20Bold,
              marginHorizontal: Sizes.fixPadding * 2.0,
            }}>
            :
          </Text>
          {amPmPicker()}
        </View>
      </View>
    );

    function amPmPicker() {
      const list = ['am', 'pm'];
      return (
        <ScrollPicker
          dataSource={list}
          selectedIndex={list.indexOf(selectedAmPm)}
          renderItem={data => {
            return (
              <Text
                style={
                  data == selectedAmPm
                    ? {...Fonts.blackColor14Medium}
                    : {...Fonts.lightGrayColor14Regular}
                }>
                {data}
              </Text>
            );
          }}
          onValueChange={data => {
            setselectedAmPm(data);
          }}
          wrapperColor={Colors.whiteColor}
          itemHeight={50}
          highlightColor={Colors.primaryColor}
          highlightBorderWidth={1}
        />
      );
    }

    function hourPicker() {
      return (
        <ScrollPicker
          dataSource={hoursList}
          selectedIndex={hoursList.indexOf(selectedHour)}
          renderItem={data => {
            return (
              <Text
                style={
                  data == selectedHour
                    ? {...Fonts.blackColor14Medium}
                    : {...Fonts.lightGrayColor14Regular}
                }>
                {data.toString().length == 1 ? `0${data}` : data}
              </Text>
            );
          }}
          onValueChange={data => {
            setselectedHour(data);
          }}
          wrapperColor={Colors.whiteColor}
          itemHeight={50}
          highlightColor={Colors.primaryColor}
          highlightBorderWidth={1}
        />
      );
    }

    function minutePicker() {
      return (
        <ScrollPicker
          dataSource={minutesList}
          selectedIndex={minutesList.indexOf(selectedMinute)}
          renderItem={data => {
            return (
              <Text
                style={
                  data == selectedMinute
                    ? {...Fonts.blackColor14Medium}
                    : {...Fonts.lightGrayColor14Regular}
                }>
                {data.toString().length == 1 ? `0${data}` : data}
              </Text>
            );
          }}
          onValueChange={data => {
            setselectedMinute(data);
          }}
          wrapperColor={Colors.whiteColor}
          itemHeight={50}
          highlightColor={Colors.primaryColor}
          highlightBorderWidth={1}
        />
      );
    }
  }

  function changeDaysSelection({id}) {
    const copyDays = days;
    const newDays = copyDays.map(item => {
      if (item.id == id) {
        return {...item, selected: !item.selected};
      } else {
        return item;
      }
    });
    setdays(newDays);
  }

  function daysInfo() {
    return (
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{flex: 1, ...Fonts.blackColor18SemiBold}}>
            Select Days
          </Text>
          <MaterialIcons
            name="close"
            color={Colors.blackColor}
            size={20}
            onPress={() => {
              setshowSheet(false);
            }}
          />
        </View>
        <View style={styles.allDaysWrapStyle}>
          {days.map(item => (
            <View key={`${item.id}`} style={{flexDirection: 'row', flex: 1}}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  changeDaysSelection({id: item.id});
                }}
                style={{
                  ...styles.daysWrapStyle,
                  backgroundColor: item.selected
                    ? Colors.primaryColor
                    : Colors.extraLightPrimaryColor,
                }}>
                <Text
                  numberOfLines={1}
                  style={
                    item.selected
                      ? {...Fonts.whiteColor14Regular}
                      : {...Fonts.grayColor14Regular}
                  }>
                  {item.day}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  width: 0.8,
                  backgroundColor: Colors.whiteColor,
                  height: '100%',
                }}
              />
            </View>
          ))}
        </View>
      </View>
    );
  }

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

  function offInfo() {
    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.blackColor14Regular}}>When to OFF</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setopenSheetFor('Off'), setshowSheet(true);
          }}
          style={{
            ...styles.infoWrapStyle,
            borderColor: offTime ? Colors.primaryColor : Colors.lightGrayColor,
          }}>
          <Text
            numberOfLines={1}
            style={
              offTime
                ? {...Fonts.blackColor14Light}
                : {...Fonts.grayColor14Light}
            }>
            {offTime ? offTime : 'Set days and time...'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function onInfo() {
    return (
      <View style={{margin: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.blackColor14Regular}}>When to ON</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setopenSheetFor('On'), setshowSheet(true);
          }}
          style={{
            ...styles.infoWrapStyle,
            borderColor: onTime ? Colors.primaryColor : Colors.lightGrayColor,
          }}>
          <Text
            numberOfLines={1}
            style={
              onTime
                ? {...Fonts.blackColor14Light}
                : {...Fonts.grayColor14Light}
            }>
            {onTime ? onTime : 'Set days and time...'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function deviceNameInfo() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}>
        <Text style={{...Fonts.blackColor14Regular}}>Device Name</Text>
        <View
          style={{
            ...styles.infoWrapStyle,
            borderColor: deviceName
              ? Colors.primaryColor
              : Colors.lightGrayColor,
          }}>
          <TextInput
            placeholder="Enter your device name..."
            placeholderTextColor={Colors.grayColor}
            value={deviceName}
            onChangeText={value => setdeviceName(value)}
            style={{...Fonts.blackColor14Light, height: 18.0,padding:0}}
            cursorColor={Colors.primaryColor}
          />
        </View>
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
          Edit Schedule
        </Text>
      </View>
    );
  }
};

export default EditScheduleScreen;

const styles = StyleSheet.create({
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
  sheetStyle: {
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: Sizes.fixPadding,
    borderTopRightRadius: Sizes.fixPadding,
    padding: Sizes.fixPadding * 2.0,
  },
  daysWrapStyle: {
    paddingVertical: Sizes.fixPadding + 2.0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Sizes.fixPadding - 5.0,
    flex: 1,
  },
  allDaysWrapStyle: {
    marginVertical: Sizes.fixPadding * 2.0,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Sizes.fixPadding,
    overflow: 'hidden',
  },
});
