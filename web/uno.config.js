import { defineConfig } from 'unocss'
import { presetPruno } from '@enzoaicardi/preset-pruno'

export default defineConfig({
    cli: {
        entry: {
            patterns: ['*.html', 'components/*.js'],
            outFile: 'assets/styles.css'
        }
    },
    presets: [presetPruno()],
    theme: {
        colors: {
          'primary': 'red',
          'secondary': 'blue',
        }
    },
    shortcuts: {
    }
})