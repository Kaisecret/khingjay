export const PROFILE_SWAP_IMAGE_SWAP_DELAY_MS = 90;
export const PROFILE_SWAP_PLAY_TIMEOUT_MS = 120;

const PROFILE_MEDIA = {
  dark: {
    imageSrc: '/animationimages/noglasses pic.png'
  },
  light: {
    imageSrc: '/animationimages/withglasses pic.png'
  }
};

const VIDEO_READY_STATE_THRESHOLD = 3;

function setToggleDisabled(themeToggles, isDisabled) {
  themeToggles.forEach((toggle) => {
    if (!toggle) {
      return;
    }

    toggle.disabled = isDisabled;

    if (isDisabled) {
      toggle.setAttribute('aria-disabled', 'true');
    } else {
      toggle.removeAttribute('aria-disabled');
    }
  });
}

function hideVideo(video, { resetFrame = true } = {}) {
  if (!video) {
    return;
  }

  video.pause?.();

  if (resetFrame) {
    video.currentTime = 0;
  }

  video.classList.remove('opacity-100');
  video.classList.add('opacity-0');
}

function showVideo(video) {
  if (!video) {
    return;
  }

  video.classList.remove('opacity-0');
  video.classList.add('opacity-100');
}

function getThemeName(isDark) {
  return isDark ? 'dark' : 'light';
}

function getProfileImageSrc(isDark) {
  return PROFILE_MEDIA[getThemeName(isDark)].imageSrc;
}

function hideAllVideos(profileVideos, options) {
  Object.values(profileVideos).forEach((video) => {
    hideVideo(video, options);
  });
}

export function createProfileThemeSwapController({
  root,
  storage,
  profileImage,
  profileVideos = {},
  themeToggles = [],
  setTimeoutFn = globalThis.setTimeout.bind(globalThis),
  clearTimeoutFn = globalThis.clearTimeout.bind(globalThis),
  playTimeoutMs = PROFILE_SWAP_PLAY_TIMEOUT_MS,
  imageSwapDelayMs = PROFILE_SWAP_IMAGE_SWAP_DELAY_MS
}) {
  let isSwapping = false;
  let imageSwapTimeoutId;
  let playTimeoutId;
  let activeVideo = null;
  let handleEnded = null;
  let handleError = null;

  const removeActiveVideoListeners = () => {
    if (!activeVideo) {
      return;
    }

    if (handleEnded) {
      activeVideo.removeEventListener('ended', handleEnded);
      handleEnded = null;
    }

    if (handleError) {
      activeVideo.removeEventListener('error', handleError);
      handleError = null;
    }
  };

  const clearPendingTimeouts = () => {
    if (imageSwapTimeoutId) {
      clearTimeoutFn(imageSwapTimeoutId);
      imageSwapTimeoutId = undefined;
    }

    if (playTimeoutId) {
      clearTimeoutFn(playTimeoutId);
      playTimeoutId = undefined;
    }
  };

  const applyProfileImage = (isDark) => {
    if (!profileImage) {
      return;
    }

    profileImage.src = getProfileImageSrc(isDark);
  };

  const releaseSwapLock = () => {
    clearPendingTimeouts();
    removeActiveVideoListeners();
    hideAllVideos(profileVideos, { resetFrame: false });
    activeVideo = null;
    isSwapping = false;
    setToggleDisabled(themeToggles, false);
  };

  const finishWithoutVideo = (isDark) => {
    applyProfileImage(isDark);
    releaseSwapLock();
  };

  const startVideoSwap = async (isDark) => {
    const themeName = getThemeName(isDark);
    const nextVideo = profileVideos[themeName];

    if (!nextVideo || nextVideo.readyState < VIDEO_READY_STATE_THRESHOLD) {
      finishWithoutVideo(isDark);
      return false;
    }

    activeVideo = nextVideo;
    hideAllVideos(profileVideos);

    try {
      await Promise.race([
        nextVideo.play(),
        new Promise((_, reject) => {
          playTimeoutId = setTimeoutFn(() => {
            const timeoutError = new Error('Video swap start timed out.');
            timeoutError.name = 'TimeoutError';
            reject(timeoutError);
          }, playTimeoutMs);
        })
      ]);
    } catch (error) {
      finishWithoutVideo(isDark);
      return false;
    } finally {
      if (playTimeoutId) {
        clearTimeoutFn(playTimeoutId);
        playTimeoutId = undefined;
      }
    }

    showVideo(nextVideo);

    handleEnded = () => {
      applyProfileImage(isDark);
      releaseSwapLock();
    };

    handleError = () => {
      finishWithoutVideo(isDark);
    };

    nextVideo.addEventListener('ended', handleEnded);
    nextVideo.addEventListener('error', handleError);

    imageSwapTimeoutId = setTimeoutFn(() => {
      applyProfileImage(isDark);
      imageSwapTimeoutId = undefined;
    }, imageSwapDelayMs);

    return true;
  };

  const syncStoredTheme = () => {
    const storedTheme = storage?.getItem('theme');

    if (storedTheme === 'light') {
      root.classList.remove('dark');
    } else if (storedTheme === 'dark') {
      root.classList.add('dark');
    }

    hideAllVideos(profileVideos);
    applyProfileImage(root.classList.contains('dark'));
  };

  const toggleTheme = async () => {
    if (isSwapping) {
      return false;
    }

    root.classList.toggle('dark');
    const isDark = root.classList.contains('dark');
    storage?.setItem('theme', isDark ? 'dark' : 'light');

    if (!profileImage) {
      return true;
    }

    isSwapping = true;
    setToggleDisabled(themeToggles, true);

    await startVideoSwap(isDark);
    return true;
  };

  return {
    syncStoredTheme,
    toggleTheme
  };
}
