import React from 'react';
import Hero from '../../components/Hero';
import AddNewThingForm from './AddNewThingForm';
import Catalog from './Catalog';

export default function AddNewThing(props) {
  return(
    <div>
    <br />
    <Hero text='Add new thing to your inventory' type="hero is-primary" />
    <br />
    <div className="column is-one-quarter">
    <AddNewThingForm/>
    </div>
    <Catalog />
  </div>
  )
}