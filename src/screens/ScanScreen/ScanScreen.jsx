import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import Lottie from "lottie-react-native";
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, LogBox, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import skillAPI from "~/apis/skillAPI";
import Container from "~/components/shared/Container";
import Button from "~/components/ui/Button";
import { BLUR_HASH } from "~/constants/common";
import { appActions } from "~/features/app/appSlice";
import useStylesCommon from "~/hooks/useStylesCommon";
import ColorThemes from "~/theme/color.theme";
import SpacingTheme from "~/theme/spacing.theme";
import { navigate } from "~/utils/navigation.root";

LogBox.ignoreLogs([`Setting a timer for a long period`]);
LogBox.ignoreLogs([
  'Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48, use "canceled" instead',
]);

const ScanScreen = () => {
  const stylesCommon = useStylesCommon();
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [keywords, setKeywords] = useState("");

  useEffect(() => {
    if (Platform.OS !== "web") {
      (async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      })();
    }
  }, []);

  const pickImage = async () => {
    try {
      setData([]);
      setKeywords("");

      dispatch(appActions.setLoading(true));
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        // allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        const response = await skillAPI.imageForm(result.assets[0].uri);

        setData(response.metadata?.results);

        if (response.metadata?.results?.length) {
          setImage(null);
        }

        setKeywords(response.metadata?.keywords);
      }
    } catch (error) {
    } finally {
      dispatch(appActions.setLoading(false));
    }
  };

  const renderItem = useMemo(
    () =>
      ({ item }) => {
        return (
          <TouchableOpacity
            onPress={() => {
              navigate("GuildDetails", { skillId: item._id });
            }}
            style={styles.card}
          >
            <Image
              style={styles.image}
              source={{ uri: item.thumbNail }}
              placeholder={BLUR_HASH}
              contentFit="cover"
              transition={1000}
            />

            <View style={styles.icon}>
              <Lottie
                source={require("~/assets/animation/next.json")}
                autoPlay={true}
                loop={true}
                resizeMode="cover"
                style={{ width: "100%", height: "100%" }}
              />
            </View>

            <View style={styles.wrapText}>
              <Text style={stylesCommon.colorWhite}>{item.name}</Text>

              <Text style={[stylesCommon.colorWhite, { lineHeight: 18 }]}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        );
      },
    []
  );

  const ListHeaderComponent = () => {
    return (
      <View>
        {keywords ? (
          <View style={{ marginBottom: SpacingTheme.lg }}>
            <Text style={[stylesCommon.colorWhite, { fontWeight: 700 }]}>Result keywords:</Text>
            <Text style={stylesCommon.colorWhite}>{keywords}</Text>
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <Container style={[stylesCommon.bgDark]}>
      <View style={{ padding: SpacingTheme.md }}>
        <Button
          label="Pick an image from camera roll"
          onPress={pickImage}
          styleContainer={{ marginBottom: SpacingTheme.md }}
        />

        {!data.length && image && (
          <Image
            source={{ uri: image }}
            style={{ width: 200, height: 200, borderRadius: SpacingTheme.md }}
          />
        )}

        <FlatList
          ListHeaderComponent={ListHeaderComponent}
          contentContainerStyle={{ marginTop: SpacingTheme.lg }}
          data={data}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={{ marginBottom: SpacingTheme.lg }} />}
        />
      </View>
    </Container>
  );
};

export default ScanScreen;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    elevation: 9,
    shadowColor: ColorThemes.white,
  },

  image: {
    width: "100%",
    height: 250,
    borderRadius: SpacingTheme.lg,
  },

  wrapText: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.8)",
    width: "100%",
    bottom: 0,
    padding: SpacingTheme.md,
    left: 0,
    right: 0,
    minHeight: 80,
    borderBottomRightRadius: SpacingTheme.lg,
    borderBottomLeftRadius: SpacingTheme.lg,
  },

  icon: {
    position: "absolute",
    width: 150,
    height: 150,
    top: `${4}%`,
    right: -30,
  },
});
