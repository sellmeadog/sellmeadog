import { render } from '@testing-library/react';
import React from 'react';
import SiteTitle from './site-title';

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

describe('SiteTitle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', () => {
    const { baseElement } = render(<SiteTitle />);
    expect(baseElement).toBeTruthy();
  });
});
