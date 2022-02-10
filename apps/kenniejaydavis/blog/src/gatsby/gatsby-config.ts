import { GatsbyConfig } from 'gatsby';
import { resolve } from 'path';

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'kennie j. davis',
    author: {
      name: 'Kennie J. Davis',
    },
    description:
      'Join me as I write about my experiences working in technology, explore new and seemingly random ideas, and rant about whatever might be on my mind.',
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
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              inlineCode: {
                marker: '~',
              },
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map((node) => {
                return Object.assign({}, node.frontmatter, {
                  description: node.frontmatter.description,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ 'content:encoded': node.html }],
                });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      description
                      date
                    }
                  }
                }
              }
            `,
            output: '/feeds/rss.xml',
            title: 'RSS | kennie j. davis',
          },
        ],
      },
    },
  ],
};

export default config;
