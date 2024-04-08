import React from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import Container from "~/components/shared/Container";
import Button from "~/components/ui/Button";
import { authActions, useAuth } from "~/features/auth/authSlice";
import useStylesCommon from "~/hooks/useStylesCommon";
import ColorThemes from "~/theme/color.theme";
import SpacingTheme from "~/theme/spacing.theme";
import { navigate } from "~/utils/navigation.root";
import Avatar from "./components/Avatar";
import FormChangePassword from "./components/FormChangePassword";
import FormChangeProfile from "./components/FormChangeProfile";

const AVATAR =
  "https://images.unsplash.com/photo-1710368650533-43ef7d9d934b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2M3x8fGVufDB8fHx8fA%3D%3D";

const ProfileScreen = () => {
  const styles = useStylesCommon();
  const dispatch = useDispatch();
  const { user, mode, isFetching: loading } = useAuth();

  const handleLogout = () => {
    Alert.alert("Confirm", "Are you sure logout?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          dispatch(authActions.logoutStart());
        },
      },
    ]);
  };

  const handleOnCancel = () => {
    dispatch(authActions.setMode(""));
  };

  const handleChangePassword = (values) => {
    dispatch(authActions.fetchChangePasswordStart(values));
  };

  const handleChangeProfile = (values) => {
    dispatch(authActions.fetchChangeProfileStart(values));
  };

  return (
    <Container style={[styles.bgDark]}>
      {mode === "profile" ? (
        <View
          style={{
            flex: 1,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            padding: SpacingTheme.lg,
          }}
        >
          <FormChangeProfile
            loading={loading}
            onCancel={handleOnCancel}
            onSubmit={handleChangeProfile}
            initialValues={{ displayName: user?.displayName }}
          />
        </View>
      ) : null}

      {mode === "password" ? (
        <View
          style={{
            flex: 1,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            padding: SpacingTheme.lg,
          }}
        >
          <FormChangePassword
            loading={loading}
            onCancel={handleOnCancel}
            onSubmit={handleChangePassword}
            initialValues={{ passwordOld: "", passwordNew: "", rePassword: "" }}
          />
        </View>
      ) : null}

      {!mode ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: SpacingTheme.n(100),
            }}
          >
            <Avatar src={AVATAR} />

            <Text
              style={{
                color: ColorThemes.white,
                fontWeight: 700,
                marginTop: SpacingTheme.xl,
                fontSize: SpacingTheme.n(20),
              }}
            >
              {user?.displayName}
            </Text>
          </View>

          <View style={{ padding: SpacingTheme.md, width: "100%", marginTop: SpacingTheme.lg }}>
            <View style={styles.line()} />
          </View>

          <View style={{ padding: SpacingTheme.md, marginBottom: SpacingTheme.n(10) }}>
            <Button
              label={"Achievements"}
              onPress={() => navigate("Achievements")}
              styleContainer={{ width: "100%", backgroundColor: ColorThemes.white }}
              textColor={ColorThemes.black}
            />

            <Button
              textColor={ColorThemes.black}
              label={"Change Profile"}
              onPress={() => dispatch(authActions.setMode("profile"))}
              styleContainer={{
                width: "100%",
                marginVertical: SpacingTheme.lg,
                backgroundColor: ColorThemes.white,
              }}
            />

            <Button
              textColor={ColorThemes.black}
              label={"Favorites"}
              onPress={() => navigate("Favorites")}
              styleContainer={{
                width: "100%",
                backgroundColor: ColorThemes.white,
              }}
            />

            <Button
              label={"Change Password"}
              onPress={() => dispatch(authActions.setMode("password"))}
              styleContainer={{
                width: "100%",
                marginVertical: SpacingTheme.lg,
                backgroundColor: ColorThemes.white,
              }}
              textColor={ColorThemes.black}
            />

            <Button
              label={"Logout"}
              onPress={handleLogout}
              styleContainer={{
                width: "100%",
                marginVertical: SpacingTheme.lg,
                backgroundColor: ColorThemes.red,
              }}
            />
          </View>
        </ScrollView>
      ) : null}
    </Container>
  );
};

export default ProfileScreen;
