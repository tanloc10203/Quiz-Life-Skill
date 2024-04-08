import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import gameAPI from "~/apis/gameAPI";
import Container from "~/components/shared/Container";
import Header from "~/components/shared/Header";
import Button from "~/components/ui/Button";
import { appActions } from "~/features/app/appSlice";
import { useAuth } from "~/features/auth/authSlice";
import useStylesCommon from "~/hooks/useStylesCommon";
import ColorThemes from "~/theme/color.theme";
import SpacingTheme from "~/theme/spacing.theme";
import { goBack } from "~/utils/navigation.root";
import { WIDTH_WINDOW } from "~/utils/scale";
import GameItem from "./components/GameItem";
import { achievementActions } from "~/features/achievement/achievementSlice";

const TIMEOUT = 5;

const GameDetailsScreen = () => {
  const route = useRoute();
  const stylesCommon = useStylesCommon();
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigation();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { userId } = useAuth();

  const [timer, setTimer] = useState(TIMEOUT);
  const [countError, setCountError] = useState(0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const refIndex = useRef(0);

  useEffect(() => {
    let intervalId = null;

    const check = Boolean(data[currentIndex]?.marked);

    if (refIndex.current !== currentIndex && !check) {
      refIndex.current = currentIndex;

      if (countError) {
        setCountError(0);
      }

      setTimer(TIMEOUT);

      return;
    }

    if (countError >= 2) {
      dispatch(
        appActions.setToast({
          showToast: true,
          toastMessage: "Leave the game",
          toastType: "error",
        })
      );
      goBack();
      return;
    }

    intervalId = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          if (!check) {
            setCountError((prevCount) => {
              if (prevCount + 1 < 2) {
                dispatch(
                  appActions.setToast({
                    showToast: true,
                    toastMessage: "You have one more chance to answer.",
                    toastType: "error",
                  })
                );
              }

              return prevCount + 1;
            });
          }

          return TIMEOUT;
        }

        return prev - 1;
      });
    }, 1000); // 1s

    return () => {
      clearInterval(intervalId);
    };
  }, [timer, data, currentIndex, countError, refIndex.current]);

  useFocusEffect(
    useCallback(() => {
      if (!route.params?.skillId) return;

      const getData = async () => {
        try {
          setLoading(true);

          const response = await gameAPI.getGameBySkillId(route.params.skillId);

          console.log(`response`, JSON.stringify(response, null, 4));

          setData(response.guilds?.map((t) => ({ ...t, marked: "" })));

          setSelected(response);
        } catch (error) {
          console.log(`error get game details `, error);
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

  const handleOnPressSelected = (answerId, guildId) => {
    const cloneData = [...data];

    if (!cloneData.length || !answerId || !guildId) return;

    const indexQuestion = cloneData.findIndex((t) => t._id === guildId);

    if (indexQuestion === -1) return;

    cloneData[indexQuestion] = {
      ...cloneData[indexQuestion],
      marked: answerId,
    };

    setData(cloneData);

    ref.current?.scrollToIndex({
      index: Math.min(currentIndex + 1, data.length - 1),
      animated: true,
    });
  };

  const renderItem = useMemo(
    () =>
      ({ item, index }) => {
        return <GameItem index={index + 1} item={item} onPressSelected={handleOnPressSelected} />;
      },
    [handleOnPressSelected]
  );

  const handleOnSubmit = () => {
    const cloneData = [...data];

    const question = cloneData[currentIndex];

    if (!question) return;

    if (!question.marked) {
      dispatch(
        appActions.setToast({
          showToast: true,
          toastMessage: "Select answer is correct, Please.",
          toastType: "error",
        })
      );
      return;
    }

    const totalIsCorrect = cloneData.filter((t) => {
      const answers = [...t.game.answers];
      const findAnswer = answers.find((a) => a._id === t.marked);
      return findAnswer && findAnswer?.isCorrect;
    }).length;

    dispatch(
      achievementActions.fetchCreateAchievementStart({
        user: userId,
        results: cloneData,
        skill: selected._id,
      })
    );

    navigate.navigate("GameSuccess", { results: data, totalIsCorrect, skillId: selected._id });
  };

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

  const checkMarked = (data, currentIndex) => Boolean(data[currentIndex]?.marked);

  return (
    <Container style={[stylesCommon.bgDark]}>
      <Header name={"Games details"} isBack />

      {loading ? (
        <View style={stylesCommon.center}>
          <ActivityIndicator size={"large"} color={ColorThemes.white} />
        </View>
      ) : selected ? (
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
            scrollEnabled={checkMarked(data, currentIndex)}
            initialScrollIndex={currentIndex}
            legacyImplementation={false}
            style={{ flexGrow: 0 }}
            onScroll={(e) => {
              const x = e.nativeEvent.contentOffset.x / WIDTH_WINDOW;

              const index = +x.toFixed(0);

              setCurrentIndex(index);
            }}
            contentContainerStyle={{ paddingBottom: 60 }}
          />

          {data.length ? (
            <View
              style={{
                padding: SpacingTheme.md,
                position: "absolute",
                bottom: 0,
                width: WIDTH_WINDOW,
                zIndex: 10,
                backgroundColor: ColorThemes.white,
                minHeight: 100,
              }}
            >
              <Text style={{ fontWeight: 700, marginBottom: SpacingTheme.lg }}>
                Select the correct tool from your inventory to complete this step
              </Text>

              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {[...Array.from({ length: data.length })].map((_, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      const check = checkMarked(data, currentIndex);

                      if (!check) {
                        dispatch(
                          appActions.setToast({
                            showToast: true,
                            toastMessage: "Select answer is correct, Please.",
                            toastType: "error",
                          })
                        );
                        return;
                      }

                      if (currentIndex <= index) {
                        ref.current?.scrollToIndex({
                          index: Math.min(index, data.length - 1),
                          animated: true,
                        });
                      } else {
                        ref.current?.scrollToIndex({
                          index: Math.max(0, index),
                          animated: true,
                        });
                      }
                    }}
                    key={index}
                    style={{
                      backgroundColor: checkMarked(data, index)
                        ? ColorThemes.green
                        : ColorThemes.white,
                      width: SpacingTheme.n(55),
                      height: SpacingTheme.n(15),
                      borderWidth: currentIndex === index ? 2 : 1,
                      borderColor: currentIndex === index ? ColorThemes.blue : ColorThemes.black,
                      ...(index === 0
                        ? {
                            borderTopLeftRadius: SpacingTheme.lg,
                            borderBottomLeftRadius: SpacingTheme.lg,
                          }
                        : {}),
                      ...(index === data.length - 1
                        ? {
                            borderTopRightRadius: SpacingTheme.lg,
                            borderBottomRightRadius: SpacingTheme.lg,
                          }
                        : {}),
                    }}
                  />
                ))}
              </View>

              {!checkMarked(data, currentIndex) ? (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: SpacingTheme.md,
                  }}
                >
                  <View
                    style={{
                      width: SpacingTheme.n(50),
                      height: SpacingTheme.n(50),
                      backgroundColor:
                        timer <= 5 ? ColorThemes.redRgba(`0.${timer}`) : ColorThemes.blueRgba(0.6),
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: SpacingTheme.n(50 / 2),
                    }}
                  >
                    <Text style={{ fontSize: 25, fontWeight: 700 }}>{timer}</Text>
                  </View>
                </View>
              ) : null}

              {currentIndex === data.length - 1 ? (
                <Button
                  label={"Submit"}
                  styleContainer={{
                    width: "100%",
                    backgroundColor: ColorThemes.green,
                    marginTop: SpacingTheme.md,
                  }}
                  onPress={handleOnSubmit}
                />
              ) : null}
            </View>
          ) : null}
        </View>
      ) : null}
    </Container>
  );
};

export default GameDetailsScreen;

const styles = StyleSheet.create({});
