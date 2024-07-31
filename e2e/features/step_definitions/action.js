/* eslint-env detox/detox */
import { device, element } from 'detox'
import { DateTime as LxDateTime } from 'luxon'
import {
  DEEP_LINK_APP_NAME,
  DEEP_LINK_NAVIGATION_RETRY,
  DEFAULT_PIN,
  DEFAULT_TIMEOUT,
  LANGUAGES,
} from '../constants/common'

const DATE_MONTH_FORMAT = 'dd MMM'

export const wait = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

export const waitElement = async (componentId) => {
  await waitFor(element(by.id(componentId)))
    .toBeVisible()
    .withTimeout(DEFAULT_TIMEOUT)
}

export const waitElementByText = async (text) => {
  await waitFor(element(by.text(text)))
    .toBeVisible()
    .withTimeout(DEFAULT_TIMEOUT)
}

export const checkIfTextExists = async (text) => {
  try {
    await waitFor(element(by.text(text)))
      .toBeVisible()
      .withTimeout(300)
    return true
  } catch (e) {
    return false
  }
}

export const waitForScreen = async (routeName) => {
  await waitForWithTimeout(`${routeName.toLowerCase()}-screen`, DEFAULT_TIMEOUT)
}
export const waitForWithTimeout = async (id, timeout) => {
  await waitFor(element(by.id(id)))
    .toBeVisible()
    .withTimeout(timeout)
}

export const deepLinkNavigate = async (routeName) => {
  let isSuccessToNavigate = false
  let retryCounter = DEEP_LINK_NAVIGATION_RETRY
  const screenName = routeName.toLowerCase()
  while (!isSuccessToNavigate && retryCounter > 0) {
    retryCounter--
    try {
      await wait(5000)
      // We previously expect user to land on Discover first, so some mechanism is there, i.e. Up-selling modal
      // To keep same logic intact. We go to discover, then navigate away
      console.debug(
        `[${device.id}][DEBUG] [FROM deepLinkNavigate] Given I navigate to discover`,
      )
      await device.openURL({ url: `${DEEP_LINK_APP_NAME}://discover` })
      try {
        console.debug(
          `[${device.id}][DEBUG] [FROM deepLinkNavigate] First time access`,
        )
        await tapById('terms-and-conditions-floating-scroll-label')
        console.debug(
          `[${device.id}][DEBUG] When I tap terms-and-conditions-floating-scroll-label`,
        )
        await tapById('unchecked-terms-and-conditions-consent1-checkbox')
        console.debug(
          `[${device.id}][DEBUG] And I tap unchecked-terms-and-conditions-consent1-checkbox`,
        )
        await tapById('terms-and-conditions-continue-button')
        console.debug(
          `[${device.id}][DEBUG] And I tap terms-and-conditions-continue-button`,
        )
        await tapById('overlay-cancel-button')
        console.debug(`[${device.id}][DEBUG] Then I should see discover`)
        await waitForScreen('discover')
        isSuccessToNavigate = true
      } catch (e) {
        console.debug(
          `[${device.id}][DEBUG] [FROM deepLinkNavigate] After first time access`,
        )
        await tapById('overlay-cancel-button')
        console.debug(`[${device.id}][DEBUG] Then I should see discover`)
        await waitForScreen('discover')
        isSuccessToNavigate = true
      }
      if (screenName !== 'discover') {
        console.debug(
          `[${device.id}][DEBUG] [FROM deepLinkNavigate] Given I navigate to ${screenName}`,
        )
        await device.openURL({ url: `${DEEP_LINK_APP_NAME}://${screenName}` })
        await tapById('overlay-cancel-button')
        console.debug(`[${device.id}][DEBUG] When I tap overlay-cancel-button`)
        console.debug(
          `[${device.id}][DEBUG] Then I should see ${screenName}-screen within ${DEFAULT_TIMEOUT} milliseconds`,
        )
        console.debug(
          `[${device.id}][DEBUG] Navigate to ${screenName} was successfully`,
        )
        isSuccessToNavigate = true
      }
    } catch (e) {
      console.debug(
        `[${
          device.id
        }][ERROR] Could not navigate to ${routeName.toLowerCase()} by ${
          e.message
        } then retry...`,
      )
    }
  }
  if (!isSuccessToNavigate) {
    throw Error(
      `[${device.id}][ERROR] Could not navigate to ${routeName.toLowerCase()}`,
    )
  }
}

export const deepLinkNavigateWithURL = async (screenName, routeName) => {
  let isSuccessToNavigate = false
  let retryCounter = DEEP_LINK_NAVIGATION_RETRY
  while (!isSuccessToNavigate && retryCounter > 0) {
    retryCounter--
    try {
      await wait(5000)
      console.debug(`[${device.id}][DEBUG] Given I navigate to ${screenName}`)
      await device.openURL({ url: `${DEEP_LINK_APP_NAME}://${routeName}` })
      console.debug(
        `[${device.id}][DEBUG] Then I should see ${screenName} within ${DEFAULT_TIMEOUT} milliseconds`,
      )
      console.debug(
        `[${device.id}][DEBUG] Navigate to ${screenName} was successfully`,
      )
      isSuccessToNavigate = true
    } catch (e) {
      console.debug(
        `[${
          device.id
        }][ERROR] Could not navigate to ${routeName.toLowerCase()} by ${
          e.message
        } then retry...`,
      )
    }
  }
  if (!isSuccessToNavigate) {
    throw Error(
      `[${device.id}][ERROR] Could not navigate to ${routeName.toLowerCase()}`,
    )
  }
}

export const shouldSee = async (componentId) => {
  await waitFor(element(by.id(componentId)))
    .toBeVisible()
    .withTimeout(DEFAULT_TIMEOUT)
}
export const shouldNotSee = async (componentId) => {
  await waitFor(element(by.id(componentId)))
    .not.toBeVisible()
    .withTimeout(DEFAULT_TIMEOUT)
}
export const shouldNotSeeWithTimeout = async (componentId, timeout) => {
  let found = true

  try {
    await waitFor(element(by.id(componentId)))
      .toBeVisible()
      .withTimeout(timeout)
  } catch (e) {
    found = false
  }

  if (found) {
    throw Error(`The component ${componentId} is visible`)
  }
}
export const shouldNotSeeText = async (text) => {
  await waitFor(element(by.text(text)))
    .not.toBeVisible()
    .withTimeout(DEFAULT_TIMEOUT)
}
export const shouldSeeWithText = async (componentId, value) => {
  await waitFor(element(by.id(componentId)))
    .toHaveText(value)
    .withTimeout(DEFAULT_TIMEOUT)
}
export const shouldSeeWithTodayDateText = async (componentId, dateFormat) => {
  const pastDate = LxDateTime.now().toFormat(dateFormat)
  await waitFor(element(by.id(componentId)))
    .toHaveText(pastDate)
    .withTimeout(DEFAULT_TIMEOUT)
}
export const shouldSeeWithoutText = async (componentId, value) => {
  await waitFor(element(by.id(componentId)))
    .not.toHaveText(value)
    .withTimeout(DEFAULT_TIMEOUT)
}
export const shouldSeeWithLabel = async (componentId, value) => {
  await waitFor(element(by.id(componentId)))
    .toHaveLabel(value)
    .withTimeout(DEFAULT_TIMEOUT)
}
export const shouldSeeWithDate = async (componentId, days) => {
  /** Check if 'days' is a number */
  if (!days || !TextValidator.isNumber(days)) return

  /** Create new date based from current date + given days */
  const toDate = LxDateTime.now().plus({ days })
  const isWithinTheWeek = DateTime.isWithinTheWeek(new Date(toDate))
  const value = isWithinTheWeek
    ? toDate.toFormat('EEEE')
    : toDate.toFormat(`${DATE_MONTH_FORMAT}, yyyy`)

  await waitFor(element(by.id(componentId)))
    .toHaveText(value)
    .withTimeout(DEFAULT_TIMEOUT)
}
export const shouldSeeWithDateAndPrefix = async (componentId, days, prefix) => {
  /** Check if 'days' is a number */
  if (!days || !TextValidator.isNumber(days)) return

  /** Create new date based from current date + given days with its prefix */
  const toDate = LxDateTime.now().plus({ days })
  const isWithinTheWeek = DateTime.isWithinTheWeek(new Date(toDate))
  const value = isWithinTheWeek
    ? toDate.toFormat('EEEE')
    : toDate.toFormat(`${DATE_MONTH_FORMAT}, yyyy`)

  await waitFor(element(by.id(componentId)))
    .toHaveText(`${prefix} ${value}`)
    .withTimeout(DEFAULT_TIMEOUT)
}

export const shouldSeeWithDateFromNowWithFormatAndPrefix = async (
  componentId,
  days,
  format,
  prefix,
) => {
  await shouldSeeWithDateFromNowWithFormatInUserLanguageAndPrefix(
    componentId,
    days,
    format,
    prefix,
    LANGUAGES.EN,
  )
}

export const shouldSeeWithDateFromNowWithFormatInThaiAndPrefix = async (
  componentId,
  days,
  format,
  prefix,
) => {
  await shouldSeeWithDateFromNowWithFormatInUserLanguageAndPrefix(
    componentId,
    days,
    format,
    prefix,
    LANGUAGES.TH,
  )
}

export const shouldSeeWithDateFromNowWithFormatInUserLanguageAndPrefix = async (
  componentId,
  days,
  format,
  prefix,
  language,
) => {
  const toDate = LxDateTime.now()
    .reconfigure({
      outputCalendar: language === LANGUAGES.TH ? 'buddhist' : 'iso8601',
    })
    .plus({ days })
  const value = toDate.toFormat(format, { locale: language })

  if (!prefix) {
    await waitFor(element(by.id(componentId)))
      .toHaveText(`${value}`)
      .withTimeout(DEFAULT_TIMEOUT)
    return
  }

  await waitFor(element(by.id(componentId)))
    .toHaveText(`${prefix} ${value}`)
    .withTimeout(DEFAULT_TIMEOUT)
}

export const shouldSeeWithValue = async (componentId, value) => {
  await waitFor(element(by.id(componentId)))
    .toHaveValue(value)
    .withTimeout(DEFAULT_TIMEOUT)
}
export const shouldSeeWithoutValue = async (componentId, value) => {
  await waitFor(element(by.id(componentId)))
    .not.toHaveValue(value)
    .withTimeout(DEFAULT_TIMEOUT)
}
// value should be boolean
const shouldSeeWithToggleValue = async (componentId, value) => {
  if (device.getPlatform() === 'android') {
    await expect(element(by.id(componentId))).toHaveValue(value ? '1' : '0')
  } else {
    await expect(element(by.id(componentId))).toHaveToggleValue(value)
  }
}
export const shouldSeeWithToggleValueTrue = async (componentId) => {
  await shouldSeeWithToggleValue(componentId, true)
}
export const shouldSeeWithToggleValueFalse = async (componentId) => {
  await shouldSeeWithToggleValue(componentId, false)
}
export const shouldSeeByText = async (value) => {
  await waitFor(element(by.text(value)))
    .toBeVisible()
    .withTimeout(DEFAULT_TIMEOUT)
}

export const shouldSeeAtLeastOneByText = async (value) => {
  await waitFor(element(by.text(value)).atIndex(0))
    .toBeVisible()
    .withTimeout(DEFAULT_TIMEOUT)
}

export const shouldSeeWithChild = async (parent, child) => {
  await waitFor(element(by.id(parent).withDescendant(by.id(child))))
    .toBeVisible()
    .withTimeout(DEFAULT_TIMEOUT)
}
export const shouldNotSeeWithChild = async (parent, child) => {
  await waitFor(element(by.id(parent).withDescendant(by.id(child))))
    .not.toBeVisible()
    .withTimeout(DEFAULT_TIMEOUT)
}
export const shouldSeeWithChildText = async (parent, childText) => {
  await waitFor(element(by.id(parent).withDescendant(by.text(childText))))
    .toBeVisible()
    .withTimeout(DEFAULT_TIMEOUT)
}
export const shouldSeeWithEitherChildText = async (
  parent,
  childText1,
  childText2,
) => {
  try {
    await element(by.id(parent).withDescendant(by.text(childText1))).tap()
  } catch (e) {
    await element(by.id(parent).withDescendant(by.text(childText2))).tap()
  }
}

export const scrollToElement = async (
  screenId,
  componentId,
  direction,
  startNormalizedPositionX = NaN,
  startNormalizedPositionY = NaN,
  scrollPixel = 120,
) => {
  await waitFor(element(by.id(componentId)))
    .toBeVisible()
    .whileElement(by.id(screenId))
    .scroll(
      scrollPixel,
      direction,
      startNormalizedPositionX,
      startNormalizedPositionY,
    )
}

export const scrollToElementWithVisiblePercent = async (
  screenId,
  componentId,
  direction,
  startNormalizedPositionX = NaN,
  startNormalizedPositionY = NaN,
  scrollPixel = 120,
  visiblePercent,
) => {
  await waitFor(element(by.id(componentId)))
    .toBeVisible(visiblePercent)
    .whileElement(by.id(screenId))
    .scroll(
      scrollPixel,
      direction,
      startNormalizedPositionX,
      startNormalizedPositionY,
    )
}

export const shouldSeeWithVisiblePercent = async (
  componentId,
  percentVisible,
) => {
  await waitFor(element(by.id(componentId)))
    .toBeVisible(percentVisible)
    .withTimeout(DEFAULT_TIMEOUT)
}

export const scrollToElementText = async (
  scrollViewId,
  text,
  direction,
  scrollPixel = 120,
  startNormalizedPositionX = NaN,
  startNormalizedPositionY = NaN,
) => {
  if (isNaN(scrollPixel)) {
    scrollPixel = 120
  }
  await waitFor(element(by.text(text)))
    .toBeVisible()
    .whileElement(by.id(scrollViewId))
    .scroll(
      scrollPixel,
      direction,
      startNormalizedPositionX,
      startNormalizedPositionY,
    )
}
export const scrollToElementWithCenterYPoint = async (
  screenId,
  componentId,
  direction,
  startNormalizedPositionX = NaN,
  startNormalizedPositionY = 0.5,
  scrollPixel = 160,
) => {
  await waitFor(element(by.id(componentId)))
    .toBeVisible()
    .whileElement(by.id(screenId))
    .scroll(
      scrollPixel,
      direction,
      startNormalizedPositionX,
      startNormalizedPositionY,
    )
}

export const swipeDown = async (scrollViewId) => {
  await waitElement(scrollViewId)
  try {
    await element(by.id(scrollViewId)).swipe('down', 'fast', 0.75, 0.5, 0.5)
  } catch (e) {
    console.warn('Cannot swipe down more.')
  }
}
export const swipeRight = async (scrollViewId) => {
  await waitElement(scrollViewId)
  try {
    await element(by.id(scrollViewId)).swipe('right', 'fast', 0.75)
  } catch (e) {
    console.warn('Cannot swipe right more.')
  }
}
export const swipeLeft = async (scrollViewId) => {
  await waitElement(scrollViewId)
  try {
    await element(by.id(scrollViewId)).swipe('left', 'fast', 0.75)
  } catch (e) {
    console.warn('Cannot swipe right more.')
  }
}

export const swipeTo = async (scrollViewId, direction) => {
  await waitElement(scrollViewId)
  try {
    await element(by.id(scrollViewId)).swipe(direction, 'fast', 1)
  } catch (e) {
    console.warn('Cannot swipe more.')
  }
}

export const scrollPlatform = async (
  scrollViewId,
  startNormalizedPositionY,
  componentId,
) => {
  if (device.getPlatform() === 'android') {
    await swipeTo(scrollViewId, 'up')
  } else {
    await scrollToElement(
      scrollViewId,
      componentId,
      'down',
      NaN,
      startNormalizedPositionY,
    )
  }
}

export const swipeUp = async (scrollViewId, percentage) => {
  await waitElement(scrollViewId)
  try {
    await element(by.id(scrollViewId)).swipe('up', 'slow', percentage)
  } catch (e) {
    console.warn('Cannot swipe down more.')
  }
}

export const scrollToPixel = async (
  scrollViewId,
  scrollPixel,
  edge,
  startNormalizedPositionX = NaN,
  startNormalizedPositionY = NaN,
) => {
  await waitElement(scrollViewId)
  try {
    await element(by.id(scrollViewId)).scroll(
      scrollPixel,
      edge,
      startNormalizedPositionX,
      startNormalizedPositionY,
    )
  } catch (e) {
    console.warn(
      'Cannot scroll down more. It might be the bottom of the screen.',
    )
  }
}

export const scrollToEdge = async (scrollViewId, edge) => {
  await waitElement(scrollViewId)
  await element(by.id(scrollViewId)).scrollTo(edge)
}

export const typeText = async (value, componentId) => {
  await waitElement(componentId)
  await element(by.id(componentId)).typeText(value)
  await element(by.id(componentId)).tapReturnKey()
}

export const typeTextWithOutHidingKeyboard = async (value, componentId) => {
  await waitElement(componentId)
  await element(by.id(componentId)).typeText(value)
}

export const typeTextSlowly = async (value, componentId) => {
  await waitElement(componentId)
  for (let i = 0; i < value.length; i++) {
    await element(by.id(componentId)).typeText(value[i])
    await wait(200)
  }
  await element(by.id(componentId)).tapReturnKey()
}

export const replaceText = async (value, componentId) => {
  await waitElement(componentId)
  await element(by.id(componentId)).replaceText(value)
}

export const replaceTextAndPressReturn = async (value, componentId) => {
  await waitElement(componentId)
  const el = await element(by.id(componentId))
  await el.replaceText(value)
  await el.tapReturnKey()
}

export const findTextAndReplace = async (currentText, newText) => {
  if (!(await checkIfTextExists(newText))) {
    await element(by.text(currentText)).replaceText(newText)
  }
}

export const tapById = async (componentId, position = null) => {
  await waitElement(componentId)
  if (position) await element(by.id(componentId)).tap(position)
  else {
    await element(by.id(componentId)).tap()
  }
}
export const tapByIdAtIndex = async (componentId, index) => {
  await waitFor(element(by.id(componentId)).atIndex(index))
    .toBeVisible()
    .withTimeout(DEFAULT_TIMEOUT)

  await element(by.id(componentId)).atIndex(index).tap()
}

export const tapByText = async (text) => {
  await waitElementByText(text)
  await element(by.text(text)).tap()
}

export const tapByLabel = async (label) => {
  // await waitElementByText(text);
  await element(by.label(label)).tap()
}

export const tapByTextOnIosAlertMessage = async (text) => {
  await waitElementByText(text)
  await element(
    by.label(text).and(by.type('_UIAlertControllerActionView')),
  ).tap()
}

export const enterPIN = async (pins) => {
  const pinArray = (pins || DEFAULT_PIN).split('')
  await device.disableSynchronization()
  for (let i = 0; i < pinArray.length; i++) {
    await tapById(`pin-${pinArray[i]}-button`)
  }
  await device.enableSynchronization()
}

export const setupPINAndSkipBiometricActivation = async (pins) => {
  await waitElement('pin-overlay')
  console.debug(`[${device.id}][DEBUG] When I enter PIN : ${pins}`)
  await enterPIN(pins)
  await wait(1000)
  console.debug(`[${device.id}][DEBUG] When I confirm PIN : ${pins}`)
  await enterPIN(pins)
  await waitElement('activate-biometric-overlay')
  await element(by.id('overlay-activate-later-button')).tap()
}

export const setupPINAndBiometricActivation = async (pins) => {
  await waitElement('pin-overlay')
  console.debug(`[${device.id}][DEBUG] When I enter PIN : ${pins}`)
  await enterPIN(pins)
  await wait(1000)
  console.debug(`[${device.id}][DEBUG] When I confirm PIN : ${pins}`)
  await enterPIN(pins)
  await waitElement('activate-biometric-overlay')
  await device.setBiometricEnrollment(false)
  await device.setBiometricEnrollment(true)
  await element(by.id('overlay-activate-biometric-button')).tap()
  await tapByText('Pass')
}

export const allowPermission = async (services) => {
  const serviceMap = mapPermissionServices(services, true)
  await device.launchApp({ permissions: serviceMap })
}

export const denyPermission = async (services) => {
  const serviceMap = mapPermissionServices(services, false)
  await device.launchApp({ permissions: serviceMap })
}

export const mapPermissionServices = (services, isAllow) => {
  const list = services.replace(/\s/g, '').toLowerCase().split(',')
  let serviceMap = {}
  for (const item of list) {
    serviceMap[item] = isAllow ? 'YES' : 'NO'
  }
  /**
   * Return sample:
   * {
   *    camera: "YES",
   *    notifications: "YES",
   *    photos: "YES",
   * }
   */
  return serviceMap
}

export const setDeviceTimezone = async (timezone) => {
  if (device.getPlatform() === 'android') {
    const adbName = device.deviceDriver.adbName
    await device.deviceDriver.adb.adbCmd(
      adbName,
      `shell service call alarm 3 s16 ${timezone}`,
    )
  } else {
    // todo: for iOS
  }
}

// Set Android's security PIN. Requires before enabling fingerprint
// https://stackoverflow.com/questions/56133153/how-to-set-fingerprint-lock-screen-from-adb
export const androidSetPin = async () => {
  if (device.getPlatform() === 'android') {
    const adbName = device.deviceDriver.adbName
    await device.deviceDriver.adb.shell(adbName, 'locksettings set-pin 1111')
  }
}
export const androidRemovePin = async () => {
  if (device.getPlatform() === 'android') {
    const adbName = device.deviceDriver.adbName
    await device.deviceDriver.adb.shell(
      adbName,
      'locksettings clear --old 1111',
    )
  }
}
export const androidGoToSettingsAppSecurity = async () => {
  if (device.getPlatform() === 'android') {
    const adbName = device.deviceDriver.adbName
    await device.deviceDriver.adb.shell(
      adbName,
      'am start -a android.settings.SECURITY_SETTINGS',
    )
    await wait(5000)
  }
}
export const androidEnrollFingerprint1 = async () => {
  if (device.getPlatform() === 'android') {
    const adbName = device.deviceDriver.adbName
    // assuming
    // Tap the Fingerprint item
    // await device.deviceDriver.adb.shell(adbName, "input tap 274 1469");
    console.debug('Tap Fingerprint')
    await device.deviceDriver.adb.shell(adbName, 'input tap 324 783')
    // Tap Fingerprint + PIN option
    console.debug('Tap Fingerprint + PIN')
    await device.deviceDriver.adb.shell(adbName, 'input tap 324 609')
    // // Enter the passcode in the confirmation screen
    console.debug('Enter PIN')
    await device.deviceDriver.adb.shell(adbName, 'input text 1111')
    await device.deviceDriver.adb.shell(adbName, 'input keyevent 66')
    // Tap the Next button
    console.debug('Tap the Next button')
    await device.deviceDriver.adb.shell(adbName, 'input tap 903 1935')

    await device.deviceDriver.adb.adbCmd(adbName, 'emu finger touch 1')
    await wait(1000)
    await device.deviceDriver.adb.adbCmd(adbName, 'emu finger touch 1')
    await wait(1000)
    await device.deviceDriver.adb.adbCmd(adbName, 'emu finger touch 1')
    await wait(1000)

    // Tap the Done button
    console.debug('Tap the Done button')
    await device.deviceDriver.adb.shell(adbName, 'input tap 903 1935')
  }
}

export const androidUnEnrollAllFingerprint = async () => {
  if (device.getPlatform() === 'android') {
    const adbName = device.deviceDriver.adbName
    // assuming
    // Tap the Fingerprint item
    // await device.deviceDriver.adb.shell(adbName, "input tap 274 1469");
    console.debug('Tap Fingerprint')
    await device.deviceDriver.adb.shell(adbName, 'input tap 324 783')

    console.debug('Enter PIN')
    await device.deviceDriver.adb.shell(adbName, 'input text 1111')
    await device.deviceDriver.adb.shell(adbName, 'input keyevent 66')

    console.debug('Tap Trash icon')
    await device.deviceDriver.adb.shell(adbName, 'input tap 993 297')

    console.debug('Tap YES, REMOVE')
    await device.deviceDriver.adb.shell(adbName, 'input tap 795 1196')
    await device.pressBack()

    // Tap the Done button
    console.debug('Tap the Done button')
    await device.deviceDriver.adb.shell(adbName, 'input tap 903 1935')
  }
}
// Changing Android Device orientation with ADB
// https://stackoverflow.com/questions/25864385/changing-android-device-orientation-with-adb/43093208#43093208
export const androidRotateScreen = async (orientation) => {
  if (device.getPlatform() === 'android') {
    const adbName = device.deviceDriver.adbName
    await device.deviceDriver.adb.shell(
      adbName,
      'settings put system accelerometer_rotation 0',
    )
    await device.deviceDriver.adb.shell(
      adbName,
      `settings put system user_rotation ${
        orientation === 'landscape' ? 1 : 0
      }`,
    )
  }
}

export const shouldSeeFocusedElement = async (elementId) => {
  await waitElement(elementId)
  // toBeFocused() can be called after expect() only
  await expect(element(by.id(elementId))).toBeFocused()
}

export const shouldSeeNotFocusedElement = async (elementId) => {
  await waitElement(elementId)
  // toBeFocused() can be called after expect() only
  await expect(element(by.id(elementId))).not.toBeFocused()
}

// TODO : Find the way to check state from the input element directly
export const shouldSeeErrorStateOfElement = async (elementId) => {
  await waitElement(`error-${elementId}-container`)
}

// TODO : Find the way to check state from the input element directly
export const shouldSeeDisableStateOfElement = async (elementId) => {
  await waitElement(`disabled-${elementId}-container`)
}

export const shouldSeeGreetingTextByTime = async (value) => {
  let greetingTextId = ''
  let greetings = ''

  const currentHours = LxDateTime.now().hour
  if (currentHours >= 0 && currentHours < 12) {
    greetingTextId = 'greeting-text-morning'
    greetings = `Good morning, ${value}`
  } else if (currentHours >= 12 && currentHours < 16) {
    greetingTextId = 'greeting-text-afternoon'
    greetings = `Good afternoon, ${value}`
  } else if (currentHours >= 16 && currentHours < 21) {
    greetingTextId = 'greeting-text-evening'
    greetings = `Good evening, ${value}`
  } else {
    greetingTextId = 'greeting-text-night'
    greetings = `Good night, ${value}`
  }

  await waitFor(element(by.id(greetingTextId)))
    .toHaveText(greetings)
    .withTimeout(DEFAULT_TIMEOUT)
}

/**
 * Helper Functions
 */
const TextValidator = {
  isNumber: (text) => {
    return /^\d+$/.test(text)
  },
}
const DateTime = {
  isWithinTheWeek: (date) => {
    const oneWeek = 6048e5
    const oneWeekFromNow = new Date(Date.now() + oneWeek)
    const dueDate = new Date(date)
    return dueDate < oneWeekFromNow
  },
}
