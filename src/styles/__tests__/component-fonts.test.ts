import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

const COMPONENTS_DIR = join(__dirname, '../components');

type Rule = {
  file: string;
  selector: string;
  body: string;
};

const rules: Rule[] = readdirSync(COMPONENTS_DIR)
  .filter((file) => file.endsWith('.css') && file !== 'index.css')
  .flatMap((file) => {
    const css = readFileSync(join(COMPONENTS_DIR, file), 'utf8');
    return [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((match) => ({
      file,
      selector: (match[1] ?? '').trim().split('\n').pop()!.trim(),
      body: match[2] ?? '',
    }));
  });

describe('Component font declarations', () => {
  it('collects rules from every component stylesheet', () => {
    expect(rules.length).toBeGreaterThan(0);
  });

  it.each(['medium', 'semibold', 'bold'])(
    'declares the %s font-weight next to the matching font-family',
    (weight) => {
      // `--font-*` family variables only exist once an app opts into custom
      // fonts, so a rule relying on the family alone renders normal (#461).
      const missing = rules
        .filter((rule) =>
          rule.body.includes(`font-family: var(--font-${weight})`)
        )
        .filter(
          (rule) =>
            !rule.body.includes(`font-weight: var(--font-weight-${weight})`)
        )
        .map((rule) => `${rule.file} ${rule.selector}`);

      expect(missing).toEqual([]);
    }
  );
});
