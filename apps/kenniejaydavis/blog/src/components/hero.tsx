import { StaticImage } from 'gatsby-plugin-image';
import React, { FC } from 'react';
import * as styles from './hero.module.scss';

export interface HeroProps {}

export const Hero: FC<HeroProps> = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.columnLeft}>
          <h1 className={styles.entry}>Kennie J. Davis</h1>
          <p className={styles.pronunciation}>
            [ken &middot; nee &middot; jay &middot; day &middot; vis]
          </p>
          <p className={styles.definition}>
            <span className={styles.classification}>noun</span> &ndash; a
            husband, father of three, and nerd; can be grumpy; does stuff with
            computers and occasionally writes about it
          </p>
          <p className={styles.definition}>
            <span className={styles.classification}>verb</span> &ndash; to
            innovate, provide thought leadership; to improve developer
            experience
          </p>
        </div>
        <div className={styles.columnRight}>
          {/* <img
            alt="Kennie Jay Davis"
            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/Face-of-an-angry-man.svg"
          /> */}
          <StaticImage
            alt="Kennie Jay Davis"
            src="../images/memoji-skeptical.png"
            className={styles.avatar}
            placeholder="blurred"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
