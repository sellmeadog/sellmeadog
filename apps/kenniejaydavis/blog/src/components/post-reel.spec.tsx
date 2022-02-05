import { render } from '@testing-library/react';
import React from 'react';

import PostReel from './post-reel';

describe('PostReel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PostReel posts={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
