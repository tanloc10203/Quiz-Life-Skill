import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useApp } from "~/features/app/appSlice";
import ColorThemes from "~/theme/color.theme";
import { HEIGHT_WINDOW, STATUS_BAR_HEIGHT, WIDTH_WINDOW } from "~/utils/scale";

const Loader = () => {
  const { loading } = useApp();

  if (!loading) return null;

  return (
    <View style={[styles.wrap, { ...StyleSheet.absoluteFillObject }]}>
      <ActivityIndicator color={ColorThemes.white} size={"large"} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
    width: WIDTH_WINDOW,
    height: HEIGHT_WINDOW + STATUS_BAR_HEIGHT,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
