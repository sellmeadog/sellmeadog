import { CreatePagesArgs } from 'gatsby';
import { resolve } from 'path';

const QUERY = `
{
  allMarkdownRemark(
    sort: { fields: [frontmatter___date], order: ASC }
    limit: 1000
  ) {
    nodes {
      id
      fields {
        slug
      }
    }
  }
}
`;

export const createBlogPostPages = async ({
  graphql,
  actions,
  reporter,
}: CreatePagesArgs) => {
  const { createPage } = actions;

  // Define a template for blog post
  const component = resolve('./src/templates/blog-post-template.tsx');

  // Get all markdown blog posts sorted by date
  const { errors, data } = await graphql<{
    allMarkdownRemark: {
      nodes: Array<{ id: string; fields: { slug: string } }>;
    };
  }>(QUERY);

  if (errors) {
    reporter.panicOnBuild(`There was an error loading your blog posts`, errors);
    return;
  }

  const nodes = data.allMarkdownRemark.nodes;

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (nodes.length > 0) {
    nodes.forEach((node, index) => {
      const previousPostId = index === 0 ? null : nodes[index - 1].id;
      const nextPostId =
        index === nodes.length - 1 ? null : nodes[index + 1].id;

      createPage({
        path: node.fields.slug,
        component,
        context: {
          id: node.id,
          previousPostId,
          nextPostId,
        },
      });
    });
  }
};
