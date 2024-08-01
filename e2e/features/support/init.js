import { After, Before, BeforeAll } from '@cucumber/cucumber'
import detox from 'detox/internals'

const getUrl = (url) => {
  return `exp+react-native-scaffold-2://expo-development-client/?url=${encodeURIComponent(
    url,
  )}`
}

BeforeAll({ timeout: 120 * 1000 }, async () => {
  await detox.init()

  if (device.getPlatform() === 'android') {
    await device.launchApp({
      newInstance: true,
      url: getUrl('http://10.0.2.2:8081'),
    })
  } else {
    await device.launchApp({ newInstance: false })
    await device.openURL({
      url: getUrl('http://localhost:8081'),
    })
  }
})

Before(async (message) => {
  if (device.getPlatform() === 'ios') {
    await device.reloadReactNative()
  }

  // workaround for close the dev launcher
  const isReleaseMode =
    process.env.DETOX_CONFIGURATION === 'ios.sim.release' ||
    process.env.DETOX_CONFIGURATION === 'android.emu.release'
  if (!isReleaseMode) {
    await element(by.text('react-native-scaffold-2')).swipe('down')
  }

  const { pickle } = message
  await detox.onTestStart({
    title: pickle.uri,
    fullName: pickle.name,
    status: 'running',
  })
})

After(async (message) => {
  const { pickle, result } = message
  await detox.onTestDone({
    title: pickle.uri,
    fullName: pickle.name,
    status: result ? 'passed' : 'failed',
  })
})

// AfterAll(async () => {
//   await detox.cleanup()
// })
