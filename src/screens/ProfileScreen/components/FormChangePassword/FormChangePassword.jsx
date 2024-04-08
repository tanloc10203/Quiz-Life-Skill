import { Formik } from "formik";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "~/components/ui/Button";
import InputIconForm from "~/components/ui/Form/InputIconForm";
import useStylesCommon from "~/hooks/useStylesCommon";
import ColorThemes from "~/theme/color.theme";
import SpacingTheme from "~/theme/spacing.theme";
import { changePasswordSchema } from "~/validations/auth.schema";

const FormChangePassword = ({
  initialValues = {
    passwordOld: "",
    passwordNew: "",
    rePassword: "",
  },
  onSubmit = (value) => {},
  loading = false,
  onCancel = () => {},
}) => {
  const styles = useStylesCommon();

  return (
    <Formik
      enableReinitialize
      validationSchema={changePasswordSchema}
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        if (!onSubmit) return;
        onSubmit?.(values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View
          style={{
            padding: SpacingTheme.md,
          }}
        >
          <Text
            style={{
              color: ColorThemes.white,
              textAlign: "center",
              marginBottom: SpacingTheme.n(20),
              marginTop: SpacingTheme.lg,
              fontSize: SpacingTheme.n(30),
              fontWeight: 700,
            }}
          >
            Change password
          </Text>

          <InputIconForm
            placeholder="Password Old"
            icon="password"
            secure
            value={values.passwordOld}
            onBlur={handleBlur("passwordOld")}
            onChangeText={handleChange("passwordOld")}
            error={touched.passwordOld && Boolean(errors.passwordOld)}
            helperText={touched.passwordOld && errors.passwordOld}
          />

          <InputIconForm
            placeholder="Password New"
            icon="password"
            secure
            value={values.passwordNew}
            onBlur={handleBlur("passwordNew")}
            onChangeText={handleChange("passwordNew")}
            error={touched.passwordNew && Boolean(errors.passwordNew)}
            helperText={touched.passwordNew && errors.passwordNew}
          />

          <InputIconForm
            placeholder="Re Password"
            icon="password"
            secure
            value={values.rePassword}
            onBlur={handleBlur("rePassword")}
            onChangeText={handleChange("rePassword")}
            error={touched.rePassword && Boolean(errors.rePassword)}
            helperText={touched.rePassword && errors.rePassword}
          />

          <View style={styles.mt2xl}>
            <Button
              loading={loading}
              disabled={loading}
              onPress={handleSubmit}
              label={"Save change"}
            />

            <Button
              loading={loading}
              disabled={loading}
              styleContainer={{ marginTop: SpacingTheme.md, backgroundColor: ColorThemes.red }}
              onPress={onCancel}
              label={"Cancel"}
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default FormChangePassword;

const styles = StyleSheet.create({});
