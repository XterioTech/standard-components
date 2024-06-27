import { ChakraProvider } from '@chakra-ui/react'
import { I18nextProvider } from 'react-i18next'
import 'tailwindcss/tailwind.css'
import '../styles/index.scss'
import './index.scss'
import { enI18next } from '../public/locales/index'
import { xChakraTheme } from '../styles/x-chakra-theme'
import React from "react"
import type { Preview } from "@storybook/react"
import { GlobalContextProvider } from './GlobalContextProvider'
import Share from '../src/components/share'
import LoginModal from '../src/components/LoginModal'
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks'

const preview: Preview = {
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/EFGM3qHH7JBga5SokUoz7m/17-%E7%A7%BB%E5%8A%A8%E7%AB%AF-I%E6%9C%9F%EF%BC%88iOS-%26-Android%EF%BC%89?type=design&node-id=38-1525&mode=design&t=WcTB8wz6ZIzf568B-0",
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    backgrounds: {
      default: 'gray',
      values: [
        {
          name: 'light',
          value: '#fefefe'
        },
         {
          name: 'gray',
          value: '#9598B9'
        },
        {
          name: 'dark',
          value: '#333'
        }
      ]
    },
    viewport: {
       viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '500px',
          },
          type: 'mobile',
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '100%',
            height: '100%',
          },
          type: 'desktop',
        },
      },
      defaultViewport: 'desktop',
    },
    docs: {
        container: DocsContainer,
        page: DocsPage
    },
  },
  decorators: [
    (Story, p) => 
      {
        return <GlobalContextProvider userInfo={{wallet: [], isLogin: true}}>
        <I18nextProvider i18n={enI18next}>
          <ChakraProvider
            resetCSS={false}
            theme={xChakraTheme}
            cssVarsRoot={undefined}>
          <Story />
          <Share />
          <LoginModal />
          </ChakraProvider>
        </I18nextProvider>
      </GlobalContextProvider>
      }
  ]
}




export default preview
