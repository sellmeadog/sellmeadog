import React from 'react';
import { render } from '@testing-library/react';

import Head from './head';

jest.mock('gatsby', () => ({
  __esModule: true,
  ...(jest.requireActual('gatsby') as any),
  graphql: jest.fn(),
  useStaticQuery: () => ({
    site: {
      siteMetadata: {
        title: 'kenniejaydavis.com',
        description: 'A blog about nothing',
        social: {
          twitter: '@kenniejaydavis',
        },
      },
    },
  }),
}));

describe('Head', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', () => {
    const { baseElement } = render(<Head />);
    expect(baseElement).toBeTruthy();
  });
});
