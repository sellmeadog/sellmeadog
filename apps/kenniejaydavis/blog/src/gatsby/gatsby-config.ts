import { GatsbyConfig } from 'gatsby';
import { resolve } from 'path';

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'kennie j. davis',
    author: {
      name: 'Kennie J. Davis',
    },
    description: 'This is a gatsby application created by Nx.',
    siteUrl: 'https://kenniejaydavis.com',
    social: {
      twitter: 'kenniejaydavis',
    },
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        sassOptions: {
          implementation: require('sass'),
          includePaths: ['src/scss'],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        svgo: false,
        ref: true,
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: resolve(__dirname, '../images'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: resolve(__dirname, '../content'),
      },
    },
    'gatsby-plugin-image',
    'gatsby-transformer-sharp',
    {
      resolve: require.resolve('@nrwl/gatsby/plugins/nx-gatsby-ext-plugin'),
      options: {
        path: __dirname,
      },
    },
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'kennie j. davis',
        short_name: 'kennie j. davis',
        start_url: '/',
        background_color: '#121212',
        theme_color: '#ffffff',
        display: 'minimal-ui',
        icon: 'src/images/memoji-meh.png',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {},
    },
  ],
};

export default config;
