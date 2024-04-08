import Lottie from "lottie-react-native";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import Container from "~/components/shared/Container";
import KeyboardAvoidingScrollView from "~/components/shared/KeyboardAvoidingScrollView";
import { useApp } from "~/features/app/appSlice";
import { authActions } from "~/features/auth/authSlice";
import useStylesCommon from "~/hooks/useStylesCommon";
import ColorThemes from "~/theme/color.theme";
import AuthForm from "../components/AuthForm";

const RegisterScreen = () => {
  const styles = useStylesCommon();
  const dispatch = useDispatch();
  const { loading } = useApp();

  const handleSubmit = (values) => {
    dispatch(authActions.registerStart(values));
  };

  return (
    <Container style={[styles.bgDark]}>
      <StatusBar barStyle="light-content" />

      <KeyboardAvoidingScrollView scrollContentContainerStyle={styles.center}>
        <View style={styles.lottie}>
          <Lottie
            source={require("~/assets/animation/login.json")}
            autoPlay={true}
            speed={1}
            loop={true}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
          />
        </View>

        <Text style={stylesModule.title}>Sing up Account</Text>

        <AuthForm
          isRegister
          initialValues={{ username: "", password: "", displayName: "" }}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </KeyboardAvoidingScrollView>
    </Container>
  );
};

export default RegisterScreen;

const stylesModule = StyleSheet.create({
  title: {
    color: ColorThemes.white,
    fontWeight: "bold",
    fontSize: 28,
  },

  bottom: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
});
