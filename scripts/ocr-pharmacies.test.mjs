import test from 'node:test';
import assert from 'node:assert/strict';
import { extractName, matchDirectory, mapsSearchUrl } from './ocr-pharmacies.mjs';

test('extracts pharmacy names from noisy OCR lines', () => {
  assert.equal(extractName('Cr Pharmacie BELKACEM\nTanger'), 'BELKACEM');
  assert.equal(extractName('Pharmacie 6 NOVEMBRE\nRoute de Rabat'), '6 NOVEMBRE');
});

test('only exact normalized directory names match', () => {
  const directory = [{ name: 'Ben Ayad', aliases: ['Benayad'], address: 'Tanger' }];
  assert.equal(matchDirectory('BENAYAD', directory)?.name, 'Ben Ayad');
  assert.equal(matchDirectory('Ben Ali', directory), null);
});

test('maps link searches the pharmacy and verified address', () => {
  const url = mapsSearchUrl({ name: 'Camelia', address: 'Val Fleuri, Tanger' });
  assert.equal(new URL(url).searchParams.get('query'), 'Pharmacie Camelia, Val Fleuri, Tanger, Maroc');
});
