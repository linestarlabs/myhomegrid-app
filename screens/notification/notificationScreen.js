import React, {useState, useRef, useCallback} from 'react';
import {
  Animated,
  View,
  StyleSheet,
  Text,
  Image,
  Platform,
  BackHandler,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Snackbar} from 'react-native-paper';
import {Colors, commonStyles, Fonts, screenWidth, Sizes} from '../../constants/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFocusEffect} from '@react-navigation/native';

const notificatiosList = [
  {
    key: '1',
    title: 'Adjust Home devices',
    description: 'Adjust lights, plugs, thermostats and more',
    iconName: 'home-variant',
    color: '#EF6191',
  },
  {
    key: '2',
    title: 'Smart Lamp Setting',
    description: 'Hue lights will now reduce to 50% brightn...',
    iconName: 'lightbulb',
    color: '#9FA8DA',
  },
  {
    key: '3',
    title: 'Security Alert',
    description: 'You’ve left your door unlock!',
    iconName: 'lock-open',
    color: '#80DEEA',
  },
  {
    key: '4',
    title: 'Get info and reminders',
    description: 'Latest weather, your coommute, reminders',
    iconName: 'microphone',
    color: '#80CBC4',
  },
];

const rowTranslateAnimatedValues = {};

const NotificationScreen = ({navigation}) => {
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
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState('');
  const [listData, setListData] = useState(notificatiosList);

  Array(listData.length + 1)
    .fill('')
    .forEach((_, i) => {
      rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
    });

  const animationIsRunning = useRef(false);

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <View style={{flex: 1}}>
        {header()}
        {listData.length == 0 ? noNotoficationInfo() : notifications()}
      </View>
      {snackBar()}
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

  function header() {
    return (
      <Text style={{margin: Sizes.fixPadding * 2.0, ...Fonts.blackColor20Bold}}>
        Notifications
      </Text>
    );
  }

  function noNotoficationInfo() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={require('../../assets/images/icons/notification.png')}
          style={{width: 70.0, height: 70.0, resizeMode: 'contain'}}
        />
        <Text
          style={{
            ...Fonts.blackColor15Regular,
            marginTop: Sizes.fixPadding + 5.0,
          }}>
          No new notifications
        </Text>
      </View>
    );
  }

  function notifications() {
    const onSwipeValueChange = swipeData => {
      const {key, value} = swipeData;
      if (
        value > screenWidth ||
        (value < -screenWidth && !animationIsRunning.current)
      ) {
        animationIsRunning.current = true;
        Animated.timing(rowTranslateAnimatedValues[key], {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start(() => {
          const newData = [...listData];
          const prevIndex = listData.findIndex(item => item.key === key);
          newData.splice(prevIndex, 1);
          const removedItem = listData.find(item => item.key === key);
          setSnackBarMsg(`${removedItem.title} dismissed!`);
          setListData(newData);
          setShowSnackBar(true);
          animationIsRunning.current = false;
        });
      }
    };

    const renderItem = data => (
      <Animated.View
        style={[
          {
            height: rowTranslateAnimatedValues[data.item.key].interpolate({
              inputRange: ['0%', '100%'],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}>
        <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
          <View style={styles.notificationWrapStyle}>
            <MaterialCommunityIcons
              name={data.item.iconName}
              size={24}
              color={data.item.color}
            />
            <View style={{flex: 1, marginLeft: Sizes.fixPadding}}>
              <Text numberOfLines={1} style={{...Fonts.blackColor16Regular}}>
                {data.item.title}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  marginTop: Sizes.fixPadding - 7.0,
                  ...Fonts.grayColor14Light,
                }}>
                {data.item.description}
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
    );

    const renderHiddenItem = () => <View style={styles.rowBack} />;
    return (
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-screenWidth}
        leftOpenValue={screenWidth}
        onSwipeValueChange={onSwipeValueChange}
        useNativeDriver={false}
        contentContainerStyle={{paddingVertical: Sizes.fixPadding - 8.0}}
        scrollEnabled={false}
      />
    );
  }

  function snackBar() {
    return (
      <Snackbar
        style={{
          backgroundColor: Colors.blackColor,
          bottom: Platform.OS == 'ios' ? -15.0 : 15.0,
        }}
        visible={showSnackBar}
        onDismiss={() => setShowSnackBar(false)}
        elevation={0.0}>
        <Text
          style={{
            ...Fonts.whiteColor14Regular,
            marginTop: Platform.OS == 'ios' ? 3.0 : 0,
          }}>
          {snackBarMsg}
        </Text>
      </Snackbar>
    );
  }
};

export default NotificationScreen;

const styles = StyleSheet.create({
  rowBack: {
    alignItems: 'center',
    backgroundColor: Colors.primaryColor,
    flex: 1,
    marginBottom: Sizes.fixPadding * 2.0,
  },
  notificationWrapStyle: {
    flexDirection: 'row',
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.extraLightGrayColor,
    borderWidth: 1.5,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding + 3.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.0,
  },
});
