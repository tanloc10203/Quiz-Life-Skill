import { Formik } from "formik";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "~/components/ui/Button";
import InputIconForm from "~/components/ui/Form/InputIconForm";
import useStylesCommon from "~/hooks/useStylesCommon";
import ColorThemes from "~/theme/color.theme";
import SpacingTheme from "~/theme/spacing.theme";
import { profileSchema } from "~/validations/auth.schema";

const FormChangeProfile = ({
  initialValues = {
    displayName: "",
  },
  onSubmit = (value) => {},
  loading = false,
  onCancel = () => {},
}) => {
  const styles = useStylesCommon();

  return (
    <Formik
      enableReinitialize
      validationSchema={profileSchema}
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
            Change Profile
          </Text>

          <InputIconForm
            placeholder="Display Name"
            value={values.displayName}
            onBlur={handleBlur("displayName")}
            onChangeText={handleChange("displayName")}
            error={touched.displayName && Boolean(errors.displayName)}
            helperText={touched.displayName && errors.displayName}
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

export default FormChangeProfile;

const styles = StyleSheet.create({});
