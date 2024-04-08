const { Dimensions, StatusBar } = require("react-native");

const { height: HEIGHT_WINDOW, width: WIDTH_WINDOW } = Dimensions.get("window");
const STATUS_BAR_HEIGHT = StatusBar.currentHeight;
const SPACING_BUTTON_TAB_VIEW = 60;

export { HEIGHT_WINDOW, WIDTH_WINDOW, STATUS_BAR_HEIGHT, SPACING_BUTTON_TAB_VIEW };
