import React from 'react';
import ThingInfo from '../../../components/ThingInfo';
import Button from '../../../components/Button';
import { green, large } from '../../../components/Button';

export default function Card({ image, id, name, description, categoryName, onClick }) {
  return (
    <div className="card">
      <ThingInfo
        image={image}
        id={id}
        name={name}
        description={description}
        categoryName={categoryName}
      />
      <Button className={`${large} ${green}`} id={id} onClick={onClick}>
        Add to inventory
        </Button>
    </div>
  );
}
