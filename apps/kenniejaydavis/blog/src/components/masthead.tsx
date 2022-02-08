import { Link, PageProps } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { FC } from 'react';
import * as styles from './masthead.module.scss';
import SiteTitle from './site-title';

export interface MastheadProps {
  location?: PageProps['location'];
}

export const Masthead: FC<MastheadProps> = ({ location }) => {
  return (
    <header className={styles.masthead}>
      <div className={styles.content}>
        <StaticImage
          alt="Kennie Jay Davis"
          src="../images/memoji-meh.png"
          className={styles.avatar}
          placeholder="blurred"
        />
        <SiteTitle location={location} />
        <nav>
          <ul>
            <li>
              <Link activeClassName={styles.active} to="/">
                Home
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Masthead;
