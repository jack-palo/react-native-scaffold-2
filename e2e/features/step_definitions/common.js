/* eslint-env detox/detox */
import { Given, Then, When } from '@cucumber/cucumber'
import { device, element, expect } from 'detox'
import { DateTime as LxDateTime } from 'luxon'
import {
  DATE_DASHED_FORMAT,
  DATE_SPACED_FORMAT,
  DEFAULT_DATE_FORMAT,
  DEFAULT_TIMEOUT,
  TIMEZONE,
} from '../constants/common'
import {
  allowPermission,
  androidRotateScreen,
  checkIfTextExists,
  deepLinkNavigate,
  deepLinkNavigateWithURL,
  denyPermission,
  enterPIN,
  findTextAndReplace,
  mapPermissionServices,
  replaceText,
  replaceTextAndPressReturn,
  scrollPlatform,
  scrollToEdge,
  scrollToElement,
  scrollToElementText,
  scrollToElementWithCenterYPoint,
  scrollToElementWithVisiblePercent,
  scrollToPixel,
  setDeviceTimezone,
  setupPINAndSkipBiometricActivation as setupPINAndSkipActivatingBiometric,
  shouldNotSee,
  shouldNotSeeText,
  shouldNotSeeWithChild,
  shouldNotSeeWithTimeout,
  shouldSee,
  shouldSeeAtLeastOneByText,
  shouldSeeByText,
  shouldSeeDisableStateOfElement,
  shouldSeeErrorStateOfElement,
  shouldSeeFocusedElement,
  shouldSeeGreetingTextByTime,
  shouldSeeNotFocusedElement,
  shouldSeeWithChild,
  shouldSeeWithChildText,
  shouldSeeWithDate,
  shouldSeeWithDateAndPrefix,
  shouldSeeWithDateFromNowWithFormatAndPrefix,
  shouldSeeWithDateFromNowWithFormatInThaiAndPrefix,
  shouldSeeWithEitherChildText,
  shouldSeeWithLabel,
  shouldSeeWithText,
  shouldSeeWithTodayDateText,
  shouldSeeWithToggleValueFalse,
  shouldSeeWithToggleValueTrue,
  shouldSeeWithValue,
  shouldSeeWithVisiblePercent,
  shouldSeeWithoutText,
  shouldSeeWithoutValue,
  swipeDown,
  swipeLeft,
  swipeRight,
  swipeTo,
  swipeUp,
  tapById,
  tapByIdAtIndex,
  tapByLabel,
  tapByText,
  tapByTextOnIosAlertMessage,
  typeText,
  typeTextSlowly,
  typeTextWithOutHidingKeyboard,
  wait,
  waitElement,
  waitElementByText,
  waitForScreen,
} from './action'

const OVERSCROLL_PIXEL_MARGIN = 50
const OVERSCROLL_PIXEL_MARGIN_HALF = OVERSCROLL_PIXEL_MARGIN / 2
const CURRENT_DATE = () => {
  return LxDateTime.now()
}
let datePickerMinimumDate = null // LxDateTime
let datePickerMaximumDate = null // LxDateTime

// ------ screen stuffs ------
Given('I launch the app', () => {}) // do nothing
Given('I visit {string} screen', deepLinkNavigate)
When('I go to {string} with url {string}', async (screenName, routeName) => {
  await deepLinkNavigateWithURL(screenName, routeName)
})

Given('I am on {string} screen', waitForScreen)

// ------ permission ------
/**
 * calendar=YES|NO
 * camera=YES|NO
 * contacts=YES|NO
 * health=YES|NO
 * homekit=YES|NO
 * location=always|inuse|never --> might need to create a different action for this
 * medialibrary=YES|NO
 * microphone=YES|NO
 * motion=YES|NO
 * notifications=YES|NO
 * photos=YES|NO
 * reminders=YES|NO
 * siri=YES|NO
 *
 * ** Reference: https://github.com/wix/AppleSimulatorUtils
 * ** Note: separate services using comma
 *      example: Given I allow permission to "calendar, camera, photos"
 */
Given('I allow permission to {string}', allowPermission)
Given('I deny permission to {string}', denyPermission)

When(
  'I wait {int} seconds until I see {string}',
  async (seconds, componentId) => {
    await waitFor(element(by.id(componentId)))
      .toBeVisible()
      .withTimeout(seconds * 1000 + DEFAULT_TIMEOUT)
  },
)

// ------ scroll to edge ------
/**
 * edge—the edge to scroll to (valid input: "left"/"right"/"top"/"bottom")
 */
When('I scroll {string} to {string}', scrollToEdge)
When('I scroll {string} to the top', async (scrollViewId) => {
  await scrollToEdge(scrollViewId, 'top')
})
When('I scroll {string} to the bottom', async (scrollViewId) => {
  // WARNING ! May not work properly on Android
  await scrollToEdge(scrollViewId, 'bottom')
})
When('I scroll {string} to the rightmost', async (scrollViewId) => {
  await scrollToEdge(scrollViewId, 'right')
})
When('I scroll {string} to the leftmost', async (scrollViewId) => {
  await scrollToEdge(scrollViewId, 'left')
})
When(
  'I scrollWithCenterYPoint {string} down until I see {string}',
  async (scrollViewId, componentId) => {
    await scrollToElementWithCenterYPoint(scrollViewId, componentId, 'down')
  },
)

// ------ scroll to element ------
/**
 * Scroll down until element come into view
 */
When(
  'I scroll {string} down until I see {string}',
  async (scrollViewId, componentId) => {
    await scrollToElement(scrollViewId, componentId, 'down', NaN, 0.3)
  },
)
When(
  'I scroll {string} down until I see {string} with some margin',
  async (scrollViewId, componentId) => {
    await scrollToElement(scrollViewId, componentId, 'down', NaN, 0.3)
    await scrollToPixel(scrollViewId, OVERSCROLL_PIXEL_MARGIN, 'down', NaN, 0.3)
  },
)
When('I swipe {string} down for pull refresh', async (scrollViewId) => {
  await swipeDown(scrollViewId)
})
When('I swipe {string} right', async (scrollViewId) => {
  await swipeRight(scrollViewId)
})
When('I swipe {string} left', async (scrollViewId) => {
  await swipeLeft(scrollViewId)
})
When('I swipe {string} to the bottom', async (scrollViewId) => {
  await swipeTo(scrollViewId, 'up')
})
When(
  'I swipe {string} up {float} percent',
  async (scrollViewId, percentage) => {
    await swipeUp(scrollViewId, percentage)
  },
)
When(
  'I scroll {string} up until I see {string} with some margin',
  async (scrollViewId, componentId) => {
    await scrollToElement(scrollViewId, componentId, 'up', NaN, 0.3)
    await scrollToPixel(scrollViewId, OVERSCROLL_PIXEL_MARGIN, 'up', NaN, 0.3)
  },
)

/**
 * Scroll down with start normalized Y until element come into view
 * This will prevent to hit the bottom button of screen
 */
When(
  'I scroll {string} down with start normalized position y is {float} until I see {string}',
  async (scrollViewId, startNormalizedPositionY, componentId) => {
    await scrollToElement(
      scrollViewId,
      componentId,
      'down',
      NaN,
      startNormalizedPositionY,
    )
  },
)
When(
  'I scroll {string} down with start normalized position y is {float} until I see {string} with some margin',
  async (scrollViewId, startNormalizedPositionY, componentId) => {
    await scrollToElement(
      scrollViewId,
      componentId,
      'down',
      NaN,
      startNormalizedPositionY,
    )
    await scrollToPixel(
      scrollViewId,
      OVERSCROLL_PIXEL_MARGIN,
      'down',
      NaN,
      startNormalizedPositionY,
    )
  },
)
When(
  'I scroll {string} down with start normalized position y is {float} until I see {string} with {float} margin',
  async (scrollViewId, startNormalizedPositionY, componentId, margin) => {
    await scrollToElement(
      scrollViewId,
      componentId,
      'down',
      NaN,
      startNormalizedPositionY,
    )
    await scrollToPixel(
      scrollViewId,
      margin,
      'down',
      NaN,
      startNormalizedPositionY,
    )
  },
)
When(
  'I scroll {string} down with start normalized position y is {float} until I see {string} for each platform',
  async (scrollViewId, startNormalizedPositionY, componentId) => {
    await scrollPlatform(scrollViewId, startNormalizedPositionY, componentId)
  },
)
When(
  'I scroll {string} {string} {int} pixels where Y position starts from {float}',
  async (scrollViewId, direction, pixels, startingYPosition) => {
    try {
      await element(by.id(scrollViewId)).scroll(
        pixels,
        direction,
        NaN,
        startingYPosition,
      )
    } catch (e) {
      console.error(e)
    }
  },
)

// Ultimate pull down to refresh if you want to swipe from a starting y position
When(
  'I swipe {string} down with start normalized position y is {float} for pull refresh',
  async (scrollViewId, normalizedStartingPositionY) => {
    await waitElement(scrollViewId)
    try {
      await element(by.id(scrollViewId)).swipe(
        'down',
        'fast',
        0.75,
        0.5,
        normalizedStartingPositionY,
      )
    } catch (e) {
      console.warn('Cannot swipe down more.')
    }
  },
)

// Ultimate scrolling action, if you want to scroll X pixels
When(
  'I scroll {string} {string} {int} pixels where the normalized starting position is {float}',
  async (scrollViewId, direction, pixels, normalizedStartingPosition) => {
    try {
      if (direction === 'left' || direction === 'right') {
        await element(by.id(scrollViewId)).scroll(
          pixels,
          direction,
          normalizedStartingPosition,
          NaN,
        )
      } else if (direction === 'up' || direction === 'down') {
        await element(by.id(scrollViewId)).scroll(
          pixels,
          direction,
          NaN,
          normalizedStartingPosition,
        )
      }
    } catch (e) {
      console.error(e)
    }
  },
)

// Ultimate scrolling action, if you want to scroll until you see a component
When(
  'I scroll {string} {string} where the normalized starting position is {float} until I see {string}',
  async (scrollViewId, direction, normalizedStartingPosition, componentId) => {
    try {
      if (direction === 'left' || direction === 'right') {
        await scrollToElement(
          scrollViewId,
          componentId,
          direction,
          normalizedStartingPosition,
          NaN,
        )
      } else if (direction === 'up' || direction === 'down') {
        await scrollToElement(
          scrollViewId,
          componentId,
          direction,
          NaN,
          normalizedStartingPosition,
        )
      }
    } catch (e) {
      console.error(e)
    }
  },
)

/**
 * Scroll up with start normalized Y until element come into view
 * This will prevent to hit the top  screen
 */
When(
  'I scroll {string} up with start normalized position y is {float} until I see {string}',
  async (scrollViewId, startNormalizedPositionY, componentId) => {
    await scrollToElement(
      scrollViewId,
      componentId,
      'up',
      NaN,
      startNormalizedPositionY,
    )
  },
)
When(
  'I scroll {string} up with start normalized position y is {float} until I see {string} with some margin',
  async (scrollViewId, startNormalizedPositionY, componentId) => {
    await scrollToElement(
      scrollViewId,
      componentId,
      'up',
      NaN,
      startNormalizedPositionY,
    )
    await scrollToPixel(
      scrollViewId,
      OVERSCROLL_PIXEL_MARGIN_HALF,
      'up',
      NaN,
      startNormalizedPositionY,
    )
  },
)

/**
 * Scroll right (horizontal) until element come into view
 */
When(
  'I scroll {string} right until I see {string}',
  async (scrollViewId, componentId) => {
    await scrollToElement(scrollViewId, componentId, 'right')
  },
)
When(
  'I scroll {string} right until I see {string} with some margin',
  async (scrollViewId, componentId) => {
    await scrollToElement(scrollViewId, componentId, 'right')
    await scrollToPixel(scrollViewId, OVERSCROLL_PIXEL_MARGIN_HALF, 'right')
  },
)
When(
  'I scroll {string} right until I see {string} with {int} pixels',
  async (scrollViewId, componentId, scrollPixel) => {
    await scrollToElement(
      scrollViewId,
      componentId,
      'right',
      NaN,
      NaN,
      scrollPixel,
    )
  },
)

/**
 * Scroll left (horizontal) until element come into view
 */
When(
  'I scroll {string} left until I see {string}',
  async (scrollViewId, componentId) => {
    await scrollToElement(scrollViewId, componentId, 'left')
  },
)
When(
  'I scroll {string} left until I see {string} with some margin',
  async (scrollViewId, componentId) => {
    await scrollToElement(scrollViewId, componentId, 'left')
    await scrollToPixel(scrollViewId, OVERSCROLL_PIXEL_MARGIN_HALF, 'left')
  },
)

/**
 * Scroll up until element come into view
 */
When(
  'I scroll {string} up until I see {string}',
  async (scrollViewId, componentId) => {
    await scrollToElement(scrollViewId, componentId, 'up', NaN, 0.3)
  },
)

/**
 * Scroll down until text come into view
 */
When(
  'I scroll {string} down until I see {string} text',
  async (scrollViewId, text) => {
    await scrollToElementText(scrollViewId, text, 'down')
  },
)
When(
  'I scroll {string} down until I see {string} text with some margin',
  async (scrollViewId, text) => {
    await scrollToElementText(scrollViewId, text, 'down', NaN, 0.7)
    await scrollToPixel(scrollViewId, OVERSCROLL_PIXEL_MARGIN, 'down', NaN, 0.7)
  },
)
When(
  'I scroll {string} down with start normalized position y is {float} until I see {string} text with some margin',
  async (scrollViewId, startNormalizedPositionY, text) => {
    await scrollToElementText(
      scrollViewId,
      text,
      'down',
      NaN,
      NaN,
      startNormalizedPositionY,
    )
    await scrollToPixel(
      scrollViewId,
      OVERSCROLL_PIXEL_MARGIN,
      'down',
      NaN,
      startNormalizedPositionY,
    )
  },
)
When(
  'I scroll {string} down with start normalized position x is {float} until I see {string}',
  async (scrollViewId, startNormalizedPositionX, componentId) => {
    await scrollToElementWithVisiblePercent(
      scrollViewId,
      componentId,
      'down',
      startNormalizedPositionX,
      0.3,
      120,
      20,
    )
  },
)
/**
 * Scroll right (horizontal) until text come into view
 */
When(
  'I scroll {string} right until I see {string} text',
  async (scrollViewId, text) => {
    await scrollToElementText(scrollViewId, text, 'right')
  },
)
/**
 * Scroll left (horizontal) until text come into view
 */
When(
  'I scroll {string} left until I see {string} text',
  async (scrollViewId, text) => {
    await scrollToElementText(scrollViewId, text, 'left')
  },
)
/**
 * Scroll up until text come into view
 */
When(
  'I scroll {string} up until I see {string} text',
  async (scrollViewId, text) => {
    await scrollToElementText(scrollViewId, text, 'up', NaN, 0.3)
  },
)
/**
 * Scroll down until checkbox come into view
 */
When(
  'I scroll {string} down until I see {string} unchecked checkbox',
  async (screenId, componentId) => {
    await scrollToElement(
      screenId,
      `unchecked-${componentId}`,
      'down',
      NaN,
      0.7,
    )
  },
)

// ------ Scroll with Pixel ------
When(
  'I scroll {string} down {int} pixels',
  async (scrollViewId, scrollPixel) => {
    await scrollToPixel(scrollViewId, scrollPixel, 'down', NaN, 0.7)
  },
)

When('I scroll {string} up {int} pixels', async (scrollViewId, scrollPixel) => {
  await scrollToPixel(scrollViewId, scrollPixel, 'down', NaN, 0.7)
})

// ------ tapping / typing ------
/**
 * component can be button or touchable
 */
When('I tap {string}', async (testId) => {
  await tapById(testId)
})

When('I tap text {string}', tapByText)

When('I tap label {string}', tapByLabel)

When('I tap text {string} on ios alert message', tapByTextOnIosAlertMessage)

When('I tap the item number {int} of {string}', async (number, componentId) =>
  tapByIdAtIndex(componentId, number - 1),
)

When('I type {string} into {string}', typeText)
When('I type {string} into {string} slowly', typeTextSlowly)
When(
  'I type {string} into {string} without hiding keyboard',
  typeTextWithOutHidingKeyboard,
)

When('I put {string} into {string}', replaceText)
When('I put {string} into {string} and press return', replaceTextAndPressReturn)

When('I tap return on {string}', async (componentId) => {
  await waitElement(componentId)
  await element(by.id(componentId)).tapReturnKey()
})

// ------ visibility ------

Then(
  'I should see greeting text with name {string}',
  shouldSeeGreetingTextByTime,
)

Then('I should see text {string}', shouldSeeByText)

Then('I should see text {string} at least once', shouldSeeAtLeastOneByText)

Then('I see {string}', shouldSee)

Then(
  'I see {string} with {int} percent of visibility',
  shouldSeeWithVisiblePercent,
)

Then('I should see {string}', shouldSee)

Then('I should not see {string}', shouldNotSee)

Then('I should not see {string} at all', async (componentId) =>
  shouldNotSeeWithTimeout(componentId, 5000),
)

Then('I should not see text {string}', shouldNotSeeText)

Then('I should see {string} with text {string}', shouldSeeWithText)
Then(
  'I should see {string} with today date in format {string}',
  shouldSeeWithTodayDateText,
)
Then('I should see {string} without text {string}', shouldSeeWithoutText)

Then('I should see {string} with value {string}', shouldSeeWithValue)
Then('I should see {string} without value {string}', shouldSeeWithoutValue)
Then(
  'I should see {string} with toggle value true',
  shouldSeeWithToggleValueTrue,
)
Then(
  'I should see {string} with toggle value false',
  shouldSeeWithToggleValueFalse,
)

Then('I should see {string} with label {string}', shouldSeeWithLabel)

Then(
  'I should see {string} with date {string} days from now',
  shouldSeeWithDate,
)
Then(
  'I should see {string} with date {string} days from now and prefix of {string}',
  shouldSeeWithDateAndPrefix,
)
Then(
  'I should see {string} with date {int} days from now with format {string}',
  (componentId, days, format) =>
    shouldSeeWithDateFromNowWithFormatAndPrefix(componentId, days, format, ''),
)
Then(
  'I should see {string} with date {int} days from now with format {string} in Thai',
  (componentId, days, format) =>
    shouldSeeWithDateFromNowWithFormatInThaiAndPrefix(
      componentId,
      days,
      format,
      '',
    ),
)
Then(
  'I should see {string} with date {int} days from now with format {string} and prefix of {string}',
  shouldSeeWithDateFromNowWithFormatAndPrefix,
)
Then(
  'I should see {string} with date {int} days from now with format {string} in Thai and prefix of {string}',
  shouldSeeWithDateFromNowWithFormatInThaiAndPrefix,
)

Then('I should see {string} with child {string}', shouldSeeWithChild)
Then('I should not see {string} with child {string}', shouldNotSeeWithChild)
Then('I should see {string} with child text {string}', shouldSeeWithChildText)
Then(
  'I should see {string} with child text either {string} or {string}',
  shouldSeeWithEitherChildText,
)

Then('I should see {string} at index {int}', async (componentId, index) => {
  await waitFor(element(by.id(componentId)).atIndex(index))
    .toBeVisible()
    .withTimeout(DEFAULT_TIMEOUT)
})
Then(
  'I should see {string} at index {int} with text {string}',
  async (componentId, index, text) => {
    await waitFor(element(by.id(componentId)).atIndex(index))
      .toHaveText(text)
      .withTimeout(DEFAULT_TIMEOUT)
  },
)
Then(
  'I should see {string} at index {int} with label {string}',
  async (componentId, index, label) => {
    await waitFor(element(by.id(componentId)).atIndex(index))
      .toHaveLabel(label)
      .withTimeout(DEFAULT_TIMEOUT)
  },
)

Then('I should see at least one {string}', async (componentId) => {
  await waitFor(element(by.id(componentId)).atIndex(0))
    .toBeVisible()
    .withTimeout(DEFAULT_TIMEOUT)
})

Then(
  'I should see at least one {string} with text {string}',
  async (componentId, text) => {
    await waitFor(element(by.id(componentId)).atIndex(0))
      .toHaveText(text)
      .withTimeout(DEFAULT_TIMEOUT)
  },
)

Then(
  'I should see the item number {int} of {string}',
  async (number, componentId) => {
    await waitFor(element(by.id(componentId)).atIndex(number - 1))
      .toBeVisible()
      .withTimeout(DEFAULT_TIMEOUT)
  },
)

When('I enter PIN {string}', async (pins) => {
  await enterPIN(pins)
})

// ------ system stuffs ------
When('I wait {int} seconds', async (seconds) => {
  await wait(seconds * 1000)
})

When('disable synchronization', async () => {
  await device.disableSynchronization()
})

When('enable synchronization', async () => {
  await device.enableSynchronization()
})

// ------ special interaction with AppCheckbox ------
// we add "unchecked-" or "checked-" prefix to the testID
When('I check {string} checkbox', async (componentId) => {
  const id = `unchecked-${componentId}`
  await tapById(id)
})
When('I uncheck {string} checkbox', async (componentId) => {
  const id = `checked-${componentId}`
  await tapById(id)
})
Then('I should see {string} unchecked', async (componentId) => {
  const id = `unchecked-${componentId}`
  await shouldSee(id)
})
Then('I should see {string} checked', async (componentId) => {
  const id = `checked-${componentId}`
  await shouldSee(id)
})

// ------ Date Picker ------
/**
 * Note for the new implementation of date-picker:
 * - the date value could either be 'today', 'yesterday', 'tomorrow' or a date phrase
 * - (date phrase 1st part) count -- any positive number
 * - (date phrase 2nd part) unit -- 'year', 'month' or 'day'
 * - (date phrase 3rd part) tense -- 'before' or 'after'
 */

/**
 * Set the minimum and maximum date of date-picker
 * - "minOrMax" -- only accepts 'minimum' or 'maximum'
 */
When(
  'I set the datepicker {string} date to {string}',
  async (minOrMax, value) => {
    switch (minOrMax) {
      case 'minimum':
        datePickerMinimumDate = !value ? null : parseDate(value)
        break
      case 'maximum':
        datePickerMaximumDate = !value ? null : parseDate(value)
        break
      default:
        console.error(
          "Invalid min-max string - only accepts 'minimum', 'maximum' or empty string '' to remove",
        )
        break
    }
  },
)

/**
 * Changing date-picker with reference to the current date
 * - should only be used once per scenario
 */
When(
  'I open the {string} datepicker and pick the date {string}',
  async (componentId, value) => {
    // ex: I open the "test-id" datepicker and pick the date "today"
    // ex: I open the "test-id" datepicker and pick the date "5 days before"

    /** Prepare components */
    const button = `${componentId}-button`
    const datePicker = `${componentId}-date-picker`
    const closeIcon = `${componentId}-date-picker-modal-close-icon`

    /** Prepare common variables */
    const fromDate = CURRENT_DATE()
    const toDate = parseDate(value)
    if (!toDate) return // Invalid date

    /** Open the date-picker */
    await element(by.id(button)).tap()

    /** Apply changes for either 'android' or 'iOS' */
    device.getPlatform() === 'android'
      ? await changeAndroidDatePicker(fromDate, toDate)
      : await changeIosDatePicker(datePicker, closeIcon, toDate)
  },
)

/**
 * Changing date-picker with 'fromDate' and 'toDate'
 * - ideally used after initializing a value on a date-picker
 * - can be used multiple times
 */
When(
  'I open the {string} datepicker and pick the date from {string} to {string}',
  async (componentId, fromDateValue, toDateValue) => {
    // ex: I open the "test-id" datepicker and pick the date from "today" to "5 days before"
    // ex: I open the "test-id" datepicker and pick the date from "5 days before" to "tomorrow"

    /** Prepare components */
    const button = `${componentId}-button`
    const datePicker = `${componentId}-date-picker`
    const closeIcon = `${componentId}-date-picker-modal-close-icon`

    /** Prepare common variables */
    const fromDate = parseDate(fromDateValue)
    const toDate = parseDate(toDateValue)
    if (!fromDate || !toDate) return // Invalid date

    /** Open the date picker */
    await element(by.id(button)).tap()

    /** Apply changes for either 'android' or 'iOS' */
    device.getPlatform() === 'android'
      ? await changeAndroidDatePicker(fromDate, toDate)
      : await changeIosDatePicker(datePicker, closeIcon, toDate)
  },
)

/** The value that we expect here should be the same with how we change the date-picker */
Then(
  'I should see {string} datepicker with date of {string}',
  async (componentId, value) => {
    // ex: I should see test-id" datepicker with date of "today"
    // ex: I should see test-id" datepicker with date of "5 days before"
    await waitElement(componentId)
    const expectedValue = parseDate(value).toFormat(DEFAULT_DATE_FORMAT) // native datepicker always displays 'dd/MM/yyyy' format
    console.log(`Checking if date picker to have: ${expectedValue}`) // TODO: remove log when fixed
    await expect(element(by.id(componentId))).toHaveText(expectedValue)
  },
)

Then(
  'I should see {string} with current date in format {string}',
  async (componentId, format) => {
    await waitElement(componentId)
    await expect(element(by.id(componentId))).toHaveText(
      CURRENT_DATE().toFormat(format),
    )
  },
)

Then(
  'I should see {string} with date {int} months ago',
  async (componentId, value) => {
    await waitElement(componentId)
    // UTC is required on both E2E and frontend or else it will has a bounce back case
    const pastDate = CURRENT_DATE()
      .minus({ months: value })
      .toFormat(DEFAULT_DATE_FORMAT)
    await expect(element(by.id(componentId))).toHaveText(pastDate)
  },
)

Then(
  'I should see {string} with date {int} years ago',
  async (componentId, value) => {
    await waitElement(componentId)
    // UTC is required on both E2E and frontend or else it will has a bounce back case
    const pastDate = CURRENT_DATE()
      .minus({ years: value })
      .toFormat(DEFAULT_DATE_FORMAT)
    await expect(element(by.id(componentId))).toHaveText(pastDate)
  },
)

Then(
  'I should see {string} with date {int} years ago on date picker',
  async (componentId, value) => {
    // ios format
    if (device.platform === 'ios') {
      await waitElement(componentId)
      // UTC is required on both E2E and frontend or else it will has a bounce back case
      const pastDate = CURRENT_DATE()
        .minus({ years: value })
        .toFormat(DATE_SPACED_FORMAT)
      await expect(element(by.id(componentId))).toHaveText(pastDate)
    }

    // android format
    if (device.platform === 'android') {
      await waitElement(componentId)
      // UTC is required on both E2E and frontend or else it will has a bounce back case
      const pastDate = CURRENT_DATE()
        .minus({ years: value })
        .toFormat(DATE_DASHED_FORMAT)
      await expect(element(by.id(componentId))).toHaveText(pastDate)
    }
  },
)

Then(
  'I should see {string} with date {int} years ago with spaced format',
  async (componentId, value) => {
    await waitElement(componentId)
    // UTC is required on both E2E and frontend or else it will has a bounce back case
    const pastDate = CURRENT_DATE()
      .minus({ years: value })
      .toFormat(DATE_SPACED_FORMAT)
    await expect(element(by.id(componentId))).toHaveText(pastDate)
  },
)

Then(
  'I should see {string} with date {int} years ago with dashed format',
  async (componentId, value) => {
    await waitElement(componentId)
    // UTC is required on both E2E and frontend or else it will has a bounce back case
    const pastDate = CURRENT_DATE()
      .minus({ years: value })
      .toFormat(DATE_DASHED_FORMAT)
    await expect(element(by.id(componentId))).toHaveText(pastDate)
  },
)

Then(
  'I should see {string} with {string} date format from {int} months ago',
  async (componentId, dateFormat, value) => {
    await waitElement(componentId)
    // UTC is required on both E2E and frontend or else it will has a bounce back case
    const pastDate = CURRENT_DATE()
      .minus({ months: value })
      .toFormat(dateFormat)
    await expect(element(by.id(componentId))).toHaveText(pastDate)
  },
)

Then(
  'I tap and close the date picker in date answer question and see current date in format',
  async () => {
    const currentDate = CURRENT_DATE()
    if (device.getPlatform() === 'ios') {
      await tapById('question-input-datepicker-button')
      await shouldSee('question-input-datepicker-date-picker-modal')
      await shouldSee('question-input-datepicker-date-picker')
      await tapById('question-input-datepicker-date-picker-modal-close-icon')

      await waitElement('question-input-datepicker-textinput')
      await expect(
        element(by.id('question-input-datepicker-textinput')),
      ).toHaveText(currentDate.toFormat(DEFAULT_DATE_FORMAT))
    }

    if (device.getPlatform() === 'android') {
      await tapById('question-input-datepicker-button')
      const monthText = currentDate.monthShort
      const dayText = currentDate.day.toString().padStart(2, '0')
      const yearText = currentDate.year.toString()
      await waitElementByText(monthText)
      await element(by.text(monthText)).tap()
      await waitElementByText(dayText)
      await element(by.text(dayText)).tap()
      await waitElementByText(yearText)
      await element(by.text(yearText)).tap()
      await element(by.text(yearText)).tapReturnKey()
      await wait(3000)
      await waitElementByText('CANCEL') //CANCEL
      await element(by.text('CANCEL')).multiTap(2) //CANCEL
      await wait(3000)
      await waitElement('question-input-datepicker-textinput')
      await expect(
        element(by.id('question-input-datepicker-textinput')),
      ).toHaveText(currentDate.toFormat(DEFAULT_DATE_FORMAT))
    }
  },
)

When(
  'I pick date {int} years ago from {string} from date picker',
  async (value, componentId) => {
    const currentDate = CURRENT_DATE()
    if (device.getPlatform() === 'ios') {
      await waitElement(componentId + '-date-picker')
      // UTC is required on both E2E and frontend or else it will has a bounce back case
      const pastDate = currentDate
        .minus({ years: value })
        .toFormat(DEFAULT_DATE_FORMAT)
      await element(by.id(componentId + '-date-picker')).setDatePickerDate(
        pastDate,
        DEFAULT_DATE_FORMAT,
      )
      await element(by.id(componentId + '-date-picker-modal-close-icon')).tap()
    }

    if (device.getPlatform() === 'android') {
      const pastDate = currentDate.minus({ years: value })
      const dateText = pastDate.toFormat('yyyy-MM-dd').toString()
      await waitElement(componentId + '-textinput')
      await element(by.id(componentId + '-textinput')).replaceText(dateText)
      await element(by.id(componentId + '-textinput')).tapReturnKey()
    }
  },
)

When('I reload the app', async () => {
  await device.reloadReactNative()
})
When('I delete and reinstall the app', async () => {
  await device.launchApp({ delete: true })
})
When(
  'I delete and reinstall the app with {string} permission',
  async (services) => {
    const serviceMap = mapPermissionServices(services, true)
    await device.launchApp({ delete: true, permissions: serviceMap })
  },
)
When('I minimize the app into background', async () => {
  await device.sendToHome()
})
When('I minimize the app into background and relaunch it', async () => {
  await device.sendToHome()
  await device.launchApp({ delete: false })
})
When(
  'I minimize the app into background and relaunch it after {int} seconds',
  async (seconds) => {
    await device.sendToHome()
    await wait(seconds * 1000)
    await device.launchApp({ delete: false })
  },
)
When('I relaunch the app', async () => {
  await device.launchApp({ newInstance: true, delete: false })
})
When('I enroll biometrics', async () => {
  // turn off and on again
  await device.setBiometricEnrollment(false)
  await device.setBiometricEnrollment(true)
})
When('I un-enroll biometrics', async () => {
  await device.setBiometricEnrollment(false)
})
When('I scan my face', () => {
  device.matchFace()
})
When('I rotate the screen to {string} mode', async (orientation) => {
  // orientation : "portrait" or "landscape"
  if (device.getPlatform() === 'android') await androidRotateScreen(orientation)
  else await device.setOrientation(orientation)
})

When('I scan someone else face', () => {
  device.unmatchFace()
})

/**
 * This one is for replacing cancel button in Pin overlay
 */
When('I setup PIN {string} and skip activating biometric', async (pins) => {
  await setupPINAndSkipActivatingBiometric(pins)
})

When('[LOG] {string}', async (text) => {
  console.log('[LOG] ', text)
})

/******************************
 * Date Picker Helper Functions
 ******************************/

/** Android specific -- compare 2 LxDateTime dates and apply to the date-picker */
const changeAndroidDatePicker = async (fromDate, toDate) => {
  console.log('------------ changeAndroidDatePicker ------------') // TODO: remove log when fixed
  /** Check if dates are different */
  if (fromDate !== toDate) {
    /** Prepare date variables */
    let fromDateYear = fromDate.year
    let fromDateMonth = fromDate.month
    let fromDateDay = fromDate.day
    // let fromDateLuxon = LxDateTime.fromObject({year: fromDateYear, month: fromDateMonth, day: fromDateDay});
    console.log(`FROM: ${fromDateYear} - ${fromDateMonth} - ${fromDateDay}`) // TODO: remove log when fixed

    let toDateYear = toDate.year
    let toDateMonth = toDate.month
    let toDateDay = toDate.day
    let toDateLuxon = LxDateTime.fromObject({
      year: toDateYear,
      month: toDateMonth,
      day: toDateDay,
    })
    console.log(`TO: ${toDateYear} - ${toDateMonth} - ${toDateDay}`) // TODO: remove log when fixed

    let minYear = null
    let minMonth = null
    let minDay = null

    let maxYear = null
    let maxMonth = null
    let maxDay = null

    let hasExceededMinimumDate = false
    let hasExceededMaximumDate = false

    /**
     * Adjust the date when it exceeds min or max
     * - when we change the Year, sometimes the Month and Day automatically changes
     * - so we need to re-align if that happens
     */
    if (datePickerMinimumDate) {
      minYear = datePickerMinimumDate.year
      minMonth = datePickerMinimumDate.month
      minDay = datePickerMinimumDate.day
      let minLuxon = LxDateTime.fromObject({
        year: minYear,
        month: minMonth,
        day: minDay,
      })
      console.log(`* MIN: ${minYear} - ${minMonth} - ${minDay}`) // TODO: remove log when fixed

      if (toDateLuxon < minLuxon) {
        console.log('--> minimum exceeded - will use MIN to replace TO date') // TODO: remove log when fixed
        toDateYear = minYear
        toDateMonth = minMonth
        toDateDay = minDay
        hasExceededMinimumDate = true
      }
    }
    if (datePickerMaximumDate) {
      maxYear = datePickerMaximumDate.year
      maxMonth = datePickerMaximumDate.month
      maxDay = datePickerMaximumDate.day
      let maxLuxon = LxDateTime.fromObject({
        year: maxYear,
        month: maxMonth,
        day: maxDay,
      })
      console.log(`* MAX: ${maxYear} - ${maxMonth} - ${maxDay}`) // TODO: remove log when fixed

      if (toDateLuxon > maxLuxon) {
        console.log('--> maximum exceeded - will use MAX to replace TO date') // TODO: remove log when fixed
        toDateYear = maxYear
        toDateMonth = maxMonth
        toDateDay = maxDay
        hasExceededMaximumDate = true
      }
    }

    console.log('------ final values to compare ------') // TODO: remove log when fixed
    console.log(`++ FROM: ${fromDateYear} - ${fromDateMonth} - ${fromDateDay}`) // TODO: remove log when fixed
    console.log(`++ TO: ${toDateYear} - ${toDateMonth} - ${toDateDay}`) // TODO: remove log when fixed

    /** Check each date category if there are differences */
    /********
     * YEAR *
     ********/
    if (fromDateYear !== toDateYear) {
      console.log(`-+-+-+ changing YEAR -+-+-+`)
      const fromDateYearText = fromDateYear.toString()
      const toDateYearText = toDateYear.toString()
      await androidDatePickerTapAndReplace(fromDateYearText, toDateYearText)

      /**
       * Note:
       * - When the Minimum date has exceeded, changing the YEAR will automatically change the MONTH and DAY
       * - When the Maximum date has exceeded, no automatic change (I think - but I might be wrong)
       */
      if (hasExceededMinimumDate) {
        /** No need to change Month and Day - click OK then exit */
        await androidDateTapOK()
        return
      }
    }

    /*********
     * MONTH *
     *********/
    if (fromDateMonth !== toDateMonth) {
      console.log(`-+-+-+ changing MONTH -+-+-+`) // TODO: remove log when fixed
      const fromDateMonthText = LxDateTime.fromObject({
        month: fromDateMonth,
      }).toFormat('MMM')
      const toDateMonthText = LxDateTime.fromObject({
        month: toDateMonth,
      }).toFormat('MMM')
      await androidDatePickerTapAndReplace(fromDateMonthText, toDateMonthText)

      /**
       * Note:
       * - When the Minimum date has exceeded, changing the MONTH will automatically change the DAY
       * - When the Maximum date has exceeded, no automatic change (I think - but I might be wrong)
       */
      if (hasExceededMinimumDate) {
        /** No need to change Day - click OK then exit */
        await androidDateTapOK()
        return
      }

      /**
       * Note:
       * - If maximumDate was set, even if we don't reach the maximum date, there are weird things going on with Jan and Dec
       */
      if (fromDateYear === toDateYear) {
        console.log('*** needs to create special condition here ***') // TODO: remove log when fixed

        if (fromDateMonth === 12 && toDateMonth === 1) {
          console.error(
            'This is a bug from Android date-picker -- needs a work-around',
          ) // TODO: remove log when fixed
        }
      }
    }

    /*******
     * DAY *
     *******/
    if (fromDateDay !== toDateDay) {
      console.log(`-+-+-+ changing DAY -+-+-+`) // TODO: remove log when fixed
      const fromDateDayText = fromDateDay.toString().padStart(2, '0')
      const toDateDayText = toDateDay.toString().padStart(2, '0')
      await androidDatePickerTapAndReplace(fromDateDayText, toDateDayText)
    }
  }

  /** Confirm by clicking 'OK' */
  await androidDateTapOK()
}

/** Android specific -- changing the date based on text */
const androidDatePickerTapAndReplace = async (fromDateText, toDateText) => {
  console.log(`-+-+-+ androidDatePickerTapAndReplace -+-+-+`) // TODO: remove log when fixed
  console.log(`fromDateText: `, fromDateText) // TODO: remove log when fixed
  console.log(`toDateText: `, toDateText) // TODO: remove log when fixed
  await waitElementByText(fromDateText)
  await element(by.text(fromDateText)).tap()
  await wait(1000) // wait a little before replacing
  await findTextAndReplace(fromDateText, toDateText)
  await wait(1000) // wait a little before tapping again
  await element(by.text(toDateText)).tap()
}

/** Android specific -- click OK button to confirm the selected date */
const androidDateTapOK = async () => {
  /** Confirm by clicking 'OK' */
  await wait(1000) // wait a little before clicking OK
  await waitElementByText('OK')
  await element(by.text('OK')).multiTap(2)
}

/** iOS specific -- straight apply the date to the date picker */
const changeIosDatePicker = async (datePicker, closeIcon, toDate) => {
  const toDateString = toDate.toFormat(DEFAULT_DATE_FORMAT)
  await waitElement(datePicker)
  await element(by.id(datePicker)).setDatePickerDate(
    toDateString,
    DEFAULT_DATE_FORMAT,
  )
  /** Confirm by clicking the close icon */
  await element(by.id(closeIcon)).tap()
}

/**
 * Modifies the 'value' with regards to the current date
 * - value could either be "today", "yesterday", "tomorrow" or a date phrase
 */
const parseDate = (value) => {
  const mainDate = value.trim().toLowerCase()
  const currentDate = CURRENT_DATE() // always reference from current date

  /** Check for the date phrase */
  switch (mainDate) {
    case 'today':
      return currentDate
    case 'yesterday':
      return currentDate.minus({ day: 1 })
    case 'tomorrow':
      return currentDate.plus({ day: 1 })
  }

  /** Process date phrase - ex: "5 days before" */
  const valueArr = mainDate.split(' ')
  let [count, unit, tense] = valueArr // ex: count=5 unit='months' tense='before'

  /** Check validity of 'count' - should only accept positive integer */
  if (!+count.match(/^\d+$/)) {
    console.error('Invalid date count - only accepts positive integer')
    return // invalid
  }

  /**
   * Check validity of 'unit'
   * - should only accept 'year', 'month' or 'day'
   * - remove 's' for plural date -- Luxon uses singular noun only
   */
  if (unit.match(/[s]+$/)) {
    unit = unit.replace('s', '') // ex: 'months' --> 'month'
  }
  /** Check acceptable units */
  const acceptedUnits = ['year', 'month', 'day']
  if (acceptedUnits.indexOf(unit) === -1) {
    console.error("Invalid date unit - only accepts 'year', 'month' or 'day'")
    return // invalid
  }

  /** Check validity of 'tense' - should only accept 'before' or 'after */
  let toDate = null
  switch (tense) {
    case 'before':
      toDate = currentDate.minus({ [unit]: +count })
      break
    case 'after':
      toDate = currentDate.plus({ [unit]: +count })
      break
    default:
      console.error("Invalid date tense - only accepts 'before' or 'after'")
      return // invalid
  }
  return toDate
}

Given('I am on Hong Kong timezone', () => setDeviceTimezone(TIMEZONE.HongKong))

// ------------------- These are for debuging datepicker on android ------------------- //
When(
  'I replace current year with date from {int} months ago on android',
  async (value) => {
    const currentDate = CURRENT_DATE()
    const pastDate = currentDate.minus({ months: value })

    const pastDateYearText = pastDate.year.toString()

    const currentDateYearText = currentDate.year.toString()

    console.log(
      `Before change year from: ${currentDateYearText}, to: ${pastDateYearText}`,
    )

    await waitElementByText(currentDateYearText)
    await element(by.text(currentDateYearText)).longPress()

    console.log('Tap the year')
    await findTextAndReplace(currentDateYearText, pastDateYearText)
  },
)

When(
  'I replace current year with date from {int} years ago on android',
  async (value) => {
    const currentDate = CURRENT_DATE()
    const pastDate = currentDate.minus({ years: value })

    const pastDateYearText = pastDate.year.toString()

    const currentDateYearText = currentDate.year.toString()

    console.log(
      `Before change year from: ${currentDateYearText}, to: ${pastDateYearText}`,
    )

    await waitElementByText(currentDateYearText)
    await element(by.text(currentDateYearText)).longPress()

    console.log('Tap the year')

    await findTextAndReplace(currentDateYearText, pastDateYearText)
  },
)

When(
  'I replace current month with date from {int} months ago on android',
  async (value) => {
    const currentDate = CURRENT_DATE()
    const pastDate = currentDate.minus({ months: value })

    const pastDateMonthText = pastDate.monthShort

    let currentDateMonthText = currentDate.monthShort // using "let" in case of year change
    // keep reference to year because I need somewhere to tap
    let currentDateYearText = currentDate.year.toString()

    console.log(
      `Before change month from: ${currentDateMonthText}, to: ${pastDateMonthText}`,
    )

    await waitElementByText(currentDateMonthText)
    await element(by.text(currentDateMonthText)).longPress()

    console.log('Tap the month')

    // if year change, the "current month" text will be six month ago
    if (pastDate.year < currentDate.year) {
      const xMonthsAgoDate = currentDate.minus({ months: 6 })
      // console.log({xMonthsAgoDate, pastDate});
      currentDateMonthText = xMonthsAgoDate.monthShort
      currentDateYearText = xMonthsAgoDate.year.toString()
    }

    console.log(
      `Before change month from: ${currentDateMonthText}, to: ${pastDateMonthText}`,
    )

    await findTextAndReplace(currentDateMonthText, pastDateMonthText)

    // tap the year to blur from "month", letting to UI update to proper selection of date
    await waitElementByText(currentDateYearText)
    await element(by.text(currentDateYearText)).tap()
  },
)

When(
  'I replace current month with date from {int} years ago on android',
  async (value) => {
    const currentDate = CURRENT_DATE()
    const pastDate = currentDate.minus({ years: value })

    const pastDateMonthText = pastDate.monthShort

    let currentDateMonthText = currentDate.monthShort // using "let" in case of year change
    // keep reference to year because I need somewhere to tap
    let currentDateYearText = currentDate.year.toString()

    console.log(
      `Before change month from: ${currentDateMonthText}, to: ${pastDateMonthText}`,
    )

    await waitElementByText(currentDateMonthText)
    await element(by.text(currentDateMonthText)).longPress()

    console.log('Tap the month')

    // if year change, the "current month" text will be six month ago
    if (pastDate.year < currentDate.year) {
      const xMonthsAgoDate = currentDate.minus({ months: 6 })
      // console.log({xMonthsAgoDate, pastDate});
      currentDateMonthText = xMonthsAgoDate.monthShort
      currentDateYearText = xMonthsAgoDate.year.toString()
    }

    console.log(
      `Before change month from: ${currentDateMonthText}, to: ${pastDateMonthText}`,
    )

    if (currentDateMonthText !== pastDateMonthText)
      await element(by.text(currentDateMonthText)).replaceText(
        pastDateMonthText,
      )

    // tap the year to blur from "month", letting to UI update to proper selection of date
    await waitElementByText(currentDateYearText)
    await element(by.text(currentDateYearText)).tap()
  },
)

When(
  'I replace current date with date from {int} months ago on android',
  async (value) => {
    const currentDate = CURRENT_DATE()
    const pastDate = currentDate.minus({ months: value })

    const pastDateDayText = pastDate.day.toString().padStart(2, '0')

    // let currentDateMonthText = currentDate.monthShort; // using "let" in case of year change
    let currentDateDayText = currentDate.day.toString().padStart(2, '0')

    // if month or year change, date need to adjust accordingly (31 vs 30)
    if (
      pastDate.year < currentDate.year ||
      pastDate.month < currentDate.month
    ) {
      const xMonthsAgoDate = currentDate.minus({ months: 6 })
      currentDateDayText = xMonthsAgoDate.day.toString().padStart(2, '0')
      // currentDateMonthText = pastDate.monthShort;
    }
    console.log(
      `Before change day from: ${currentDateDayText}, to: ${pastDateDayText}`,
    )
    if (!(await checkIfTextExists(pastDateDayText))) {
      await waitElementByText(currentDateDayText)
      await element(by.text(currentDateDayText)).longPress()
      console.log('Tap the date')
      await findTextAndReplace(currentDateDayText, pastDateDayText)
    }
    await element(by.text(pastDateDayText)).tapReturnKey()
  },
)

When(
  'I replace current date with date from {int} years ago on android',
  async (value) => {
    const currentDate = CURRENT_DATE()
    const pastDate = currentDate.minus({ years: value })

    const pastDateDayText = pastDate.day.toString().padStart(2, '0')

    // let currentDateMonthText = currentDate.monthShort; // using "let" in case of year change
    let currentDateDayText = currentDate.day.toString().padStart(2, '0')

    // if month or year change, date need to adjust accordingly (31 vs 30)
    if (
      pastDate.year < currentDate.year ||
      pastDate.month < currentDate.month
    ) {
      const xMonthsAgoDate = currentDate.minus({ months: 6 })
      currentDateDayText = xMonthsAgoDate.day.toString().padStart(2, '0')
      // currentDateMonthText = pastDate.monthShort;
    }
    console.log(
      `Before change day from: ${currentDateDayText}, to: ${pastDateDayText}`,
    )
    if (!(await checkIfTextExists(pastDateDayText))) {
      await waitElementByText(currentDateDayText)
      await element(by.text(currentDateDayText)).longPress()
      console.log('Tap the date')
      await findTextAndReplace(currentDateDayText, pastDateDayText)
    }

    await element(by.text(pastDateDayText)).tapReturnKey()
  },
)

/**
 * Change Language
 * - EN --> English
 * - TH --> Thai
 * */
When('I change language to {string}', async (value) => {
  /** Navigate to Language Settings */
  console.debug(`[${device.id}][DEBUG] I should see "profile-avatar-icon`)
  await waitElement('profile-avatar-icon')
  await element(by.id('profile-avatar-icon')).tap()
  console.debug(
    `[${device.id}][DEBUG] I should see "account-setting-icon-button`,
  )
  await waitElement('account-setting-icon-button')
  await element(by.id('account-setting-icon-button')).tap()

  /** Change the language */
  await waitElement(`language-${value.toLowerCase()}-not-active`)
  await element(by.id(`language-${value.toLowerCase()}-not-active`)).tap()

  /** Wait for 5 seconds then navigate back */
  await wait(5 * 1000)
  await waitFor(element(by.id('header-back-icon')).atIndex(0))
    .toBeVisible()
    .withTimeout(DEFAULT_TIMEOUT)
  await element(by.id('header-back-icon')).atIndex(0).tap()
  await waitFor(element(by.id('header-back-icon')).atIndex(0))
    .toBeVisible()
    .withTimeout(DEFAULT_TIMEOUT)
  await element(by.id('header-back-icon')).atIndex(0).tap()
})

Then('I should see disable state of {string}', shouldSeeDisableStateOfElement)

Then('I should see error state of {string}', shouldSeeErrorStateOfElement)

Then('I should see focus state of {string}', shouldSeeFocusedElement)

Then('I should not see focus state of {string}', shouldSeeNotFocusedElement)

When(
  'I tap {string} at x-position={int} and y-position={int}',
  async (testId, x, y) => {
    await tapById(testId, { x, y })
  },
)
