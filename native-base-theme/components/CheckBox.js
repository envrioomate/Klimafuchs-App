import variable from "./../variables/platform";
import {Platform} from "react-native";
const isIphone = Platform.OS === 'ios';

export default (variables = variable) => {
  const checkBoxTheme = {
    ".checked": {
      "NativeBase.Icon": {
        color: variables.checkboxTickColor
      },
      "NativeBase.IconNB": {
        color: variables.checkboxTickColor
      }
    },
    "NativeBase.Icon": {
      color: "fff",
      lineHeight: variables.CheckboxIconSize,
      marginTop: variables.CheckboxIconMarginTop,
      fontSize: variables.CheckboxFontSize
    },
    "NativeBase.IconNB": {
      color: "fff",
      lineHeight: variables.CheckboxIconSize,
      marginTop: variables.CheckboxIconMarginTop,
      fontSize: variables.CheckboxFontSize
    },
    borderRadius: variables.CheckboxRadius,
    overflow: "hidden",
    width: variables.checkboxSize,
    height: variables.checkboxSize + (isIphone ? 2 : 0),
    borderWidth: variables.CheckboxBorderWidth,
    paddingLeft: variables.CheckboxPaddingLeft - 1,
    paddingBottom: variables.CheckboxPaddingBottom,
    left: 10,
    color: "fff",

  };

  return checkBoxTheme;
};
