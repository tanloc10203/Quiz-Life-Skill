import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useMemo } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import Container from "~/components/shared/Container";
import Header from "~/components/shared/Header";
import { achievementActions, useAchievement } from "~/features/achievement/achievementSlice";
import { useAuth } from "~/features/auth/authSlice";
import useStylesCommon from "~/hooks/useStylesCommon";
import ColorThemes from "~/theme/color.theme";
import AchievementItem from "./components/AchievementItem";
import SpacingTheme from "~/theme/spacing.theme";

const AchievementScreen = () => {
  const stylesCommon = useStylesCommon();
  const { data, loading } = useAchievement();
  const dispatch = useDispatch();
  const { userId } = useAuth();

  useFocusEffect(
    useCallback(() => {
      if (!userId) return;

      dispatch(achievementActions.fetchAchievementStart({ userId }));
    }, [userId])
  );

  const renderItem = useMemo(
    () =>
      ({ item }) => {
        return <AchievementItem item={item} />;
      },
    []
  );

  console.log(JSON.stringify(data, null, 4));

  const keyExtractor = useMemo(() => (item) => item._id, []);

  const ListHeaderComponent = () => {
    return (
      <View>
        {!data?.length ? (
          <Text style={{ color: ColorThemes.red, fontSize: SpacingTheme.n(26), fontWeight: 700 }}>
            Data is empty
          </Text>
        ) : null}
      </View>
    );
  };

  return (
    <Container style={[stylesCommon.bgDark, !data?.length ? stylesCommon.center : null]}>
      <Header isGoHome name={"Achievements"} isHidden />

      {loading ? (
        <View style={stylesCommon.center}>
          <ActivityIndicator size={"large"} color={ColorThemes.white} />
        </View>
      ) : (
        <View
          style={{
            padding: SpacingTheme.md,
            ...(!data?.length
              ? { justifyContent: "center", height: "100%", flex: 1, alignItems: "center" }
              : {}),
          }}
        >
          <FlatList
            ListHeaderComponent={ListHeaderComponent}
            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={() => <View style={{ marginBottom: SpacingTheme.md }} />}
          />
        </View>
      )}
    </Container>
  );
};

export default AchievementScreen;

const styles = StyleSheet.create({});
