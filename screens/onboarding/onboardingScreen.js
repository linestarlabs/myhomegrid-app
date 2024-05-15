import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  BackHandler,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from 'react-native';
import React, { useState, useCallback, createRef } from 'react';
import {
  Colors,
  Fonts,
  screenHeight,
  screenWidth,
  Sizes,
} from '../../constants/styles';
import { useFocusEffect } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import MyStatusBar from '../../components/myStatusBar';

const dummyText =
  'Lorem ipsum dolor sit amet,consectet adipiscingelit. Ut in magna urna, lectus duis.';

const onboardingScreenList = [
  {
    id: '1',
    onboardingImage: require('../../assets/images/onboarding/onboarding1.png'),
    onboardingTitle: 'Manage Home',
    onboardingDescription: dummyText,
  },
  {
    id: '2',
    onboardingImage: require('../../assets/images/onboarding/onboarding2.png'),
    onboardingTitle: 'Control Devices',
    onboardingDescription: dummyText,
  },
  {
    id: '3',
    onboardingImage: require('../../assets/images/onboarding/onboarding3.png'),
    onboardingTitle: 'Get Notified',
    onboardingDescription: dummyText,
  },
];

const OnboardingScreen = ({ navigation }) => {
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

  const listRef = createRef();
  const [backClickCount, setBackClickCount] = useState(0);
  const [currentScreen, setCurrentScreen] = useState(0);

  const scrollToIndex = ({ index }) => {
    listRef.current.scrollToIndex({ animated: true, index: index });
    setCurrentScreen(index);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>{onboardingScreenContent()}</View>
      {nextAndSigninButton()}
      {stepIndicator()}
      {exitInfo()}
    </View>
  );

  function stepIndicator() {
    return (
      <View style={styles.stepIndicatorWrapStyle}>
        <View
          style={{
            transform: [
              {
                rotate:
                  currentScreen == 1
                    ? '120deg'
                    : currentScreen == 2
                      ? '240deg'
                      : '0deg',
              },
            ],
          }}>
          <Progress.Circle
            progress={0.33}
            size={57}
            unfilledColor={'rgba(20, 0, 255, 0.25)'}
            color={Colors.primaryColor}
            borderWidth={0}
            thickness={5}
            fill={Colors.whiteColor}
          />
        </View>
        <Text style={{ position: 'absolute', ...Fonts.primaryColor16Bold }}>
          {currentScreen + 1}
        </Text>
      </View>
    );
  }

  function nextAndSigninButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.99}
        onPress={() => {
          currentScreen == 2
            ? navigation.push('Signin')
            : scrollToIndex({ index: currentScreen + 1 });
        }}
        style={{ ...styles.nextAndSigninButtonStyle }}>
        <Text style={{ ...Fonts.primaryColor18Medium }}>
          {currentScreen == 2 ? 'Sign in' : 'Next'}
        </Text>
      </TouchableOpacity>
    );
  }

  function onboardingScreenContent() {
    const renderItem = ({ item }) => {
      return (
        <View style={styles.onboardingContentStyle}>
          <View style={styles.onboardingImageWrapStyle}>
            <Image
              source={item.onboardingImage}
              style={{
                width: '100%',
                height: screenHeight / 4.0,
                resizeMode: 'contain',
              }}
            />
          </View>
          <View style={{ backgroundColor: Colors.whiteColor, height: 4.0 }} />
          <View style={{ backgroundColor: Colors.whiteColor, height: 250 }}>
            <ImageBackground
              source={require('../../assets/images/shadow.png')}
              style={{ width: screenWidth,}}
              resizeMode='stretch'
              tintColor={Colors.primaryColor}
            >
              <View
                style={{
                  marginTop: Sizes.fixPadding * 6.0,
                  marginHorizontal: Sizes.fixPadding * 2.0,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    ...Fonts.blackColor20SemiBold,
                    marginBottom: Sizes.fixPadding + 5.0,
                  }}>
                  {item.onboardingTitle}
                </Text>
                <Text
                  numberOfLines={2}
                  style={{
                    lineHeight: 20.0,
                    textAlign: 'center',
                    ...Fonts.blackColor14Light,
                  }}>
                  {item.onboardingDescription}
                </Text>
              </View>
            </ImageBackground>
          </View>
        </View>
      );
    };
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          ref={listRef}
          data={onboardingScreenList}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          horizontal
          scrollEventThrottle={32}
          pagingEnabled
          onMomentumScrollEnd={onScrollEnd}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }

  function onScrollEnd(e) {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;
    let pageNum = Math.floor(contentOffset.x / viewSize.width);
    setCurrentScreen(pageNum);
  }

  function exitInfo() {
    return backClickCount == 1 ? (
      <View style={styles.exitWrapStyle}>
        <Text style={{ ...Fonts.whiteColor13Regular }}>
          Press back once again to exit
        </Text>
      </View>
    ) : null;
  }
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  exitWrapStyle: {
    backgroundColor: Colors.blackColor,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    borderRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIndicatorStyle: {
    marginRight: Sizes.fixPadding - 2.0,
    width: 20.0,
    height: 8.0,
    borderRadius: 4.5,
    backgroundColor: Colors.primaryColor,
  },
  indicatorStyle: {
    marginRight: Sizes.fixPadding - 2.0,
    width: 8.0,
    height: 8.0,
    borderRadius: 4.0,
    borderColor: Colors.primaryColor,
    borderWidth: 1.0,
  },
  indicatorButtonAndSkipWrapStyle: {
    padding: Sizes.fixPadding * 2.0,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  onboardingContentStyle: {
    flex: 1,
    width: screenWidth,
    height: '100%',
    overflow: 'hidden',
  },
  arrowIconWrapStyle: {
    width: 50.0,
    height: 50.0,
    borderRadius: 25.0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.whiteColor,
    elevation: 3.0,
  },
  nextAndSigninButtonStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    position: 'absolute',
    bottom: 228.0,
    marginLeft: Sizes.fixPadding,
    width: 125.0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  onboardingImageWrapStyle: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepIndicatorWrapStyle: {
    position: 'absolute',
    bottom: 20.0,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
