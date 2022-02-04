import { Link } from 'gatsby';
import { FC } from 'react';
import * as styles from './masthead.module.scss';

export interface MastheadProps {}

export const Masthead: FC<MastheadProps> = () => {
  return (
    <header className={styles.masthead}>
      <nav>
        <ul>
          <li>
            <Link activeClassName="active" to="/" partiallyActive>
              Home
            </Link>
          </li>
          <li>
            <Link activeClassName="active" to="/about" partiallyActive>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Masthead;
