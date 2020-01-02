import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import LoginForm from '../LoginForm';

afterEach(cleanup);

describe('LoginForm', () => {
  it('simulates filling out and submiting the form', () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();
    const props = {
      onChange,
      onSubmit,
    }
    const { getByPlaceholderText, getByText } = render(<LoginForm {...props} />);
    const inputEmail = getByPlaceholderText('Your Email');
    const inputPassword = getByPlaceholderText('Your Password');

    fireEvent.change(inputEmail, { target: { value: 'hh@mail.ru' } });
    fireEvent.change(inputPassword, { target: { value: 'ggg' } });
    fireEvent.submit(getByText('Log in'));

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(inputEmail.value).toEqual('hh@mail.ru');
    expect(inputPassword.value).toEqual('ggg');
  });

  it('renders correctly', () => {
    const { container } = render(<LoginForm />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
