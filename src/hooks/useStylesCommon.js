import { StyleSheet } from "react-native";
import ColorThemes from "~/theme/color.theme";
import SpacingTheme from "~/theme/spacing.theme";
import { HEIGHT_WINDOW, SPACING_BUTTON_TAB_VIEW, WIDTH_WINDOW } from "~/utils/scale";

const useStylesCommon = () => {
  return StyleSheet.create({
    flex1: {
      flex: 1,
    },

    bgWhite: {
      backgroundColor: ColorThemes.white,
    },

    colorWhite: {
      color: ColorThemes.white,
    },

    colorGray: {
      color: ColorThemes.gray,
      opacity: 0.6,
    },

    colorBlue: {
      color: ColorThemes.blue,
    },

    bgDark: {
      backgroundColor: ColorThemes.black,
    },
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    lottie: {
      width: WIDTH_WINDOW * 0.9,
      height: HEIGHT_WINDOW / 2,
    },

    pX4: {
      paddingHorizontal: 20,
    },

    mX4: {
      marginHorizontal: 20,
    },

    mtSm: {
      marginTop: SpacingTheme.sm,
    },
    mtMd: {
      marginTop: SpacingTheme.md,
    },
    mtLg: {
      marginTop: SpacingTheme.lg,
    },
    mtXl: {
      marginTop: SpacingTheme.xl,
    },
    mt2xl: {
      marginTop: SpacingTheme["2xl"],
    },

    fzMd: {
      fontSize: 16,
      fontWeight: "bold",
    },

    pMd: {
      padding: SpacingTheme.md,
    },

    pyMd: {
      paddingVertical: SpacingTheme.md,
    },

    pbNav: {
      paddingBottom: SPACING_BUTTON_TAB_VIEW / 2,
    },

    line: (height = 1) => ({
      width: "100%",
      height: height,
      backgroundColor: ColorThemes.white,
    }),

    fullWidth: {
      width: "100%",
    },
  });
};

export default useStylesCommon;
