import { render } from '@testing-library/react';
import React from 'react';

import Hero from './hero';

describe('Hero', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Hero />);
    expect(baseElement).toBeTruthy();
  });
});
