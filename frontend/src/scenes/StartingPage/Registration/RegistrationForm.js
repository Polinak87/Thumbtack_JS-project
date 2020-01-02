import React from 'react';
import FormField from '../../../components/FormField';
import Button, { green, large } from '../../../components/Button';

export default function RegistrationForm({ onChange, onSubmit }) {
  return (
    <form className="" name="RegistrationForm" onSubmit={onSubmit}>
      <FormField
        type="text"
        name="firstName"
        placeholder="First name"
        onChange={onChange}
      />
      <FormField
        type="text"
        name="lastName"
        placeholder="Last name"
        onChange={onChange}
      />
      <FormField
        type="email"
        name="email"
        placeholder="Email"
        onChange={onChange}
      />
      <FormField
        type="password"
        name="password"
        placeholder="Password"
        onChange={onChange}
      />
      <Button className={`${large} ${green}`} type="submit">
        Register
      </Button>
    </form>
  )
}