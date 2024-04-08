import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useMemo } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import Container from "~/components/shared/Container";
import Header from "~/components/shared/Header";
import { useAuth } from "~/features/auth/authSlice";
import { favoriteActions, useFavorite } from "~/features/favorite/favoriteSlice";
import useStylesCommon from "~/hooks/useStylesCommon";
import SpacingTheme from "~/theme/spacing.theme";
import GuildCard from "../GuildScreen/components/GuildCard";

const FavoriteScreen = () => {
  const styles = useStylesCommon();
  const dispatch = useDispatch();
  const { userId } = useAuth();
  const { data: favorites, loading } = useFavorite();

  useFocusEffect(
    useCallback(() => {
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
        <GuildCard item={item} isFavorite onPressFavorite={() => handleOnPressFavorite(item)} />,
    [handleOnPressFavorite, favorites]
  );

  const keyExtract = useMemo(() => (item) => item._id);

  const data = useMemo(() => {
    if (!favorites.length) return [];
    return favorites.map((t) => t.skill);
  }, [favorites]);

  const ListHeaderComponent = () => {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        {loading ? (
          <ActivityIndicator />
        ) : !data.length ? (
          <Text style={styles.colorWhite}>Favorite is empty</Text>
        ) : null}
      </View>
    );
  };

  return (
    <Container style={[styles.bgDark]}>
      <Header name={"Favorites"} isHidden isBack />

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

export default FavoriteScreen;

const styles = StyleSheet.create({});
