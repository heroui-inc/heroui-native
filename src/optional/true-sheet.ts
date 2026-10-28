let TrueSheetPackage: any;

try {
  TrueSheetPackage = require('@lodev09/react-native-true-sheet');
} catch (_error) {
  /* @lodev09/react-native-true-sheet is an optional peer dependency */
}

export default TrueSheetPackage;
