import React from 'react';
import FormField from '../../../components/FormField';
import Button, { green, large } from '../../../components/Button';

export default function LoginForm({ onChange, onSubmit }) {
  return (
    <form className="" name="LoginForm" onSubmit={onSubmit}>
      <FormField
        type="email"
        name="email"
        placeholder="Your Email"
        onChange={onChange}
      />
      <FormField
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