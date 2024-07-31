export const DEEP_LINK_APP_NAME = 'app_name'
export const DEFAULT_TIMEOUT = process.env.DEFAULT_TIMEOUT
  ? Number(process.env.DEFAULT_TIMEOUT)
  : 30000
export const LANGUAGES = {
  EN: 'en',
  TH: 'th',
}
export const TIMEZONE = {
  Bangkok: 'Asia/Bangkok',
  HongKong: 'Asia/Hong_Kong',
}
export const TIMEZONE_OFFSET = {
  Bangkok: '+0700',
  HongKong: '+0800',
}

export const DEFAULT_DATE_FORMAT = 'dd/MM/yyyy'
export const DATE_SPACED_FORMAT = 'dd / MM / yyyy'
export const DATE_DASHED_FORMAT = 'yyyy-MM-dd'
export const DATE_MEDIUM_FORMAT = 'dd MMM yyyy'
export const DEEP_LINK_NAVIGATION_RETRY = 5

export const DEFAULT_PIN = '123456'
