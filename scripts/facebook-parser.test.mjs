import test from 'node:test';
import assert from 'node:assert/strict';
import { parseTimeline } from './facebook-parser.mjs';

test('parses a dated night roster and its images', () => {
  const html = `<script>"timelinePosts":[{"message":"صيدليات الحراسة #الليلية يوم 18 نونبر 2026 #من_19h30_الى_9h00","createdTime":1794996014,"photoURL":"https://example.com/a.jpg","albumPhotoURLs":["https://example.com/a.jpg","https://example.com/b.jpg"]}]</script>`;
  const [post] = parseTimeline(html);
  assert.equal(post.date, '2026-11-18');
  assert.equal(post.shift, 'night');
  assert.deepEqual(post.interval, { start: '19:30', end: '09:00' });
  assert.equal(post.images.length, 2);
});

test('does not publish undated posts', () => {
  assert.deepEqual(parseTimeline('"timelinePosts":[{"message":"hello","createdTime":100,"photoURL":"https://example.com/a.jpg"}]'), []);
});

test('keeps both published shifts and the full album count', () => {
  const html = `"timelinePosts":[{"message":"صيدليات الحراسة يوم 19 نونبر 2026 #من_13h00_الى_15h30 #من_19h30_الى_9h00","createdTime":1795096464,"photoURL":"https://example.com/a.jpg","albumPhotoURLs":["https://example.com/a.jpg"],"albumPhotoCount":8}]`;
  const [post] = parseTimeline(html);
  assert.equal(post.shift, 'combined');
  assert.deepEqual(post.intervals, [{ start: '13:00', end: '15:30' }, { start: '19:30', end: '09:00' }]);
  assert.equal(post.expectedImageCount, 8);
});
