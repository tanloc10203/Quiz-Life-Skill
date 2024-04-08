import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import ColorThemes from "~/theme/color.theme";
import SpacingTheme from "~/theme/spacing.theme";

const InputIconForm = ({
  placeholder = "",
  onChangeText = (e) => {},
  onBlur = (e) => {},
  error = false,
  helperText = "",
  secure = false,
  icon = "",
  ...props
}) => {
  const [show, setShow] = useState(false);

  const Icon = useMemo(() => {
    return {
      user: <AntDesign name="user" size={24} color={error ? ColorThemes.red : ColorThemes.white} />,
      password: (
        <MaterialIcons
          name="password"
          size={24}
          color={error ? ColorThemes.red : ColorThemes.white}
        />
      ),
      account: (
        <MaterialIcons
          name="account-circle"
          size={24}
          color={error ? ColorThemes.red : ColorThemes.white}
        />
      ),
      "": <AntDesign name="user" size={24} color={error ? ColorThemes.red : ColorThemes.white} />,
    }[icon];
  }, [icon, error]);

  const handleToggle = useCallback(() => {
    setShow((pre) => !pre);
  }, []);

  return (
    <View styles={styles.mb}>
      <View style={[styles.wrap, ...(error ? [styles.error] : [styles.mb])]}>
        {Icon}

        <TextInput
          placeholderTextColor={ColorThemes.gray}
          style={styles.input}
          placeholder={placeholder}
          secureTextEntry={secure ? (show ? false : true) : false}
          onChangeText={onChangeText}
          onBlur={onBlur}
          {...props}
        />

        {secure ? (
          show ? (
            <Feather
              style={styles.icon}
              name="eye-off"
              size={24}
              color={error ? ColorThemes.red : ColorThemes.white}
              onPress={handleToggle}
            />
          ) : (
            <Feather
              style={styles.icon}
              name="eye"
              size={24}
              color={error ? ColorThemes.red : ColorThemes.white}
              onPress={handleToggle}
            />
          )
        ) : null}
      </View>

      {error && helperText ? (
        <View>
          <Text style={styles.helperText}>{helperText}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default InputIconForm;

const styles = StyleSheet.create({
  mb: {
    marginBottom: SpacingTheme.md,
  },

  wrap: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: ColorThemes.white,
    borderBottomWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: SpacingTheme.md,
    width: "100%",
    gap: SpacingTheme.md,
    position: "relative",
  },

  input: {
    color: ColorThemes.white,
    width: "100%",
    padding: 6,
  },

  error: {
    borderColor: ColorThemes.red,
  },

  icon: {
    position: "absolute",
    right: 0,
  },

  helperText: {
    marginTop: SpacingTheme.sm,
    opacity: 0.8,
    color: ColorThemes.red,
    fontStyle: "italic",
    fontWeight: "500",
  },
});
