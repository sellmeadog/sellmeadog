import React from 'react';
import Masthead from '../components/masthead';
import './index.module.scss';

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./blog.scss file.
   */
  return (
    <div>
      <Masthead />
      <main>
        <ul>
          <li>
            <article>
              <header>
                <h2>Article Name</h2>
                <aside>February 4, 2022</aside>
              </header>
              <section>This is some content.</section>
            </article>
          </li>
        </ul>
      </main>
      <footer></footer>
    </div>
  );
}

export default Index;
