import { Dimensions } from "react-native"

export const Colors = {
    blackColor: '#000000',
    whiteColor: '#FFFFFF',
    lightGrayColor: 'rgba(138, 156, 191, 0.4)',
    grayColor: '#8A9CBF',
    primaryColor: '#1400FF',
    lightPrimaryColor: 'rgba(20, 0, 255, 0.70)',
    extraLightPrimaryColor: 'rgba(20, 0, 255, 0.03)',
    extraLightGrayColor: '#ECF1FF',
    redColor: '#FF0000',
    greenColor: '#008F11',
    lightGreenColor: '#009688',
    blueColor: '#00A7F7',
    lightRedColor: '#DD5A5A',
}

export const Fonts = {

    whiteColor13Regular: {
        color: Colors.whiteColor,
        fontSize: 13.0,
        fontFamily: 'PulpDisplay_Regular'
    },

    whiteColor14Regular: {
        color: Colors.whiteColor,
        fontSize: 14.0,
        fontFamily: 'PulpDisplay_Regular'
    },

    whiteColor18Medium: {
        color: Colors.whiteColor,
        fontSize: 18.0,
        fontFamily: 'PulpDisplay_Medium'
    },

    blackColor14Light: {
        color: Colors.blackColor,
        fontSize: 14.0,
        fontFamily: 'PulpDisplay_Light'
    },

    blackColor14Regular: {
        color: Colors.blackColor,
        fontSize: 14.0,
        fontFamily: 'PulpDisplay_Regular'
    },

    blackColor15Regular: {
        color: Colors.blackColor,
        fontSize: 15.0,
        fontFamily: 'PulpDisplay_Regular'
    },

    blackColor16Regular: {
        color: Colors.blackColor,
        fontSize: 16.0,
        fontFamily: 'PulpDisplay_Regular'
    },

    blackColor18Regular: {
        color: Colors.blackColor,
        fontSize: 18.0,
        fontFamily: 'PulpDisplay_Regular'
    },

    blackColor14Medium: {
        color: Colors.blackColor,
        fontSize: 14.0,
        fontFamily: 'PulpDisplay_Medium'
    },

    blackColor16Medium: {
        color: Colors.blackColor,
        fontSize: 16.0,
        fontFamily: 'PulpDisplay_Medium'
    },

    blackColor18Medium: {
        color: Colors.blackColor,
        fontSize: 18.0,
        fontFamily: 'PulpDisplay_Medium'
    },

    blackColor20Medium: {
        color: Colors.blackColor,
        fontSize: 20.0,
        fontFamily: 'PulpDisplay_Medium'
    },

    blackColor18SemiBold: {
        color: Colors.blackColor,
        fontSize: 18.0,
        fontFamily: 'PulpDisplay_SemiBold'
    },

    blackColor20SemiBold: {
        color: Colors.blackColor,
        fontSize: 20.0,
        fontFamily: 'PulpDisplay_SemiBold'
    },

    blackColor18Bold: {
        color: Colors.blackColor,
        fontSize: 18.0,
        fontFamily: 'PulpDisplay_Bold'
    },

    blackColor20Bold: {
        color: Colors.blackColor,
        fontSize: 20.0,
        fontFamily: 'PulpDisplay_Bold'
    },

    grayColor12Light: {
        color: Colors.grayColor,
        fontSize: 12.0,
        fontFamily: 'PulpDisplay_Light'
    },

    grayColor14Light: {
        color: Colors.grayColor,
        fontSize: 14.0,
        fontFamily: 'PulpDisplay_Light'
    },

    grayColor16Light: {
        color: Colors.grayColor,
        fontSize: 16.0,
        fontFamily: 'PulpDisplay_Light'
    },

    grayColor14Regular: {
        color: Colors.grayColor,
        fontSize: 14.0,
        fontFamily: 'PulpDisplay_Regular'
    },

    grayColor16Regular: {
        color: Colors.grayColor,
        fontSize: 16.0,
        fontFamily: 'PulpDisplay_Regular'
    },

    lightGrayColor14Regular: {
        color: Colors.lightGrayColor,
        fontSize: 14.0,
        fontFamily: 'PulpDisplay_Regular'
    },

    primaryColor14Light: {
        color: Colors.primaryColor,
        fontSize: 14.0,
        fontFamily: 'PulpDisplay_Light'
    },

    primaryColor14Regular: {
        color: Colors.primaryColor,
        fontSize: 14.0,
        fontFamily: 'PulpDisplay_Regular'
    },

    primaryColor16Medium: {
        color: Colors.primaryColor,
        fontSize: 16.0,
        fontFamily: 'PulpDisplay_Medium'
    },

    primaryColor18Medium: {
        color: Colors.primaryColor,
        fontSize: 18.0,
        fontFamily: 'PulpDisplay_Medium'
    },

    primaryColor16SemiBold: {
        color: Colors.primaryColor,
        fontSize: 16.0,
        fontFamily: 'PulpDisplay_SemiBold'
    },

    primaryColor26SemiBold: {
        color: Colors.primaryColor,
        fontSize: 26.0,
        fontFamily: 'PulpDisplay_SemiBold'
    },

    primaryColor16Bold: {
        color: Colors.primaryColor,
        fontSize: 16.0,
        fontFamily: 'PulpDisplay_Bold'
    },

    primaryColor30Bold: {
        color: Colors.primaryColor,
        fontSize: 30.0,
        fontFamily: 'PulpDisplay_Bold'
    },

    primaryColor35Bold: {
        color: Colors.primaryColor,
        fontSize: 35.0,
        fontFamily: 'PulpDisplay_Bold'
    }
}

export const Sizes = {
    fixPadding: 10.0
}

export const screenWidth = Dimensions.get('window').width;

export const screenHeight = Dimensions.get('window').height;

export const commonStyles = {
    buttonShadow: {
      borderColor: Colors.lightPrimaryColor,
      borderWidth: 1.0,
      elevation: 1.0,
      shadowColor: Colors.primaryColor,
      shadowOffset: {x: 1, y: 1},
      shadowOpacity: 1,
    },
    blackShadow: {
      shadowColor: Colors.blackColor,
      shadowOffset: {x: 1, y: 1},
      elevation: 1.0,
      shadowOpacity: 0.15,
    },
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
  };
  