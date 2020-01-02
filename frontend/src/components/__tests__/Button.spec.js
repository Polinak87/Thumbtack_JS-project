import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import Button, { green, large } from '../Button';

afterEach(cleanup);

describe('Button', () => {
  it('has button name', () => {
    const text = 'Add to market';
    const props = {
      className: `${large} ${green}`,
      id: '1',
      userId: undefined,
      onClick: jest.fn(),
    }
    const { getByText } = render(<Button {...props}>{text}</Button>);
    expect(getByText(text).textContent).toBe(text);
  });

  it('clicks button', () => {
    const text = 'Add to market';
    const id = '1';
    const userId = undefined;
    const onClick = jest.fn();
    const props = {
      className: `${large} ${green}`,
      id,
      userId,
      onClick,
    }
    const { getByText } = render(<Button {...props}>{text}</Button>);
    fireEvent.click(getByText(text));
    expect(onClick).toBeCalledWith(id, userId);
  });

  it('renders correctly', () => {
    const text = 'Add to market';
    const props = {
      className: `${large} ${green}`,
      id: '1',
      userId: undefined,
      onClick: jest.fn(),
    }
    const { container } = render(<Button {...props}>{text}</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });
});