module.exports = {
  siteMetadata: {
    title: `teh raptor`,
    description: `teh raptor's funhouse`,
    author: `@teh.raptor`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `teh raptor`,
        short_name: `teh-raptor`,
        start_url: `/`,
        background_color: `black`,
        theme_color: `red`,
        display: `minimal-ui`,
        icon: `src/images/lil-raptor.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
