import { readFileSync } from 'fs';
import { join } from 'path';
import { textClassNames } from '../text.styles';

const WEIGHTS = ['normal', 'medium', 'semibold', 'bold'] as const;

describe('Typography weight', () => {
  it.each(WEIGHTS)(
    'applies the %s weight class when the weight prop is set',
    (weight) => {
      expect(textClassNames.root({ weight })).toContain(
        `text__root--weight-${weight}`
      );
    }
  );

  it('applies no weight class when the weight prop is omitted', () => {
    expect(textClassNames.root({})).not.toContain('text__root--weight');
  });

  it('keeps className overrides after the weight class', () => {
    const result = textClassNames.root({
      weight: 'semibold',
      className: 'font-bold',
    });

    expect(result.indexOf('text__root--weight-semibold')).toBeLessThan(
      result.indexOf('font-bold')
    );
  });

  describe('css declarations', () => {
    const css = readFileSync(
      join(__dirname, '../../../styles/components/text.css'),
      'utf8'
    );

    const getRule = (selector: string) => {
      const match = css.match(new RegExp(`\\.${selector}\\s*\\{([^}]*)\\}`));
      expect(match).not.toBeNull();
      return match![1]!;
    };

    it.each(WEIGHTS)(
      'declares font-weight for the %s weight class',
      (weight) => {
        // Regression test for #461: the weight classes must set `font-weight`
        // so the prop works without app-defined `--font-*` family variables.
        expect(getRule(`text__root--weight-${weight}`)).toContain(
          `font-weight: var(--font-weight-${weight})`
        );
      }
    );

    it.each(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])(
      'declares the semibold font-weight for the %s type class',
      (type) => {
        expect(getRule(`text__root--type-${type}`)).toContain(
          'font-weight: var(--font-weight-semibold)'
        );
      }
    );
  });
});
