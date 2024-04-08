import Lottie from "lottie-react-native";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import Container from "~/components/shared/Container";
import { useApp } from "~/features/app/appSlice";
import { authActions } from "~/features/auth/authSlice";
import useStylesCommon from "~/hooks/useStylesCommon";
import ColorThemes from "~/theme/color.theme";
import AuthForm from "../components/AuthForm";
import KeyboardAvoidingScrollView from "~/components/shared/KeyboardAvoidingScrollView";

const LoginScreen = () => {
  const styles = useStylesCommon();
  const dispatch = useDispatch();
  const { loading } = useApp();

  const handleSubmit = (values) => {
    dispatch(authActions.loginStart(values));
  };

  return (
    <Container style={[styles.bgDark, styles.center]}>
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

        <Text style={stylesModule.title}>Login</Text>

        <AuthForm
          initialValues={{ username: "", password: "" }}
          loading={loading}
          onSubmit={handleSubmit}
        />
      </KeyboardAvoidingScrollView>
    </Container>
  );
};

export default LoginScreen;

const stylesModule = StyleSheet.create({
  title: {
    color: ColorThemes.white,
    fontWeight: "bold",
    fontSize: 28,
  },
});
