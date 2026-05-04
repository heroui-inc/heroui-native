import { Text } from '../components/text';

describe('Text', () => {
  it('should export Text component', () => {
    expect(Text).toBeDefined();
  });

  it('should have Heading sub-component', () => {
    expect(Text.Heading).toBeDefined();
  });

  it('should have Paragraph sub-component', () => {
    expect(Text.Paragraph).toBeDefined();
  });

  it('should have Code sub-component', () => {
    expect(Text.Code).toBeDefined();
  });

  it('should have Prose sub-component', () => {
    expect(Text.Prose).toBeDefined();
  });
});
