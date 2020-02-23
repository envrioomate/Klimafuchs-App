import color from "color";

import {Dimensions, PixelRatio, Platform} from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;
const platformStyle = "material";
const isIphoneX =
    platform === "ios" && (deviceHeight === 812 || deviceWidth === 812);

export default {
    platformStyle,
    platform,

    //Accordion
    headerStyle: "#edebed",
    iconStyle: "#000",
    contentStyle: "#f5f4f5",
    expandedIconStyle: "#000",
    accordionBorderColor: "#d3d3d3",

    // Android
    androidRipple: true,
    androidRippleColor: "rgba(256, 256, 256, 0.3)",
    androidRippleColorDark: "rgba(0, 0, 0, 0.15)",
    btnUppercaseAndroidText: true,

    // Badge
    badgeBg: "#ED1727",
    badgeColor: "#fff",
    badgePadding: 0,

    // Button
    btnFontFamily: "Roboto",
    btnDisabledBg: "#b5b5b5",
    buttonPadding: 6,
    get btnPrimaryBg() {
        return this.brandPrimary;
    },
    get btnPrimaryColor() {
        return this.inverseTextColor;
    },
    get btnInfoBg() {
        return this.brandInfo;
    },
    get btnInfoColor() {
        return this.inverseTextColor;
    },
    get btnSuccessBg() {
        return this.brandSuccess;
    },
    get btnSuccessColor() {
        return this.inverseTextColor;
    },
    get btnDangerBg() {
        return this.brandDanger;
    },
    get btnDangerColor() {
        return this.inverseTextColor;
    },
    get btnWarningBg() {
        return this.brandWarning;
    },
    get btnWarningColor() {
        return this.inverseTextColor;
    },
    get btnTextSize() {
        return this.fontSizeBase - 1;
    },
    get btnTextSizeLarge() {
        return this.fontSizeBase * 1.5;
    },
    get btnTextSizeSmall() {
        return this.fontSizeBase * 0.8;
    },
    get borderRadiusLarge() {
        return this.fontSizeBase * 3.8;
    },
    get iconSizeLarge() {
        return this.iconFontSize * 1.5;
    },
    get iconSizeSmall() {
        return this.iconFontSize * 0.6;
    },

    // Card
    cardDefaultBg: "#fff",
    cardBorderColor: "#ccc",
    cardBorderRadius: 2,
    cardItemPadding: platform === "ios" ? 10 : 12,

    // CheckBox
    CheckboxRadius: 0,
    CheckboxBorderWidth: 2,
    CheckboxPaddingLeft: 2,
    CheckboxPaddingBottom: 5,
    CheckboxIconSize: 16,
    CheckboxIconMarginTop: 1,
    CheckboxFontSize: 17,
    checkboxBgColor: "#039BE5",
    checkboxSize: 20,
    checkboxTickColor: "#fff",

    // Color
    brandPrimary: "#c8d200",
    brandInfo: "#009de0",
    brandSuccess: "#6C9C2E",
    brandDanger: "#d9534f",
    brandWarning: "#f0ad4e",
    brandDark: "#00080D",
    brandLight: "#E3E4E6",

    completionNone: "#333",
    completionMin: "#aaa",
    completionMed: "#f8a407",
    completionGood: "#f0ad4e",
    completionMax: "#6C9C2E",

    //Container
    containerBgColor: "#ffffff",

    //Date Picker
    datePickerTextColor: "#000",
    datePickerBg: "transparent",

    // Font
    DefaultFontSize: 16,
    fontFamily: "Roboto",
    fontSizeBase: 15,
    get fontSizeH1() {
        return this.fontSizeBase * 1.8;
    },
    get fontSizeH2() {
        return this.fontSizeBase * 1.6;
    },
    get fontSizeH3() {
        return this.fontSizeBase * 1.4;
    },

    // Footer
    footerHeight: 55,
    footerDefaultBg: "#8DC2DB",
    footerPaddingBottom: 0,

    // FooterTab
    tabBarTextSize: 11,
    activeTab: "#fff",
    tabBarTextColor: "#626262",
    tabBarActiveTextColor: '#000',
    tabActiveBgColor: "#8DC2DB",

    // Header
    toolbarBtnColor: "#fff",
    get toolbarDefaultBg() {
        return this.brandInfo
    },
    toolbarHeight: 56,
    toolbarSearchIconSize: 23,
    toolbarInputColor: "#fff",
    searchBarHeight: platform === "ios" ? 30 : 40,
    searchBarInputHeight: platform === "ios" ? 40 : 50,
    toolbarBtnTextColor: "#fff",
    toolbarDefaultBorder: "#8DC2DB",
    iosStatusbar: "light-content",
    get statusBarColor() {
        return color(this.toolbarDefaultBg)
            .darken(0.2)
            .hex();
    },
    get darkenHeader() {
        return color(this.tabBgColor)
            .darken(0.03)
            .hex();
    },

    // Icon
    iconFamily: "Ionicons",
    iconFontSize: 28,
    iconHeaderSize: 24,

    // InputGroup
    inputFontSize: 17,
    inputBorderColor: "#D9D5DC",
    inputSuccessBorderColor: "#2b8339",
    inputErrorBorderColor: "#ed2f2f",
    inputHeightBase: 50,
    get inputColor() {
        return this.textColor;
    },
    get inputColorPlaceholder() {
        return "#575757";
    },

    // Line Height
    btnLineHeight: 19,
    lineHeightH1: 32,
    lineHeightH2: 27,
    lineHeightH3: 22,
    lineHeight: 24,

    // List
    listBg: "transparent",
    listBorderColor: "#c9c9c9",
    listDividerBg: "#f4f4f4",
    listBtnUnderlayColor: "#DDD",
    listItemPadding: 12,
    listNoteColor: "#808080",
    listNoteSize: 13,
    listItemSelected: "#8DC2DB",

    // Progress Bar
    defaultProgressColor: "#E4202D",
    inverseProgressColor: "#1A191B",

    // Radio Button
    radioBtnSize: 23,
    radioSelectedColorAndroid: "#8DC2DB",
    radioBtnLineHeight: 24,
    get radioColor() {
        return this.brandPrimary;
    },

    // Segment
    segmentBackgroundColor: "#8DC2DB",
    segmentActiveBackgroundColor: "#fff",
    segmentTextColor: "#fff",
    segmentActiveTextColor: "#8DC2DB",
    segmentBorderColor: "#fff",
    segmentBorderColorMain: "#8DC2DB",

    // Spinner
    defaultSpinnerColor: "#45D56E",
    inverseSpinnerColor: "#1A191B",

    // Tab
    get tabDefaultBg() {
        return this.brandLight
    },
    topTabBarTextColor: "#b3c7f9",
    topTabBarActiveTextColor: "#fff",
    topTabBarBorderColor: "#fff",
    topTabBarActiveBorderColor: "#fff",

    // Tabs
    tabBgColor: "#F8F8F8",
    tabFontSize: 15,

    // Text
    textColor: "#2f2f2f",
    textLight: "#535353",
    inverseTextColor: "#fff",
    noteFontSize: 14,
    get defaultTextColor() {
        return this.textColor;
    },

    // Title
    titleFontfamily: "Roboto",
    titleFontSize: 19,
    subTitleFontSize: 14,
    subtitleColor: "#FFF",
    titleFontColor: "#FFF",

    // Other
    borderRadiusBase: 2,
    borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
    contentPadding: 10,
    dropdownLinkColor: "#414142",
    inputLineHeight: 24,
    deviceWidth,
    deviceHeight,
    isIphoneX,
    inputGroupRoundedBorderRadius: 30,

    //iPhoneX SafeArea
    Inset: {
        portrait: {
            topInset: 24,
            leftInset: 0,
            rightInset: 0,
            bottomInset: 34
        },
        landscape: {
            topInset: 0,
            leftInset: 44,
            rightInset: 44,
            bottomInset: 21
        }
    }
};
