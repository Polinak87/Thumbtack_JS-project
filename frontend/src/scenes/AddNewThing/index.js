import React from 'react';
import Hero, { aquamarine } from '../../components/Hero';
import AddNewThingForm from './AddNewThingForm/index';
import Catalog from './Catalog/index';
import Column from '../../components/Columns/Column';

export default function AddNewThing(props) {
  return (
    <div>
      <br />
      <Hero className={aquamarine} text="Add new thing to your inventory" />
      <br />
      <Column>
        <AddNewThingForm />
      </Column>
      <Catalog />
    </div>
  );
}
