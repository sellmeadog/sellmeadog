import { graphql, Link, PageProps, useStaticQuery } from 'gatsby';
import { FC } from 'react';
import * as styles from './site-title.module.scss';

export interface SiteTitleProps {
  location?: PageProps['location'];
}

export const SiteTitle: FC<SiteTitleProps> = ({ location }) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  if (location?.pathname === `${__PATH_PREFIX__}/`) return null;

  return (
    <h1 className={styles.title}>
      <Link to="/">{site.siteMetadata.title}</Link>{' '}
    </h1>
  );
};

export default SiteTitle;
