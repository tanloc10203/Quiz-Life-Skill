import Lottie from "lottie-react-native";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HEIGHT_WINDOW, WIDTH_WINDOW } from "~/utils/scale";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

const SuccessScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Login");
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.lottie}>
        <Lottie
          source={require("~/assets/animation/success.json")}
          autoPlay={true}
          speed={1}
          loop={true}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  lottie: {
    width: WIDTH_WINDOW * 0.9,
    height: HEIGHT_WINDOW / 2,
  },
});
