import test from 'node:test';
import assert from 'node:assert/strict';
import { isActive, latestRelevant } from './feed.js';

const night = { date: '2026-11-18', interval: { start: '19:30', end: '09:00' } };

test('overnight roster ends at the published morning time', () => {
  assert.equal(isActive(night, { date: '2026-11-18', time: '20:00' }), true);
  assert.equal(isActive(night, { date: '2026-11-19', time: '08:59' }), true);
  assert.equal(isActive(night, { date: '2026-11-19', time: '09:00' }), false);
});

test('expired roster is shown as latest, never current', () => {
  assert.equal(latestRelevant([night], { date: '2026-11-19', time: '09:00' }).active, false);
});

test('a combined roster has an afternoon and an overnight shift', () => {
  const combined = { date: '2026-11-19', intervals: [{ start: '13:00', end: '15:30' }, { start: '19:30', end: '09:00' }] };
  assert.equal(isActive(combined, { date: '2026-11-19', time: '14:00' }), true);
  assert.equal(isActive(combined, { date: '2026-11-19', time: '18:00' }), false);
  assert.equal(isActive(combined, { date: '2026-11-19', time: '20:00' }), true);
  assert.equal(isActive(combined, { date: '2026-11-20', time: '08:00' }), true);
  assert.equal(isActive(combined, { date: '2026-11-20', time: '09:00' }), false);
});
