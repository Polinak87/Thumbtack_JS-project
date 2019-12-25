import React from 'react';
import Hero from '../../components/Hero';
import AddNewThingForm from './AddNewThingForm';
import Catalog from './Catalog';
import Column from '../../components/Column';

export default function AddNewThing(props) {
  return (
    <div>
      <br />
      <Hero text='Add new thing to your inventory' type="hero is-primary" />
      <br />
      <Column>
        <AddNewThingForm />
      </Column>
      <Catalog />
    </div>
  )
}