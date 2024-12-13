let ignore = [`**/dist`]

if (process.env.NODE_ENV !== `test`) {
  ignore.push(`**/__tests__`)
}

module.exports = {
  presets: [
    ["babel-preset-medusa-package"],
    ["@babel/preset-typescript"]
  ],
  ignore,
  plugins: [
    "@babel/plugin-transform-runtime"
  ]
}