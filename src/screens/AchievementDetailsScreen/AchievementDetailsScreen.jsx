import { useRoute } from "@react-navigation/native";
import React, { useMemo, useRef, useState } from "react";
import { FlatList, Text, View } from "react-native";
import Container from "~/components/shared/Container";
import Header from "~/components/shared/Header";
import Button from "~/components/ui/Button";
import useStylesCommon from "~/hooks/useStylesCommon";
import ColorThemes from "~/theme/color.theme";
import SpacingTheme from "~/theme/spacing.theme";
import { WIDTH_WINDOW } from "~/utils/scale";
import GameItem from "../GameDetailsScreen/components/GameItem";

const AchievementDetailsScreen = () => {
  const stylesCommon = useStylesCommon();
  const { params } = useRoute();
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);

  const renderItem = useMemo(
    () =>
      ({ item, index }) => {
        return <GameItem isHistory index={index + 1} item={item} />;
      },
    []
  );

  const keyExtractor = useMemo(() => (item) => item._id, []);

  const data = useMemo(() => [...params.data.results], [params.data.results]);

  return (
    <Container style={[stylesCommon.bgDark]}>
      <Header name={"Achievement Details"} isHidden isBack />

      <View style={{ height: "100%", flex: 1 }}>
        <FlatList
          ref={ref}
          showsHorizontalScrollIndicator={false}
          data={params.data.results}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          initialScrollIndex={currentIndex}
          legacyImplementation={false}
          style={{ flexGrow: 0 }}
          keyExtractor={keyExtractor}
          onScroll={(e) => {
            const x = e.nativeEvent.contentOffset.x / WIDTH_WINDOW;

            const index = +x.toFixed(0);

            setCurrentIndex(index);
          }}
          contentContainerStyle={{ paddingBottom: 60 }}
        />

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
          <Button
            label={"Previous"}
            styleContainer={{
              minWidth: 90,
              backgroundColor: currentIndex === 0 ? ColorThemes.gray : ColorThemes.blue,
            }}
            onPress={() => {
              ref.current?.scrollToIndex({
                index: Math.max(0, currentIndex - 1),
                animated: true,
              });
            }}
          />

          <Text style={{ color: ColorThemes.white }}>{`${currentIndex + 1}/${data.length}`}</Text>

          <Button
            label={"Next"}
            styleContainer={{
              minWidth: 90,
              backgroundColor:
                currentIndex === data.length - 1 ? ColorThemes.gray : ColorThemes.blue,
            }}
            onPress={() => {
              ref.current?.scrollToIndex({
                index: Math.min(currentIndex + 1, data.length - 1),
                animated: true,
              });
            }}
          />
        </View>
      </View>
    </Container>
  );
};

export default AchievementDetailsScreen;
