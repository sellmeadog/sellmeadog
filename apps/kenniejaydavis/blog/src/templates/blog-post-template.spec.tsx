import { render } from '@testing-library/react';

import BlogPostTemplate from './blog-post-template';

describe('BlogPostTemplate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BlogPostTemplate />);
    expect(baseElement).toBeTruthy();
  });
});
