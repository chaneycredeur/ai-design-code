import StyleDictionary from 'style-dictionary';

// Custom transform: extract hex from Figma color $value objects
StyleDictionary.registerTransform({
  name: 'figma/color',
  type: 'value',
  transitive: true,
  filter: (token) => token.$type === 'color',
  transform: (token) => {
    const val = token.$value ?? token.value;
    if (typeof val === 'object' && val.hex) {
      return val.hex.toLowerCase();
    }
    return val;
  },
});

// Custom transform: add px units to spacing, sizing, border, elevation, focus, breakpoint numbers
StyleDictionary.registerTransform({
  name: 'figma/px',
  type: 'value',
  filter: (token) => {
    if (token.$type !== 'number') return false;
    const path = token.path.join('.');
    // These categories should get px units
    return /^(spacing|border|elevation|focus|breakpoint|sizing)\./.test(path)
      || path.startsWith('z-index') === false
        && path.startsWith('opacity') === false
        && path.startsWith('duration') === false
        && path.startsWith('text.') && (path.includes('.size') || path.includes('.letter-spacing'));
  },
  transform: (token) => {
    const val = token.$value ?? token.value;
    if (typeof val === 'number') return `${val}px`;
    return val;
  },
});

// Custom transform: add ms units to duration numbers
StyleDictionary.registerTransform({
  name: 'figma/ms',
  type: 'value',
  filter: (token) => {
    if (token.$type !== 'number') return false;
    return token.path[0] === 'duration';
  },
  transform: (token) => {
    const val = token.$value ?? token.value;
    if (typeof val === 'number') return `${val}ms`;
    return val;
  },
});

// Custom transform: convert text size/line-height numbers to rem
StyleDictionary.registerTransform({
  name: 'figma/text-size',
  type: 'value',
  filter: (token) => {
    if (token.$type !== 'number') return false;
    const path = token.path.join('.');
    return path.startsWith('text.') && path.includes('.size');
  },
  transform: (token) => {
    const val = token.$value ?? token.value;
    if (typeof val === 'number') return `${val / 16}rem`;
    return val;
  },
});

// Custom transform group
StyleDictionary.registerTransformGroup({
  name: 'figma/css',
  transforms: [
    'attribute/cti',
    'name/kebab',
    'figma/color',
    'figma/text-size',
    'figma/ms',
    'figma/px',
  ],
});

const prefix = 'ds';

// Build primitives
const primitives = new StyleDictionary({
  source: ['tokens/primitive-tokens.json'],
  platforms: {
    css: {
      transformGroup: 'figma/css',
      buildPath: 'src/styles/',
      prefix,
      files: [
        {
          destination: '_tokens-primitives.scss',
          format: 'css/variables',
          options: { selector: ':root' },
        },
      ],
    },
  },
});

// Build semantic light tokens
const light = new StyleDictionary({
  source: ['tokens/semantic-light-tokens.json'],
  platforms: {
    css: {
      transformGroup: 'figma/css',
      buildPath: 'src/styles/',
      prefix,
      files: [
        {
          destination: '_tokens-light.scss',
          format: 'css/variables',
          options: { selector: ':root, [data-theme="light"]' },
        },
      ],
    },
  },
});

// Build semantic dark tokens
const dark = new StyleDictionary({
  source: ['tokens/semantic-dark-tokens.json'],
  platforms: {
    css: {
      transformGroup: 'figma/css',
      buildPath: 'src/styles/',
      prefix,
      files: [
        {
          destination: '_tokens-dark.scss',
          format: 'css/variables',
          options: { selector: '[data-theme="dark"]' },
        },
      ],
    },
  },
});

await Promise.all([
  primitives.buildAllPlatforms(),
  light.buildAllPlatforms(),
  dark.buildAllPlatforms(),
]);

console.log('Design tokens built successfully:');
console.log('  - src/styles/_tokens-primitives.scss');
console.log('  - src/styles/_tokens-light.scss');
console.log('  - src/styles/_tokens-dark.scss');
