import React from 'react';
import FormFieldText from '../../../components/FormFieldText';
import Button, { green, large } from '../../../components/Button';

export default function LoginForm({ onChange, onSubmit }) {
  return (
    <form className="" name="LoginForm" onSubmit={onSubmit}>
      <FormFieldText
        type="email"
        name="email"
        placeholder="Your Email"
        onChange={onChange}
      />
      <FormFieldText
        type="password"
        name="password"
        placeholder="Your Password"
        onChange={onChange}
      />
      <Button className={`${large} ${green}`} type="submit">
        Log in
      </Button>
    </form>
  )
}