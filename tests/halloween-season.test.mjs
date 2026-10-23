import test from 'node:test';
import assert from 'node:assert/strict';
import { isHalloweenSeason, getNextSeasonChange } from '../js/logic/halloweenSeason.mjs';

// Philippine time is UTC+8, so midnight in Manila is 16:00 UTC the day before.
test('starts at 12:00 AM October 29, Philippine time', () => {
  assert.equal(isHalloweenSeason(new Date('2026-10-28T15:59:59Z')), false);
  assert.equal(isHalloweenSeason(new Date('2026-10-28T16:00:00Z')), true);
});

test('stays on through November 2', () => {
  assert.equal(isHalloweenSeason(new Date('2026-10-31T12:00:00+08:00')), true);
  assert.equal(isHalloweenSeason(new Date('2026-11-02T23:59:59+08:00')), true);
});

test('ends at exactly 12:00 AM November 3, Philippine time', () => {
  assert.equal(isHalloweenSeason(new Date('2026-11-02T15:59:59Z')), true);
  assert.equal(isHalloweenSeason(new Date('2026-11-02T16:00:00Z')), false);
});

test('is off the rest of the year and comes back next year', () => {
  assert.equal(isHalloweenSeason(new Date('2026-10-23T10:00:00+08:00')), false);
  assert.equal(isHalloweenSeason(new Date('2026-12-25T10:00:00+08:00')), false);
  assert.equal(isHalloweenSeason(new Date('2027-10-29T00:00:00+08:00')), true);
});

test('next change is the start when the season is off', () => {
  assert.equal(getNextSeasonChange(new Date('2026-10-23T10:00:00+08:00')).toISOString(), '2026-10-28T16:00:00.000Z');
});

test('next change is the end when the season is on', () => {
  assert.equal(getNextSeasonChange(new Date('2026-10-31T10:00:00+08:00')).toISOString(), '2026-11-02T16:00:00.000Z');
});

test('after the season ends, next change is next year', () => {
  assert.equal(getNextSeasonChange(new Date('2026-11-03T00:00:00+08:00')).toISOString(), '2027-10-28T16:00:00.000Z');
});
