import { ThemeConfig } from '@docusaurus/types'
import type { DeepPartial } from 'utility-types'

export const docsConfig: DeepPartial<ThemeConfig> = {
  sidebar: {
    autoCollapseCategories: false,
    hideable: true,
  },
}
