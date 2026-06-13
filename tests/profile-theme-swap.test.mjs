import test from 'node:test';
import assert from 'node:assert/strict';

import {
  PROFILE_SWAP_IMAGE_SWAP_DELAY_MS,
  createProfileThemeSwapController
} from '../js/logic/profileThemeSwap.mjs';

class FakeClassList {
  constructor(initial = []) {
    this.values = new Set(initial);
  }

  add(...tokens) {
    tokens.forEach((token) => this.values.add(token));
  }

  remove(...tokens) {
    tokens.forEach((token) => this.values.delete(token));
  }

  contains(token) {
    return this.values.has(token);
  }

  toggle(token, force) {
    if (force === true) {
      this.values.add(token);
      return true;
    }

    if (force === false) {
      this.values.delete(token);
      return false;
    }

    if (this.values.has(token)) {
      this.values.delete(token);
      return false;
    }

    this.values.add(token);
    return true;
  }
}

class FakeButton {
  constructor() {
    this.disabled = false;
    this.attributes = new Map();
  }

  setAttribute(name, value) {
    this.attributes.set(name, value);
  }

  removeAttribute(name) {
    this.attributes.delete(name);
  }
}

class FakeStorage {
  constructor() {
    this.values = new Map();
  }

  setItem(key, value) {
    this.values.set(key, value);
  }

  getItem(key) {
    return this.values.get(key) ?? null;
  }
}

class FakeTimers {
  constructor() {
    this.now = 0;
    this.nextId = 1;
    this.tasks = [];
  }

  setTimeout = (callback, delay = 0) => {
    const id = this.nextId++;
    this.tasks.push({ id, time: this.now + delay, callback });
    return id;
  };

  clearTimeout = (id) => {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  };

  tick(ms) {
    this.now += ms;

    while (true) {
      const dueTasks = this.tasks
        .filter((task) => task.time <= this.now)
        .sort((a, b) => a.time - b.time);

      if (!dueTasks.length) {
        break;
      }

      const nextTask = dueTasks[0];
      this.tasks = this.tasks.filter((task) => task.id !== nextTask.id);
      nextTask.callback();
    }
  }
}

class FakeVideo {
  constructor(readyState = 0) {
    this.readyState = readyState;
    this.src = '';
    this.currentTime = 0;
    this.preload = 'auto';
    this.muted = true;
    this.playsInline = true;
    this.classList = new FakeClassList(['opacity-0']);
    this.listeners = new Map();
    this.playCalls = 0;
    this.pauseCalls = 0;
    this.loadCalls = 0;
  }

  addEventListener(eventName, handler) {
    const handlers = this.listeners.get(eventName) ?? [];
    handlers.push(handler);
    this.listeners.set(eventName, handlers);
  }

  removeEventListener(eventName, handler) {
    const handlers = this.listeners.get(eventName) ?? [];
    this.listeners.set(eventName, handlers.filter((candidate) => candidate !== handler));
  }

  dispatch(eventName) {
    const handlers = this.listeners.get(eventName) ?? [];
    handlers.forEach((handler) => handler());
  }

  play() {
    this.playCalls += 1;
    return Promise.resolve();
  }

  pause() {
    this.pauseCalls += 1;
  }

  load() {
    this.loadCalls += 1;
  }
}

function createHarness({ isDark = true, readyState = 0 } = {}) {
  const timers = new FakeTimers();
  const storage = new FakeStorage();
  const root = { classList: new FakeClassList(isDark ? ['dark'] : []) };
  const image = { src: isDark ? '/animationimages/noglasses pic.png' : '/animationimages/withglasses pic.png' };
  const videos = {
    dark: new FakeVideo(readyState),
    light: new FakeVideo(readyState)
  };
  const toggles = [new FakeButton(), new FakeButton()];

  const controller = createProfileThemeSwapController({
    root,
    storage,
    profileImage: image,
    profileVideos: videos,
    themeToggles: toggles,
    setTimeoutFn: timers.setTimeout,
    clearTimeoutFn: timers.clearTimeout
  });

  return { controller, image, videos, toggles, root, storage, timers };
}

test('toggles theme instantly and skips the video when it is not already ready', async () => {
  const { controller, image, videos, toggles, root, storage } = createHarness({ isDark: true, readyState: 0 });

  await controller.toggleTheme();

  assert.equal(root.classList.contains('dark'), false);
  assert.equal(storage.getItem('theme'), 'light');
  assert.equal(image.src, '/animationimages/withglasses pic.png');
  assert.equal(videos.light.playCalls, 0);
  assert.equal(toggles[0].disabled, false);
  assert.equal(toggles[1].disabled, false);
});

test('keeps buttons disabled only during an active ready video swap', async () => {
  const { controller, image, videos, toggles, root, storage, timers } = createHarness({ isDark: false, readyState: 4 });

  await controller.toggleTheme();
  await Promise.resolve();

  assert.equal(root.classList.contains('dark'), true);
  assert.equal(storage.getItem('theme'), 'dark');
  assert.equal(videos.dark.playCalls, 1);
  assert.equal(videos.dark.classList.contains('opacity-100'), true);
  assert.equal(toggles[0].disabled, true);
  assert.equal(toggles[1].disabled, true);

  timers.tick(PROFILE_SWAP_IMAGE_SWAP_DELAY_MS);
  assert.equal(image.src, '/animationimages/noglasses pic.png');
  assert.equal(toggles[0].disabled, true);

  videos.dark.dispatch('ended');

  assert.equal(videos.dark.classList.contains('opacity-100'), false);
  assert.equal(toggles[0].disabled, false);
  assert.equal(toggles[1].disabled, false);
});

test('keeps the new profile image after a fast video transition ends', async () => {
  const { controller, image, videos, root } = createHarness({ isDark: true, readyState: 4 });

  await controller.toggleTheme();
  await Promise.resolve();

  assert.equal(root.classList.contains('dark'), false);

  videos.light.dispatch('ended');

  assert.equal(image.src, '/animationimages/withglasses pic.png');
  assert.equal(videos.light.classList.contains('opacity-100'), false);
});

test('does not rewind the finished swap video during fade-out cleanup', async () => {
  const { controller, videos } = createHarness({ isDark: true, readyState: 4 });

  await controller.toggleTheme();
  await Promise.resolve();

  videos.light.currentTime = 1.25;
  videos.light.dispatch('ended');

  assert.equal(videos.light.currentTime, 1.25);
});
