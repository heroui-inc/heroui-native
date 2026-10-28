let TrueSheetReanimatedPackage: any;

try {
  TrueSheetReanimatedPackage = require('@lodev09/react-native-true-sheet/reanimated');
} catch (_error) {
  /* @lodev09/react-native-true-sheet is an optional peer dependency */
}

export default TrueSheetReanimatedPackage;
