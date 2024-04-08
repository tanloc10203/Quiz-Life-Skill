import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import Header from "~/components/shared/Header";

const useAppBar = ({
  options = {},
  title,
  isShowGoBackHome = false,
  isHome = false,
  isHidden = false,
}) => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const optionsConfigDefault = {
      header: ({ navigation, route, options, back }) => {
        return (
          <Header
            isHidden={isHidden}
            name={title}
            isBack={back}
            isShowGoBackHome={isShowGoBackHome}
            isHome={isHome}
          />
        );
      },
      headerShown: true,
      statusBarAnimation: "fade",
      statusBarHidden: false,
      statusBarTranslucent: true,
      ...options,
    };

    navigation.setOptions(optionsConfigDefault);
  }, [title]);
};

export default useAppBar;
