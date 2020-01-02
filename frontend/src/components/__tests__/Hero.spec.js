import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Hero, {aquamarine} from '../Hero';

afterEach(cleanup);

describe('Hero', () => {
  it('should has text', () => {
    const text = 'Your inventory';
    const props = {
      className: aquamarine,
      text,
    }
    const { getByText } = render(<Hero {...props} />);
    expect(getByText(text).textContent).toBe(text);
  });

  it('renders correctly', () => {
    const text = 'Your inventory';
    const props = {
      className: aquamarine,
      text,
    }
    const { container } = render(<Hero {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});