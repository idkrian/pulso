export const APP_TZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

const formatters = new Map<string, Intl.DateTimeFormat>();

const getFormatter = (
  locale: string,
  opts: Intl.DateTimeFormatOptions,
): Intl.DateTimeFormat => {
  const key = `${locale}|${JSON.stringify(opts)}`;
  const cached = formatters.get(key);
  if (cached) return cached;

  const formatter = new Intl.DateTimeFormat(locale, opts);
  formatters.set(key, formatter);
  return formatter;
};

export const dayKey = (d: Date | string, tz: string = APP_TZ): string =>
  getFormatter("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(d));

export const isSameDay = (a: Date | string, b: Date | string): boolean =>
  dayKey(a) === dayKey(b);

export const todayKey = (): string => dayKey(new Date());

export const formatDate = (
  d: Date | string,
  opts: Intl.DateTimeFormatOptions,
  locale = "en-US",
): string =>
  getFormatter(locale, { timeZone: APP_TZ, ...opts }).format(new Date(d));
