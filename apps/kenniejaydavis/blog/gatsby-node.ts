/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

import { GatsbyNode } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';
import { createBlogPostPages } from './src/gatsby/gatsby-node-create-blog-post-pages';

const node: GatsbyNode = {
  async createPages(args) {
    await createBlogPostPages(args);
  },

  onCreateNode({ node, actions, getNode }) {
    const { createNodeField } = actions;

    if (node.internal.type === `MarkdownRemark`) {
      const value = createFilePath({ node, getNode });

      console.log('onCreateNode', value);

      createNodeField({
        name: `slug`,
        node,
        value,
      });
    }
  },

  createSchemaCustomization({ actions }) {
    const { createTypes } = actions;

    // Explicitly define the siteMetadata {} object
    // This way those will always be defined even if removed from gatsby-config.js

    // Also explicitly define the Markdown frontmatter
    // This way the "MarkdownRemark" queries will return `null` even when no
    // blog posts are stored inside "content/blog" instead of returning an error
    createTypes(`
      type SiteSiteMetadata {
        author: Author
        siteUrl: String
        social: Social
      }

      type Author {
        name: String
        summary: String
      }

      type Social {
        twitter: String
      }

      type MarkdownRemark implements Node {
        frontmatter: Frontmatter
        fields: Fields
      }

      type Frontmatter {
        title: String
        description: String
        date: Date @dateformat
      }

      type Fields {
        slug: String
      }
    `);
  },
};

export default node;
