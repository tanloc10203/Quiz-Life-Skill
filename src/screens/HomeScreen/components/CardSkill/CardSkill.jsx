import { Octicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useStylesCommon from "~/hooks/useStylesCommon";
import ColorThemes from "~/theme/color.theme";
import SpacingTheme from "~/theme/spacing.theme";
import { WIDTH_WINDOW } from "~/utils/scale";

const _spacingBtn = 40;

const images = [
  "https://images.unsplash.com/photo-1707343848610-16f9afe1ae23?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1682686578842-00ba49b0a71a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1707343843598-39755549ac9a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1710866566821-faec7d460f0e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1710878872223-9beab35c04fc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1710866380940-7e0c7aa925b0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1710594935133-17e492868934?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHx8fA%3D%3D",
];

const CardSkill = ({ images, title }) => {
  const styleCommon = useStylesCommon();
  const [imgIndex, setImgIndex] = useState(0);
  const ref = useRef(null);

  // console.log({images});

  useEffect(() => {
    ref.current?.scrollToIndex({
      index: imgIndex,
      animated: true,
    });
  }, [imgIndex]);

  const renderItem = useMemo(
    () =>
      ({ item, index }) =>
        (
          <View style={styles.image}>
            <Image
              source={{ uri: item }}
              style={[StyleSheet.absoluteFillObject, { borderRadius: SpacingTheme.lg }]}
            />
          </View>
        ),
    []
  );

  return (
    <View style={[styleCommon.pyMd, { position: "relative" }]}>
      <TouchableOpacity
        onPress={() => {
          if (imgIndex === 0) return;
          setImgIndex(imgIndex - 1);
        }}
        style={[styles.position, styles.pLeft]}
      >
        <Octicons name="chevron-left" size={24} color={ColorThemes.black} />
      </TouchableOpacity>

      <FlatList
        ref={ref}
        showsHorizontalScrollIndicator={false}
        data={images}
        renderItem={renderItem}
        horizontal
        legacyImplementation={false}
        pagingEnabled
        style={{ flex: 1, flexGrow: 0, borderRadius: SpacingTheme.lg }}
        initialScrollIndex={imgIndex}
      />

      <View style={{ marginTop: SpacingTheme.sm, alignItems: "center" }}>
        <Text style={styleCommon.colorWhite}>{title}</Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          if (imgIndex === images.length - 1) return;
          setImgIndex(imgIndex + 1);
        }}
        style={[styles.position, styles.pRight]}
      >
        <Octicons name="chevron-right" size={24} color={ColorThemes.black} />
      </TouchableOpacity>
    </View>
  );
};

export default CardSkill;

const styles = StyleSheet.create({
  image: {
    width: WIDTH_WINDOW - SpacingTheme.md * 2,
    height: 250,
    borderRadius: SpacingTheme.lg,
  },

  pRight: {
    right: 0,
  },

  pLeft: {
    left: 0,
  },

  position: {
    position: "absolute",
    top: `${50 - SpacingTheme.sm}%`,
    zIndex: 100,
    width: _spacingBtn,
    height: _spacingBtn,
    backgroundColor: ColorThemes.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: _spacingBtn / 2,
  },
});
