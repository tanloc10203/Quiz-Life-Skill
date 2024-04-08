import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "~/components/ui/Button";
import InputIconForm from "~/components/ui/Form/InputIconForm";
import useStylesCommon from "~/hooks/useStylesCommon";
import { loginSchema, registerSchema } from "~/validations/auth.schema";

const AuthForm = ({
  onSubmit = (values) => {},
  initialValues,
  loading = false,
  isRegister = false,
}) => {
  const styles = useStylesCommon();
  const navigation = useNavigation();

  return (
    <Formik
      enableReinitialize
      validationSchema={isRegister ? registerSchema : loginSchema}
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        if (!onSubmit) return;
        onSubmit(values, resetForm);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={[styles.mX4, styles.pX4, styles.mtSm]}>
          {isRegister ? (
            <InputIconForm
              placeholder="Display Name"
              value={values.displayName}
              onBlur={handleBlur("displayName")}
              onChangeText={handleChange("displayName")}
              error={touched.displayName && Boolean(errors.displayName)}
              helperText={touched.displayName && errors.displayName}
            />
          ) : null}

          <InputIconForm
            placeholder="Username"
            icon="account"
            value={values.username}
            onBlur={handleBlur("username")}
            onChangeText={handleChange("username")}
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username && errors.username}
          />

          <InputIconForm
            placeholder="Password"
            icon="password"
            secure
            value={values.password}
            onBlur={handleBlur("password")}
            onChangeText={handleChange("password")}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />

          <View style={styles.mt2xl}>
            <Button
              loading={loading}
              disabled={loading}
              onPress={handleSubmit}
              label={isRegister ? "Register" : "Login"}
            />
          </View>

          <View style={[stylesModule.bottom, styles.mt2xl]}>
            <Text style={styles.colorGray}>
              {isRegister ? "You already account?" : "You are't account?"}
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate(isRegister ? "Login" : "Register")}
            >
              <Text style={styles.colorBlue}>{isRegister ? "Login" : "Sign up"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default AuthForm;

const stylesModule = StyleSheet.create({
  bottom: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
});
