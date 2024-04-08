import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import Container from "~/components/shared/Container";
import { categoryActions, useCategory } from "~/features/category/categorySlice";
import useAppBar from "~/hooks/useAppBar";
import useStylesCommon from "~/hooks/useStylesCommon";
import ColorThemes from "~/theme/color.theme";
import SpacingTheme from "~/theme/spacing.theme";
import CardCategory from "./components/CardCategory";
import CardSkill from "./components/CardSkill";
import { skillActions, useSkill } from "~/features/skill/skillSlice";
import { WIDTH_WINDOW } from "~/utils/scale";
import { useApp } from "~/features/app/appSlice";
import { useDebounce } from "@uidotdev/usehooks";

const HomeScreen = () => {
  const styleCommon = useStylesCommon();
  useAppBar({ title: "Life skills", isHome: true });
  const dispatch = useDispatch();
  const { filters, data: categories } = useCategory();
  const [isShowMore, setIsShowMore] = useState(false);
  const { loading, data: skills } = useSkill();
  const [name, setName] = useState("");
  const { openSearch } = useApp();
  const debouncedSearchTerm = useDebounce(name, 300);

  useFocusEffect(
    useCallback(() => {
      dispatch(categoryActions.fetchCategoryStart(filters));
    }, [filters])
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(skillActions.fetchSkillStart({ name: debouncedSearchTerm }));
    }, [debouncedSearchTerm])
  );

  const handleChangeText = (e) => {
    setName(e);
  };

  const handleSeeMoreCategory = useCallback(() => {
    let _filters = { ...filters };

    if (isShowMore) {
      _filters = { ..._filters, limit: 6 };
    } else {
      _filters = { ..._filters, limit: 9999999 };
    }

    dispatch(categoryActions.setFilters(_filters));
    setIsShowMore((prev) => !prev);
  }, [filters, isShowMore]);

  return (
    <Container style={[styleCommon.bgDark]}>
      <View style={styles.wrapCategory}>
        <View style={styles.wrapCategoryV2}>
          {categories?.length
            ? categories?.map((t) => <CardCategory item={t} key={t?._id} />)
            : null}
        </View>
      </View>

      {openSearch ? (
        <View
          style={[
            {
              position: "absolute",
              zIndex: 1000,
              top: 0,
              backgroundColor: ColorThemes.blue,
              width: WIDTH_WINDOW,
              padding: SpacingTheme.md,
            },
          ]}
        >
          <TextInput
            onChangeText={handleChangeText}
            placeholder="Enter name search"
            placeholderTextColor={"white"}
            value={name}
          />
        </View>
      ) : null}

      <View style={styles.wrapLine}>
        <View style={styles.line} />
        <TouchableOpacity onPress={handleSeeMoreCategory}>
          <Text style={styleCommon.colorWhite}>{isShowMore ? "Hide" : "See More"}</Text>
        </TouchableOpacity>
        <View style={styles.line} />
      </View>

      {isShowMore ? null : (
        <>
          <View style={styles.wrapLine}>
            <TouchableOpacity>
              <Text style={[styleCommon.colorWhite, styleCommon.fzMd]}>Suggests</Text>
            </TouchableOpacity>
          </View>

          <View>{loading ? <ActivityIndicator /> : null}</View>

          <View style={[styleCommon.pMd, styleCommon.flex1]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {skills.length ? (
                skills.map((t) => <CardSkill key={t._id} images={t.images} title={t.name} />)
              ) : (
                <View>
                  <Text style={{ color: ColorThemes.white }}>No skills</Text>
                </View>
              )}

              <View style={styleCommon.pbNav} />
            </ScrollView>
          </View>
        </>
      )}
    </Container>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  wrapCategory: {
    padding: SpacingTheme.md,
    justifyContent: "center",
  },

  wrapCategoryV2: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: SpacingTheme.md,
    rowGap: SpacingTheme.md,
  },

  wrapLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SpacingTheme.md,
    padding: SpacingTheme.md,
  },

  line: {
    width: 140,
    height: 1,
    backgroundColor: ColorThemes.white,
  },
});
