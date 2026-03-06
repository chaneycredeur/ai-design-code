import StyleDictionary from 'style-dictionary';

const sd = new StyleDictionary('sd.config.mjs');
await sd.buildAllPlatforms();

console.log('Design tokens built successfully.');
