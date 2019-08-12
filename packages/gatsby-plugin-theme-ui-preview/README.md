# gatsby-plugin-theme-ui-preview

A Gatsby plugin for live previews of themes using [theme-ui](https://github.com/system-ui/theme-ui). To view an example clone the [repo](https://github.com/bkegley/gatsby-plugin-theme-ui-preview), install dependencies, and run `yarn workspace example run develop`.

```sh
npm i gatsby-plugin-theme-ui-preview
```

## Getting Started

In `gatsby-config.js` add the plugin before your theme (recommended to only run in development mode): 

```js
// gatsby-config.js
module.exports = {
    plugins: [
        process.env.NODE_ENV === 'development' ? `gatsby-plugin-theme-ui-preview` : null, // must come before theme
        `gatsby-theme-my-cool-theme`
    ].filter(Boolean)
}
```