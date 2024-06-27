import type { StorybookConfig } from '@storybook/nextjs'
import dotenv  from'dotenv'

// 读取环境变量
const {parsed: env} = dotenv.config({ path: './.env.dev' })

const config: StorybookConfig = {
  stories: ['../src/packages/**/*.mdx', '../src/packages/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-designs',
    "@storybook/addon-a11y",
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  staticDirs: ['./public'],
  env
}
export default config
