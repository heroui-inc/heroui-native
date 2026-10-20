// TEMPORARY: uniwind cascade-layer verification screen. Do not commit.

import { ScrollView } from 'react-native';
import { LayerCases } from '../../layer-test/cases';
import { Probes } from '../../layer-test/probes';

export default function LayerTestScreen() {
  return (
    <ScrollView contentContainerClassName="pt-28 pb-40">
      <Probes />
      <LayerCases />
    </ScrollView>
  );
}
