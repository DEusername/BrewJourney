import { config } from '@tamagui/config'
import { createTamagui } from 'tamagui'

const tamaguiConfig = createTamagui(config)

export default tamaguiConfig

// this makes typescript properly type everything based on the config
export type Conf = typeof tamaguiConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}