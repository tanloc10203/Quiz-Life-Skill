import { useFocusEffect, useRoute, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import skillAPI from "~/apis/skillAPI";
import Container from "~/components/shared/Container";
import Header from "~/components/shared/Header";
import useStylesCommon from "~/hooks/useStylesCommon";
import ColorThemes from "~/theme/color.theme";
import GuildFront from "./components/GuildFront";
import GuildSlider from "./components/GuildSlider";
import guildAPI from "~/apis/guildAPI";

const GuildDetailsScreen = () => {
  const route = useRoute();
  const stylesCommon = useStylesCommon();
  const [selected, setSelected] = useState(null);
  const [guilds, setGuilds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState(false);
  const navigate = useNavigation();

  useFocusEffect(
    useCallback(() => {
      if (!route.params?.skillId) return;

      const getData = async () => {
        try {
          setLoading(true);

          const [response, guilds] = await Promise.all([
            skillAPI.getById(route.params.skillId),
            guildAPI.get({ limit: 9999999, where: `skill,${route.params.skillId}` }),
          ]);

          console.log(guilds);

          setSelected(response);
          setGuilds(guilds.metadata);
        } catch (error) {
          console.log(`error get guild details `, error);
        } finally {
          setLoading(false);
        }
      };

      getData();

      return () => {
        setSelected(null);
      };
    }, [route.params?.skillId])
  );

  const handleOnFishedGuild = () => {
    if (!route.params?.skillId) return;

    navigate.navigate("SuccessGuild", { skillId: route.params?.skillId });
  };

  return (
    <Container style={[stylesCommon.bgDark]}>
      <Header name={"Guild details"} isBack />

      {loading ? (
        <View style={stylesCommon.center}>
          <ActivityIndicator size={"large"} color={ColorThemes.white} />
        </View>
      ) : selected ? (
        next ? (
          <GuildSlider
            data={guilds}
            onBack={() => setNext(false)}
            onFinished={handleOnFishedGuild}
          />
        ) : (
          <View style={stylesCommon.pMd}>
            <GuildFront onNext={() => setNext(true)} selected={selected} />
          </View>
        )
      ) : null}
    </Container>
  );
};

export default GuildDetailsScreen;
