let ReactNativeScreensPackage: any;

try {
  ReactNativeScreensPackage = require('react-native-screens');
} catch (_error) {
  /* react-native-screens is an optional peer dependency */
}

export default ReactNativeScreensPackage;
