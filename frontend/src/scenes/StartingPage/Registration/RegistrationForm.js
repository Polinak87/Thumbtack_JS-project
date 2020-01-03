import React from 'react';
import FormFieldText from '../../../components/FormFieldText';
import Button, { green, large } from '../../../components/Button';

export default function RegistrationForm({ onChange, onSubmit }) {
  return (
    <form className="" name="RegistrationForm" onSubmit={onSubmit}>
      <FormFieldText
        type="text"
        name="firstName"
        placeholder="First name"
        onChange={onChange}
      />
      <FormFieldText
        type="text"
        name="lastName"
        placeholder="Last name"
        onChange={onChange}
      />
      <FormFieldText
        type="email"
        name="email"
        placeholder="Email"
        onChange={onChange}
      />
      <FormFieldText
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