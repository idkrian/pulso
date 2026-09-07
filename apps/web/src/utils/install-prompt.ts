const STORAGE_KEY = "pulso:install-prompt";
const CURRENT_VERSION = 1;
const FIRST_SNOOZE_MS = 14 * 24 * 60 * 60 * 1000;
const LONG_SNOOZE_MS = 90 * 24 * 60 * 60 * 1000;

export interface InstallPromptState {
  version: number;
  dismissedAt: number;
  dismissCount: number;
}

export const readInstallPrompt = (): InstallPromptState | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const stored = JSON.parse(raw) as InstallPromptState;
    if (stored.version !== CURRENT_VERSION) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return stored;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

export const saveInstallDismissal = (previous: InstallPromptState | null) => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: CURRENT_VERSION,
        dismissedAt: Date.now(),
        dismissCount: (previous?.dismissCount ?? 0) + 1,
      }),
    );
  } catch {
    return;
  }
};

export const clearInstallPrompt = () => localStorage.removeItem(STORAGE_KEY);

export const shouldShowInstallBanner = (
  state: InstallPromptState | null,
): boolean => {
  if (!state) return true;

  const snooze = state.dismissCount >= 2 ? LONG_SNOOZE_MS : FIRST_SNOOZE_MS;
  return Date.now() - state.dismissedAt > snooze;
};
