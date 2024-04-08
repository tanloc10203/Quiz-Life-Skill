import { useNavigation } from "@react-navigation/native";
import Lottie from "lottie-react-native";
import { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { useDispatch } from "react-redux";
import { appActions } from "~/features/app/appSlice";
import ColorThemes from "~/theme/color.theme";
import { HEIGHT_WINDOW, WIDTH_WINDOW } from "~/utils/scale";

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleDone = () => {
    dispatch(appActions.setOnboard(true));
  };

  const doneButton = useMemo(
    () =>
      ({ ...props }) => {
        return (
          <TouchableOpacity style={styles.doneButton} {...props}>
            <Text style={{ color: "white" }}>Done</Text>
          </TouchableOpacity>
        );
      },
    []
  );

  return (
    <View style={styles.container}>
      <Onboarding
        onSkip={handleDone}
        onDone={handleDone}
        DoneButtonComponent={doneButton}
        containerStyles={{ paddingHorizontal: 15 }}
        pages={[
          {
            backgroundColor: ColorThemes.black,
            image: (
              <View style={styles.lottie}>
                <Lottie
                  source={require("~/assets/animation/board1.json")}
                  autoPlay={true}
                  loop={true}
                  resizeMode="cover"
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
            ),
            title: "Welcome to Living Game",
            subtitle:
              "Welcome to our Life Skills App! Unlock your potential with essential skills for self-sufficiency, decision-making, positive living, and safety. Let’s embark on this journey together!",
          },
          {
            backgroundColor: ColorThemes.black,
            image: (
              <View style={styles.lottie}>
                <Lottie
                  source={require("~/assets/animation/board2.json")}
                  autoPlay={true}
                  loop={true}
                  resizeMode="cover"
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
            ),
            title: "Free of charge",
            subtitle:
              "This is a completely free application that helps you improve your life and relaxation skills",
          },
          {
            backgroundColor: ColorThemes.black,
            image: (
              <View style={styles.lottie}>
                <Lottie
                  source={require("~/assets/animation/board3.json")}
                  autoPlay={true}
                  loop={true}
                  resizeMode="cover"
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
            ),
            title: "Achieve Higher Goads",
            subtitle:
              "You will experience and complete challenges to achieve achievements in the game, isn't that great? Let's start",
          },
        ]}
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  lottie: {
    width: WIDTH_WINDOW * 0.9,
    height: HEIGHT_WINDOW / 2,
  },

  doneButton: {
    padding: 20,
  },
});
