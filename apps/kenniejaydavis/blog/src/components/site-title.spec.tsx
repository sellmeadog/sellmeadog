import { render } from '@testing-library/react';
import React from 'react';
import SiteTitle from './site-title';

describe('SiteTitle', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SiteTitle />);
    expect(baseElement).toBeTruthy();
  });
});
