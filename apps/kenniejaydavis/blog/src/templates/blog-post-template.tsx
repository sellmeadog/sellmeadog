import { graphql, PageProps } from 'gatsby';
import React, { FC, useState } from 'react';
import Head from '../components/head';
import Masthead from '../components/masthead';
import * as styles from './blog-post-template.module.scss';

export interface BlogPostTemplateProps
  extends PageProps<{
    markdownRemark: {
      frontmatter: { title: string; date: string; description: string };
      html: string;
    };
  }> {}

export const BlogPostTemplate: FC<BlogPostTemplateProps> = ({ data }) => {
  const post = data.markdownRemark;
  const [date] = useState(new Date());

  return (
    <>
      <Head
        title={post.frontmatter.title}
        description={post.frontmatter.description}
      />
      <Masthead />
      <article className={styles.page}>
        <header className={styles.hero}>
          <section>
            <h1>{post.frontmatter.title}</h1>
            <p>{post.frontmatter.date}</p>
          </section>
        </header>
        <main className={styles.body}>
          <section dangerouslySetInnerHTML={{ __html: post.html }}></section>
        </main>
      </article>
      <footer className={styles.footer}>
        <section>
          <p>Copyright &copy; {date.getFullYear()} Kennie J. Davis</p>
        </section>
      </footer>
    </>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      timeToRead
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
