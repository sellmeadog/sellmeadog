import { Link } from 'gatsby';
import { FC } from 'react';
import * as styles from './post-reel.module.scss';

export interface PostReelProps {
  posts: {
    excerpt: string;
    fields: {
      slug: string;
    };
    frontmatter: {
      date: string;
      title: string;
      description: string;
    };
  }[];
}

export const PostReel: FC<PostReelProps> = ({ posts }) => {
  return (
    <section id="posts" className={styles.content}>
      <ul className={styles.reel}>
        {posts.map((post) => (
          <li key={post.fields.slug} className={styles.post}>
            <article>
              <header>
                <h2>
                  <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
                </h2>
                <p>{post.frontmatter.date}</p>
              </header>
              <section>
                <p>{post.frontmatter.description}</p>
              </section>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PostReel;
