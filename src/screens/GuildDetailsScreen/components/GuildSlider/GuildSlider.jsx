import React, { useMemo, useRef, useState } from "react";
import { FlatList, Text, View } from "react-native";
import Button from "~/components/ui/Button";
import ColorThemes from "~/theme/color.theme";
import SpacingTheme from "~/theme/spacing.theme";
import { WIDTH_WINDOW } from "~/utils/scale";
import GuildItem from "../GuildItem";

const GuildSlider = ({ data, onBack, onFinished }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);

  const renderItem = useMemo(
    () =>
      ({ item }) =>
        <GuildItem item={item} />,
    []
  );

  const ListHeaderComponent = () => {
    return (
      <View>
        {!data.length ? (
          <Text style={{ color: ColorThemes.red, fontSize: SpacingTheme.n(26), fontWeight: 700 }}>
            Data is empty
          </Text>
        ) : null}
      </View>
    );
  };

  return (
    <View
      style={{
        height: "100%",
        flex: 1,
        ...(!data.length ? { justifyContent: "center", alignItems: "center" } : {}),
      }}
    >
      <FlatList
        ListHeaderComponent={ListHeaderComponent}
        ref={ref}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        initialScrollIndex={currentIndex}
        legacyImplementation={false}
        style={{ flexGrow: 0 }}
        onScroll={(e) => {
          const x = e.nativeEvent.contentOffset.x / WIDTH_WINDOW;
          setCurrentIndex(+x.toFixed(0));
        }}
        contentContainerStyle={{ paddingBottom: 60 }}
      />

      {data.length ? (
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            gap: SpacingTheme["2xl"],
            padding: SpacingTheme.md,
            position: "absolute",
            bottom: 0,
            width: WIDTH_WINDOW,
            zIndex: 10,
          }}
        >
          {currentIndex === 0 ? (
            <Button label={"Back"} styleContainer={{ minWidth: 90 }} onPress={onBack} />
          ) : (
            <Button
              label={"Previous"}
              styleContainer={{ minWidth: 90 }}
              onPress={() =>
                ref.current?.scrollToIndex({
                  index: Math.max(0, currentIndex - 1),
                  animated: true,
                })
              }
            />
          )}

          <Text style={{ color: ColorThemes.white }}>{`${currentIndex + 1}/${data.length}`}</Text>

          {currentIndex === data.length - 1 ? (
            <Button label={"Finish"} styleContainer={{ minWidth: 90 }} onPress={onFinished} />
          ) : (
            <Button
              label={"Next"}
              styleContainer={{ minWidth: 90 }}
              onPress={() =>
                ref.current?.scrollToIndex({
                  index: Math.min(currentIndex + 1, data.length - 1),
                  animated: true,
                })
              }
            />
          )}
        </View>
      ) : null}
    </View>
  );
};

export default GuildSlider;
