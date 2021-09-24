const path = require('path')
const fs = require('fs')

const components = path.resolve(
  './node_modules/@sammccord/components/dist/index.js'
)
module.exports = {
  plugins: [
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009'
        },
        stage: 3,
        features: {
          'custom-properties': false
        }
      }
    ]
    // ...(process.env.NODE_ENV === 'production'
    //   ? [
    //       [
    //         '@fullhuman/postcss-purgecss',
    //         {
    //           content: ['./{pages,components}/**/*.{ts,tsx}', components],
    //           defaultExtractor: (content) =>
    //             content.match(/[\w-:./]+(?<!:)/g) || []
    //         }
    //       ]
    //     ]
    //   : [])
  ]
}
