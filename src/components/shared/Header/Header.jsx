import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ColorThemes from "~/theme/color.theme";
import { useDispatch } from "react-redux";
import { appActions } from "~/features/app/appSlice";

const Header = ({ name, isBack = false, isHome = false, isHidden = false, isGoHome = false }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.wrapHeader}>
      <View style={styles.wrapHeaderLeft}>
        {isBack ? (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.75}
            style={styles.back}
          >
            <AntDesign name="back" size={20} color="black" />
          </TouchableOpacity>
        ) : isGoHome ? (
          <TouchableOpacity
            activeOpacity={0.75}
            style={styles.back}
            onPress={() => navigation.navigate("Home")}
          >
            <AntDesign name="home" size={24} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity activeOpacity={0.75} style={styles.back}>
            <FontAwesome name="bars" size={20} color="black" />
          </TouchableOpacity>
        )}

        {isHidden || isBack ? null : (
          <View>
            <Image
              source={require("~/assets/logo/light.png")}
              style={styles.image}
              contentFit="cover"
            />
          </View>
        )}
      </View>

      <Text style={styles.textHeader}>{name}</Text>

      {isHome ? (
        <TouchableOpacity onPress={() => dispatch(appActions.setToggleSearch())}>
          <AntDesign name="search1" size={24} color={ColorThemes.white} />
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity>
        <Ionicons name="notifications" size={24} color={ColorThemes.white} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
  },
  back: {
    width: 30,
    height: 30,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  wrapHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: ColorThemes.black,
    justifyContent: "space-between",
    width: "100%",
    padding: 14,
    columnGap: 8,
  },
  textHeader: {
    fontWeight: "bold",
    fontSize: 15,
    color: ColorThemes.white,
    flex: 1,
    flexWrap: "wrap",
    // maxWidth: 230,
    textAlign: "center",
  },
});
