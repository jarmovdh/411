module.exports = {
  extends: ["next/core-web-vitals"],
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: ["@babel/plugin-proposal-class-properties"],
  ignorePatterns: ["sanity/**/*"],
}
