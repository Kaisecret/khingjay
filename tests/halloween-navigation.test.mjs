import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const source = readFileSync(new URL('../js/logic/halloweenSeason.mjs', import.meta.url), 'utf8');
const pages = ['/', '/case-study?p=wattsnap', '/project?p=wattsnap', '/experience', '/tech-stack'];

function storage() {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key)
  };
}

// Each run represents a new document, sharing the browser tab's storage.
// Leave the stylesheet pending: these tests exercise mode selection, not animation rendering.
function openPage(url, { session, local, now = '2026-10-24T12:00:00+08:00' }) {
  const stylesheets = [];
  const buttons = [];
  class PageDate extends Date {
    constructor(...args) { super(...(args.length ? args : [now])); }
    static now() { return new Date(now).getTime(); }
  }
  const context = {
    Date: PageDate,
    URLSearchParams,
    window: { location: new URL(url) },
    localStorage: local,
    sessionStorage: session,
    console,
    setTimeout() {},
    document: {
      documentElement: { classList: { remove() {} } },
      getElementById() { return null; },
      createElement() { return { style: {}, setAttribute() {}, addEventListener() {} }; },
      head: { append: (link) => stylesheets.push(link) },
      body: { append: (button) => buttons.push(button) },
      addEventListener() {}
    }
  };
  runInNewContext(`${source.replace(/^export /gm, '')}\ninitHalloween();`, context);
  return { isOn: stylesheets.length > 0, buttons };
}

test('URL preview stays on when navigating to case study and other live pages', () => {
  const state = { session: storage(), local: storage() };
  assert.equal(openPage('https://portfolio.test/?halloween=on', state).isOn, true);
  for (const page of pages) {
    assert.equal(openPage(`https://portfolio.test${page}`, state).isOn, true, page);
  }
});

test('URL preview stays on between local HTML pages', () => {
  const state = { session: storage(), local: storage() };
  openPage('http://localhost:5500/htmlfiles/index.html?halloween=on', state);
  for (const page of ['case-study', 'project', 'experience', 'tech-stack', 'index']) {
    assert.equal(openPage(`http://localhost:5500/htmlfiles/${page}.html`, state).isOn, true, page);
  }
});

test('an off preview also stays off during the season after navigation', () => {
  const state = { session: storage(), local: storage(), now: '2026-10-31T12:00:00+08:00' };
  openPage('https://portfolio.test/?halloween=off', state);
  assert.equal(openPage('https://portfolio.test/case-study?p=wattsnap', state).isOn, false);
});

test('auto clears an older local preview choice for subsequent pages', () => {
  const state = { session: storage(), local: storage() };
  state.local.setItem('halloween-preview', 'on');
  assert.equal(openPage('http://localhost:5500/htmlfiles/index.html?halloween=auto', state).isOn, false);
  assert.equal(openPage('http://localhost:5500/htmlfiles/case-study.html?p=wattsnap', state).isOn, false);
});

test('automatic season follows Philippine dates on every page without a preview', () => {
  for (const now of ['2026-10-28T23:59:59+08:00', '2026-10-29T00:00:00+08:00', '2026-11-02T23:59:59+08:00', '2026-11-03T00:00:00+08:00']) {
    const expected = now.startsWith('2026-10-29') || now.startsWith('2026-11-02');
    for (const page of pages) {
      const state = { session: storage(), local: storage(), now };
      assert.equal(openPage(`https://portfolio.test${page}`, state).isOn, expected, `${now} ${page}`);
    }
  }
});

test('a fresh browser session returns to the automatic schedule', () => {
  const local = storage();
  openPage('https://portfolio.test/?halloween=on', { session: storage(), local });
  assert.equal(openPage('https://portfolio.test/case-study?p=wattsnap', { session: storage(), local }).isOn, false);
});

test('the Halloween test button is available locally and absent on deployed pages', () => {
  for (const [url, expectedButtons] of [
    ['http://localhost:5500/htmlfiles/index.html', 1],
    ['http://127.0.0.1:5500/htmlfiles/case-study.html?p=wattsnap', 1],
    ['http://[::1]:5500/htmlfiles/index.html', 1],
    ['https://portfolio.test/', 0],
    ['https://portfolio.test/case-study?p=wattsnap', 0],
    ['https://portfolio.test/htmlfiles/index.html', 0],
    ['https://portfolio.test/htmlfiles/case-study.html?p=wattsnap', 0]
  ]) {
    const state = { session: storage(), local: storage() };
    assert.equal(openPage(url, state).buttons.length, expectedButtons, url);
  }
});
