// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Optional peer dependency loaded at runtime
let GorhomBottomSheetPackage: any;

try {
  GorhomBottomSheetPackage = require('@gorhom/bottom-sheet');
} catch (_error) {
  /* @gorhom/bottom-sheet is an optional peer dependency */
}

export default GorhomBottomSheetPackage;
