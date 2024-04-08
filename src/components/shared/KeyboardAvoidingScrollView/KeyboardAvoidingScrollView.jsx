import { useHeaderHeight } from "@react-navigation/elements";
import React from "react";
import { Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from "react-native";

const KeyboardAvoidingScrollView = ({
  children,
  scrollContentContainerStyle = {},
  scrollViewRef,
}) => {
  const headerHeight = useHeaderHeight();

  const renderScrollView = (
    <ScrollView
      contentContainerStyle={{ ...scrollContentContainerStyle }}
      contentInsetAdjustmentBehavior="never"
      keyboardShouldPersistTaps="handled"
      ref={scrollViewRef}
    >
      {children}
    </ScrollView>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={headerHeight}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {renderScrollView}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingScrollView;
