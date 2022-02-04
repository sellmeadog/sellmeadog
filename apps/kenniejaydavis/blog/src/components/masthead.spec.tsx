import React from 'react';
import { render } from '@testing-library/react';

import Masthead from './masthead';

describe('Masthead', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Masthead />);
    expect(baseElement).toBeTruthy();
  });
});
