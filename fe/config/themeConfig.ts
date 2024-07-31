import { createConfig } from '@gluestack-style/react'
import { config as defaultConfig } from '@gluestack-ui/config'
import { colorConfig } from './colorConfig'

export const gluestackConfig = createConfig({
  ...defaultConfig,
  tokens: {
    ...defaultConfig.tokens,
    colors: {
      ...defaultConfig.tokens.colors,
      ...colorConfig,
    },
  } as const,
})

// // https://github.com/gluestack/ui-examples/blob/main/gluestack-ui.config.ts
// type Config = typeof config
// declare module '@gluestack-ui/config' {
//   interface IConfig extends Config {}
// }

// // https://github.com/gluestack/expo-head-starter-kit/blob/main/gluestack-ui.config.ts
// type ConfigType = typeof config
// type Components = typeof defaultConfig.components
// declare module '@gluestack-style/react' {
//   interface ICustomConfig extends ConfigType {}
//   interface ICustomComponents extends Components {}
// }
