import { ThemeConfig } from '@docusaurus/types'
import type { DeepPartial } from 'utility-types'

export const navbarConfig: DeepPartial<ThemeConfig> = {
  title: 'My Site :)',
  logo: {
    alt: 'My Site Logo',
    src: 'img/logo.svg',
  },
  items: [
    /********
     * Left *
     ********/
    {
      type: 'doc',
      docId: 'setup/intro',
      label: 'Setup',
    },
    {
      type: 'doc',
      docId: 'fe/intro',
      label: 'Frontend',
    },
    {
      type: 'doc',
      docId: 'e2e/intro',
      label: 'E2E',
    },
    {
      type: 'doc',
      docId: 'bff/intro',
      label: 'BFF',
    },

    {
      type: 'doc',
      docId: 'simulator/intro',
      label: 'Simulator',
    },

    /*********
     * Right *
     *********/
    {
      type: 'doc',
      docId: 'tutorial/intro',
      label: 'Tutorial',
      position: 'right',
    },
    { to: 'blog', label: 'Blog', position: 'right' },
    {
      href: 'https://github.com/facebook/docusaurus',
      label: 'GitHub',
      position: 'right',
    },
  ],
}
