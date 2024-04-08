import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useMemo } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import Container from "~/components/shared/Container";
import { skillActions, useSkill } from "~/features/skill/skillSlice";
import useAppBar from "~/hooks/useAppBar";
import useStylesCommon from "~/hooks/useStylesCommon";
import SpacingTheme from "~/theme/spacing.theme";
import GuildCard from "./components/GuildCard";
import { useAuth } from "~/features/auth/authSlice";
import { favoriteActions, useFavorite } from "~/features/favorite/favoriteSlice";

const GuildScreen = () => {
  const styles = useStylesCommon();
  useAppBar({ title: "Guilds", isHidden: true });
  const dispatch = useDispatch();
  const { data, loading } = useSkill();
  const { userId } = useAuth();
  const { data: favorites } = useFavorite();

  useFocusEffect(
    useCallback(() => {
      dispatch(skillActions.fetchSkillStart());
      dispatch(favoriteActions.fetchFavoriteStart({ userId: userId }));
    }, [])
  );

  const handleOnPressFavorite = (item) => {
    if (!userId) return;
    dispatch(favoriteActions.fetchAddFavoriteStart({ userId, skillId: item._id }));
  };

  const renderItem = useMemo(
    () =>
      ({ item }) =>
        (
          <GuildCard
            item={item}
            isFavorite={favorites.map((t) => t?.skill._id).includes(item._id)}
            onPressFavorite={() => handleOnPressFavorite(item)}
          />
        ),
    [handleOnPressFavorite, favorites]
  );

  const keyExtract = useMemo(() => (item) => item._id);

  const ListHeaderComponent = () => {
    return (
      <View>
        {loading ? (
          <ActivityIndicator />
        ) : !data.length ? (
          <Text style={styles.colorWhite}>Guilds is empty</Text>
        ) : null}
      </View>
    );
  };

  return (
    <Container style={[styles.bgDark]}>
      <FlatList
        contentContainerStyle={{ padding: SpacingTheme.md }}
        ListHeaderComponent={ListHeaderComponent}
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtract}
        ItemSeparatorComponent={() => <View style={{ margin: SpacingTheme.md }} />}
      />
    </Container>
  );
};

export default GuildScreen;

const styles = StyleSheet.create({});
