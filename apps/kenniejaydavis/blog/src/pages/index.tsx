import { graphql, PageProps } from 'gatsby';
import React, { FC } from 'react';
import Masthead from '../components/masthead';
import PostReel from '../components/post-reel';
import './index.module.scss';

type IndexPageProps = PageProps<QueryData>;

export const Index: FC<IndexPageProps> = ({ data }) => {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./blog.scss file.
   */
  return (
    <div>
      <Masthead />
      <main>
        <PostReel posts={data.allMarkdownRemark.nodes} />
      </main>
      <footer></footer>
    </div>
  );
};

export default Index;

interface QueryData {
  site: {
    siteMetadata: {
      title: string;
    };
  };
  allMarkdownRemark: {
    nodes: {
      excerpt: string;
      fields: {
        slug: string;
      };
      frontmatter: {
        date: string;
        title: string;
        description: string;
      };
      html?: string;
    }[];
  };
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
        html
      }
    }
  }
`;
